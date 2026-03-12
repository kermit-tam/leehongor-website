'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChordDiagram } from './components/ChordDiagram';
import { CHORD_DATABASE, Chord, ChordQuality } from './data/chords';

type GameState = 'menu' | 'select' | 'countdown' | 'playing' | 'answered' | 'summary';
type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard' | 'expert' | 'legend';

// 難度設定
const DIFFICULTY_CONFIG: Record<Difficulty, {
  name: string;
  emoji: string;
  description: string;
  questionCount: number;
  optionCount: number;  // 選項數量
  qualities: ChordQuality[];
  timeLimit: number | null; // 秒數，null = 無限時
}> = {
  beginner: {
    name: '新手',
    emoji: '🌱',
    description: '只有 Major 和 Minor',
    questionCount: 5,
    optionCount: 3,
    qualities: ['major', 'minor'],
    timeLimit: null,
  },
  easy: {
    name: '初階',
    emoji: '🎯',
    description: 'Major, Minor, 7',
    questionCount: 10,
    optionCount: 4,
    qualities: ['major', 'minor', '7'],
    timeLimit: null,
  },
  medium: {
    name: '中階',
    emoji: '⚡',
    description: '加入 Maj7 和 Min7',
    questionCount: 15,
    optionCount: 4,
    qualities: ['major', 'minor', '7', 'maj7', 'min7'],
    timeLimit: null,
  },
  hard: {
    name: '進階',
    emoji: '🔥',
    description: '所有和弦類型',
    questionCount: 20,
    optionCount: 6,
    qualities: ['major', 'minor', '7', 'maj7', 'min7'],
    timeLimit: null,
  },
  expert: {
    name: '高手',
    emoji: '💎',
    description: '更多選項，更快節奏',
    questionCount: 25,
    optionCount: 8,
    qualities: ['major', 'minor', '7', 'maj7', 'min7'],
    timeLimit: 10, // 每題10秒
  },
  legend: {
    name: '傳奇',
    emoji: '👑',
    description: '終極挑戰！限時作答',
    questionCount: 30,
    optionCount: 8,
    qualities: ['major', 'minor', '7', 'maj7', 'min7'],
    timeLimit: 5, // 每題5秒
  },
};

// 音效播放函數
function playCorrectSound() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    
    
    
    // 播放「叮」聲
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = 880; // A5
    
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
    
    // 第二個音
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.value = 1108.73; // C#6
      gain2.gain.setValueAtTime(0.3, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start();
      osc2.stop(ctx.currentTime + 0.3);
    }, 50);
  } catch {
    // 忽略音效錯誤
  }
}

function playWrongSound() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    // 忽略音效錯誤
  }
}

