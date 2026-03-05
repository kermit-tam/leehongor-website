'use client';

import { useState, useEffect, useCallback } from 'react';
import { StudyCard } from '../data/types';

interface ListeningQuizProps {
  cards: StudyCard[];
  onComplete: () => void;
  onBack: () => void;
}

type QuizState = 'intro' | 'playing' | 'answered' | 'finished';

export function ListeningQuiz({ cards, onComplete, onBack }: ListeningQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<StudyCard[]>(() => {
    return [...cards].sort(() => Math.random() - 0.5).slice(0, Math.min(10, cards.length));
  });
  const [options, setOptions] = useState<StudyCard[]>([]);
  const [language, setLanguage] = useState<'cantonese' | 'mandarin'>('cantonese');

  // cards 變化時由於已經使用函數式初始化，不需要在這裡再次設置

  // 生成選項（3個錯誤選項 + 1個正確答案）
  useEffect(() => {
    if (shuffledCards.length === 0) return;
    
    const currentCard = shuffledCards[currentIndex];
    const otherCards = cards.filter(c => c.id !== currentCard.id);
    const wrongOptions = otherCards.sort(() => Math.random() - 0.5).slice(0, 3);
    const allOptions = [currentCard, ...wrongOptions].sort(() => Math.random() - 0.5);
    // 使用 setTimeout 避免同步 setState
    const timer = setTimeout(() => setOptions(allOptions), 0);
    return () => clearTimeout(timer);
  }, [shuffledCards, currentIndex, cards]);

  // 播放讀音
  const playAudio = useCallback((card: StudyCard, lang: 'cantonese' | 'mandarin') => {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(card.character);
    utterance.lang = lang === 'cantonese' ? 'zh-HK' : 'zh-CN';
    utterance.rate = 0.8;
    
    window.speechSynthesis.speak(utterance);
  }, []);

  // 開始播放
  const startPlaying = () => {
    setQuizState('playing');
    if (shuffledCards[currentIndex]) {
      playAudio(shuffledCards[currentIndex], language);
    }
  };

  // 重新播放
  const replay = () => {
    if (shuffledCards[currentIndex]) {
      playAudio(shuffledCards[currentIndex], language);
    }
  };

  // 選擇答案
  const selectAnswer = (cardId: string) => {
    if (quizState !== 'playing') return;
    
    setSelectedAnswer(cardId);
    setQuizState('answered');
    
    if (cardId === shuffledCards[currentIndex].id) {
      setScore(s => s + 10);
    }
  };

  // 下一題
  const nextQuestion = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setQuizState('playing');
      setTimeout(() => {
        playAudio(shuffledCards[currentIndex + 1], language);
      }, 300);
    } else {
      setQuizState('finished');
    }
  };

  // 重新開始
  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizState('intro');
    setShuffledCards(() => [...cards].sort(() => Math.random() - 0.5).slice(0, Math.min(10, cards.length)));
  };

  if (shuffledCards.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p>準備中...</p>
      </div>
    );
  }

  // 開始畫面
  if (quizState === 'intro') {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700 mb-6 flex items-center">
          ← 返回
        </button>
        
        <div className="text-center">
          <div className="text-6xl mb-4">🎧</div>
          <h2 className="text-2xl font-bold mb-2">聆聽測驗</h2>
          <p className="text-gray-600 mb-6">聽讀音，揀正確嘅字</p>
          
          <div className="bg-white rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500 mb-3">揀語言：</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setLanguage('cantonese')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  language === 'cantonese' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                🇭🇰 廣東話
              </button>
              <button
                onClick={() => setLanguage('mandarin')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  language === 'mandarin' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                🇨🇳 普通話
              </button>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-6">
            共 {shuffledCards.length} 題 · 每題 10 分
          </p>
          
          <button
            onClick={startPlaying}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            🎵 開始聆聽測驗
          </button>
        </div>
      </div>
    );
  }

  // 完成畫面
  if (quizState === 'finished') {
    const percentage = Math.round((score / (shuffledCards.length * 10)) * 100);
    
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">
          {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
        </div>
        <h2 className="text-2xl font-bold mb-2">測驗完成！</h2>
        <p className="text-4xl font-bold text-indigo-600 mb-2">{score} 分</p>
        <p className="text-gray-500 mb-6">
          {percentage >= 80 ? '太棒了！' : percentage >= 60 ? '做得不錯！' : '繼續加油！'}
        </p>
        
        <div className="space-y-3">
          <button
            onClick={restart}
            className="w-full py-3 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600"
          >
            🔄 再試一次
          </button>
          <button
            onClick={onComplete}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200"
          >
            ← 返回主頁
          </button>
        </div>
      </div>
    );
  }

  const currentCard = shuffledCards[currentIndex];

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* 進度條 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>第 {currentIndex + 1} / {shuffledCards.length} 題</span>
          <span>{score} 分</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all"
            style={{ width: `${((currentIndex + 1) / shuffledCards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 播放區域 */}
      <div className="text-center mb-8">
        <button
          onClick={replay}
          disabled={quizState === 'answered'}
          className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl mb-4 mx-auto transition-all ${
            quizState === 'answered' 
              ? 'bg-gray-100 text-gray-400' 
              : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 animate-pulse'
          }`}
        >
          🔊
        </button>
        <p className="text-gray-500 text-sm">
          {quizState === 'playing' ? '聽咗未？揀下面嘅字' : '已作答'}
        </p>
      </div>

      {/* 選項 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {options.map((card) => {
          const isSelected = selectedAnswer === card.id;
          const isAnswer = card.id === currentCard.id;
          
          let buttonClass = 'bg-white border-2 border-gray-200 hover:border-indigo-300';
          if (quizState === 'answered') {
            if (isAnswer) {
              buttonClass = 'bg-green-100 border-2 border-green-500';
            } else if (isSelected && !isAnswer) {
              buttonClass = 'bg-red-100 border-2 border-red-500';
            } else {
              buttonClass = 'bg-gray-50 border-2 border-gray-200 opacity-50';
            }
          }
          
          return (
            <button
              key={card.id}
              onClick={() => selectAnswer(card.id)}
              disabled={quizState === 'answered'}
              className={`py-6 rounded-xl text-4xl font-bold transition-all ${buttonClass}`}
            >
              {card.character}
              {quizState === 'answered' && isAnswer && (
                <div className="text-sm text-green-600 mt-1">✓ 正確</div>
              )}
              {quizState === 'answered' && isSelected && !isAnswer && (
                <div className="text-sm text-red-600 mt-1">✗ 錯誤</div>
              )}
            </button>
          );
        })}
      </div>

      {/* 下一題按鈕 */}
      {quizState === 'answered' && (
        <button
          onClick={nextQuestion}
          className="w-full py-4 bg-indigo-500 text-white rounded-xl font-bold text-lg hover:bg-indigo-600"
        >
          {currentIndex < shuffledCards.length - 1 ? '下一題 →' : '完成測驗 ✓'}
        </button>
      )}

      {/* 退出 */}
      <button
        onClick={onBack}
        className="w-full py-3 text-gray-500 hover:text-gray-700 mt-4"
      >
        退出測驗
      </button>
    </div>
  );
}
