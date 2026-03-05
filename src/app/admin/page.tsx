/**
 * 後台管理首頁
 * Admin Dashboard
 * 
 * 手機優先設計
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRequireAdmin } from '@/lib/auth-context';

import { StatCard } from '@/components/ui/card';

export default function AdminDashboard() {
  const { isLoading } = useRequireAdmin('/');
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLessons: 0,
    totalUsers: 0,
    todayActive: 0,
  });

  // 加載統計數據
  useEffect(() => {
    const loadStats = async () => {
      try {
        // 這裡可以添加更多的統計邏輯
        // 暫時使用靜態數據
        setStats({
          totalPosts: 0,
          totalLessons: 0,
          totalUsers: 0,
          todayActive: 0,
        });
      } catch (err) {
        console.error('Error loading stats:', err);
      }
    };

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 標題 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">⚙️ 後台管理</h1>
        <p className="text-gray-500">管理文章、課程和用戶數據</p>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatCard
          icon="📝"
          label="文章總數"
          value={stats.totalPosts}
          color="gray"
        />
        <StatCard
          icon="📚"
          label="課程總數"
          value={stats.totalLessons}
          color="earth"
        />
        <StatCard
          icon="👥"
          label="用戶總數"
          value={stats.totalUsers}
          color="warm"
        />
        <StatCard
          icon="🔥"
          label="今日活躍"
          value={stats.todayActive}
          color="gray"
        />
      </div>

      {/* 快捷操作 */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">快速操作</h2>
        
        <Link href="/admin/posts">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98]">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl mr-4">
                📝
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">文章管理</h3>
                <p className="text-sm text-gray-500">新增、編輯、刪除文章</p>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        <Link href="/admin/lessons">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98]">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl mr-4">
                📚
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">課程管理</h3>
                <p className="text-sm text-gray-500">管理課程內容和測驗</p>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        <Link href="/admin/n5-phonetics">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98]">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl mr-4">
                🎵
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">發音編輯</h3>
                <p className="text-sm text-gray-500">編輯N5課程廣東話諧音</p>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        <Link href="/admin/system-guide">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98]">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl mr-4">
                📖
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">系統說明書</h3>
                <p className="text-sm text-gray-500">查看系統架構、計分模式、課程狀態</p>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        <Link href="/admin/study-images">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98]">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl mr-4">
                🖼️
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">仔仔溫書圖片</h3>
                <p className="text-sm text-gray-500">上傳和管理圖畫配對遊戲的圖片</p>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        <Link href="/admin/trychi">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98]">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-2xl mr-4">
                🎨
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">中文挑戰內容</h3>
                <p className="text-sm text-gray-500">自訂標題、副標題和圖標</p>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* 使用提示 */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl text-sm text-blue-700">
        <div className="flex items-start">
          <span className="text-lg mr-2">💡</span>
          <div>
            <strong>管理員提示：</strong>
            <ul className="mt-1 ml-4 list-disc space-y-1">
              <li>所有操作會立即生效</li>
              <li>請在編輯前備份重要內容</li>
              <li>圖片會自動上傳到 Firebase Storage</li>
              <li>課程資料狀態請查看「系統說明書」</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
