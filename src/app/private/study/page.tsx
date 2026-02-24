/**
 * 仔仔溫書頁面
 * Kids Study Page
 * 
 * 二年級中文 + 英文溫書系統
 * Flash Card + 測驗
 */

'use client';

import { useState, useEffect } from 'react';
import { useRequireAuth } from '@/lib/auth-context';
import { 
  StudyCard, 
  chineseCards, 
  englishCards, 
  getCategories 
} from './data';
import { FlashCard } from './components/FlashCard';
import { QuizSection } from './components/QuizSection';
import { ProgressBar } from './components/ProgressBar';
import Link from 'next/link';

type StudyMode = 'menu' | 'flashcard' | 'quiz';
type Subject = 'chinese' | 'english';

export default function KidsStudyPage() {
  const { user, isLoading } = useRequireAuth('/');
  const [mode, setMode] = useState<StudyMode>('menu');
  const [subject, setSubject] = useState<Subject>('chinese');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentCards, setCurrentCards] = useState<StudyCard[]>([]);
  
  // 學習進度（暫存於 localStorage）
  const [progress, setProgress] = useState({
    chineseLearned: 0,
    englishLearned: 0,
    quizBestScore: 0,
  });

  // 載入進度
  useEffect(() => {
    const saved = localStorage.getItem('kids-study-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  // 儲存進度
  const saveProgress = (newProgress: typeof progress) => {
    setProgress(newProgress);
    localStorage.setItem('kids-study-progress', JSON.stringify(newProgress));
  };

  // 準備卡片
  const prepareCards = () => {
    let cards = subject === 'chinese' ? chineseCards : englishCards;
    if (selectedCategory !== 'all') {
      cards = cards.filter(c => c.category === selectedCategory);
    }
    // 隨機排序
    cards = [...cards].sort(() => Math.random() - 0.5);
    setCurrentCards(cards);
  };

  // 開始學習
  const startStudy = (newMode: StudyMode, sub: Subject) => {
    setSubject(sub);
    setMode(newMode);
    prepareCards();
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-32 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  // 主選單
  if (mode === 'menu') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* 頂部 */}
        <div className="mb-6">
          <Link href="/private" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center mb-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl">
              🎒
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">仔仔溫書</h1>
              <p className="text-sm text-gray-500">二年級中文 + 英文</p>
            </div>
          </div>
        </div>

        {/* 進度概覽 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">📊 學習進度</h2>
          <div className="space-y-4">
            <ProgressBar 
              label="中文生字" 
              current={progress.chineseLearned} 
              total={chineseCards.length}
              color="bg-red-500"
            />
            <ProgressBar 
              label="英文詞彙" 
              current={progress.englishLearned} 
              total={englishCards.length}
              color="bg-blue-500"
            />
            <div className="flex justify-between text-sm pt-2 border-t">
              <span className="text-gray-500">測驗最高分</span>
              <span className="font-bold text-purple-600">{progress.quizBestScore} 分</span>
            </div>
          </div>
        </div>

        {/* 選擇科目 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* 中文 */}
          <button
            onClick={() => startStudy('flashcard', 'chinese')}
            className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-100 hover:border-red-300 transition-all active:scale-[0.98] text-left"
          >
            <div className="text-4xl mb-3">🇨🇳</div>
            <h3 className="font-bold text-gray-900 text-lg">中文生字</h3>
            <p className="text-sm text-gray-500 mt-1">{chineseCards.length} 個字</p>
            <div className="mt-3 flex gap-2">
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">閃卡</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">筆順</span>
            </div>
          </button>

          {/* 英文 */}
          <button
            onClick={() => startStudy('flashcard', 'english')}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100 hover:border-blue-300 transition-all active:scale-[0.98] text-left"
          >
            <div className="text-4xl mb-3">🇬🇧</div>
            <h3 className="font-bold text-gray-900 text-lg">英文詞彙</h3>
            <p className="text-sm text-gray-500 mt-1">{englishCards.length} 個詞</p>
            <div className="mt-3 flex gap-2">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">閃卡</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">發音</span>
            </div>
          </button>
        </div>

        {/* 測驗模式 */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">📝 測驗時間</h3>
              <p className="text-sm text-gray-500 mt-1">考考你記得幾多？</p>
            </div>
            <button
              onClick={() => startStudy('quiz', subject)}
              className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-600 transition-colors active:scale-95"
            >
              開始測驗
            </button>
          </div>
        </div>

        {/* 分類選擇 */}
        <div className="mt-6">
          <h3 className="font-bold text-gray-900 mb-3">選擇分類</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              全部
            </button>
            {getCategories(subject).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Flash Card 模式
  if (mode === 'flashcard') {
    return (
      <FlashCard
        cards={currentCards}
        subject={subject}
        onComplete={(learnedCount) => {
          const newProgress = {
            ...progress,
            [subject === 'chinese' ? 'chineseLearned' : 'englishLearned']: 
              Math.min(progress[subject === 'chinese' ? 'chineseLearned' : 'englishLearned'] + learnedCount, 
                      subject === 'chinese' ? chineseCards.length : englishCards.length)
          };
          saveProgress(newProgress);
          setMode('menu');
        }}
        onBack={() => setMode('menu')}
      />
    );
  }

  // 測驗模式
  if (mode === 'quiz') {
    return (
      <QuizSection
        cards={currentCards}
        subject={subject}
        onComplete={(score) => {
          if (score > progress.quizBestScore) {
            saveProgress({ ...progress, quizBestScore: score });
          }
          setMode('menu');
        }}
        onBack={() => setMode('menu')}
      />
    );
  }

  return null;
}
