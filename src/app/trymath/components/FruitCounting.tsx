'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Difficulty = 'easy' | 'medium' | 'hard';
type FruitType = '🍎' | '🍊' | '🍌' | '🍇' | '🍓' | '🍉' | '🍑' | '🥝';

interface Question {
  count: number;
  fruit: FruitType;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  difficulty: Difficulty;
  time: number;
  date: string;
}

const FRUITS: FruitType[] = ['🍎', '🍊', '🍌', '🍇', '🍓', '🍉', '🍑', '🥝'];

const FRUIT_NAMES: Record<FruitType, string> = {
  '🍎': '蘋果',
  '🍊': '橙',
  '🍌': '香蕉',
  '🍇': '提子',
  '🍓': '草莓',
  '🍉': '西瓜',
  '🍑': '桃',
  '🥝': '奇異果',
};

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: '簡單',
  medium: '中等',
  hard: '困難',
};

export default function FruitCounting() {
  const [screen, setScreen] = useState<'start' | 'game' | 'result' | 'leaderboard'>('start');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFruits, setShowFruits] = useState(true);
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [hasSaved, setHasSaved] = useState(false);
  
  // 計時功能
  const [startTime, setStartTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // 生成題目
  const generateQuestions = useCallback((diff: Difficulty): Question[] => {
    const count = 10; // 10題
    const qs: Question[] = [];
    
    for (let i = 0; i < count; i++) {
      let min = 1, max = 5;
      if (diff === 'medium') { min = 3; max = 10; }
      if (diff === 'hard') { min = 5; max = 15; }
      
      const count = Math.floor(Math.random() * (max - min + 1)) + min;
      const fruit = FRUITS[Math.floor(Math.random() * FRUITS.length)];
      qs.push({ count, fruit });
    }
    return qs;
  }, []);

  // 從伺服器載入排行榜
  const loadLeaderboard = useCallback(async () => {
    try {
      const response = await fetch('/api/leaderboard?game=fruitcounting');
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.entries || []);
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      setLeaderboard([]);
    }
  }, []);

  // 儲存到伺服器排行榜
  const saveToLeaderboard = async () => {
    if (!playerName.trim()) return;
    
    const newEntry: LeaderboardEntry = {
      name: playerName.trim(),
      score,
      difficulty,
      time: totalTime,
      date: new Date().toISOString(),
    };
    
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game: 'fruitcounting',
          name: newEntry.name,
          score: newEntry.score,
          difficulty: newEntry.difficulty,
          time: newEntry.time,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.entries || []);
        setHasSaved(true);
        setTimeout(() => setScreen('leaderboard'), 500);
      }
    } catch (error) {
      console.error('Failed to save leaderboard:', error);
    }
  };

  // 遊戲進行中的計時器
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (screen === 'game' && startTime > 0) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [screen, startTime]);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  const startGame = (diff: Difficulty) => {
    setDifficulty(diff);
    setQuestions(generateQuestions(diff));
    setCurrentQ(0);
    setScore(0);
    setHasSaved(false);
    setPlayerName('');
    setTotalTime(0);
    setElapsedTime(0);
    setStartTime(Date.now());
    setScreen('game');
    setShowFruits(true);
  };

  const handleAnswer = (answer: number) => {
    if (showFeedback) return;
    
    const correct = questions[currentQ].count;
    const correctAnswer = answer === correct;
    
    setSelectedAnswer(answer);
    setIsCorrect(correctAnswer);
    setShowFeedback(true);
    
    if (correctAnswer) {
      setScore(s => s + 1);
      // 答對：1.5秒後去下一題
      setTimeout(() => {
        if (currentQ < questions.length - 1) {
          setCurrentQ(c => c + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
          setShowFruits(false);
          setTimeout(() => setShowFruits(true), 100);
        } else {
          // 完成，記錄總時間
          const endTime = Date.now();
          const totalSeconds = Math.floor((endTime - startTime) / 1000);
          setTotalTime(totalSeconds);
          setScreen('result');
        }
      }, 1500);
    } else {
      // 答錯：顯示正確答案2.5秒後重置（唔去下一題）
      setTimeout(() => {
        setSelectedAnswer(null);
        setShowFeedback(false);
        // 重新顯示生果動畫
        setShowFruits(false);
        setTimeout(() => setShowFruits(true), 100);
      }, 2500);
    }
  };

  const getOptions = (correct: number): number[] => {
    const options = new Set<number>();
    options.add(correct);
    
    while (options.size < 4) {
      // eslint-disable-next-line react-hooks/purity
      let offset = Math.floor(Math.random() * 5) - 2; // -2 到 +2
      if (offset === 0) offset = 3;
      let opt = correct + offset;
      if (opt < 1) opt = Math.abs(opt) + 1;
      options.add(opt);
    }
    
    return Array.from(options).sort((a, b) => a - b);
  };

  // 格式化時間顯示
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  };

  // 排行榜畫面
  if (screen === 'leaderboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-yellow-300 to-pink-400 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative"
        >
          <Link href="/trymath" className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl">
            ←
          </Link>
          
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl font-black mb-2 text-yellow-600">數生果排行榜</h1>
          <p className="text-gray-600 mb-6 text-lg">看看誰是數生果高手！</p>
          
          <div className="space-y-2 mb-6 max-h-[300px] overflow-y-auto">
            {leaderboard.length === 0 ? (
              <p className="text-gray-400 py-8">暫無記錄，快來挑戰吧！</p>
            ) : (
              leaderboard.map((entry, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    index === 0 ? 'bg-yellow-100 border-2 border-yellow-400' :
                    index === 1 ? 'bg-gray-100 border-2 border-gray-300' :
                    index === 2 ? 'bg-orange-100 border-2 border-orange-300' :
                    'bg-green-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                    </span>
                    <span className="font-bold text-gray-800">{entry.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{entry.score}/10</div>
                    <div className="text-xs text-gray-500">{DIFFICULTY_LABELS[entry.difficulty]} · {entry.time ? formatTime(entry.time) : ''}</div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => setScreen('start')}
              className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
            >
              開始挑戰 🎮
            </button>
            <Link 
              href="/trymath" 
              className="block w-full bg-gray-200 text-gray-700 py-4 rounded-2xl text-xl font-bold"
            >
              返回
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // 結果畫面
  if (screen === 'result') {
    const stars = score >= 8 ? '⭐⭐⭐' : score >= 5 ? '⭐⭐' : '⭐';
    const message = score >= 8 ? '太棒了！生果達人！' : score >= 5 ? '做得好！繼續加油！' : '再試一次！';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-yellow-300 to-pink-400 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="text-6xl mb-4">{stars}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{message}</h1>
          <p className="text-2xl text-green-600 font-bold mb-2">{score} / 10 題答對</p>
          <p className="text-gray-500 mb-6">⏱️ 用時：{formatTime(totalTime)}</p>
          
          {!hasSaved && score > 0 && (
            <div className="mb-6 space-y-3">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="輸入你的名字"
                className="w-full px-4 py-3 rounded-xl border-2 border-yellow-300 text-center text-lg focus:border-yellow-500 focus:outline-none"
                maxLength={10}
              />
              <button
                onClick={saveToLeaderboard}
                disabled={!playerName.trim()}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-3 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                💾 儲存到排行榜
              </button>
            </div>
          )}
          
          {hasSaved && (
            <p className="text-green-600 font-bold mb-6">✅ 已儲存到排行榜！</p>
          )}
          
          <div className="space-y-3">
            <button
              onClick={() => setScreen('start')}
              className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-4 rounded-2xl text-xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              再玩一次 🔄
            </button>
            <button
              onClick={() => setScreen('leaderboard')}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              🏆 查看排行榜
            </button>
            <Link 
              href="/trymath" 
              className="block w-full bg-gray-200 text-gray-700 py-4 rounded-2xl text-xl font-bold"
            >
              返回
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // 開始畫面
  if (screen === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-yellow-300 to-pink-400 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative"
        >
          <Link href="/trymath" className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl">
            ←
          </Link>
          
          <div className="text-6xl mb-4">🍎🍊🍌</div>
          <h1 className="text-4xl font-black mb-2 text-green-600">數生果</h1>
          <p className="text-gray-600 mb-6 text-lg">數數有幾多個生果！</p>
          
          <div className="space-y-3">
            <button
              onClick={() => startGame('easy')}
              className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
            >
              🌱 簡單 (1-5個)
            </button>
            <button
              onClick={() => startGame('medium')}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
            >
              🌿 中等 (3-10個)
            </button>
            <button
              onClick={() => startGame('hard')}
              className="w-full bg-gradient-to-r from-red-400 to-pink-500 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
            >
              🌳 困難 (5-15個)
            </button>
            <button
              onClick={() => setScreen('leaderboard')}
              className="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 text-yellow-800 py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
            >
              🏆 排行榜
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 遊戲畫面
  const q = questions[currentQ];
  const options = getOptions(q.count);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-yellow-300 to-pink-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl">
        {/* 進度 */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-green-600">第 {currentQ + 1} / 10 題</div>
          <div className="text-lg font-bold text-orange-500">⭐ {score}</div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all"
            style={{ width: `${((currentQ + 1) / 10) * 100}%` }}
          />
        </div>
        
        {/* 計時器 - 固定寬度避免跳動 */}
        <div className="text-center mb-4">
          <span className="text-gray-500 text-sm font-mono tabular-nums inline-block w-16">⏱️ {Math.floor(elapsedTime / 60)}:{String(elapsedTime % 60).padStart(2, '0')}</span>
        </div>
        
        {/* 生果區 - 固定高度避免推擠答案區 */}
        <div className="text-center mb-6 h-[200px] flex flex-col items-center justify-center">
          <p className="text-gray-500 mb-4 text-lg">數一數有幾多個{FRUIT_NAMES[q.fruit]}？</p>
          
          <div className="flex flex-wrap justify-center gap-2 max-w-[300px] h-[120px] content-center">
            <AnimatePresence mode="popLayout">
              {showFruits && Array.from({ length: q.count }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ delay: i * 0.03, type: 'spring', stiffness: 300 }}
                  className="text-4xl sm:text-5xl"
                >
                  {q.fruit}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* 答案選項 - 固定位置 */}
        <div className="h-[140px]">
          {!showFeedback ? (
            <div className="grid grid-cols-2 gap-4">
              {options.map((opt) => (
                <motion.button
                  key={opt}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(opt)}
                  className="bg-gradient-to-br from-yellow-300 to-orange-300 text-gray-800 py-6 rounded-2xl text-3xl font-bold shadow-lg"
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`text-center py-6 rounded-2xl h-full flex flex-col justify-center ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
            >
              <div className="text-6xl mb-2">{isCorrect ? '✅' : '❌'}</div>
              <div className={`text-2xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? '答對了！' : `正確答案是 ${q.count}`}
              </div>
              {!isCorrect && (
                <p className="text-gray-500 mt-2 text-sm">2.5秒後自動重置...</p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
