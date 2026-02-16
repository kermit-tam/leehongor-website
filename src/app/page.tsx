/**
 * 首頁 / 登入頁
 * Home / Login Page
 * 
 * 提供兩個入口：輕鬆學（文章區）和系統學（課程區）
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, GoogleLoginButton } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { user, isLoading, loginWithGoogle } = useAuth();
  const router = useRouter();

  // 已登入用戶重定向
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/posts');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  // 已登入則顯示 Hero 入口（理論上會重定向，這裡是備用）
  if (user) {
    return <HeroSection />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            {/* Logo */}
            <div className="text-6xl mb-6">🎌</div>
            
            {/* 標題 */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                利康哥日文學習平台
              </span>
            </h1>
            
            {/* 副標題 */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              輕鬆學習日文，系統化課程設計<br className="hidden sm:block" />
              遊戲化學習體驗，讓學日文變得有趣
            </p>

            {/* 登入區域 */}
            <div className="max-w-sm mx-auto">
              <GoogleLoginButton
                onClick={loginWithGoogle}
                loading={false}
              />
              <p className="mt-4 text-sm text-gray-500">
                使用 Google 帳號快速登入
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 功能介紹 */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            兩種學習方式，任你選擇
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* 輕鬆學 */}
            <div className="group relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-4 right-4 text-5xl">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">輕鬆學</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                閱讀有趣的日文文章，包括諧音卡、動漫、心得分享等。
                像看 IG 一樣輕鬆學習，無壓力吸收日文知識。
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  諧音記憶法
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  動漫日語
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  實用工具分享
                </li>
              </ul>
            </div>

            {/* 系統學 */}
            <div className="group relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-4 right-4 text-5xl">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">系統學</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                結構化課程從零開始，從五十音到進階文法。
                遊戲化學習系統，六角雷達追蹤你的實力進度。
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <span className="text-indigo-500 mr-2">✓</span>
                  循序漸進課程
                </li>
                <li className="flex items-center">
                  <span className="text-indigo-500 mr-2">✓</span>
                  互動測驗
                </li>
                <li className="flex items-center">
                  <span className="text-indigo-500 mr-2">✓</span>
                  成就系統與排行榜
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2024 利康哥日文學習平台 LeeHongor Japanese</p>
        </div>
      </footer>
    </div>
  );
}

// ==================== Hero 入口區域（已登入用戶）====================

function HeroSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* 歡迎標語 */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          歡迎回來！今日想點學？
        </h1>
        <p className="text-gray-600">選擇你喜歡的學習方式</p>
      </div>

      {/* 兩個入口 */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* 輕鬆學入口 */}
        <Link href="/posts">
          <div className="group bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl p-8 text-white hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-2xl font-bold mb-2">輕鬆學</h2>
            <p className="opacity-90 mb-6">閱讀文章，輕鬆學日文</p>
            <div className="flex items-center font-medium">
              開始閱讀
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>

        {/* 系統學入口 */}
        <Link href="/learn">
          <div className="group bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold mb-2">系統學</h2>
            <p className="opacity-90 mb-6">課程學習，遊戲化進度</p>
            <div className="flex items-center font-medium">
              開始學習
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>
      </div>

      {/* 快速統計 */}
      <QuickStats />
    </div>
  );
}

// ==================== 快速統計 ====================

function QuickStats() {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4 text-center">你的學習進度</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-indigo-600">Lv.{user.level}</div>
            <div className="text-sm text-gray-500">目前等級</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-600">{user.achievementExp}</div>
            <div className="text-sm text-gray-500">成就分數</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600">{user.completedLessons.length}</div>
            <div className="text-sm text-gray-500">完成課程</div>
          </div>
        </div>
      </div>
    </div>
  );
}
