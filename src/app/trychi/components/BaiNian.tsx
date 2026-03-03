'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StudyMode from './StudyMode';
import ShareButton from './ShareButton';
import { baiNianWords } from '../data/study-data';

interface Question {
  id: number;
  sentence: string;
  options: string[];
  answer: string;
}

// 到外婆家拜年填充 - 20句（只用指定詞語）
const QUESTIONS: Question[] = [
  {
    id: 1,
    sentence: "我們去____家拜年。",
    options: ["外婆", "鄰居", "老師", "朋友"],
    answer: "外婆"
  },
  {
    id: 2,
    sentence: "____初一，我們穿上新衣去拜年。",
    options: ["農曆", "新年", "身體", "學業"],
    answer: "農曆"
  },
  {
    id: 3,
    sentence: "今天是____，大家都很開心。",
    options: ["新年", "外婆", "拜年", "健康"],
    answer: "新年"
  },
  {
    id: 4,
    sentence: "我們向長輩____，祝他們身體健康。",
    options: ["拜年", "哈哈", "進步", "紅包"],
    answer: "拜年"
  },
  {
    id: 5,
    sentence: "外婆給我一個____。",
    options: ["紅包", "金閃閃", "笑呵呵", "喜氣洋洋"],
    answer: "紅包"
  },
  {
    id: 6,
    sentence: "____穿著金閃閃的衣服，十分喜氣。",
    options: ["外婆", "媽媽", "老師", "同學"],
    answer: "外婆"
  },
  {
    id: 7,
    sentence: "____給我們派利是，祝我們學業進步。",
    options: ["舅舅", "爸爸", "老師", "朋友"],
    answer: "舅舅"
  },
  {
    id: 8,
    sentence: "祝外婆____健康，長命百歲。",
    options: ["身體", "學業", "哈哈", "進步"],
    answer: "身體"
  },
  {
    id: 9,
    sentence: "祝願大家____健康，萬事如意。",
    options: ["健康", "進步", "哈哈", "金閃閃"],
    answer: "健康"
  },
  {
    id: 10,
    sentence: "祝你在新一年____進步，成績優異。",
    options: ["學業", "身體", "健康", "拜年"],
    answer: "學業"
  },
  {
    id: 11,
    sentence: "祝你學習____，更上一層樓。",
    options: ["進步", "健康", "哈哈", "金閃閃"],
    answer: "進步"
  },
  {
    id: 12,
    sentence: "外婆____地笑，十分和藹。",
    options: ["笑呵呵", "哈哈", "喜氣洋洋", "金閃閃"],
    answer: "笑呵呵"
  },
  {
    id: 13,
    sentence: "大家見面都____大笑，十分開心。",
    options: ["哈哈", "笑呵呵", "喜氣洋洋", "金閃閃"],
    answer: "哈哈"
  },
  {
    id: 14,
    sentence: "大廳裡掛滿了____的裝飾。",
    options: ["金閃閃", "笑呵呵", "哈哈", "紅包"],
    answer: "金閃閃"
  },
  {
    id: 15,
    sentence: "全家____，熱熱閙閙。",
    options: ["兒孫滿堂", "五代同堂", "喜氣洋洋", "笑呵呵"],
    answer: "兒孫滿堂"
  },
  {
    id: 16,
    sentence: "這是一個____的大家庭，十分溫馨。",
    options: ["五代同堂", "兒孫滿堂", "喜氣洋洋", "金閃閃"],
    answer: "五代同堂"
  },
  {
    id: 17,
    sentence: "屋裡一片____，充滿歡笑。",
    options: ["喜氣洋洋", "笑呵呵", "哈哈", "金閃閃"],
    answer: "喜氣洋洋"
  },
  {
    id: 18,
    sentence: "我們在____年三十晚吃團年飯。",
    options: ["農曆", "新年", "外婆", "舅舅"],
    answer: "農曆"
  },
  {
    id: 19,
    sentence: "我們一起____。",
    options: ["拜年", "健康", "進步", "哈哈"],
    answer: "拜年"
  },
  {
    id: 20,
    sentence: "我們____地去拜年。",
    options: ["高高興興", "枯", "撞", "耕作"],
    answer: "高高興興"
  }
];

type Screen = 'menu' | 'game' | 'result' | 'study';

export default function BaiNian() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questions] = useState<Question[]>(QUESTIONS);

  const startGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowFeedback(false);
    setScreen('game');
  };

  const handleSelect = (option: string) => {
    if (showFeedback) return;
    
    const correct = option === questions[currentIndex].answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(s => s + 1);
    }
    
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(c => c + 1);
        setShowFeedback(false);
      } else {
        setScreen('result');
      }
    }, 1500);
  };

  // 溫習模式
  if (screen === 'study') {
    return (
      <StudyMode 
        title="到外婆家拜年" 
        emoji="🧧" 
        words={baiNianWords} 
        onExit={() => setScreen('menu')} 
      />
    );
  }

  // 選單畫面
  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative"
        >
          <Link href="/trychi" className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl">
            ←
          </Link>
          
          <div className="text-5xl mb-2">🧧🏮</div>
          <h1 className="text-2xl font-black mb-1 text-red-700">到外婆家拜年</h1>
          <p className="text-gray-600 text-sm mb-4">二年班中文練習</p>
          
          <div className="mb-4">
            <ShareButton lessonId="bainian" lessonName="到外婆家拜年填充練習" />
          </div>
          
          <div className="space-y-3">
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-2xl text-lg font-bold shadow-lg"
            >
              📝 填充練習 (20題)
            </button>
            <button
              onClick={() => setScreen('study')}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-3 rounded-2xl text-lg font-bold shadow-lg"
            >
              📚 溫習模式 (16詞)
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 結果畫面
  if (screen === 'result') {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="text-5xl mb-4">
            {percentage >= 80 ? '⭐⭐⭐' : percentage >= 60 ? '⭐⭐' : '⭐'}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {percentage >= 80 ? '太棒了！' : percentage >= 60 ? '做得好！' : '繼續加油！'}
          </h1>
          <p className="text-2xl text-red-600 font-bold mb-6">
            {score} / {questions.length} 題答對
          </p>
          
          <div className="space-y-3">
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-2xl text-xl font-bold shadow-lg"
            >
              再玩一次 🔄
            </button>
            <button
              onClick={() => setScreen('menu')}
              className="w-full bg-gray-200 text-gray-700 py-4 rounded-2xl text-xl font-bold"
            >
              返回選單
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 遊戲畫面
  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl">
        {/* 進度 */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-red-600">
            第 {currentIndex + 1} / {questions.length} 題
          </div>
          <div className="text-lg font-bold text-pink-500">
            ✓ {score}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <motion.div 
            className="bg-gradient-to-r from-red-400 to-pink-400 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        {/* 題目 */}
        <div className="mb-6">
          <div className="bg-red-50 rounded-2xl p-4 mb-3">
            <p className="text-xl font-bold text-gray-800 leading-relaxed">
              {currentQ?.sentence}
            </p>
          </div>
        </div>

        {/* 選項 */}
        {!showFeedback ? (
          <div className="grid grid-cols-2 gap-3">
            {currentQ?.options.map((option, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(option)}
                className="bg-gradient-to-br from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200 text-gray-800 py-4 rounded-2xl text-lg font-bold shadow transition-all"
              >
                {option}
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`text-center py-6 rounded-2xl ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
          >
            <div className="text-5xl mb-2">{isCorrect ? '✓' : '✗'}</div>
            <div className={`text-2xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '正確' : `正確答案：${currentQ?.answer}`}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
