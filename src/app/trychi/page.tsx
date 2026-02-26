/**
 * 中英文挑戰入口
 * Cocomelon 風格 - 鮮艷明亮、兒童友善
 * 支援後台自定義標題、副標題、圖標
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TryChiConfig {
  mtrTitle: string;
  mtrSubtitle: string;
  mtrEmoji: string;
  chineseTitle: string;
  chineseSubtitle: string;
  chineseEmoji: string;
  englishTitle: string;
  englishSubtitle: string;
  englishEmoji: string;
}

const defaultConfig: TryChiConfig = {
  mtrTitle: '港鐵小站長',
  mtrSubtitle: '98個港鐵站學中文字',
  mtrEmoji: '🚇',
  chineseTitle: '基礎漢字挑戰',
  chineseSubtitle: '幼稚園目標：500個中文字',
  chineseEmoji: '✍️',
  englishTitle: '小朋友講英文',
  englishSubtitle: 'CVC拼音單字學習',
  englishEmoji: '🔤',
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

const BabyEnglishIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="50" r="45" fill="#A29BFE" />
    <circle cx="50" cy="50" r="35" fill="#6C5CE7" />
    <text x="50" y="62" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold" fontFamily="Arial">ABC</text>
    <circle cx="28" cy="35" r="4" fill="#FFE66D" />
    <circle cx="72" cy="35" r="4" fill="#FFE66D" />
    <path d="M40 70 Q50 76 60 70" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

export default function TryChiPage() {
  const [config, setConfig] = useState<TryChiConfig>(defaultConfig);

  // 加載後台設定
  useEffect(() => {
    const saved = localStorage.getItem('trychi-config');
    if (saved) {
      setConfig({ ...defaultConfig, ...JSON.parse(saved) });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-4">
      <div className="max-w-md mx-auto">
        {/* 返回按鈕 */}
        <Link href="/" className="inline-flex items-center text-[#FF8C42] hover:text-[#E67E3E] mb-6 mt-4 font-bold">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          返回主頁
        </Link>

        {/* 標題 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🇭🇰</div>
          <h1 className="text-4xl font-extrabold text-[#2D3436] mb-3">中英文挑戰</h1>
          <p className="text-[#636E72] font-medium text-lg">選擇你想挑戰的項目</p>
        </div>

        {/* 三個挑戰選項 */}
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

          {/* 小朋友講英文 - 新增 */}
          <Link href="/studyeng">
            <div className="bg-[#A29BFE] rounded-3xl p-6 shadow-[0_8px_0_#6C5CE7] hover:shadow-[0_4px_0_#6C5CE7] hover:translate-y-1 transition-all active:scale-95">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  {config.englishEmoji === '🔤' ? <BabyEnglishIcon /> : <span className="text-4xl">{config.englishEmoji}</span>}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-extrabold text-white mb-1">{config.englishTitle}</h2>
                  <p className="text-white/90 font-medium">{config.englishSubtitle}</p>
                </div>
                <span className="text-3xl text-white">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* 說明 */}
        <div className="mt-8 bg-[#55EFC4] rounded-2xl p-4 text-center shadow-[0_4px_0_#00B894]">
          <p className="text-sm text-[#006266] font-bold">
            💡 三個挑戰都唔需要登入，直接就可以玩！
          </p>
        </div>
      </div>
    </div>
  );
}
