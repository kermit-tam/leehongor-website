'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChordDiagram } from './components/ChordDiagram';
import { 
  CHORD_DATABASE, 
  ROOTS, 
  QUALITIES, 
  Chord, 
  ChordQuality,
  getRandomChords,
  getChordDisplayName 
} from './data/chords';

type GameState = 'menu' | 'select' | 'playing' | 'answered' | 'summary';

interface GameConfig {
  root: string | 'all';
  quality: ChordQuality | 'all';
  questionCount: number;
}

export default function GuitarChordsPage() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [config, setConfig] = useState<GameConfig>({
    root: 'all',
    quality: 'all',
    questionCount: 10,
  });
  
  const [questions, setQuestions] = useState<Chord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<string[]>([]);
  const [showGiveUp, setShowGiveUp] = useState(false);
  const [giveUpTimer, setGiveUpTimer] = useState(5);
  const [currentOptions, setCurrentOptions] = useState<Chord[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const giveUpTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const currentChord = questions[currentIndex];
  
  // 計時器
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);
  
  // 放棄計時器
  useEffect(() => {
    if (gameState === 'answered' && selectedAnswer !== currentChord?.name) {
      setShowGiveUp(true);
      setGiveUpTimer(5);
      giveUpTimerRef.current = setInterval(() => {
        setGiveUpTimer(t => {
          if (t <= 1) {
            // 時間到，自動下一題
            handleNextQuestion();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (giveUpTimerRef.current) clearInterval(giveUpTimerRef.current);
    };
  }, [gameState, selectedAnswer, currentChord]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // 生成選項（只在一題開始時調用）
  const generateOptions = useCallback((chord: Chord, wrongs: string[]) => {
    const correctName = chord.name;
    const wrongChords = CHORD_DATABASE
      .filter(c => c.name !== correctName && !wrongs.includes(c.name))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    return [chord, ...wrongChords].sort(() => Math.random() - 0.5);
  }, []);

  const startGame = () => {
    const root = config.root === 'all' ? undefined : config.root;
    const quality = config.quality === 'all' ? undefined : config.quality;
    const newQuestions = getRandomChords(config.questionCount, root, quality);
    
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setTimer(0);
    setWrongAttempts([]);
    setSelectedAnswer(null);
    setIsRunning(true);
    
    // 生成第一題的選項
    if (newQuestions.length > 0) {
      setCurrentOptions(generateOptions(newQuestions[0], []));
    }
    
    setGameState('playing');
  };
  
  const handleAnswer = (answer: string) => {
    if (gameState !== 'playing') return;
    
    setSelectedAnswer(answer);
    
    if (answer === currentChord.name) {
      // 答對
      setScore(s => s + 1);
      setGameState('answered');
      // 自動下一題
      setTimeout(() => handleNextQuestion(), 1000);
    } else {
      // 答錯
      setWrongAttempts(prev => [...prev, answer]);
      setGameState('answered');
    }
  };
  
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
      setWrongAttempts([]);
      setGameState('playing');
      setShowGiveUp(false);
      // 預先生成下一題的選項
      setCurrentOptions(generateOptions(questions[nextIndex], []));
    } else {
      // 遊戲結束
      setIsRunning(false);
      setGameState('summary');
    }
  };
  
  const handleSkip = () => {
    handleNextQuestion();
  };
  
  // 使用預先生成的選項
  
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
          
          {/* 選擇設定 */}
          {gameState === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-black text-amber-800 mb-6 text-center">選擇挑戰設定</h2>
              
              {/* 根音選擇 */}
              <div className="mb-6">
                <label className="block text-amber-700 font-bold mb-3">根音 (Root)</label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setConfig(c => ({ ...c, root: 'all' }))}
                    className={`p-3 rounded-xl font-bold transition-all ${
                      config.root === 'all' 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    }`}
                  >
                    全部
                  </button>
                  {ROOTS.map(root => (
                    <button
                      key={root}
                      onClick={() => setConfig(c => ({ ...c, root }))}
                      className={`p-3 rounded-xl font-bold transition-all ${
                        config.root === root 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      }`}
                    >
                      {root}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 和弦性質選擇 */}
              <div className="mb-6">
                <label className="block text-amber-700 font-bold mb-3">和弦性質 (Quality)</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setConfig(c => ({ ...c, quality: 'all' }))}
                    className={`p-3 rounded-xl font-bold transition-all ${
                      config.quality === 'all' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    }`}
                  >
                    全部
                  </button>
                  {QUALITIES.map(q => (
                    <button
                      key={q.id}
                      onClick={() => setConfig(c => ({ ...c, quality: q.id }))}
                      className={`p-3 rounded-xl font-bold transition-all ${
                        config.quality === q.id 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      }`}
                    >
                      {q.name} ({q.symbol || 'maj'})
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 題目數量 */}
              <div className="mb-8">
                <label className="block text-amber-700 font-bold mb-3">題目數量</label>
                <div className="flex gap-2">
                  {[5, 10, 15, 20].map(count => (
                    <button
                      key={count}
                      onClick={() => setConfig(c => ({ ...c, questionCount: count }))}
                      className={`flex-1 p-3 rounded-xl font-bold transition-all ${
                        config.questionCount === count 
                          ? 'bg-yellow-500 text-white' 
                          : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      }`}
                    >
                      {count}題
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
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
                  {formatTime(timer)}
                </div>
                <div className="text-green-600 font-bold">
                  ✅ {score}
                </div>
              </div>
              
              {/* 和弦圖 */}
              <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
                <ChordDiagram 
                  chord={currentChord} 
                  showAnswer={gameState === 'answered'} 
                />
              </div>
              
              {/* 放棄提示 */}
              {showGiveUp && selectedAnswer !== currentChord.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 border-2 border-red-400 rounded-2xl p-4 mb-4 text-center"
                >
                  <p className="text-red-700 font-bold mb-2">
                    答錯了！{giveUpTimer}秒後自動下一題
                  </p>
                  <button
                    onClick={handleSkip}
                    className="px-6 py-2 bg-red-500 text-white rounded-xl font-bold"
                  >
                    放棄，下一題 →
                  </button>
                </motion.div>
              )}
              
              {/* 選項 */}
              <div className="grid grid-cols-2 gap-3">
                {currentOptions.map((chord) => {
                  const isSelected = selectedAnswer === chord.name;
                  const isCorrect = chord.name === currentChord.name;
                  const isWrongAttempt = wrongAttempts.includes(chord.name);
                  const showResult = gameState === 'answered';
                  
                  let buttonClass = 'bg-white hover:bg-amber-50 text-amber-800';
                  if (showResult) {
                    if (isCorrect) buttonClass = 'bg-green-500 text-white';
                    else if (isSelected && !isCorrect) buttonClass = 'bg-red-500 text-white';
                    else if (isWrongAttempt) buttonClass = 'bg-gray-200 text-gray-400';
                  } else if (isWrongAttempt) {
                    buttonClass = 'bg-gray-200 text-gray-400 cursor-not-allowed';
                  }
                  
                  return (
                    <motion.button
                      key={chord.name}
                      onClick={() => handleAnswer(chord.name)}
                      disabled={gameState !== 'playing' || isWrongAttempt}
                      whileHover={gameState === 'playing' && !isWrongAttempt ? { scale: 1.02 } : {}}
                      whileTap={gameState === 'playing' && !isWrongAttempt ? { scale: 0.98 } : {}}
                      className={`p-5 rounded-2xl font-black text-xl shadow-md transition-all ${buttonClass}`}
                    >
                      {chord.name}
                      {isWrongAttempt && <span className="block text-xs font-normal">已試過</span>}
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
              <div className="text-6xl mb-4">🎸</div>
              <h2 className="text-3xl font-black text-amber-800 mb-4">挑戰完成！</h2>
              
              <div className="bg-amber-50 rounded-2xl p-6 mb-6">
                <div className="text-5xl font-black text-amber-600 mb-2">
                  {score} / {questions.length}
                </div>
                <p className="text-amber-700">
                  正確率 {Math.round((score / questions.length) * 100)}%
                </p>
                <p className="text-2xl font-mono font-bold text-orange-600 mt-3">
                  總時間：{formatTime(timer)}
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setGameState('menu')}
                  className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold"
                >
                  主選單
                </button>
                <button
                  onClick={startGame}
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
