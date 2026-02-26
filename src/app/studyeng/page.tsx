'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { allLessons } from './data/cvc-lessons';

const vowelColors: Record<string, { bg: string; text: string; accent: string }> = {
  '01': { bg: 'from-red-400 via-pink-500 to-rose-500', text: 'text-red-600', accent: 'bg-red-500' },
  '02': { bg: 'from-green-400 via-emerald-500 to-teal-500', text: 'text-green-600', accent: 'bg-green-500' },
  '03': { bg: 'from-purple-400 via-violet-500 to-indigo-500', text: 'text-purple-600', accent: 'bg-purple-500' },
  '04': { bg: 'from-orange-400 via-amber-500 to-yellow-500', text: 'text-orange-600', accent: 'bg-orange-500' },
  '05': { bg: 'from-blue-400 via-cyan-500 to-sky-500', text: 'text-blue-600', accent: 'bg-blue-500' },
};

const vowelEmojis: Record<string, string> = {
  '01': '🍎',
  '02': '🥚',
  '03': '🍦',
  '04': '🍊',
  '05': '🌂',
};

export default function StudyEngPage() {
  const [hoveredLesson, setHoveredLesson] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/trychi" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">返回</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">小朋友講英文</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-5xl shadow-xl">
              🎓
            </div>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
            英文拼音課程
          </h1>
          <p className="text-gray-600 text-lg">
            學習 CVC 單字，輕鬆掌握英文發音！
          </p>
        </div>

        {/* Lesson Cards */}
        <div className="grid gap-6">
          {allLessons.map((lesson, index) => {
            const colors = vowelColors[lesson.lessonNum.toString().padStart(2, '0')];
            const emoji = vowelEmojis[lesson.lessonNum.toString().padStart(2, '0')];
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/studyeng/${lesson.id}`}>
                  <div
                    className={`relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-r ${colors.bg}`}
                    onMouseEnter={() => setHoveredLesson(lesson.id)}
                    onMouseLeave={() => setHoveredLesson(null)}
                  >
                    <div className="p-6 md:p-8 flex items-center gap-6">
                      {/* 課程編號圖標 */}
                      <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex flex-col items-center justify-center text-white">
                        <span className="text-3xl">{emoji}</span>
                        <span className="text-xs font-bold mt-1">
                          {lesson.titleEn.split(': ')[1]?.split(' ')[0] || 'A'}
                        </span>
                      </div>

                      {/* 課程資訊 */}
                      <div className="flex-1 text-white">
                        <h2 className="text-xl md:text-2xl font-bold mb-1">
                          {lesson.title}
                        </h2>
                        <p className="text-white/80 text-sm mb-2">
                          {lesson.titleEn}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="bg-white/20 px-3 py-1 rounded-full">
                            📚 {lesson.words.length} 個單字
                          </span>
                          <span className="bg-white/20 px-3 py-1 rounded-full">
                            🎮 3 種玩法
                          </span>
                        </div>
                      </div>

                      {/* 箭頭 */}
                      <motion.div
                        animate={{ x: hoveredLesson === lesson.id ? 5 : 0 }}
                        className="text-white text-3xl"
                      >
                        →
                      </motion.div>
                    </div>

                    {/* 裝飾元素 */}
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10" />
                    <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-white/10" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* 說明區 */}
        <div className="mt-12 bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📖 什麼是 CVC 單字？</h3>
          <p className="text-gray-600 mb-4">
            CVC 是指 <strong>C</strong>onsonant（輔音）- <strong>V</strong>owel（元音）- <strong>C</strong>onsonant（輔音）
            的單字格式，例如：
          </p>
          <div className="flex flex-wrap gap-3">
            {['CAT', 'DOG', 'PIG', 'BED', 'SUN'].map((word) => (
              <span
                key={word}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-bold"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
