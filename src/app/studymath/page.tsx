'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import LightningMath from './components/LightningMath';

type GameMode = 'menu' | 'lightning';

export default function StudyMathPage() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/trychi" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">返回</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">⚡ 數學天地</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {gameMode === 'menu' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* 標題 */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="inline-block mb-4"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl shadow-xl">
                    🔢
                  </div>
                </motion.div>
                <h1 className="text-3xl font-black text-gray-800 mb-2">
                  數學天地
                </h1>
                <p className="text-gray-600">
                  趣味數學練習，輕鬆學計數！
                </p>
              </div>

              {/* 閃電加法王 */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setGameMode('lightning')}
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-5xl">
                    ⚡
                  </div>
                  <div className="flex-1 text-white text-left">
                    <h2 className="text-2xl font-bold mb-1">閃電加法王</h2>
                    <p className="text-white/80">15題加法挑戰，答錯要答啱先可以過！</p>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">➕ 加法</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">⏱️ 計時</span>
                    </div>
                  </div>
                  <span className="text-white text-3xl">→</span>
                </div>
              </motion.button>

              {/* 即將推出 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg opacity-60">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-3xl">
                    🍎
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-400">數生果（即將推出）</h2>
                    <p className="text-gray-400 text-sm">數數有幾多個蘋果、橙...</p>
                  </div>
                  <span className="text-gray-300 text-sm">Coming Soon</span>
                </div>
              </div>

              {/* 說明 */}
              <div className="bg-purple-50 rounded-2xl p-6">
                <h3 className="font-bold text-purple-800 mb-3">🎮 點玩？</h3>
                <ul className="space-y-2 text-purple-700">
                  <li>• 用數字鍵盤輸入答案</li>
                  <li>• 答啱先可以過下一題</li>
                  <li>• 挑戰最快完成時間！</li>
                </ul>
              </div>
            </motion.div>
          )}

          {gameMode === 'lightning' && (
            <LightningMath onExit={() => setGameMode('menu')} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
