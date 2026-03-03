'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StudyMode from './StudyMode';
import ShareButton from './ShareButton';
import { shouZhuWords } from '../data/study-data';

interface Question {
  id: number;
  sentence: string;
  options: string[];
  answer: string;
}

// 守株待兔填充 - 20句（只用12個指定詞語）
const QUESTIONS: Question[] = [
  {
    id: 1,
    sentence: "爸爸用很大____推開那扇門。",
    options: ["力氣", "希望", "忽然", "緊緊"],
    answer: "力氣"
  },
  {
    id: 2,
    sentence: "我____抱住媽媽，不想放手。",
    options: ["緊緊", "力氣", "飛快", "辛勤"],
    answer: "緊緊"
  },
  {
    id: 3,
    sentence: "天空中____了一道彩虹。",
    options: ["出現", "撞", "枯", "耕作"],
    answer: "出現"
  },
  {
    id: 4,
    sentence: "小狗____跑回家。",
    options: ["飛快", "忽然", "辛勤", "緊緊"],
    answer: "飛快"
  },
  {
    id: 5,
    sentence: "花兒沒有水，很快就____了。",
    options: ["枯", "撞", "出現", "耕作"],
    answer: "枯"
  },
  {
    id: 6,
    sentence: "老師說，只要努力，就有____成功。",
    options: ["希望", "力氣", "飛快", "忽然"],
    answer: "希望"
  },
  {
    id: 7,
    sentence: "早上，太陽____從雲後出來。",
    options: ["忽然", "緊緊", "辛勤", "飛快"],
    answer: "忽然"
  },
  {
    id: 8,
    sentence: "叔叔是一位____，每天都在田裡工作。",
    options: ["農夫", "力氣", "希望", "耕作"],
    answer: "農夫"
  },
  {
    id: 9,
    sentence: "農夫每天____工作，十分認真。",
    options: ["辛勤", "飛快", "忽然", "緊緊"],
    answer: "辛勤"
  },
  {
    id: 10,
    sentence: "他在田裡____，種了很多菜。",
    options: ["耕作", "撞", "枯", "出現"],
    answer: "耕作"
  },
  {
    id: 11,
    sentence: "小明跑得太快，不小心____到椅子。",
    options: ["撞", "枯", "出現", "耕作"],
    answer: "撞"
  },
  {
    id: 12,
    sentence: "做事要主動，不可以____，等別人幫忙。",
    options: ["守株待兔", "辛勤", "力氣", "希望"],
    answer: "守株待兔"
  },
  {
    id: 13,
    sentence: "農夫____地在田裡工作。",
    options: ["辛勤", "飛快", "忽然", "緊緊"],
    answer: "辛勤"
  },
  {
    id: 14,
    sentence: "我____明天會是好天氣。",
    options: ["希望", "力氣", "忽然", "撞"],
    answer: "希望"
  },
  {
    id: 15,
    sentence: "老師____走進課室。",
    options: ["忽然", "緊緊", "枯", "守株待兔"],
    answer: "忽然"
  },
  {
    id: 16,
    sentence: "小鳥____地飛走了。",
    options: ["飛快", "辛勤", "耕作", "力氣"],
    answer: "飛快"
  },
  {
    id: 17,
    sentence: "這棵老樹已經____死了。",
    options: ["枯", "撞", "出現", "希望"],
    answer: "枯"
  },
  {
    id: 18,
    sentence: "他____抓住欄杆，不敢放手。",
    options: ["緊緊", "忽然", "飛快", "辛勤"],
    answer: "緊緊"
  },
  {
    id: 19,
    sentence: "彩虹____在雨後的天空。",
    options: ["出現", "撞", "枯", "耕作"],
    answer: "出現"
  },
  {
    id: 20,
    sentence: "他不小心____到牆上。",
    options: ["撞", "枯", "守株待兔", "希望"],
    answer: "撞"
  }
];

type Screen = 'menu' | 'game' | 'result' | 'study' | 'leaderboard-input' | 'leaderboard';

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

export default function ShouZhuDaiTu() {
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

  // 讀取排行榜
  const loadLeaderboard = () => {
    const saved = localStorage.getItem('leaderboard-shouzhudaitu');
    if (saved) setLeaderboard(JSON.parse(saved));
    setScreen('leaderboard');
  };

  // 溫習模式
  if (screen === 'study') {
    return (
      <StudyMode 
        title="守株待兔" 
        emoji="🐰" 
        words={shouZhuWords} 
        onExit={() => setScreen('menu')} 
      />
    );
  }

  // 選單畫面
  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative"
        >
          <Link href="/trychi" className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl">
            ←
          </Link>
          
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 100 100" className="w-10 h-10">
              <circle cx="50" cy="50" r="45" fill="#FF6B6B"/>
              <rect x="35" y="30" width="8" height="40" rx="4" fill="white"/>
              <rect x="25" y="42" width="50" height="8" rx="4" fill="white"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black mb-1 text-red-600">守株待兔</h1>
          <p className="text-gray-600 text-sm mb-4">二年班中文練習</p>
          
          <div className="mb-4">
            <ShareButton lessonId="shouzhudaitu" lessonName="守株待兔填充練習" />
          </div>
          
          <div className="space-y-3">
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-red-400 to-orange-400 text-white py-3 rounded-2xl text-lg font-bold shadow-lg"
            >
              填充練習 (20題)
            </button>
            <button
              onClick={() => setScreen('study')}
              className="w-full bg-gradient-to-r from-green-400 to-teal-400 text-white py-3 rounded-2xl text-lg font-bold shadow-lg"
            >
              溫習模式 (12詞)
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

  // 儲存分數到排行榜
  const saveToLeaderboard = () => {
    if (!playerName.trim()) return;
    
    const newEntry: LeaderboardEntry = {
      name: playerName.trim(),
      score,
      date: new Date().toLocaleDateString('zh-HK')
    };
    
    const saved = localStorage.getItem('leaderboard-shouzhudaitu');
    const current = saved ? JSON.parse(saved) : [];
    const updated = [...current, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    localStorage.setItem('leaderboard-shouzhudaitu', JSON.stringify(updated));
    setLeaderboard(updated);
    setScreen('leaderboard');
  };

  // 結果畫面
  if (screen === 'result') {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#FFD93D">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {percentage >= 80 ? '太棒了！' : percentage >= 60 ? '做得好！' : '繼續加油！'}
          </h1>
          <p className="text-2xl text-red-500 font-bold mb-6">
            {score} / {questions.length} 題答對
          </p>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="輸入你嘅名"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-red-500 focus:outline-none"
              maxLength={10}
            />
            
            <button
              onClick={saveToLeaderboard}
              disabled={!playerName.trim()}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg disabled:opacity-50"
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <h1 className="text-3xl font-black text-gray-800 mb-6 text-center">🏆 守株待兔排行榜</h1>
          
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
                  <div className="text-xl font-black text-red-600">{entry.score}分</div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-red-400 to-orange-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg"
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl">
        {/* 進度 */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-purple-600">
            💜 第 {currentIndex + 1} / {questions.length} 題
          </div>
          <div className="text-lg font-bold text-pink-500">
            ✓ {score}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <motion.div 
            className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        {/* 題目 */}
        <div className="mb-6">
          <div className="bg-purple-50 rounded-2xl p-4 mb-3 border-2 border-purple-200">
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
                className="bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-gray-800 py-4 rounded-2xl text-lg font-bold shadow transition-all"
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
