'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { p2Lesson, p2Vocabulary, p2Verbs, p2Sentences } from './data/p2-lesson';
import VocabCard from './components/VocabCard';
import SpellingGame from './components/SpellingGame';
import ListeningSpelling from './components/ListeningSpelling';
import VerbPractice from './components/VerbPractice';
import SentenceBuilder from './components/SentenceBuilder';

type GameMode = 'menu' | 'vocab' | 'spelling' | 'listening' | 'verb' | 'sentence';

export default function P2Page() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < p2Vocabulary.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    } else {
      setCurrentIndex(p2Vocabulary.length - 1);
    }
  };

  const renderGameMode = () => {
    switch (gameMode) {
      case 'menu':
        return (
          <div className="space-y-4">
            {/* 生字閃卡 */}
            <button
              onClick={() => setGameMode('vocab')}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
            >
              <span className="text-4xl">📚</span>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">生字閃卡</h2>
                <p className="text-gray-500 text-sm">學習 {p2Vocabulary.length} 個生字</p>
              </div>
            </button>

            {/* 拼字遊戲 */}
            <button
              onClick={() => setGameMode('spelling')}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
            >
              <span className="text-4xl">🧩</span>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">拼字遊戲</h2>
                <p className="text-gray-500 text-sm">串字練習（考試必考！）</p>
              </div>
            </button>

            {/* 聽寫模式 */}
            <button
              onClick={() => setGameMode('listening')}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
            >
              <span className="text-4xl">🎧</span>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">聽寫模式</h2>
                <p className="text-gray-500 text-sm">聽住串字</p>
              </div>
            </button>

            {/* 動詞變化 */}
            <button
              onClick={() => setGameMode('verb')}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
            >
              <span className="text-4xl">📝</span>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">動詞變化</h2>
                <p className="text-gray-500 text-sm">第三人稱 +s / +es / +ies</p>
              </div>
            </button>

            {/* 重組句子 */}
            <button
              onClick={() => setGameMode('sentence')}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
            >
              <span className="text-4xl">🧩</span>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">重組句子</h2>
                <p className="text-gray-500 text-sm">排列字詞組成正確句子</p>
              </div>
            </button>

            {/* 課程資訊 */}
            <div className="bg-blue-50 rounded-2xl p-6 mt-8">
              <h3 className="font-bold text-blue-800 mb-3">📋 課程內容</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-xl p-3">
                  <p className="text-2xl font-bold text-blue-500">{p2Lesson.vocabCount}</p>
                  <p className="text-gray-500 text-sm">生字</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-2xl font-bold text-purple-500">{p2Lesson.sentenceCount}</p>
                  <p className="text-gray-500 text-sm">句型</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-2xl font-bold text-green-500">{p2Lesson.verbCount}</p>
                  <p className="text-gray-500 text-sm">動詞</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'vocab':
        return (
          <VocabCard
            vocab={p2Vocabulary[currentIndex]}
            onNext={handleNext}
            onPrev={handlePrev}
            currentIndex={currentIndex}
            totalCount={p2Vocabulary.length}
          />
        );

      case 'spelling':
        return (
          <SpellingGame
            words={p2Vocabulary}
            onComplete={(s, t) => console.log('Spelling:', s, t)}
            onExit={() => setGameMode('menu')}
          />
        );

      case 'listening':
        return (
          <ListeningSpelling
            words={p2Vocabulary}
            onComplete={(s, t) => console.log('Listening:', s, t)}
            onExit={() => setGameMode('menu')}
          />
        );

      case 'verb':
        return (
          <VerbPractice
            verbs={p2Verbs}
            onComplete={(s, t) => console.log('Verbs:', s, t)}
            onExit={() => setGameMode('menu')}
          />
        );

      case 'sentence':
        return (
          <SentenceBuilder
            sentences={p2Sentences}
            onComplete={(s, t) => console.log('Sentences:', s, t)}
            onExit={() => setGameMode('menu')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/studyeng" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">返回</span>
          </Link>
          <div className="text-center">
            <h1 className="font-bold text-gray-800">{gameMode === 'menu' ? p2Lesson.title : p2Lesson.titleZh}</h1>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* 模式按鈕（非 menu 時顯示） */}
        {gameMode !== 'menu' && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'menu', label: '🏠 目錄' },
              { id: 'vocab', label: '📚 生字' },
              { id: 'spelling', label: '🧩 拼字' },
              { id: 'listening', label: '🎧 聽寫' },
              { id: 'verb', label: '📝 動詞' },
              { id: 'sentence', label: '🧩 句子' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setGameMode(mode.id as GameMode);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  gameMode === mode.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        )}

        {/* 遊戲區域 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={gameMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={gameMode !== 'menu' ? 'bg-white/50 rounded-3xl p-4 shadow-lg' : ''}
          >
            {renderGameMode()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
