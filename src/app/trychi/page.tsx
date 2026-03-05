/**
 * 中文挑戰入口
 * Cocomelon 風格 - 鮮艷明亮、兒童友善
 * 支援後台自定義標題、副標題、圖標
 */

'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import Link from 'next/link';
import { CEMNavbar } from '@/components/cem-navbar';
import { useSearchParams } from 'next/navigation';
import ShouZhuDaiTu from './components/ShouZhuDaiTu';
import WangYangBuLao from './components/WangYangBuLao';
import BaiNian from './components/BaiNian';
import SentenceReorder from './components/SentenceReorder';
import SentenceReorderAdvanced from './components/SentenceReorderAdvanced';

interface TryChiConfig {
  mtrTitle: string;
  mtrSubtitle: string;
  mtrEmoji: string;
  chineseTitle: string;
  chineseSubtitle: string;
  chineseEmoji: string;
}

const defaultConfig: TryChiConfig = {
  mtrTitle: '港鐵小站長',
  mtrSubtitle: '98個港鐵站學中文字',
  mtrEmoji: '🚇',
  chineseTitle: '基礎漢字挑戰',
  chineseSubtitle: '幼稚園目標：500個中文字',
  chineseEmoji: '✍️',
};

// BB 風格圖標組件
const BabyMTRIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="50" r="45" fill="#74B9FF" />
    <circle cx="50" cy="50" r="35" fill="#0984E3" />
    <rect x="25" y="42" width="50" height="16" rx="3" fill="white" />
    <circle cx="35" cy="50" r="5" fill="#0984E3" />
    <circle cx="65" cy="50" r="5" fill="#0984E3" />
    <circle cx="28" cy="35" r="4" fill="#FFE66D" />
    <circle cx="72" cy="35" r="4" fill="#FFE66D" />
    <path d="M40 60 Q50 68 60 60" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

const BabyChineseIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="50" r="45" fill="#FF7675" />
    <circle cx="50" cy="50" r="35" fill="#D63031" />
    <rect x="38" y="25" width="8" height="50" rx="2" fill="white" />
    <rect x="25" y="38" width="50" height="8" rx="2" fill="white" />
    <rect x="30" y="55" width="40" height="6" rx="2" fill="white" />
    <circle cx="28" cy="35" r="4" fill="#FFE66D" />
    <circle cx="72" cy="35" r="4" fill="#FFE66D" />
    <path d="M40 70 Q50 76 60 70" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

