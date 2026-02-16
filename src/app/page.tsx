/**
 * 首頁 / 登入頁
 * Home / Login Page - MUJI Style
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
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
        <div className="text-[#8C8C8C] tracking-wider">載入中...</div>
      </div>
    );
  }

  if (user) {
    return <HeroSection />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Hero Section - 簡約無印風格 */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20 md:py-32">
        <div className="text-center max-w-2xl mx-auto">
          {/* Logo */}
          <div className="text-5xl mb-8">🎌</div>
          
          {/* 標題 */}
          <h1 className="text-3xl md:text-5xl font-light mb-6 text-[#4A4A4A] tracking-wider">
            利康哥日文
          </h1>
          
          {/* 副標題 */}
          <p className="text-lg text-[#8C8C8C] mb-12 leading-relaxed tracking-wide">
            輕鬆學習日文，系統化課程設計
            <br />
            遊戲化學習體驗，讓學日文變得有趣
          </p>

          {/* 登入區域 */}
          <div className="max-w-sm mx-auto">
            <GoogleLoginButton
              onClick={loginWithGoogle}
              loading={false}
            />
            <p className="mt-6 text-sm text-[#B5B5B5] tracking-wide">
              使用 Google 帳號快速登入
            </p>
          </div>
        </div>
      </div>

      {/* 功能介紹 - 極簡設計 */}
      <div className="py-20 bg-[#FAF9F7] border-t border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <h2 className="text-center text-xl text-[#4A4A4A] mb-16 tracking-wider font-normal">
            兩種學習方式
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* 輕鬆學 */}
            <div className="bg-[#F5F5F0] p-8 border-t border-[#E5E5E5]">
              <div className="text-4xl mb-6">📚</div>
              <h3 className="text-xl font-normal text-[#4A4A4A] mb-4 tracking-wide">輕鬆學</h3>
              <p className="text-[#8C8C8C] leading-relaxed mb-6">
                閱讀有趣的日文文章，包括諧音卡、動漫、心得分享等。
                像看 IG 一樣輕鬆學習，無壓力吸收日文知識。
              </p>
              <ul className="space-y-2 text-[#8C8C8C] text-sm">
                <li>• 諧音記憶法</li>
                <li>• 動漫日語</li>
                <li>• 實用工具分享</li>
              </ul>
            </div>

            {/* 系統學 */}
            <div className="bg-[#F5F5F0] p-8 border-t border-[#E5E5E5]">
              <div className="text-4xl mb-6">🎯</div>
              <h3 className="text-xl font-normal text-[#4A4A4A] mb-4 tracking-wide">系統學</h3>
              <p className="text-[#8C8C8C] leading-relaxed mb-6">
                結構化課程從零開始，從五十音到進階文法。
                遊戲化學習系統，六角雷達追蹤你的實力進度。
              </p>
              <ul className="space-y-2 text-[#8C8C8C] text-sm">
                <li>• 循序漸進課程</li>
                <li>• 互動測驗</li>
                <li>• 成就系統與排行榜</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-[#F5F5F0] border-t border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-6 text-center text-[#B5B5B5] text-sm tracking-wide">
          <p>© 2024 利康哥日文學習平台</p>
        </div>
      </footer>
    </div>
  );
}

// ==================== Hero 入口（已登入用戶）====================

function HeroSection() {
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 bg-[#F5F5F0] min-h-screen">
      {/* 歡迎標語 */}
      <div className="text-center mb-16">
        <h1 className="text-2xl md:text-3xl font-light mb-4 text-[#4A4A4A] tracking-wider">
          歡迎回來
        </h1>
        <p className="text-[#8C8C8C] tracking-wide">選擇你喜歡的學習方式</p>
      </div>

      {/* 兩個入口 */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* 輕鬆學入口 */}
        <Link href="/posts">
          <div className="group bg-[#FAF9F7] p-8 border-t border-[#E5E5E5] hover:bg-[#F0F0F0] transition-all">
            <div className="text-4xl mb-6">📚</div>
            <h2 className="text-xl font-normal mb-2 text-[#4A4A4A] tracking-wide">輕鬆學</h2>
            <p className="text-[#8C8C8C] mb-6">閱讀文章，輕鬆學日文</p>
            <div className="flex items-center text-[#4A4A4A] group-hover:translate-x-2 transition-transform">
              <span className="tracking-wide">開始閱讀</span>
              <span className="ml-2">→</span>
            </div>
          </div>
        </Link>

        {/* 系統學入口 */}
        <Link href="/learn">
          <div className="group bg-[#FAF9F7] p-8 border-t border-[#E5E5E5] hover:bg-[#F0F0F0] transition-all">
            <div className="text-4xl mb-6">🎯</div>
            <h2 className="text-xl font-normal mb-2 text-[#4A4A4A] tracking-wide">系統學</h2>
            <p className="text-[#8C8C8C] mb-6">課程學習，遊戲化進度</p>
            <div className="flex items-center text-[#4A4A4A] group-hover:translate-x-2 transition-transform">
              <span className="tracking-wide">開始學習</span>
              <span className="ml-2">→</span>
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
    <div className="mt-16 max-w-xl mx-auto">
      <div className="bg-[#FAF9F7] p-6 border-t border-[#E5E5E5]">
        <h3 className="text-[#4A4A4A] mb-6 text-center tracking-wide font-normal">你的學習進度</h3>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-light text-[#4A4A4A]">Lv.{user.level}</div>
            <div className="text-xs text-[#8C8C8C] mt-1 tracking-wide">目前等級</div>
          </div>
          <div>
            <div className="text-2xl font-light text-[#4A4A4A]">{user.achievementExp}</div>
            <div className="text-xs text-[#8C8C8C] mt-1 tracking-wide">成就分數</div>
          </div>
          <div>
            <div className="text-2xl font-light text-[#4A4A4A]">{user.completedLessons.length}</div>
            <div className="text-xs text-[#8C8C8C] mt-1 tracking-wide">完成課程</div>
          </div>
        </div>
      </div>
    </div>
  );
}
