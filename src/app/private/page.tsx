/**
 * 私人頁面
 * Private Page
 * 
 * 淨係登入咗嘅用戶先可以睇到
 */

'use client';

import { useRequireAuth } from '@/lib/auth-context';
import Link from 'next/link';

export default function PrivatePage() {
  const { user, isLoading } = useRequireAuth('/');

  // 載入中顯示 loading
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-32 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  // 如果冇登入，會自動 redirect，呢度唔會顯示
  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 頂部導航 */}
      <div className="mb-6">
        <Link 
          href="/" 
          className="text-sm text-gray-500 hover:text-indigo-600 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回主頁
        </Link>
      </div>

      {/* 標題區 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl">
            🔒
          </div>
          <h1 className="text-2xl font-bold text-gray-900">私人頁面</h1>
        </div>
        <p className="text-gray-500">
          歡迎，{user.name}！呢度係你嘅私人空間，淨係你自己睇到。
        </p>
      </div>

      {/* 用戶資料卡 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">👤 你嘅資料</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">名稱</span>
            <span className="font-medium">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">電郵</span>
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">角色</span>
            <span className={`font-medium ${user.role === 'admin' ? 'text-purple-600' : 'text-gray-700'}`}>
              {user.role === 'admin' ? '管理員' : '用戶'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">等級</span>
            <span className="font-medium text-indigo-600">Lv.{user.level}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">成就經驗</span>
            <span className="font-medium">{user.achievementExp} XP</span>
          </div>
        </div>
      </div>

      {/* 私人內容區 */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">📝 私人筆記</h2>
        <p className="text-gray-600 mb-4">
          呢度可以擺任何你想記低嘅內容。例如：
        </p>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            學習進度追蹤
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            個人筆記同提醒
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            待辦事項清單
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            收藏嘅學習資源
          </li>
        </ul>
        
        <div className="mt-6 p-4 bg-white rounded-xl">
          <p className="text-sm text-gray-400 italic">
            💡 提示：你可以喺呢個文件 <code>src/app/private/page.tsx</code> 度修改內容，加你想顯示嘅功能。
          </p>
        </div>
      </div>

      {/* 仔仔溫書入口 */}
      <Link href="/private/study">
        <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200 hover:border-yellow-400 transition-all cursor-pointer">
          <div className="flex items-center">
            <div className="text-4xl mr-4">🎒</div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg">仔仔溫書</h3>
              <p className="text-sm text-gray-600 mt-1">二年級中文生字 + 英文詞彙</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">🇨🇳 中文閃卡</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">🇬🇧 英文詞彙</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">📝 測驗</span>
              </div>
            </div>
            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>

      {/* 功能示範 */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-2xl mb-2">📊</div>
          <h3 className="font-bold text-gray-900 text-sm">數據統計</h3>
          <p className="text-xs text-gray-500 mt-1">顯示你嘅學習數據</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-2xl mb-2">🎯</div>
          <h3 className="font-bold text-gray-900 text-sm">目標設定</h3>
          <p className="text-xs text-gray-500 mt-1">設定學習目標</p>
        </div>
      </div>
    </div>
  );
}