// 內部組件使用 useSearchParams
function TryChiContent() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _searchParams = useSearchParams();
  const [config, setConfig] = useState<TryChiConfig>(defaultConfig);
  
  // 使用函數式初始化來處理 URL 參數
  const [activeGame, setActiveGame] = useState<'menu' | 'shouzhudaitu' | 'wangyangbulao' | 'bainian' | 'sentencereorder' | 'sentencereorderadvanced'>(() => {
    // 在初始化時檢查 URL 參數
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lesson = params.get('lesson');
      if (lesson === 'shouzhudaitu') return 'shouzhudaitu';
      if (lesson === 'wangyangbulao') return 'wangyangbulao';
      if (lesson === 'bainian') return 'bainian';
      if (lesson === 'sentencereorder') return 'sentencereorder';
      if (lesson === 'sentencereorderadvanced') return 'sentencereorderadvanced';
    }
    return 'menu';
  });

  // 加載後台設定 - 使用 useCallback 包裝
  const loadConfig = useCallback(() => {
    const saved = localStorage.getItem('trychi-config');
    if (saved) {
      const fullConfig: TryChiConfig = JSON.parse(saved);
      setConfig({
        mtrTitle: fullConfig.mtrTitle || defaultConfig.mtrTitle,
        mtrSubtitle: fullConfig.mtrSubtitle || defaultConfig.mtrSubtitle,
        mtrEmoji: fullConfig.mtrEmoji || defaultConfig.mtrEmoji,
        chineseTitle: fullConfig.chineseTitle || defaultConfig.chineseTitle,
        chineseSubtitle: fullConfig.chineseSubtitle || defaultConfig.chineseSubtitle,
        chineseEmoji: fullConfig.chineseEmoji || defaultConfig.chineseEmoji,
      });
    }
  }, []);

  useEffect(() => {
    // 使用 setTimeout 推遲到下一個事件循環
    const timer = setTimeout(loadConfig, 0);
    return () => clearTimeout(timer);
  }, [loadConfig]);

  // 如果正在玩遊戲，顯示遊戲組件
  if (activeGame === 'shouzhudaitu') {
    return <ShouZhuDaiTu />;
  }
  
  if (activeGame === 'wangyangbulao') {
    return <WangYangBuLao />;
  }
  
  if (activeGame === 'bainian') {
    return <BaiNian />;
  }
  
  if (activeGame === 'sentencereorder') {
    return <SentenceReorder />;
  }
  
  if (activeGame === 'sentencereorderadvanced') {
    return <SentenceReorderAdvanced />;
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      {/* CEM Navbar */}
      <CEMNavbar />
      
      <div className="max-w-md mx-auto p-4">
        {/* 標題 */}
        <div className="text-center mb-8 mt-4">
          <div className="text-6xl mb-4">🇭🇰</div>
          <h1 className="text-4xl font-extrabold text-[#2D3436] mb-3">中文挑戰</h1>
          <p className="text-[#636E72] font-medium text-lg">選擇你想挑戰的項目</p>
        </div>

        {/* 兩個中文挑戰選項 */}
        <div className="space-y-5">
          {/* 港鐵小站長 */}
          <Link href="/studychi">
            <div className="bg-[#74B9FF] rounded-3xl p-6 shadow-[0_8px_0_#0984E3] hover:shadow-[0_4px_0_#0984E3] hover:translate-y-1 transition-all active:scale-95">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  {config.mtrEmoji === '🚇' ? <BabyMTRIcon /> : <span className="text-4xl">{config.mtrEmoji}</span>}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-extrabold text-white mb-1">{config.mtrTitle}</h2>
                  <p className="text-white/90 font-medium">{config.mtrSubtitle}</p>
                </div>
                <span className="text-3xl text-white">→</span>
              </div>
            </div>
          </Link>

          {/* 基礎漢字挑戰 */}
          <Link href="/studychinese">
            <div className="bg-[#FF7675] rounded-3xl p-6 shadow-[0_8px_0_#D63031] hover:shadow-[0_4px_0_#D63031] hover:translate-y-1 transition-all active:scale-95">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  {config.chineseEmoji === '✍️' ? <BabyChineseIcon /> : <span className="text-4xl">{config.chineseEmoji}</span>}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-extrabold text-white mb-1">{config.chineseTitle}</h2>
                  <p className="text-white/90 font-medium">{config.chineseSubtitle}</p>
                </div>
                <span className="text-3xl text-white">→</span>
              </div>
            </div>
          </Link>

          {/* 守株待兔 - 新增 */}
          <button 
            onClick={() => setActiveGame('shouzhudaitu')}
            className="w-full bg-[#FDCB6E] rounded-3xl p-6 shadow-[0_8px_0_#E1B12C] hover:shadow-[0_4px_0_#E1B12C] hover:translate-y-1 transition-all active:scale-95 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg text-4xl">
                🐰🌳
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-extrabold text-white mb-1">守株待兔</h2>
                <p className="text-white/90 font-medium">二年班成語練習，20條選擇題</p>
              </div>
              <span className="text-3xl text-white">→</span>
            </div>
          </button>

          {/* 亡羊補牢 - 新增 */}
          <button 
            onClick={() => setActiveGame('wangyangbulao')}
            className="w-full bg-[#6C5CE7] rounded-3xl p-6 shadow-[0_8px_0_#4834D4] hover:shadow-[0_4px_0_#4834D4] hover:translate-y-1 transition-all active:scale-95 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg text-4xl">
                🐑🔧
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-extrabold text-white mb-1">亡羊補牢</h2>
                <p className="text-white/90 font-medium">二年班成語練習，20條選擇題</p>
              </div>
              <span className="text-3xl text-white">→</span>
            </div>
          </button>

          {/* 到外婆家拜年 - 新增 */}
          <button 
            onClick={() => setActiveGame('bainian')}
            className="w-full bg-[#E74C3C] rounded-3xl p-6 shadow-[0_8px_0_#C0392B] hover:shadow-[0_4px_0_#C0392B] hover:translate-y-1 transition-all active:scale-95 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg text-4xl">
                🧧🏮
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-extrabold text-white mb-1">到外婆家拜年</h2>
                <p className="text-white/90 font-medium">二年班中文練習，20條選擇題</p>
              </div>
              <span className="text-3xl text-white">→</span>
            </div>
          </button>

          {/* 重組句子 - 新增 */}
          <button 
            onClick={() => setActiveGame('sentencereorder')}
            className="w-full bg-[#1ABC9C] rounded-3xl p-6 shadow-[0_8px_0_#16A085] hover:shadow-[0_4px_0_#16A085] hover:translate-y-1 transition-all active:scale-95 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg text-4xl">
                🧩📝
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-extrabold text-white mb-1">重組句子</h2>
                <p className="text-white/90 font-medium">把句子排返正確次序，10組四素句</p>
              </div>
              <span className="text-3xl text-white">→</span>
            </div>
          </button>

          {/* 重組句子進階版 - 新增 */}
          <button 
            onClick={() => setActiveGame('sentencereorderadvanced')}
            className="w-full bg-[#9B59B6] rounded-3xl p-6 shadow-[0_8px_0_#8E44AD] hover:shadow-[0_4px_0_#8E44AD] hover:translate-y-1 transition-all active:scale-95 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg text-4xl">
                🧩⭐
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-extrabold text-white mb-1">重組句子</h2>
                <span className="inline-block bg-white/20 text-white px-2 py-0.5 rounded text-xs font-bold mb-1">進階版</span>
                <p className="text-white/90 font-medium">理解因果關係，10組難題</p>
              </div>
              <span className="text-3xl text-white">→</span>
            </div>
          </button>
        </div>

        {/* 說明 */}
        <div className="mt-8 bg-[#55EFC4] rounded-2xl p-4 text-center shadow-[0_4px_0_#00B894]">
          <p className="text-sm text-[#006266] font-bold">
            💡 挑戰都唔需要登入，直接就可以玩！
          </p>
        </div>
      </div>
    </div>
  );
}

// 主組件用 Suspense 包裹
export default function TryChiPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <div className="text-2xl text-gray-600">載入中...</div>
      </div>
    }>
      <TryChiContent />
    </Suspense>
  );
}
