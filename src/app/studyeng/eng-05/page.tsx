'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { lesson5 } from '../data/cvc-lessons';
import FlashCard from '../components/FlashCard';
import ListeningQuiz from '../components/ListeningQuiz';
import MatchingGame from '../components/MatchingGame';
import ParentQuiz from '../components/ParentQuiz';
import PhonicsGuide from '../components/PhonicsGuide';

type GameMode = 'learn' | 'quiz' | 'match' | 'parent' | 'phonics';

export default function Lesson5Page() {
  const [gameMode, setGameMode] = useState<GameMode>('learn');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleNext = () => {
    if (currentWordIndex < lesson5.words.length - 1) {
      setCurrentWordIndex(i => i + 1);
    } else {
      setCurrentWordIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(i => i - 1);
    } else {
      setCurrentWordIndex(lesson5.words.length - 1);
    }
  };

  const renderGameMode = () => {
    switch (gameMode) {
      case 'learn':
        return (
          <FlashCard
            word={lesson5.words[currentWordIndex]}
            onNext={handleNext}
            onPrev={handlePrev}
            currentIndex={currentWordIndex}
            totalCount={lesson5.words.length}
          />
        );
      case 'quiz':
        return <ListeningQuiz words={lesson5.words} onComplete={(s, t) => console.log('Score:', s, t)} />;
      case 'match':
        return <MatchingGame words={lesson5.words} />;
      case 'parent':
        return (
          <ParentQuiz
            words={lesson5.words}
            onComplete={(s, t) => console.log('Parent quiz:', s, t)}
            onExit={() => setGameMode('learn')}
          />
        );
      case 'phonics':
        return <PhonicsGuide onBack={() => setGameMode('learn')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/studyeng" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">返回</span>
          </Link>
          <div className="text-center">
            <h1 className="font-bold text-gray-800">{lesson5.title}</h1>
            <p className="text-xs text-gray-500">{lesson5.words.length} 個單字</p>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'learn', label: '📚 學習', color: 'blue' },
            { id: 'parent', label: '👨‍👩‍👧‍👦 家長測驗', color: 'cyan' },
            { id: 'quiz', label: '🎧 聽力', color: 'sky' },
            { id: 'match', label: '🎮 配對', color: 'indigo' },
            { id: 'phonics', label: '📖 拼音教學', color: 'violet' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setGameMode(mode.id as GameMode);
                setCurrentWordIndex(0);
              }}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                gameMode === mode.id
                  ? `bg-${mode.color}-500 text-white shadow-lg`
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={gameMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/50 rounded-3xl p-4 shadow-lg"
          >
            {renderGameMode()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
