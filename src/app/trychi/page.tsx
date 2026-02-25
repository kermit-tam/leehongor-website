/**
 * 中文挑戰入口
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
}

const defaultConfig: TryChiConfig = {
  mtrTitle: '港鐵小站長',
  mtrSubtitle: '98個港鐵站學中文字',
  mtrEmoji: '🚇',
  chineseTitle: '基礎漢字挑戰',
  chineseSubtitle: '幼稚園目標：500個中文字',
  chineseEmoji: '✍️',
};

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
          <h1 className="text-4xl font-extrabold text-[#2D3436] mb-3">中文挑戰</h1>
          <p className="text-[#636E72] font-medium text-lg">選擇你想挑戰的項目</p>
        </div>

        {/* 兩個挑戰選項 */}
        <div className="space-y-5">
          {/* 港鐵小站長 */}
          <Link href="/studychi">
            <div className="bg-[#74B9FF] rounded-3xl p-6 shadow-[0_8px_0_#0984E3] hover:shadow-[0_4px_0_#0984E3] hover:translate-y-1 transition-all active:scale-95">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                  {config.mtrEmoji}
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
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                  {config.chineseEmoji}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-extrabold text-white mb-1">{config.chineseTitle}</h2>
                  <p className="text-white/90 font-medium">{config.chineseSubtitle}</p>
                </div>
                <span className="text-3xl text-white">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* 說明 */}
        <div className="mt-8 bg-[#55EFC4] rounded-2xl p-4 text-center shadow-[0_4px_0_#00B894]">
          <p className="text-sm text-[#006266] font-bold">
            💡 兩個挑戰都唔需要登入，直接就可以玩！
          </p>
        </div>
      </div>
    </div>
  );
}
