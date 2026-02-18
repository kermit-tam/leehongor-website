/**
 * 文章管理頁面 - 無印風格 + 生字 + MC題
 * Admin Posts Management with Vocabulary & Quiz
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRequireAdmin } from '@/lib/auth-context';
import { PostService } from '@/lib/firestore';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/image-upload';
import { RichEditor } from '@/components/ui/rich-editor';
import type { Post, PostCategory, Vocabulary, PostQuiz } from '@/types';

const CATEGORIES: PostCategory[] = ['諧音卡', '動漫', '心得', '工具', '錯誤分享'];

// 空的生字模板
const emptyVocabulary: Vocabulary = {
  id: '',
  kanji: '',
  hiragana: '',
  romanji: '',
  cantonese: '',
  meaning: '',
};

// 創建獨立嘅 MC題（避免共用 array reference）
const createEmptyQuiz = (id: string): PostQuiz => ({
  id,
  question: '',
  options: ['', '', '', ''],
  correct: 0,
  explanation: '',
});

export default function AdminPostsPage() {
  useRequireAdmin('/');
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  
  // 基礎表單
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '諧音卡' as PostCategory,
    tags: '',
    imageUrl: '',
  });

  // 生字列表
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  
  // MC題列表（固定3題）
  const [quizzes, setQuizzes] = useState<PostQuiz[]>([
    createEmptyQuiz('q1'),
    createEmptyQuiz('q2'),
    createEmptyQuiz('q3'),
  ]);

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
    setVocabularies([]);
    setQuizzes([
      createEmptyQuiz('q1'),
      createEmptyQuiz('q2'),
      createEmptyQuiz('q3'),
    ]);
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
    setVocabularies(post.vocabularies || []);
    // 確保有3題MC
    const postQuizzes = post.quizzes || [];
    setQuizzes([
      ...(postQuizzes[0] ? [{ ...postQuizzes[0], options: [...postQuizzes[0].options] }] : [createEmptyQuiz('q1')]),
      ...(postQuizzes[1] ? [{ ...postQuizzes[1], options: [...postQuizzes[1].options] }] : [createEmptyQuiz('q2')]),
      ...(postQuizzes[2] ? [{ ...postQuizzes[2], options: [...postQuizzes[2].options] }] : [createEmptyQuiz('q3')]),
    ]);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  // 刪除文章
  const handleDelete = async (postId: string) => {
    if (!confirm('確定要刪除這篇文章嗎？此操作不可恢復。')) return;

    try {
      await PostService.deletePost(postId);
      await loadPosts();
      alert('文章已刪除');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('刪除失敗');
    }
  };

  // 添加生字
  const addVocabulary = () => {
    const newVocab: Vocabulary = {
      ...emptyVocabulary,
      id: `v${Date.now()}`,
    };
    setVocabularies([...vocabularies, newVocab]);
  };

  // 更新生字
  const updateVocabulary = (index: number, field: keyof Vocabulary, value: string) => {
    const updated = [...vocabularies];
    updated[index] = { ...updated[index], [field]: value };
    setVocabularies(updated);
  };

  // 刪除生字
  const removeVocabulary = (index: number) => {
    setVocabularies(vocabularies.filter((_, i) => i !== index));
  };

  // 更新MC題
  const updateQuiz = (index: number, field: keyof PostQuiz, value: string | number) => {
    const updated = [...quizzes];
    updated[index] = { ...updated[index], [field]: value };
    setQuizzes(updated);
  };

  // 更新MC選項
  const updateQuizOption = (quizIndex: number, optionIndex: number, value: string) => {
    const updated = [...quizzes];
    updated[quizIndex].options[optionIndex] = value;
    setQuizzes(updated);
  };

  // 驗證MC題是否完整
  const validateQuizzes = (): boolean => {
    for (const quiz of quizzes) {
      if (!quiz.question.trim()) {
        alert('請填寫所有MC題的問題');
        return false;
      }
      for (const option of quiz.options) {
        if (!option.trim()) {
          alert('請填寫所有MC題的選項');
          return false;
        }
      }
      if (!quiz.explanation.trim()) {
        alert('請填寫所有MC題的解釋');
        return false;
      }
    }
    return true;
  };

  // 提交表單
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 驗證MC題
    if (!validateQuizzes()) return;

    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        imageUrl: formData.imageUrl || undefined,
        vocabularies: vocabularies.filter(v => v.kanji.trim()), // 只保存有內容的生字
        quizzes: quizzes,
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
    <div className="max-w-4xl mx-auto px-6 py-8 bg-[#F5F5F0] min-h-screen">
      {/* 標題欄 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin" className="text-[#8C8C8C] hover:text-[#4A4A4A] text-sm mb-1 block tracking-wide">
            ← 返回後台
          </Link>
          <h1 className="text-2xl font-light text-[#4A4A4A] tracking-wide">📝 文章管理</h1>
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
        <form onSubmit={handleSubmit} className="bg-[#FAF9F7] border-t border-[#E5E5E5] p-6 mb-8">
          <h2 className="text-lg font-normal text-[#4A4A4A] mb-6 tracking-wide">
            {editingPost ? '編輯文章' : '新增文章'}
          </h2>

          <div className="space-y-6">
            {/* 標題 */}
            <div>
              <label className="block text-sm text-[#8C8C8C] mb-2 tracking-wide">標題 *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white border-t border-[#E5E5E5] focus:border-[#8C8C8C] focus:outline-none"
                placeholder="輸入文章標題"
              />
            </div>

            {/* 分類 */}
            <div>
              <label className="block text-sm text-[#8C8C8C] mb-2 tracking-wide">分類 *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as PostCategory })}
                className="w-full px-4 py-3 bg-white border-t border-[#E5E5E5] focus:border-[#8C8C8C] focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* 標籤 */}
            <div>
              <label className="block text-sm text-[#8C8C8C] mb-2 tracking-wide">標籤（用逗號分隔）</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-3 bg-white border-t border-[#E5E5E5] focus:border-[#8C8C8C] focus:outline-none"
                placeholder="例如：釘字頭, 電車, 常用語"
              />
            </div>

            {/* 封面圖片 */}
            <div>
              <label className="block text-sm text-[#8C8C8C] mb-2 tracking-wide">封面圖片</label>
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                folder="leehongor/posts"
                label="上傳封面圖片"
              />
            </div>

            {/* 內容 */}
            <div>
              <label className="block text-sm text-[#8C8C8C] mb-2 tracking-wide">文章內容 *</label>
              <RichEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="輸入文章內容..."
              />
            </div>

            {/* 生字管理 */}
            <div className="border-t border-[#E5E5E5] pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-normal text-[#4A4A4A] tracking-wide">本課生字</h3>
                <button
                  type="button"
                  onClick={addVocabulary}
                  className="px-3 py-2 text-sm bg-[#8C8C8C] text-white hover:bg-[#6B6B6B] transition-colors"
                >
                  + 添加生字
                </button>
              </div>

              {vocabularies.length === 0 ? (
                <p className="text-sm text-[#B5B5B5]">暫時沒有生字，點擊上方按鈕添加</p>
              ) : (
                <div className="space-y-4">
                  {vocabularies.map((vocab, index) => (
                    <div key={vocab.id} className="bg-white border-t border-[#E5E5E5] p-4">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          value={vocab.kanji}
                          onChange={(e) => updateVocabulary(index, 'kanji', e.target.value)}
                          placeholder="漢字（如：電車）"
                          className="px-3 py-2 bg-[#FAF9F7] border-t border-[#E5E5E5] text-sm focus:border-[#8C8C8C] focus:outline-none"
                        />
                        <input
                          type="text"
                          value={vocab.hiragana}
                          onChange={(e) => updateVocabulary(index, 'hiragana', e.target.value)}
                          placeholder="平假名（如：でんしゃ）"
                          className="px-3 py-2 bg-[#FAF9F7] border-t border-[#E5E5E5] text-sm focus:border-[#8C8C8C] focus:outline-none"
                        />
                        <input
                          type="text"
                          value={vocab.romanji}
                          onChange={(e) => updateVocabulary(index, 'romanji', e.target.value)}
                          placeholder="羅馬音（如：densha）"
                          className="px-3 py-2 bg-[#FAF9F7] border-t border-[#E5E5E5] text-sm focus:border-[#8C8C8C] focus:outline-none"
                        />
                        <input
                          type="text"
                          value={vocab.cantonese}
                          onChange={(e) => updateVocabulary(index, 'cantonese', e.target.value)}
                          placeholder="廣東話諧音（如：釘沙）"
                          className="px-3 py-2 bg-[#FAF9F7] border-t border-[#E5E5E5] text-sm focus:border-[#8C8C8C] focus:outline-none"
                        />
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={vocab.meaning}
                          onChange={(e) => updateVocabulary(index, 'meaning', e.target.value)}
                          placeholder="中文意思（如：火車）"
                          className="flex-1 px-3 py-2 bg-[#FAF9F7] border-t border-[#E5E5E5] text-sm focus:border-[#8C8C8C] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeVocabulary(index)}
                          className="px-3 py-2 text-[#8C8C8C] hover:text-[#B8A8A0] hover:bg-[#F5F5F0] transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* MC題管理 */}
            <div className="border-t border-[#E5E5E5] pt-6">
              <h3 className="text-md font-normal text-[#4A4A4A] tracking-wide mb-4">考考你（3題MC題）</h3>
              
              <div className="space-y-6">
                {quizzes.map((quiz, quizIndex) => (
                  <div key={quiz.id} className="bg-white border-t border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-[#8C8C8C]">第 {quizIndex + 1} 題</span>
                      <span className="text-xs text-[#B5B5B5]">* 必須填寫</span>
                    </div>
                    
                    <input
                      type="text"
                      value={quiz.question}
                      onChange={(e) => updateQuiz(quizIndex, 'question', e.target.value)}
                      placeholder="問題（如：「釘沙」係咩意思？）"
                      className="w-full px-3 py-2 mb-3 bg-[#FAF9F7] border-t border-[#E5E5E5] text-sm focus:border-[#8C8C8C] focus:outline-none"
                    />
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {quiz.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <span className="text-sm text-[#8C8C8C] w-6">{String.fromCharCode(65 + optionIndex)}.</span>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateQuizOption(quizIndex, optionIndex, e.target.value)}
                            placeholder={`選項 ${String.fromCharCode(65 + optionIndex)}`}
                            className="flex-1 px-3 py-2 bg-[#FAF9F7] border-t border-[#E5E5E5] text-sm focus:border-[#8C8C8C] focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 mb-3">
                      <select
                        value={quiz.correct}
                        onChange={(e) => updateQuiz(quizIndex, 'correct', parseInt(e.target.value))}
                        className="px-3 py-2 bg-[#FAF9F7] border-t border-[#E5E5E5] text-sm focus:border-[#8C8C8C] focus:outline-none"
                      >
                        <option value={0}>正確答案：A</option>
                        <option value={1}>正確答案：B</option>
                        <option value={2}>正確答案：C</option>
                        <option value={3}>正確答案：D</option>
                      </select>
                    </div>
                    
                    <textarea
                      value={quiz.explanation}
                      onChange={(e) => updateQuiz(quizIndex, 'explanation', e.target.value)}
                      placeholder="解釋（如：釘沙 = でんしゃ = 電車）"
                      rows={2}
                      className="w-full px-3 py-2 bg-[#FAF9F7] border-t border-[#E5E5E5] text-sm focus:border-[#8C8C8C] focus:outline-none resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 提交按鈕 */}
          <div className="mt-8 flex gap-3">
            <Button type="submit" size="xl" fullWidth>
              {editingPost ? '更新文章' : '發布文章'}
            </Button>
            {editingPost && (
              <Button type="button" variant="outline" size="xl" onClick={resetForm}>
                重置
              </Button>
            )}
          </div>
        </form>
      )}

      {/* 文章列表 */}
      <div className="space-y-4">
        <h2 className="text-lg font-normal text-[#4A4A4A] tracking-wide">文章列表</h2>
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-[#E5E5E5]" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-[#FAF9F7] border-t border-[#E5E5E5]">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-[#8C8C8C]">暫時沒有文章</p>
            <Button onClick={() => setShowForm(true)} variant="outline" className="mt-4">
              創建第一篇文章
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="bg-[#FAF9F7] border-t border-[#E5E5E5] p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-[#8C8C8C] bg-[#F5F5F0] px-2 py-1">{post.category}</span>
                      <span className="text-xs text-[#B5B5B5]">
                        {post.createdAt.toLocaleDateString('zh-HK')}
                      </span>
                      {post.vocabularies?.length > 0 && (
                        <span className="text-xs text-[#A8B5A0]">📚 {post.vocabularies.length}個生字</span>
                      )}
                      {post.quizzes?.length > 0 && (
                        <span className="text-xs text-[#C4B9AC]">❓ {post.quizzes.length}題MC</span>
                      )}
                    </div>
                    <h3 className="font-normal text-[#4A4A4A] truncate">{post.title}</h3>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs text-[#B5B5B5]">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 text-[#8C8C8C] hover:text-[#4A4A4A] hover:bg-[#F5F5F0] transition-colors"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-[#8C8C8C] hover:text-[#B8A8A0] hover:bg-[#F5F5F0] transition-colors"
                    >
                      🗑️
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
