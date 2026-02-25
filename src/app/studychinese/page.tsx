/**
 * 仔仔溫書頁面 - 公開版本
 * Kids Study Page (Public)
 * 
 * 課程結構：
 * - 中文：基礎十字主題，分第一課、第二課
 * - 英文：獨立課程
 */

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { StudyCard, Lesson, chineseTopics, englishLessons, getAllLessons } from './data';
import { chineseLesson01Cards } from './data/chinese-lesson-01';
import { chineseLesson02Cards } from './data/chinese-lesson-02';
import { chineseLesson03Cards } from './data/chinese-lesson-03';
import { englishCards } from './data';
import { FlashCard } from './components/FlashCard';
import { ListeningQuiz } from './components/ListeningQuiz';
import { SpeakingQuiz } from './components/SpeakingQuiz';
import { PictureMatch } from './components/PictureMatch';
import { ProgressBar } from './components/ProgressBar';
import Link from 'next/link';

type StudyMode = 'menu' | 'flashcard' | 'listening-quiz' | 'speaking-quiz' | 'picture-match';
type Subject = 'chinese' | 'english';

// 本地函數（避免導入問題）
const getChineseCards = (lessonId?: string): StudyCard[] => {
  switch (lessonId) {
    case 'ch-01': return chineseLesson01Cards;
    case 'ch-02': return chineseLesson02Cards;
    case 'ch-03': return chineseLesson03Cards;
    default: return [...chineseLesson01Cards, ...chineseLesson02Cards, ...chineseLesson03Cards];
  }
};

const getEnglishCards = (lessonId?: string): StudyCard[] => {
  if (!lessonId) return englishCards;
  return englishCards.filter(c => c.lessonId === lessonId);
};

