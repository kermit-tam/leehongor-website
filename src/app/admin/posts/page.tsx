/**
 * 文章管理頁面
 * Admin Posts Management
 * 
 * 手機優先設計
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRequireAdmin } from '@/lib/auth-context';
import { PostService } from '@/lib/firestore';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/image-upload';
import { RichEditor } from '@/components/ui/rich-editor';
import type { Post, PostCategory } from '@/types';

const CATEGORIES: PostCategory[] = ['諧音卡', '動漫', '心得', '工具', '錯誤分享'];

export default function AdminPostsPage() {
  useRequireAdmin('/');
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  
  // 表單狀態
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '諧音卡' as PostCategory,
    tags: '',
    imageUrl: '',
  });

  // 加載文章
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const { posts: fetchedPosts } = await PostService.getPosts({ limit: 100 });
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error loading posts:', err);
      alert('無法加載文章');
    } finally {
      setIsLoading(false);
    }
  };

  // 重置表單
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: '諧音卡',
      tags: '',
      imageUrl: '',
    });
    setEditingPost(null);
  };

  // 編輯文章
  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      imageUrl: post.imageUrl || '',
    });
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  // 刪除文章
  const handleDelete = async (postId: string) => {
    if (!confirm('確定要刪除這篇文章嗎？此操作不可恢復。')) {
      return;
    }

    try {
      await PostService.deletePost(postId);
      await loadPosts();
      alert('文章已刪除');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('刪除失敗');
    }
  };

  // 提交表單
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        imageUrl: formData.imageUrl || undefined,
        authorId: 'admin',
        authorName: 'Admin',
      };

      if (editingPost) {
        await PostService.updatePost(editingPost.id, postData);
        alert('文章已更新');
      } else {
        await PostService.createPost(postData);
        alert('文章已創建');
      }

      resetForm();
      setShowForm(false);
      await loadPosts();
    } catch (err) {
      console.error('Error saving post:', err);
      alert('保存失敗');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 標題欄 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin" className="text-gray-500 hover:text-indigo-600 text-sm mb-1 block">
            ← 返回後台
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">📝 文章管理</h1>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          variant={showForm ? 'outline' : 'primary'}
          size="lg"
        >
          {showForm ? '取消' : '+ 新增文章'}
        </Button>
      </div>

      {/* 文章表單 */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {editingPost ? '編輯文章' : '新增文章'}
          </h2>

          <div className="space-y-4">
            {/* 標題 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                標題 *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="輸入文章標題"
              />
            </div>

            {/* 分類 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                分類 *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as PostCategory })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* 標籤 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                標籤（用逗號分隔）
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="例如：釘字頭, 電車, 常用語"
              />
            </div>

            {/* 封面圖片 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                封面圖片
              </label>
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                folder="leehongor/posts"
                label="上傳封面圖片"
              />
            </div>

            {/* 內容（富文本編輯器） */}
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-1 tracking-wide">
                文章內容 *
              </label>
              <RichEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="輸入文章內容，支援文字樣式、圖片、排版..."
              />
            </div>
          </div>

          {/* 提交按 */}
          <div className="mt-6 flex gap-3">
            <Button type="submit" size="xl" fullWidth>
              {editingPost ? '更新文章' : '發布文章'}
            </Button>
            {editingPost && (
              <Button
                type="button"
                variant="outline"
                size="xl"
                onClick={resetForm}
              >
                重置
              </Button>
            )}
          </div>
        </form>
      )}

      {/* 文章列表 */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">文章列表</h2>
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-xl" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-gray-500">暫時沒有文章</p>
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="mt-4"
            >
              創建第一篇文章
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {post.createdAt.toLocaleDateString('zh-HK')}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 truncate">
                      {post.title}
                    </h3>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs text-gray-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* 操作按 */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
