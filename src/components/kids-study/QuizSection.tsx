/**
 * 測驗組件（修復版）
 * 
 * 中文測驗：顯示生字 → 揀中文意思
 * 英文測驗：顯示意思 → 揀英文單詞
 */

'use client';

import { useState, useEffect } from 'react';
import { StudyCard } from './types';

interface QuizSectionProps {
  cards: StudyCard[];
  subject: 'chinese' | 'english';
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface QuizQuestion {
  card: StudyCard;
  options: string[];
  correctIndex: number;
  questionText: string;
  questionSubtext?: string;
}

function generateQuestions(cards: StudyCard[], subject: 'chinese' | 'english'): QuizQuestion[] {
  const shuffled = [...cards].sort(() => Math.random() - 0.5).slice(0, Math.min(10, cards.length));
  
  return shuffled.map(card => {
    const otherCards = cards.filter(c => c.id !== card.id);
    
    if (subject === 'chinese') {
      // 中文測驗：顯示生字 → 揀中文意思
      const wrongOptions = otherCards
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(c => c.meaning); // 中文意思
      
      const correctAnswer = card.meaning; // 正確中文意思
      const options = [...wrongOptions, correctAnswer].sort(() => Math.random() - 0.5);
      
      return {
        card,
        options,
        correctIndex: options.indexOf(correctAnswer),
        questionText: card.character!,
        questionSubtext: `${card.pinyin} (${card.jyutping})`,
      };
    } else {
      // 英文測驗：顯示意思 → 揀英文單詞
      const wrongOptions = otherCards
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(c => c.word!);
      
      const correctAnswer = card.word!;
      const options = [...wrongOptions, correctAnswer].sort(() => Math.random() - 0.5);
      
      return {
        card,
        options,
        correctIndex: options.indexOf(correctAnswer),
        questionText: card.meaning, // 顯示中文意思
        questionSubtext: '選擇正確的英文單詞',
      };
    }
  });
}

export function QuizSection({ cards, subject, onComplete, onBack }: QuizSectionProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => generateQuestions(cards, subject));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  // 當 cards 或 subject 變化時重新生成題目
  useEffect(() => {
    // 使用 setTimeout 避免同步 setState
    const timer = setTimeout(() => {
      setQuestions(generateQuestions(cards, subject));
      // 重置測驗狀態
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(0);
      setAnswers([]);
      setQuizComplete(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [cards, subject]);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === questions[currentIndex].correctIndex;
    if (isCorrect) {
      setScore(score + 10);
    }
    setAnswers([...answers, isCorrect]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p>準備測驗中...</p>
      </div>
    );
  }

  if (quizComplete) {
    const correctCount = answers.filter(a => a).length;
    const percentage = Math.round((correctCount / questions.length) * 100);
    
    let message = '';
    let emoji = '';
    if (percentage >= 90) {
      message = '太棒了！你記得非常好！';
      emoji = '🏆';
    } else if (percentage >= 70) {
      message = '做得好！繼續努力！';
      emoji = '👏';
    } else if (percentage >= 50) {
      message = '還可以，再溫習一下吧！';
      emoji = '💪';
    } else {
      message = '加油！再試一次會更好！';
      emoji = '📚';
    }

    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">{emoji}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">測驗完成！</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="text-5xl font-bold text-indigo-600 mb-2">{score}</div>
          <p className="text-gray-500">總分</p>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">答對題數</span>
              <span className="font-bold text-green-600">{correctCount} / {questions.length}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">正確率</span>
              <span className="font-bold">{percentage}%</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => onComplete(score)}
            className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-colors"
          >
            返回主頁
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            再測一次
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* 頂部欄 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          退出
        </button>
        <span className="text-sm text-gray-500">
          題目 {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* 進度條 */}
      <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 分數顯示 */}
      <div className="text-center mb-6">
        <span className="text-sm text-gray-500">目前分數：</span>
        <span className="text-2xl font-bold text-indigo-600 ml-2">{score}</span>
      </div>

      {/* 題目 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 text-center">
        <p className="text-sm text-gray-400 mb-4">{currentQ.card.category}</p>
        
        {subject === 'chinese' ? (
          <>
            <p className="text-gray-600 mb-4">這個字的意思是什麼？</p>
            <div className="text-7xl font-bold text-gray-800 mb-2">
              {currentQ.questionText}
            </div>
            <p className="text-gray-400 text-sm">{currentQ.questionSubtext}</p>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-4">{currentQ.questionSubtext}</p>
            <div className="bg-indigo-50 rounded-xl p-4 mb-2">
              <p className="text-xl text-gray-700 font-medium">{currentQ.questionText}</p>
            </div>
          </>
        )}
      </div>

      {/* 選項 */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((option, index) => {
          let buttonClass = 'w-full p-4 rounded-xl border-2 text-left transition-all ';
          
          if (showResult) {
            if (index === currentQ.correctIndex) {
              buttonClass += 'bg-green-100 border-green-500 text-green-800';
            } else if (index === selectedAnswer) {
              buttonClass += 'bg-red-100 border-red-500 text-red-800';
            } else {
              buttonClass += 'bg-gray-50 border-gray-200 text-gray-500';
            }
          } else {
            if (selectedAnswer === index) {
              buttonClass += 'bg-indigo-100 border-indigo-500 text-indigo-800';
            } else {
              buttonClass += 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300';
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={buttonClass}
              disabled={showResult}
            >
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-lg">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 提交 / 下一題按鈕 */}
      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          提交答案
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
        >
          {currentIndex < questions.length - 1 ? '下一題 →' : '完成測驗'}
        </button>
      )}

      {/* 結果提示 */}
      {showResult && (
        <div className={`text-center mt-4 p-4 rounded-xl ${
          selectedAnswer === currentQ.correctIndex 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {selectedAnswer === currentQ.correctIndex ? (
            <p className="font-bold">🎉 答對了！+10 分</p>
          ) : (
            <>
              <p className="font-bold mb-1">😅 答錯了</p>
              {subject === 'chinese' ? (
                <p className="text-sm">「{currentQ.card.character}」的意思是「{currentQ.card.meaning}」</p>
              ) : (
                <p className="text-sm">「{currentQ.card.meaning}」的英文是 &quot;{currentQ.card.word}&quot;</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
