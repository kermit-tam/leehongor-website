/**
 * 文章列表頁
 * Posts List Page
 * 
 * 瀑布流顯示文章，支援分類篩選和搜尋
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PostService } from '@/lib/firestore';
import { PostCard } from '@/components/ui/card';
import type { Post, PostCategory } from '@/types';

const CATEGORIES: { value: PostCategory | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: '全部', icon: '📚' },
  { value: '諧音卡', label: '諧音卡', icon: '🎴' },
  { value: '動漫', label: '動漫', icon: '🎌' },
  { value: '心得', label: '心得', icon: '💭' },
  { value: '工具', label: '工具', icon: '🛠️' },
  { value: '錯誤分享', label: '錯誤分享', icon: '❌' },
];

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 記錄用戶最後訪問頁面
  useEffect(() => {
    localStorage.setItem('lastVisitedPage', '/posts');
  }, []);

  // 加載文章
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const { posts: fetchedPosts } = await PostService.getPosts({ limit: 50 });
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('無法加載文章，請稍後再試');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // 篩選文章
  useEffect(() => {
    let filtered = posts;

    // 分類篩選
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // 搜尋篩選
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchQuery]);

  // 渲染加載狀態
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-80" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* 頁面標題 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 輕鬆學</h1>
        <p className="text-gray-600">閱讀有趣的日文文章，輕鬆學習</p>
      </div>

      {/* 積木造句機入口 */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Link href="/learn/n5/lesson-1/builder" className="bg-gradient-to-r from-[#6B5B95] to-[#8B7BB5] text-white p-4 rounded-xl hover:shadow-lg transition-all">
          <div className="text-xl mb-1">🧱</div>
          <div className="font-medium text-sm">第1課造句</div>
          <div className="text-xs text-white/70">初次見面</div>
        </Link>
        <Link href="/learn/n5/lesson-2/builder" className="bg-gradient-to-r from-[#5B7B95] to-[#7B9BB5] text-white p-4 rounded-xl hover:shadow-lg transition-all">
          <div className="text-xl mb-1">🧱</div>
          <div className="font-medium text-sm">第2課造句</div>
          <div className="text-xs text-white/70">這是什麼</div>
        </Link>
        <Link href="/learn/n5/lesson-3/builder" className="bg-gradient-to-r from-[#5B957B] to-[#7BB59B] text-white p-4 rounded-xl hover:shadow-lg transition-all">
          <div className="text-xl mb-1">🧱</div>
          <div className="font-medium text-sm">第3課造句</div>
          <div className="text-xs text-white/70">這裡是哪裡</div>
        </Link>
        <Link href="/learn/n5/lesson-4/builder" className="bg-gradient-to-r from-[#957B5B] to-[#B59B7B] text-white p-4 rounded-xl hover:shadow-lg transition-all">
          <div className="text-xl mb-1">🧱</div>
          <div className="font-medium text-sm">第4課造句</div>
          <div className="text-xs text-white/70">現在幾點</div>
        </Link>
      </div>

      {/* 搜尋欄 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="搜尋文章標題或標籤..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* 分類篩選 */}
      <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-thin">
        <div className="flex space-x-2 min-w-max">
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.value
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* 錯誤提示 */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      {/* 文章網格 */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            {searchQuery ? '沒有找到相關文章' : '暫時沒有文章'}
          </h3>
          <p className="text-gray-500">
            {searchQuery ? '試試其他關鍵字' : '敬請期待新內容'}
          </p>
        </div>
      )}

      {/* 結果計數 */}
      {!isLoading && filteredPosts.length > 0 && (
        <div className="mt-8 text-center text-sm text-gray-500">
          顯示 {filteredPosts.length} 篇文章
        </div>
      )}
    </div>
  );
}