export default function GuitarChordsPage() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  
  const [questions, setQuestions] = useState<Chord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0); // 單位：百分之一秒
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<string[]>([]);
  const [currentOptions, setCurrentOptions] = useState<Chord[]>([]);
  const [questionTimeLeft, setQuestionTimeLeft] = useState<number | null>(null); // 當前題目剩餘時間
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const currentChord = questions[currentIndex];
  const config = DIFFICULTY_CONFIG[difficulty];
  
  // 格式化時間顯示 (mm:ss.cs)
  const formatTime = (centiseconds: number) => {
    const mins = Math.floor(centiseconds / 6000);
    const secs = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;
    return `${mins}:${secs.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };
  
  // 主計時器 (0.01秒精度)
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(t => t + 1);
      }, 10);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);
  
  // 題目限時計時器
  useEffect(() => {
    if (gameState === 'playing' && config.timeLimit) {
      setQuestionTimeLeft(config.timeLimit);
      questionTimerRef.current = setInterval(() => {
        setQuestionTimeLeft(t => {
          if (t === null || t <= 0.1) {
            // 時間到，算錯，自動下一題
            handleTimeUp();
            return 0;
          }
          return t ? t - 0.1 : 0;
        });
      }, 100);
    }
    return () => {
      if (questionTimerRef.current) clearInterval(questionTimerRef.current);
    };
  }, [gameState, currentIndex, difficulty]);
  
  const handleTimeUp = () => {
    playWrongSound();
    setSelectedAnswer('TIME_UP');
    setGameState('answered');
    // 2秒後自動下一題
    setTimeout(() => handleNextQuestion(), 2000);
  };
  
  // 根據難度生成題目
  const generateQuestions = useCallback((diff: Difficulty): Chord[] => {
    const { qualities, questionCount } = DIFFICULTY_CONFIG[diff];
    const filtered = CHORD_DATABASE.filter(c => qualities.includes(c.quality));
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(questionCount, filtered.length));
  }, []);
  
  // 生成選項
  const generateOptions = useCallback((chord: Chord, wrongs: string[], diff: Difficulty): Chord[] => {
    const { optionCount, qualities } = DIFFICULTY_CONFIG[diff];
    const correctName = chord.name;
    
    // 從符合難度要求的和弦中選擇干擾項
    const wrongChords = CHORD_DATABASE
      .filter(c => 
        c.name !== correctName && 
        !wrongs.includes(c.name) &&
        qualities.includes(c.quality)
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, optionCount - 1);
    
    return [chord, ...wrongChords].sort(() => Math.random() - 0.5);
  }, []);
  
  const startGame = () => {
    const newQuestions = generateQuestions(difficulty);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setTimeElapsed(0);
    setWrongAttempts([]);
    setSelectedAnswer(null);
    
    if (newQuestions.length > 0) {
      setCurrentOptions(generateOptions(newQuestions[0], [], difficulty));
    }
    
    // 倒數3秒開始
    setGameState('countdown');
    let count = 3;
    const countInterval = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(countInterval);
        setIsRunning(true);
        setGameState('playing');
      }
    }, 1000);
  };
  
  const handleAnswer = (answer: string) => {
    if (gameState !== 'playing') return;
    
    setSelectedAnswer(answer);
    
    if (answer === currentChord.name) {
      // 答對
      playCorrectSound();
      setScore(s => s + 1);
      setGameState('answered');
      // 立即下一題，無延遲
      setTimeout(() => handleNextQuestion(), 300);
    } else {
      // 答錯
      playWrongSound();
      setWrongAttempts(prev => [...prev, answer]);
      // 檢查是否還有未試過的選項
      const remainingOptions = currentOptions.filter(o => 
        o.name !== currentChord.name && 
        ![...wrongAttempts, answer].includes(o.name)
      );
      if (remainingOptions.length === 0) {
        // 所有選項都試過了，顯示答案後下一題
        setGameState('answered');
        setTimeout(() => handleNextQuestion(), 1500);
      }
    }
  };
  
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
      setWrongAttempts([]);
      setGameState('playing');
      setCurrentOptions(generateOptions(questions[nextIndex], [], difficulty));
    } else {
      setIsRunning(false);
      setGameState('summary');
    }
  };
  
  // 獲取當前顯示的選項（過濾掉已試過的錯誤選項）
  const displayOptions = currentOptions.filter(opt => 
    opt.name === currentChord?.name || !wrongAttempts.includes(opt.name)
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl hover:scale-110 transition-transform">←</Link>
          <h1 className="text-xl font-black">🎸 結他和弦挑戰</h1>
          <div className="w-8" />
        </div>
      </header>
      
      <main className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* 主選單 */}
          {gameState === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <div className="text-8xl mb-6">🎸</div>
              <h2 className="text-3xl font-black text-amber-800 mb-4">結他和弦大挑戰</h2>
              <p className="text-amber-600 mb-8">睇和弦圖，鬥快答出正確和弦！</p>
              
              <motion.button
                onClick={() => setGameState('select')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-black text-xl shadow-xl"
              >
                開始挑戰 🎵
              </motion.button>
            </motion.div>
          )}
          
          {/* 選擇難度 */}
          {gameState === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-black text-amber-800 mb-6 text-center">選擇難度</h2>
              
              <div className="space-y-3">
                {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((diff) => {
                  const cfg = DIFFICULTY_CONFIG[diff];
                  return (
                    <motion.button
                      key={diff}
                      onClick={() => setDifficulty(diff)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-2xl text-left transition-all ${
                        difficulty === diff
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                          : 'bg-amber-50 hover:bg-amber-100 text-amber-800'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{cfg.emoji}</span>
                        <div className="flex-1">
                          <div className="font-bold text-lg">{cfg.name}</div>
                          <div className={`text-sm ${difficulty === diff ? 'text-white/80' : 'text-amber-600'}`}>
                            {cfg.description} · {cfg.questionCount}題
                            {cfg.timeLimit && ` · 限時${cfg.timeLimit}秒/題`}
                          </div>
                        </div>
                        <div className={`text-2xl font-black ${difficulty === diff ? 'text-white' : 'text-amber-300'}`}>
                          {cfg.optionCount}選1
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setGameState('menu')}
                  className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold"
                >
                  返回
                </button>
                <button
                  onClick={startGame}
                  className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold shadow-lg"
                >
                  開始！
                </button>
              </div>
            </motion.div>
          )}
          
          {/* 倒數開始 */}
          {gameState === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <motion.div
                key="count-3"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.5 }}
                className="text-8xl font-black text-amber-500"
              >
                3
              </motion.div>
              <p className="text-amber-600 mt-4">準備開始...</p>
            </motion.div>
          )}
          
          {/* 遊戲中 */}
          {(gameState === 'playing' || gameState === 'answered') && currentChord && (
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* 狀態欄 */}
              <div className="flex justify-between items-center mb-4 bg-white rounded-2xl p-4 shadow-md">
                <div className="text-amber-800">
                  <span className="font-bold">{currentIndex + 1}</span>
                  <span className="text-amber-400"> / {questions.length}</span>
                </div>
                <div className="text-2xl font-mono font-black text-amber-600">
                  {formatTime(timeElapsed)}
                </div>
                <div className="text-green-600 font-bold">
                  ✅ {score}
                </div>
              </div>
              
              {/* 題目限時進度條 */}
              {config.timeLimit && gameState === 'playing' && (
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-red-500"
                      initial={{ width: '100%' }}
                      animate={{ width: `${(questionTimeLeft || 0) / config.timeLimit * 100}%` }}
                      transition={{ duration: 0.1, ease: 'linear' }}
                    />
                  </div>
                  <p className="text-center text-red-500 text-sm mt-1">
                    剩餘時間：{(questionTimeLeft || 0).toFixed(1)}秒
                  </p>
                </div>
              )}
              
              {/* 和弦圖 */}
              <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
                <ChordDiagram 
                  chord={currentChord} 
                  showAnswer={gameState === 'answered'} 
                />
              </div>
              
              {/* 答錯提示 */}
              {gameState === 'answered' && selectedAnswer !== currentChord.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 border-2 border-red-400 rounded-2xl p-4 mb-4 text-center"
                >
                  <p className="text-red-700 font-bold">
                    {selectedAnswer === 'TIME_UP' ? '時間到！' : '答錯了！'}
                  </p>
                  <p className="text-red-600">正確答案：{currentChord.name}</p>
                </motion.div>
              )}
              
              {/* 選項 - 動態網格根據選項數量調整 */}
              <div className={`grid gap-3 ${
                displayOptions.length <= 3 ? 'grid-cols-3' : 
                displayOptions.length <= 4 ? 'grid-cols-2' : 
                displayOptions.length <= 6 ? 'grid-cols-3' : 'grid-cols-4'
              }`}>
                {displayOptions.map((chord) => {
                  const isSelected = selectedAnswer === chord.name;
                  const isCorrect = chord.name === currentChord.name;
                  const isWrong = selectedAnswer === chord.name && !isCorrect;
                  const showResult = gameState === 'answered';
                  
                  let buttonClass = 'bg-white hover:bg-amber-50 text-amber-800 shadow-md';
                  if (showResult) {
                    if (isCorrect) buttonClass = 'bg-green-500 text-white shadow-lg';
                    else if (isWrong) buttonClass = 'bg-red-500 text-white shadow-lg';
                  }
                  
                  return (
                    <motion.button
                      key={chord.name}
                      onClick={() => handleAnswer(chord.name)}
                      disabled={gameState !== 'playing'}
                      whileHover={gameState === 'playing' ? { scale: 1.05 } : {}}
                      whileTap={gameState === 'playing' ? { scale: 0.95 } : {}}
                      className={`p-4 rounded-2xl font-black text-lg transition-all ${buttonClass}`}
                    >
                      {chord.name}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
          
          {/* 總結 */}
          {gameState === 'summary' && (
            <motion.div
              key="summary"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-8 shadow-xl text-center"
            >
              <div className="text-6xl mb-4">{config.emoji}</div>
              <h2 className="text-3xl font-black text-amber-800 mb-2">
                {config.name}級挑戰完成！
              </h2>
              
              <div className="bg-amber-50 rounded-2xl p-6 mb-6">
                <div className="text-5xl font-black text-amber-600 mb-2">
                  {score} / {questions.length}
                </div>
                <p className="text-amber-700">
                  正確率 {Math.round((score / questions.length) * 100)}%
                </p>
                <p className="text-2xl font-mono font-bold text-orange-600 mt-3">
                  總時間：{formatTime(timeElapsed)}
                </p>
              </div>
              
              {/* 評價 */}
              <div className="mb-6">
                {score === questions.length ? (
                  <p className="text-2xl font-bold text-green-600">🌟 完美！全對！</p>
                ) : score >= questions.length * 0.8 ? (
                  <p className="text-2xl font-bold text-blue-600">💪 好勁！繼續保持！</p>
                ) : score >= questions.length * 0.6 ? (
                  <p className="text-xl font-bold text-amber-600">👍 唔錯！再練多啲！</p>
                ) : (
                  <p className="text-xl font-bold text-orange-600">📚 加油！多啲練習！</p>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setGameState('menu')}
                  className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold"
                >
                  主選單
                </button>
                <button
                  onClick={() => setGameState('select')}
                  className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold shadow-lg"
                >
                  再玩一次
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
