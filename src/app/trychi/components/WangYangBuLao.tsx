'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StudyMode from './StudyMode';
import ShareButton from './ShareButton';
import { wangYangWords } from '../data/study-data';

interface Question {
  id: number;
  sentence: string;
  options: string[];
  answer: string;
}

// 亡羊補牢填充 - 20句（只用12個指定詞語）
const QUESTIONS: Question[] = [
  {
    id: 1,
    sentence: "經過努力，我____完成了功課。",
    options: ["終於", "及時", "從此", "於是"],
    answer: "終於"
  },
  {
    id: 2,
    sentence: "聽了老師的解釋，我____了這道數學題。",
    options: ["明白", "發現", "勸告", "養"],
    answer: "明白"
  },
  {
    id: 3,
    sentence: "幸好消防員____趕到，救出了小貓。",
    options: ["及時", "終於", "從此", "趕快"],
    answer: "及時"
  },
  {
    id: 4,
    sentence: "下雨了，____我們決定留在家中。",
    options: ["於是", "終於", "從此", "及時"],
    answer: "於是"
  },
  {
    id: 5,
    sentence: "雖然做錯了，但只要____，仍未算遲。",
    options: ["亡羊補牢", "終於", "從此", "趕快"],
    answer: "亡羊補牢"
  },
  {
    id: 6,
    sentence: "要遲到了，我們要____出門。",
    options: ["趕快", "及時", "終於", "從此"],
    answer: "趕快"
  },
  {
    id: 7,
    sentence: "我在公園____了一隻迷路的小狗。",
    options: ["發現", "明白", "勸告", "養"],
    answer: "發現"
  },
  {
    id: 8,
    sentence: "這棵樹長得很____，不會被風吹倒。",
    options: ["結實", "趕快", "及時", "終於"],
    answer: "結實"
  },
  {
    id: 9,
    sentence: "媽媽____我不要吃太多糖果。",
    options: ["勸告", "發現", "明白", "養"],
    answer: "勸告"
  },
  {
    id: 10,
    sentence: "我家的____是一位和藹的老婆婆。",
    options: ["鄰居", "勸告", "發現", "養"],
    answer: "鄰居"
  },
  {
    id: 11,
    sentence: "我答應了爸爸，____不會再遲到。",
    options: ["從此", "終於", "於是", "及時"],
    answer: "從此"
  },
  {
    id: 12,
    sentence: "我家____了一隻可愛的貓咪。",
    options: ["養", "發現", "勸告", "明白"],
    answer: "養"
  },
  {
    id: 13,
    sentence: "等了很久，巴士____來了。",
    options: ["終於", "及時", "趕快", "於是"],
    answer: "終於"
  },
  {
    id: 14,
    sentence: "看了說明書，我____怎樣組裝玩具。",
    options: ["明白", "發現", "勸告", "養"],
    answer: "明白"
  },
  {
    id: 15,
    sentence: "你要____交功課，否則會被扣分。",
    options: ["及時", "終於", "趕快", "從此"],
    answer: "及時"
  },
  {
    id: 16,
    sentence: "科學家____了新的行星。",
    options: ["發現", "明白", "勸告", "養"],
    answer: "發現"
  },
  {
    id: 17,
    sentence: "這張桌子很____，可以放很多東西。",
    options: ["結實", "趕快", "及時", "終於"],
    answer: "結實"
  },
  {
    id: 18,
    sentence: "天黑了，我們要____回家。",
    options: ["趕快", "及時", "終於", "從此"],
    answer: "趕快"
  },
  {
    id: 19,
    sentence: "老師____我們要每天閲讀。",
    options: ["勸告", "發現", "明白", "養"],
    answer: "勸告"
  },
  {
    id: 20,
    sentence: "那次事件後，我____變得更小心。",
    options: ["從此", "終於", "於是", "及時"],
    answer: "從此"
  }
];

type Screen = 'menu' | 'game' | 'result' | 'study' | 'leaderboard';

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

