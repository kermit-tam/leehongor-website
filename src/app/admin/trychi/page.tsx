/**
 * TryChi 中英文挑戰管理後台
 * 管理標題、副標題、圖標
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRequireAdmin } from '@/lib/auth-context';

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

const emojiOptions = ['🚇', '🚉', '🚊', '🚋', '✍️', '✏️', '📝', '📚', '📖', '🎒', '🏫', '🎓', '👶', '🧒', '🇭🇰', '🎯', '🎮', '🎪', '🎨', '🎭', '🔤', '🔡', '🇬🇧', '🇺🇸', 'A', 'B', 'C'];

export default function TryChiAdminPage() {
  const { isLoading } = useRequireAdmin('/');
  const [config, setConfig] = useState<TryChiConfig>(defaultConfig);
  const [saved, setSaved] = useState(false);

  // 加載設定
  useEffect(() => {
    const saved = localStorage.getItem('trychi-config');
    if (saved) {
      setConfig({ ...defaultConfig, ...JSON.parse(saved) });
    }
  }, []);

  // 儲存設定
  const saveConfig = () => {
    localStorage.setItem('trychi-config', JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // 重置為預設
  const resetConfig = () => {
    setConfig(defaultConfig);
    localStorage.setItem('trychi-config', JSON.stringify(defaultConfig));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-32 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 頂部導航 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            ← 返回後台
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">🎨 中英文挑戰內容管理</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetConfig}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            重置預設
          </button>
          <button
            onClick={saveConfig}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            {saved ? '✓ 已儲存' : '💾 儲存'}
          </button>
        </div>
      </div>

      {/* 即時預覽 */}
      <div className="bg-gradient-to-b from-[#FFF8E7] to-[#FFE4B5] rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-700 mb-4">👀 即時預覽</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 預覽卡片 1 */}
          <div className="bg-[#74B9FF] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl">
                {config.mtrEmoji}
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">{config.mtrTitle}</h3>
                <p className="text-white/90 text-xs">{config.mtrSubtitle}</p>
              </div>
            </div>
          </div>
          {/* 預覽卡片 2 */}
          <div className="bg-[#FF7675] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl">
                {config.chineseEmoji}
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">{config.chineseTitle}</h3>
                <p className="text-white/90 text-xs">{config.chineseSubtitle}</p>
              </div>
            </div>
          </div>
          {/* 預覽卡片 3 - 新增英文 */}
          <div className="bg-[#A29BFE] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl">
                {config.englishEmoji}
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">{config.englishTitle}</h3>
                <p className="text-white/90 text-xs">{config.englishSubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 編輯表單 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 港鐵小站長設定 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🚇</span>
            <h2 className="text-lg font-bold text-gray-800">港鐵小站長</h2>
          </div>
          
          <div className="space-y-4">
            {/* 圖標選擇 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">圖標</label>
              <div className="grid grid-cols-8 gap-2">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setConfig({ ...config, mtrEmoji: emoji })}
                    className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                      config.mtrEmoji === emoji
                        ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* 標題 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">標題</label>
              <input
                type="text"
                value={config.mtrTitle}
                onChange={(e) => setConfig({ ...config, mtrTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 副標題 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">副標題</label>
              <input
                type="text"
                value={config.mtrSubtitle}
                onChange={(e) => setConfig({ ...config, mtrSubtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* 基礎漢字挑戰設定 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✍️</span>
            <h2 className="text-lg font-bold text-gray-800">基礎漢字挑戰</h2>
          </div>
          
          <div className="space-y-4">
            {/* 圖標選擇 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">圖標</label>
              <div className="grid grid-cols-8 gap-2">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setConfig({ ...config, chineseEmoji: emoji })}
                    className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                      config.chineseEmoji === emoji
                        ? 'bg-red-500 text-white ring-2 ring-red-300'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* 標題 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">標題</label>
              <input
                type="text"
                value={config.chineseTitle}
                onChange={(e) => setConfig({ ...config, chineseTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* 副標題 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">副標題</label>
              <input
                type="text"
                value={config.chineseSubtitle}
                onChange={(e) => setConfig({ ...config, chineseSubtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* 小朋友講英文設定 - 新增 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔤</span>
            <h2 className="text-lg font-bold text-gray-800">小朋友講英文</h2>
          </div>
          
          <div className="space-y-4">
            {/* 圖標選擇 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">圖標</label>
              <div className="grid grid-cols-8 gap-2">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setConfig({ ...config, englishEmoji: emoji })}
                    className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                      config.englishEmoji === emoji
                        ? 'bg-purple-500 text-white ring-2 ring-purple-300'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* 標題 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">標題</label>
              <input
                type="text"
                value={config.englishTitle}
                onChange={(e) => setConfig({ ...config, englishTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* 副標題 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">副標題</label>
              <input
                type="text"
                value={config.englishSubtitle}
                onChange={(e) => setConfig({ ...config, englishSubtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 說明 */}
      <div className="mt-8 bg-blue-50 rounded-xl p-4">
        <p className="text-sm text-blue-700">
          💡 提示：儲存後，/trychi 頁面會自動更新顯示新內容。設定儲存喺瀏覽器本地。
        </p>
      </div>
    </div>
  );
}
