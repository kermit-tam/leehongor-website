'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  text: string;
  a: number;
  b: number;
  answer: number;
}

interface LightningMathProps {
  onExit: () => void;
}

export default function LightningMath({ onExit }: LightningMathProps) {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [timer, setTimer] = useState('00:00.00');
  const [combo, setCombo] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<{ emoji: string; color: string } | null>(null);
  const [stats, setStats] = useState({ totalTime: 0, avgTime: '0', accuracy: '0', rank: '🏆' });
  
  const startTimeRef = useRef(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 產生加法題目
  const generateQuestions = useCallback((): Question[] => {
    const qs: Question[] = [];
    const levels = [
      { min: 2, max: 10, count: 5 },
      { min: 6, max: 15, count: 5 },
      { min: 10, max: 19, count: 5 }
    ];
    
    levels.forEach(level => {
      for (let i = 0; i < level.count; i++) {
        const answer = Math.floor(Math.random() * (level.max - level.min + 1)) + level.min;
        const a = Math.floor(Math.random() * (answer - 1)) + 1;
        const b = answer - a;
        qs.push({ text: `${a} + ${b}`, a, b, answer });
      }
    });
    
    // 打亂順序
    for (let i = qs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }
    
    return qs;
  }, []);

  // 開始遊戲
  const startGame = useCallback(() => {
    const qs = generateQuestions();
    setQuestions(qs);
    setCurrentQ(0);
    setCurrentAnswer('');
    setCombo(0);
    setWrongCount(0);
    setIsProcessing(false);
    setFeedback(null);
    setGameState('playing');
    startTimeRef.current = Date.now();
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const mins = Math.floor(elapsed / 60000);
      const secs = Math.floor((elapsed % 60000) / 1000);
      const ms = Math.floor((elapsed % 1000) / 10);
      setTimer(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`);
    }, 10);
  }, [generateQuestions]);

  // 輸入數字
  const inputNum = useCallback((n: number) => {
    if (isProcessing || currentAnswer.length >= 2) return;
    
    const newAnswer = currentAnswer + n;
    setCurrentAnswer(newAnswer);
    
    const ans = parseInt(newAnswer);
    const correct = questions[currentQ]?.answer;
    
    if (!correct) return;
    
    if (ans === correct) {
      // 答對
      setIsProcessing(true);
      setCombo(c => c + 1);
      setFeedback({ emoji: '✅', color: '#4ade80' });
      
      setTimeout(() => {
        setFeedback(null);
        if (currentQ >= 14) {
          // 結束遊戲
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          const totalTime = Date.now() - startTimeRef.current;
          const accuracy = Math.max(0, Math.round((15 / (15 + wrongCount)) * 100));
          const avgTime = (totalTime / 15 / 1000).toFixed(1);
          
          let rank = '🏆';
          if (wrongCount === 0 && totalTime < 30000) rank = '👑';
          else if (wrongCount <= 2 && totalTime < 45000) rank = '🥇';
          else if (wrongCount <= 5) rank = '🥈';
          else rank = '💪';
          
          setStats({
            totalTime,
            avgTime,
            accuracy: accuracy.toString(),
            rank
          });
          setGameState('result');
        } else {
          setCurrentQ(c => c + 1);
          setCurrentAnswer('');
          setIsProcessing(false);
        }
      }, 400);
    } else if (newAnswer.length === 2 || (newAnswer.length === 1 && ans > correct)) {
      // 答錯
      setWrongCount(w => w + 1);
      setCombo(0);
      setFeedback({ emoji: '❌', color: '#f87171' });
      
      setTimeout(() => {
        setFeedback(null);
        setCurrentAnswer('');
      }, 600);
    }
  }, [currentAnswer, currentQ, questions, wrongCount, isProcessing]);

  // 清除答案
  const clearAns = useCallback(() => {
    if (isProcessing) return;
    setCurrentAnswer('');
  }, [isProcessing]);

  // 清理定時器
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // 格式化時間
  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameState === 'start') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-md mx-auto"
      >
        <div className="text-6xl mb-4">⚡</div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">閃電加法王</h2>
        <p className="text-gray-600 mb-6">
          15題加法挑戰<br/>
          答案範圍：2 至 19<br/>
          答錯要答啱先可以過！
        </p>
        <button
          onClick={startGame}
          className="w-full py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-xl shadow-lg hover:shadow-xl active:scale-95 transition-all"
        >
          開始挑戰 🚀
        </button>
      </motion.div>
    );
  }

  if (gameState === 'result') {
    const { totalTime, avgTime, accuracy, rank } = stats;
    let title = '完成！';
    let msg = '做得好！繼續加油！';
    
    if (wrongCount === 0 && totalTime < 30000) {
      title = '數學之神！';
      msg = '完美！零錯誤！';
    } else if (wrongCount <= 2 && totalTime < 45000) {
      title = '金牌選手！';
      msg = '非常出色！';
    } else if (wrongCount <= 5) {
      title = '銀牌選手！';
      msg = '做得很好！';
    } else {
      title = '繼續努力！';
      msg = '加油！愈練愈強！';
    }
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-md mx-auto"
      >
        <div className="text-6xl mb-2">{rank}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-100 rounded-2xl p-4">
            <div className="text-2xl font-bold text-indigo-600">{formatTime(totalTime)}</div>
            <div className="text-sm text-gray-500">總時間</div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-4">
            <div className="text-2xl font-bold text-purple-600">{avgTime}s</div>
            <div className="text-sm text-gray-500">平均每題</div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-4">
            <div className="text-2xl font-bold text-red-600">{wrongCount}</div>
            <div className="text-sm text-gray-500">答錯次數</div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-4">
            <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
            <div className="text-sm text-gray-500">準確率</div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">{msg}</p>
        
        <div className="flex gap-3">
          <button
            onClick={startGame}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            再玩一次 🔄
          </button>
          <button
            onClick={onExit}
            className="flex-1 py-3 rounded-full bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 active:scale-95 transition-all"
          >
            返回
          </button>
        </div>
      </motion.div>
    );
  }

  // 遊戲中
  const q = questions[currentQ];
  if (!q) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-3xl p-6 shadow-xl max-w-md mx-auto"
    >
      {/* 頂部狀態 */}
      <div className="flex justify-between items-center mb-4 bg-gray-100 rounded-2xl p-3">
        <div className="text-xl font-bold text-indigo-600 font-mono">{timer}</div>
        <div className="flex gap-1">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i < currentQ ? 'bg-green-400' : 
                i === currentQ ? 'bg-indigo-500 animate-pulse' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 題目區 */}
      <div className="text-center py-6 relative">
        {/* 連擊 */}
        <AnimatePresence>
          {combo >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold"
            >
              🔥 連擊 x{combo}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-gray-500 mb-2">第 {currentQ + 1} 題</div>
        
        <motion.div
          key={currentQ}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl font-black text-gray-800 mb-4"
        >
          {q.text} =
        </motion.div>

        {/* 答案顯示 */}
        <div className={`text-5xl font-bold mb-4 transition-all ${
          currentAnswer === '' ? 'text-gray-300' : 'text-indigo-600'
        }`}>
          {currentAnswer || '?'}
        </div>

        {/* 反饋動畫 */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl"
              style={{ color: feedback.color }}
            >
              {feedback.emoji}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 數字鍵盤 */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <motion.button
            key={num}
            whileTap={{ scale: 0.9 }}
            onClick={() => inputNum(num)}
            disabled={isProcessing}
            className="aspect-square rounded-2xl bg-gray-100 text-3xl font-bold text-gray-800 shadow-md hover:bg-gray-200 active:bg-gray-300 disabled:opacity-50 transition-all"
          >
            {num}
          </motion.button>
        ))}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={clearAns}
          disabled={isProcessing}
          className="col-span-2 aspect-[2/1] rounded-2xl bg-red-100 text-red-600 text-xl font-bold shadow-md hover:bg-red-200 active:bg-red-300 disabled:opacity-50 transition-all"
        >
          清除 ❌
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => inputNum(0)}
          disabled={isProcessing}
          className="aspect-square rounded-2xl bg-gray-100 text-3xl font-bold text-gray-800 shadow-md hover:bg-gray-200 active:bg-gray-300 disabled:opacity-50 transition-all"
        >
          0
        </motion.button>
      </div>

      {/* 退出按鈕 */}
      <button
        onClick={onExit}
        className="w-full mt-4 py-3 text-gray-500 hover:text-gray-700 transition-colors"
      >
        退出遊戲
      </button>
    </motion.div>
  );
}
