'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CEMNavbar } from '@/components/cem-navbar';
import LightningMath from './components/LightningMath';
import FruitCounting from './components/FruitCounting';
import KurumiMath from './components/KurumiMath';
import DogMultiplication from './components/DogMultiplication';
import LightningSubtraction from './components/LightningSubtraction';
import BabySubtraction from './components/BabySubtraction';

type GameMode = 'menu' | 'lightning' | 'fruit' | 'kurumi' | 'dogmultiply' | 'lightningsubtract' | 'babysubtract';

export default function TryMathPage() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* CEM Navbar */}
      <CEMNavbar />

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
                  數學挑戰
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

              {/* 數生果 */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setGameMode('fruit')}
                className="w-full bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-5xl">
                    🍎
                  </div>
                  <div className="flex-1 text-white text-left">
                    <h2 className="text-2xl font-bold mb-1">數生果</h2>
                    <p className="text-white/80">數數有幾多個生果，適合幼稚園小朋友！</p>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🍎 數數</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">👶 幼稚園</span>
                    </div>
                  </div>
                  <span className="text-white text-3xl">→</span>
                </div>
              </motion.button>

              {/* 🌰 Kurumi 加法王 */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setGameMode('kurumi')}
                className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-5xl">
                    🌰
                  </div>
                  <div className="flex-1 text-white text-left">
                    <h2 className="text-2xl font-bold mb-1">Kurumi 加法王</h2>
                    <p className="text-white/80">小松鼠陪你學加法，1+1到5+5！</p>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🌰 幼稚園</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🐿️ 可愛</span>
                    </div>
                  </div>
                  <span className="text-white text-3xl">→</span>
                </div>
              </motion.button>

              {/* 🐕 狗狗乘數表 */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setGameMode('dogmultiply')}
                className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-5xl">
                    🐕
                  </div>
                  <div className="flex-1 text-white text-left">
                    <h2 className="text-2xl font-bold mb-1">狗狗乘數表</h2>
                    <p className="text-white/80">15題乘數挑戰，2至9乘法！</p>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">✖️ 乘法</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🐕 小學</span>
                    </div>
                  </div>
                  <span className="text-white text-3xl">→</span>
                </div>
              </motion.button>

              {/* ⚡ 閃電減法王 */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setGameMode('lightningsubtract')}
                className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-5xl">
                    ⚡
                  </div>
                  <div className="flex-1 text-white text-left">
                    <h2 className="text-2xl font-bold mb-1">閃電減法王</h2>
                    <p className="text-white/80">15題減法大挑戰，2-18減1-9！</p>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">➖ 減法</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">⏱️ 計時</span>
                    </div>
                  </div>
                  <span className="text-white text-3xl">→</span>
                </div>
              </motion.button>

              {/* 👶 減法BB仔 */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setGameMode('babysubtract')}
                className="w-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-5xl">
                    👶
                  </div>
                  <div className="flex-1 text-white text-left">
                    <h2 className="text-2xl font-bold mb-1">減法BB仔</h2>
                    <p className="text-white/80">簡單減法入門，2-10減1-9！</p>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">➖ 減法</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">👶 幼稚園</span>
                    </div>
                  </div>
                  <span className="text-white text-3xl">→</span>
                </div>
              </motion.button>

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
            <LightningMath />
          )}

          {gameMode === 'fruit' && (
            <FruitCounting />
          )}

          {gameMode === 'kurumi' && (
            <KurumiMath />
          )}

          {gameMode === 'dogmultiply' && (
            <DogMultiplication />
          )}

          {gameMode === 'lightningsubtract' && (
            <LightningSubtraction />
          )}

          {gameMode === 'babysubtract' && (
            <BabySubtraction />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