function KidsStudyContent() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<StudyMode>('menu');
  const [subject, setSubject] = useState<Subject>('chinese');
  const [selectedLesson, setSelectedLesson] = useState<string>('ch-01');
  const [currentCards, setCurrentCards] = useState<StudyCard[]>([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  
  // 從 URL 參數讀取課程
  useEffect(() => {
    const lessonId = searchParams.get('lesson');
    const sub = searchParams.get('subject') as Subject | null;
    
    if (lessonId) {
      setSelectedLesson(lessonId);
    }
  }, [searchParams]);
  
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('kids-study-progress-public');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (lessonId: string, learnedCount: number) => {
    const newProgress = { ...progress, [lessonId]: learnedCount };
    setProgress(newProgress);
    localStorage.setItem('kids-study-progress-public', JSON.stringify(newProgress));
  };

  const loadLessonCards = async (lessonId: string, sub: Subject) => {
    setIsLoadingCards(true);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    let cards: StudyCard[] = [];
    if (sub === 'chinese') {
      cards = getChineseCards(lessonId);
    } else {
      cards = getEnglishCards(lessonId);
    }
    
    cards = [...cards].sort(() => Math.random() - 0.5);
    setCurrentCards(cards);
    setIsLoadingCards(false);
  };

  const startStudy = async (newMode: StudyMode, sub: Subject, lessonId: string) => {
    setSubject(sub);
    setSelectedLesson(lessonId);
    setMode(newMode);
    await loadLessonCards(lessonId, sub);
  };

  const getTotalProgress = (sub: Subject) => {
    const lessons = sub === 'chinese' ? getAllLessons('chinese') : englishLessons;
    const totalCards = lessons.reduce((sum, l) => sum + l.cardCount, 0);
    const totalLearned = lessons.reduce((sum, l) => sum + (progress[l.id] || 0), 0);
    return { totalCards, totalLearned };
  };

  if (mode === 'flashcard') {
    if (isLoadingCards) {
      return (
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p>載入課程中...</p>
        </div>
      );
    }
    return (
      <FlashCard
        cards={currentCards}
        subject={subject}
        onComplete={(learnedCount) => {
          saveProgress(selectedLesson, learnedCount);
          setMode('menu');
        }}
        onBack={() => setMode('menu')}
      />
    );
  }

  if (mode === 'listening-quiz') {
    if (isLoadingCards) {
      return (
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p>準備聆聽測驗中...</p>
        </div>
      );
    }
    return (
      <ListeningQuiz
        cards={currentCards}
        onComplete={() => setMode('menu')}
        onBack={() => setMode('menu')}
      />
    );
  }

  if (mode === 'speaking-quiz') {
    if (isLoadingCards) {
      return (
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p>準備讀句子測驗中...</p>
        </div>
      );
    }
    return (
      <SpeakingQuiz
        cards={currentCards}
        onComplete={() => setMode('menu')}
        onBack={() => setMode('menu')}
      />
    );
  }

  if (mode === 'picture-match') {
    if (isLoadingCards) {
      return (
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p>準備圖畫配對中...</p>
        </div>
      );
    }
    return (
      <PictureMatch
        cards={currentCards}
        lessonId={selectedLesson}
        onComplete={() => setMode('menu')}
        onBack={() => setMode('menu')}
      />
    );
  }

  const chineseProgress = getTotalProgress('chinese');
  const englishProgress = getTotalProgress('english');

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首頁
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

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">📊 學習進度</h2>
        <div className="space-y-4">
          <ProgressBar 
            label="中文" 
            current={chineseProgress.totalLearned} 
            total={chineseProgress.totalCards}
            color="bg-red-500"
          />
          <ProgressBar 
            label="英文" 
            current={englishProgress.totalLearned} 
            total={englishProgress.totalCards}
            color="bg-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setSubject('chinese')}
          className={`flex-1 py-3 rounded-xl font-bold text-center transition-colors ${
            subject === 'chinese' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          🇨🇳 中文
        </button>
        <button
          onClick={() => setSubject('english')}
          className={`flex-1 py-3 rounded-xl font-bold text-center transition-colors ${
            subject === 'english' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          🇬🇧 英文
        </button>
      </div>

      <div className="space-y-3 mb-6">
        <h3 className="font-bold text-gray-900">
          {subject === 'chinese' ? '選擇課程' : 'Choose Lesson'}
        </h3>
        
        {(subject === 'chinese' ? getAllLessons('chinese') : englishLessons).map((lesson) => {
          
          const lessonProgress = progress[lesson.id] || 0;
          
          return (
            <div 
              key={lesson.id}
              className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all ${
                selectedLesson === lesson.id ? 'border-indigo-300 bg-indigo-50' : 'border-gray-100 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {lesson.id === 'ch-01' && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">第一課</span>}
                  {lesson.id === 'ch-02' && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">第二課</span>}
                  {lesson.id === 'ch-03' && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">第三課</span>}
                  <h4 className="font-bold text-gray-900">{lesson.title}</h4>
                </div>
                <span className="text-sm text-gray-500">{lesson.cardCount} 字</span>
              </div>
              
              <p className="text-sm text-gray-500 mb-3">{lesson.description}</p>
              
              <div className="h-2 bg-gray-200 rounded-full mb-3 overflow-hidden">
                <div className="h-full bg-green-500 transition-all"
                  style={{ width: `${Math.min((lessonProgress / lesson.cardCount) * 100, 100)}%` }} />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => startStudy('flashcard', subject, lesson.id)}
                  className="py-2 rounded-lg bg-indigo-100 text-indigo-700 font-medium text-sm hover:bg-indigo-200"
                >
                  📖 溫書
                </button>
                <button
                  onClick={() => startStudy('listening-quiz', subject, lesson.id)}
                  className="py-2 rounded-lg bg-purple-100 text-purple-700 font-medium text-sm hover:bg-purple-200"
                >
                  🎧 聆聽
                </button>
                <button
                  onClick={() => startStudy('speaking-quiz', subject, lesson.id)}
                  className="py-2 rounded-lg bg-green-100 text-green-700 font-medium text-sm hover:bg-green-200"
                >
                  🎤 讀句子
                </button>
                {/* 第三課開始才顯示圖畫配對 */}
                {(lesson.id === 'ch-03' || lesson.id > 'ch-03') && (
                  <button
                    onClick={() => startStudy('picture-match', subject, lesson.id)}
                    className="py-2 rounded-lg bg-orange-100 text-orange-700 font-medium text-sm hover:bg-orange-200"
                  >
                    🖼️ 圖畫配對
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700">
        <p className="font-medium mb-2">💡 功能說明：</p>
        <ul className="space-y-1 ml-4 list-disc">
          <li>第一、二課：基礎認字（山、水、人、牛等具體名詞）</li>
          <li>第三課開始：新增圖畫配對遊戲，認識形容詞+名詞組合</li>
          <li>每個生字有 3 個情景例句（口語 + 書面語）</li>
          <li>可按 🔊 聽廣東話 / 普通話 / 英文發音</li>
          <li>測驗模式考考記得幾多</li>
        </ul>
      </div>
    </div>
  );
}

// 包裝組件，處理 Suspense
export default function KidsStudyPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p>載入中...</p>
      </div>
    }>
      <KidsStudyContent />
    </Suspense>
  );
}