export default function WangYangBuLao() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questions] = useState<Question[]>(QUESTIONS);
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

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
        title="亡羊補牢" 
        emoji="🐑" 
        words={wangYangWords} 
        onExit={() => setScreen('menu')} 
      />
    );
  }

  // 讀取排行榜
  const loadLeaderboard = () => {
    const saved = localStorage.getItem('leaderboard-wangyangbulao');
    if (saved) setLeaderboard(JSON.parse(saved));
    setScreen('leaderboard');
  };

  // 儲存分數
  const saveToLeaderboard = () => {
    if (!playerName.trim()) return;
    
    const newEntry: LeaderboardEntry = {
      name: playerName.trim(),
      score,
      date: new Date().toLocaleDateString('zh-HK')
    };
    
    const saved = localStorage.getItem('leaderboard-wangyangbulao');
    const current = saved ? JSON.parse(saved) : [];
    const updated = [...current, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    localStorage.setItem('leaderboard-wangyangbulao', JSON.stringify(updated));
    setLeaderboard(updated);
    setScreen('leaderboard');
  };

  // 選單畫面
  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative"
        >
          <Link href="/trychi" className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl">
            ←
          </Link>
          
          <div className="text-5xl mb-2">🐑🔧</div>
          <h1 className="text-2xl font-black mb-1 text-indigo-700">亡羊補牢</h1>
          <p className="text-gray-600 text-sm mb-4">二年班中文練習</p>
          
          <div className="mb-4">
            <ShareButton lessonId="wangyangbulao" lessonName="亡羊補牢填充練習" />
          </div>
          
          <div className="space-y-3">
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-2xl text-lg font-bold shadow-lg"
            >
              📝 填充練習 (20題)
            </button>
            <button
              onClick={() => setScreen('study')}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-2xl text-lg font-bold shadow-lg"
            >
              📚 溫習模式 (12詞)
            </button>
            <button
              onClick={loadLeaderboard}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 text-white py-3 rounded-2xl text-lg font-bold shadow-lg"
            >
              🏆 排行榜
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 結果畫面
  // 結果畫面
  if (screen === 'result') {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
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
          <p className="text-2xl text-indigo-600 font-bold mb-6">
            {score} / {questions.length} 題答對
          </p>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="輸入你嘅名"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-indigo-500 focus:outline-none"
              maxLength={10}
            />
            
            <button
              onClick={saveToLeaderboard}
              disabled={!playerName.trim()}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg disabled:opacity-50"
            >
              🏆 儲存到排行榜
            </button>
            
            <button
              onClick={startGame}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-2xl text-lg font-bold hover:bg-gray-200"
            >
              再玩一次
            </button>
            
            <button
              onClick={() => setScreen('menu')}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-2xl text-lg font-bold"
            >
              返回選單
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 排行榜畫面
  if (screen === 'leaderboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <h1 className="text-3xl font-black text-gray-800 mb-6 text-center">🏆 亡羊補牢排行榜</h1>
          
          {leaderboard.length === 0 ? (
            <p className="text-gray-500 text-center py-8">暫時未有記錄</p>
          ) : (
            <div className="space-y-3 mb-6">
              {leaderboard.map((entry, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    idx === 0 ? 'bg-yellow-100' :
                    idx === 1 ? 'bg-gray-100' :
                    idx === 2 ? 'bg-orange-50' :
                    'bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    idx === 0 ? 'bg-yellow-500 text-white' :
                    idx === 1 ? 'bg-gray-400 text-white' :
                    idx === 2 ? 'bg-orange-400 text-white' :
                    'bg-gray-300 text-gray-700'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{entry.name}</p>
                    <p className="text-sm text-gray-500">{entry.date}</p>
                  </div>
                  <div className="text-xl font-black text-indigo-600">{entry.score}分</div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-2xl text-xl font-bold shadow-lg"
            >
              🎮 再玩一次
            </button>
            <button
              onClick={() => setScreen('menu')}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-2xl text-lg font-bold"
            >
              ← 返回選單
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 遊戲畫面
  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl">
        {/* 進度 */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-indigo-600">
            第 {currentIndex + 1} / {questions.length} 題
          </div>
          <div className="text-lg font-bold text-purple-500">
            ✓ {score}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <motion.div 
            className="bg-gradient-to-r from-indigo-400 to-purple-400 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        {/* 題目 */}
        <div className="mb-6">
          <div className="bg-indigo-50 rounded-2xl p-4 mb-3">
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
                className="bg-gradient-to-br from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-gray-800 py-4 rounded-2xl text-lg font-bold shadow transition-all"
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
