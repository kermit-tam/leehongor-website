'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  a: number;
  b: number;
  answer: number;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  time: string;
  date: string;
}

type Screen = 'menu' | 'game' | 'result' | 'leaderboard';

export default function DogMultiplication() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [finalTime, setFinalTime] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [answer, setAnswer] = useState('');
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  // 生成15題乘數題目（2-9，不含1）
  const generateQuestions = useCallback(() => {
    const qs: Question[] = [];
    const used = new Set<string>();
    
    while (qs.length < 15) {
      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const key = `${a}x${b}`;
      
      if (!used.has(key)) {
        used.add(key);
        qs.push({ a, b, answer: a * b });
      }
    }
    return qs;
  }, []);

  const startGame = () => {
    const qs = generateQuestions();
    setQuestions(qs);
    setCurrentQ(0);
    setScore(0);
    setTimer(0);
    setAnswer('');
    setScreen('game');
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (screen === 'game') {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [screen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const checkAnswer = () => {
    const numAnswer = parseInt(answer);
    if (isNaN(numAnswer)) return;

    const correct = numAnswer === questions[currentQ].answer;
    
    if (correct) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        if (currentQ + 1 >= questions.length) {
          setFinalTime(formatTime(timer));
          setScreen('result');
        } else {
          setCurrentQ(c => c + 1);
          setAnswer('');
        }
      }, 800);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setAnswer('');
      }, 2500);
    }
  };

  const loadLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard?game=dogmultiplication');
      const data = await res.json();
      setLeaderboard(data.entries || []);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    }
    setScreen('leaderboard');
  };

  const saveToLeaderboard = async () => {
    if (!playerName.trim()) return;

    try {
      const res = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game: 'dogmultiplication',
          name: playerName.trim(),
          score,
          time: finalTime
        })
      });
      
      const data = await res.json();
      if (data.success) {
        setLeaderboard(data.entries);
        setScreen('leaderboard');
      }
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') checkAnswer();
  };

  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="text-6xl mb-4">🐕</div>
          <h1 className="text-3xl font-black text-amber-700 mb-2">狗狗乘數表</h1>
          <p className="text-gray-600 mb-2">15題乘數小天才</p>
          <p className="text-sm text-gray-500 mb-6">2至9的乘法（不含1）</p>
          
          <div className="space-y-3">
            <button onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-bold text-lg shadow-lg">
              🎮 開始挑戰
            </button>
            <button onClick={loadLeaderboard}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-400 text-white rounded-xl font-bold shadow-lg">
              🏆 排行榜
            </button>
            <Link href="/trymath">
              <button className="w-full py-3 text-gray-500 hover:text-gray-700">← 返回</button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (screen === 'game' && questions.length > 0) {
    const q = questions[currentQ];
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 flex flex-col items-center justify-center p-4">
        <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur p-4 flex justify-between items-center shadow-lg">
          <div className="text-2xl font-black text-amber-600">🐕 {formatTime(timer)}</div>
          <div className="text-lg font-bold text-gray-700">{currentQ + 1} / {questions.length}</div>
          <div className="text-lg font-bold text-green-600">✓ {score}</div>
        </div>

        <div className="mt-20">
          <motion.div key={currentQ} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 shadow-2xl text-center min-w-[300px]">
            <div className="text-6xl font-black text-amber-700 mb-8">{q.a} × {q.b} = ?</div>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <input type="number" value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={handleKeyDown}
                className="w-32 h-16 text-4xl font-bold text-center border-4 border-amber-300 rounded-xl focus:border-amber-500 focus:outline-none" autoFocus />
              <button onClick={checkAnswer}
                className="h-16 px-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-bold text-xl shadow-lg">確定</button>
            </div>

            <AnimatePresence>
              {showCorrect && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-6xl">✅</motion.div>}
              {showWrong && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-red-600">
                  <div className="text-4xl mb-2">❌</div>
                  <div className="text-xl font-bold">正確答案: {q.answer}</div>
                  <div className="text-sm text-gray-500 mt-1">再試一次...</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="grid grid-cols-3 gap-2 mt-6 max-w-[300px] mx-auto">
            {[1,2,3,4,5,6,7,8,9].map(n => (
              <button key={n} onClick={() => setAnswer(prev => prev + n)}
                className="w-20 h-20 bg-white rounded-2xl text-2xl font-bold text-gray-800 shadow-lg hover:bg-amber-50 active:scale-95">{n}</button>
            ))}
            <button onClick={() => setAnswer('')} className="w-20 h-20 bg-red-100 rounded-2xl text-xl font-bold text-red-600 shadow-lg">清除</button>
            <button onClick={() => setAnswer(prev => prev + '0')} className="w-20 h-20 bg-white rounded-2xl text-2xl font-bold text-gray-800 shadow-lg">0</button>
            <button onClick={() => setAnswer(prev => prev.slice(0, -1))} className="w-20 h-20 bg-gray-100 rounded-2xl text-xl font-bold text-gray-600 shadow-lg">←</button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-black text-amber-700 mb-2">挑戰完成！</h1>
          <div className="bg-amber-50 rounded-2xl p-6 mb-6">
            <p className="text-gray-600 mb-2">成績</p>
            <p className="text-5xl font-black text-amber-600">{score} / 15</p>
            <p className="text-gray-500 mt-2">用時: {finalTime}</p>
          </div>
          <div className="space-y-3">
            <input type="text" placeholder="輸入你嘅名" value={playerName} onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg text-center" maxLength={10} />
            <button onClick={saveToLeaderboard} disabled={!playerName.trim()}
              className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-bold text-lg disabled:opacity-50">🏆 儲存到排行榜</button>
            <button onClick={startGame} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold">🔄 再玩一次</button>
            <button onClick={() => setScreen('menu')} className="w-full py-3 text-gray-500">← 返回主頁</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <h1 className="text-3xl font-black text-amber-700 mb-6 text-center">🏆 狗狗乘數表排行榜</h1>
        {leaderboard.length === 0 ? (
          <p className="text-gray-500 text-center py-8">暫時未有記錄</p>
        ) : (
          <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
            {leaderboard.map((entry, idx) => (
              <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl ${idx === 0 ? 'bg-yellow-100' : idx === 1 ? 'bg-gray-100' : idx === 2 ? 'bg-orange-50' : 'bg-gray-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${idx === 0 ? 'bg-yellow-500 text-white' : idx === 1 ? 'bg-gray-400 text-white' : idx === 2 ? 'bg-orange-400 text-white' : 'bg-gray-300 text-gray-700'}`}>{idx + 1}</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{entry.name}</p>
                  <p className="text-sm text-gray-500">{entry.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-amber-600">{entry.score}分</p>
                  {entry.time && <p className="text-sm text-gray-500">{entry.time}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="space-y-3">
          <button onClick={startGame} className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-bold text-lg">🎮 再玩一次</button>
          <button onClick={() => setScreen('menu')} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold">← 返回主頁</button>
        </div>
      </div>
    </div>
  );
}
