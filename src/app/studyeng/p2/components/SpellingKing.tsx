'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpellingWord, unit4Words, unit5Words } from '../data/spelling-words';

type Difficulty = 'easy' | 'medium' | 'hard';
type Unit = 4 | 5 | 'all';

interface GameWord extends SpellingWord {
  id: number;
}

interface SpellingKingProps {
  onComplete?: (score: number, total: number, wrongCount: number) => void;
  onExit?: () => void;
}

export default function SpellingKing({ onComplete, onExit }: SpellingKingProps) {
  const [screen, setScreen] = useState<'menu' | 'game' | 'result'>('menu');
  const [unit, setUnit] = useState<Unit>(4);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [words, setWords] = useState<GameWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [letterStatus, setLetterStatus] = useState<Record<number, 'correct' | 'wrong' | 'pending'>>({});
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // 使用 ref 來儲存 nextQuestion 函數，避免循環依賴
  const nextQuestionRef = useRef<() => void>(() => {});

  // 生成遊戲單詞列表
  const generateWords = useCallback((selectedUnit: Unit): GameWord[] => {
    let list: SpellingWord[] = [];
    
    if (selectedUnit === 4) {
      list = [...unit4Words];
    } else if (selectedUnit === 5) {
      list = [...unit5Words];
    } else {
      list = [...unit4Words, ...unit5Words];
    }
    
    // 隨機排序
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    
    // 取10題
    return list.slice(0, 10).map((w, i) => ({ ...w, id: i }));
  }, []);

  // 語音合成
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // 下一題函數
  const nextQuestion = useCallback(() => {
    if (currentIndex < words.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setUserAnswer('');
      setLetterStatus({});
      setUsedIndices([]);
      setShowFeedback(false);
      
      if (difficulty === 'easy') {
        const letters = words[nextIdx].en.toUpperCase().split('').filter(l => l !== ' ' && l !== '-');
        for (let i = letters.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        setAvailableLetters(letters);
      }
    } else {
      setScreen('result');
      onComplete?.(score + 1, words.length, wrongCount);
    }
  }, [currentIndex, words, difficulty, score, wrongCount, onComplete]);

  // 更新 ref
  useEffect(() => {
    nextQuestionRef.current = nextQuestion;
  }, [nextQuestion]);

  // 開始遊戲
  const startGame = useCallback((selectedUnit: Unit, diff: Difficulty) => {
    setUnit(selectedUnit);
    setDifficulty(diff);
    const wordList = generateWords(selectedUnit);
    setWords(wordList);
    setCurrentIndex(0);
    setScore(0);
    setWrongCount(0);
    setUserAnswer('');
    setLetterStatus({});
    setUsedIndices([]);
    setStartTime(Date.now());
    setElapsedTime(0);
    setScreen('game');
    
    // 簡單模式：生成可用字母
    if (diff === 'easy' && wordList.length > 0) {
      const letters = wordList[0].en.toUpperCase().split('').filter(l => l !== ' ' && l !== '-');
      for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
      }
      setAvailableLetters(letters);
    }
  }, [generateWords]);

  // 計時器
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (screen === 'game' && startTime > 0) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [screen, startTime]);

  // 處理正確答案
  const handleCorrect = useCallback(() => {
    setIsCorrect(true);
    setShowFeedback(true);
    setScore(s => s + 1);
    
    setTimeout(() => {
      nextQuestionRef.current?.();
    }, 1500);
  }, []);

  // 處理錯誤答案
  const handleWrong = useCallback(() => {
    setIsCorrect(false);
    setShowFeedback(true);
    setWrongCount(w => w + 1);
    
    setTimeout(() => {
      setUserAnswer('');
      setLetterStatus({});
      setUsedIndices([]);
      if (difficulty === 'easy') {
        const letters = words[currentIndex].en.toUpperCase().split('').filter(l => l !== ' ' && l !== '-');
        for (let i = letters.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        setAvailableLetters(letters);
      }
      setShowFeedback(false);
    }, 2500);
  }, [difficulty, words, currentIndex]);

  // 處理字母輸入（中等/困難模式）
  const handleLetterInput = useCallback((letter: string) => {
    if (showFeedback) return;
    
    const currentWord = words[currentIndex];
    const target = currentWord.en.toLowerCase().replace(/[ -]/g, '');
    const newAnswer = userAnswer + letter.toLowerCase();
    const pos = userAnswer.length;
    
    const isLetterCorrect = target[pos] === letter.toLowerCase();
    
    if (difficulty === 'medium') {
      if (isLetterCorrect) {
        setUserAnswer(newAnswer);
        setLetterStatus(prev => ({ ...prev, [pos]: 'correct' }));
        
        if (newAnswer.length === target.length) {
          handleCorrect();
        }
      } else {
        setLetterStatus(prev => ({ ...prev, [pos]: 'wrong' }));
        setTimeout(() => {
          setLetterStatus(prev => ({ ...prev, [pos]: 'pending' }));
        }, 500);
      }
    } else {
      setUserAnswer(newAnswer);
      
      if (newAnswer.length === target.length) {
        if (newAnswer === target) {
          handleCorrect();
        } else {
          handleWrong();
        }
      }
    }
  }, [difficulty, userAnswer, words, currentIndex, showFeedback, handleCorrect, handleWrong]);

  // 簡單模式：點擊可用字母
  const handleEasyLetter = useCallback((letter: string, index: number) => {
    if (showFeedback || usedIndices.includes(index)) return;
    
    const currentWord = words[currentIndex];
    const target = currentWord.en.toLowerCase().replace(/[ -]/g, '');
    const newAnswer = userAnswer + letter.toLowerCase();
    
    setUserAnswer(newAnswer);
    setUsedIndices(prev => [...prev, index]);
    
    if (newAnswer.length === target.length) {
      if (newAnswer === target) {
        handleCorrect();
      } else {
        handleWrong();
      }
    }
  }, [userAnswer, words, currentIndex, showFeedback, usedIndices, handleCorrect, handleWrong]);

  const handleBackspace = useCallback(() => {
    if (showFeedback) return;
    if (userAnswer.length === 0) return;
    
    setUserAnswer(prev => prev.slice(0, -1));
    
    if (difficulty === 'easy') {
      setUsedIndices(prev => prev.slice(0, -1));
    } else if (difficulty === 'medium') {
      const pos = userAnswer.length - 1;
      setLetterStatus(prev => {
        const newStatus = { ...prev };
        delete newStatus[pos];
        return newStatus;
      });
    }
  }, [difficulty, userAnswer.length, showFeedback]);

  const handleClear = useCallback(() => {
    if (showFeedback) return;
    setUserAnswer('');
    setLetterStatus({});
    setUsedIndices([]);
    
    if (difficulty === 'easy') {
      const letters = words[currentIndex].en.toUpperCase().split('').filter(l => l !== ' ' && l !== '-');
      for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
      }
      setAvailableLetters(letters);
    }
  }, [difficulty, words, currentIndex, showFeedback]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // 選單畫面
  if (screen === 'menu') {
    return (
      <div className="max-w-md mx-auto p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-6 shadow-xl text-center"
        >
          <div className="text-5xl mb-3">👑</div>
          <h2 className="text-2xl font-bold text-purple-700 mb-2">英文串字王</h2>
          <p className="text-gray-500 mb-6">P.2 英文串字挑戰</p>
          
          <div className="space-y-3">
            <p className="text-sm text-gray-500">選擇單元</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => startGame(4, 'easy')} 
                className="py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl font-bold">
                Unit 4<br/><span className="text-xs">食物</span>
              </button>
              <button onClick={() => startGame(5, 'easy')}
                className="py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-xl font-bold">
                Unit 5<br/><span className="text-xs">交通</span>
              </button>
              <button onClick={() => startGame('all', 'easy')}
                className="py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl font-bold">
                全部<br/><span className="text-xs">混合</span>
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">困難度</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => startGame(unit, 'easy')}
                className={`py-2 rounded-xl font-bold ${difficulty === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>
                🟢 簡單
              </button>
              <button onClick={() => startGame(unit, 'medium')}
                className={`py-2 rounded-xl font-bold ${difficulty === 'medium' ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}>
                🟡 中等
              </button>
              <button onClick={() => startGame(unit, 'hard')}
                className={`py-2 rounded-xl font-bold ${difficulty === 'hard' ? 'bg-red-500 text-white' : 'bg-gray-100'}`}>
                🔴 困難
              </button>
            </div>
          </div>
          
          <button onClick={onExit} className="mt-6 text-gray-500 hover:text-gray-700">
            ← 返回
          </button>
        </motion.div>
      </div>
    );
  }

  // 結果畫面
  if (screen === 'result') {
    const percentage = Math.round((score / words.length) * 100);
    return (
      <div className="max-w-md mx-auto p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-xl text-center"
        >
          <div className="text-6xl mb-4">{percentage >= 80 ? '👑' : percentage >= 60 ? '👍' : '💪'}</div>
          <h3 className="text-2xl font-bold text-purple-700 mb-2">串字王挑戰完成！</h3>
          <p className="text-gray-600 mb-2">
            答對 <span className="text-3xl font-bold text-green-500">{score}</span> / {words.length} 題
          </p>
          <p className="text-gray-500 mb-4">用時: {formatTime(elapsedTime)} | 錯誤: {wrongCount}次</p>
          <div className="text-sm text-gray-500 mb-6">
            {percentage >= 80 ? '太棒了！你是串字王！' : 
             percentage >= 60 ? '做得不錯！再練習！' : 
             '繼續努力！多拼多記！'}
          </div>
          <div className="space-y-3">
            <button onClick={() => setScreen('menu')}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg">
              再玩一次
            </button>
            <button onClick={onExit}
              className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-bold">
              返回課程
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 遊戲畫面
  const currentWord = words[currentIndex];
  if (!currentWord) return null;

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 進度條 */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>題目 {currentIndex + 1} / {words.length}</span>
          <span>⏱️ {formatTime(elapsedTime)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-purple-500 h-2 rounded-full transition-all" 
               style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }} />
        </div>
      </div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-3xl p-6 shadow-xl"
      >
        {/* 題目 */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">{currentWord.emoji}</div>
          <p className="text-gray-500 text-lg">{currentWord.zh}</p>
          <button onClick={() => speak(currentWord.en)}
            className="mt-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
            🔊 聽發音
          </button>
        </div>

        {/* 答案輸入區 */}
        <div className="mb-6">
          <div className="flex justify-center gap-1 flex-wrap mb-4">
            {currentWord.en.split('').map((char, i) => {
              if (char === ' ' || char === '-') {
                return <div key={i} className="w-2" />;
              }
              const cleanAnswer = userAnswer.replace(/[ -]/g, '');
              const letter = cleanAnswer[i] || '';
              const status = letterStatus[i] || 'pending';
              
              return (
                <div key={i}
                  className={`w-10 h-12 rounded-lg flex items-center justify-center text-xl font-bold border-2
                    ${status === 'correct' ? 'bg-green-100 border-green-500 text-green-700' :
                      status === 'wrong' ? 'bg-red-100 border-red-500 text-red-700' :
                      letter ? 'bg-blue-100 border-blue-500 text-blue-700' :
                      'bg-gray-50 border-gray-300'}`}>
                  {letter.toUpperCase()}
                </div>
              );
            })}
          </div>

          {/* 簡單模式：可用字母 */}
          {difficulty === 'easy' && (
            <div className="grid grid-cols-5 gap-2 mb-4">
              {availableLetters.map((letter, idx) => (
                <button key={idx}
                  onClick={() => handleEasyLetter(letter, idx)}
                  disabled={usedIndices.includes(idx)}
                  className={`h-12 rounded-lg text-lg font-bold transition-all
                    ${usedIndices.includes(idx) 
                      ? 'bg-gray-200 text-gray-400' 
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200 active:scale-95'}`}>
                  {letter}
                </button>
              ))}
            </div>
          )}

          {/* 中等/困難模式：鍵盤 */}
          {difficulty !== 'easy' && (
            <div className="grid grid-cols-7 gap-1 mb-4">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                <button key={letter}
                  onClick={() => handleLetterInput(letter)}
                  className="h-10 rounded bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 active:scale-95">
                  {letter}
                </button>
              ))}
            </div>
          )}

          {/* 控制按 */}
          <div className="flex gap-2">
            <button onClick={handleBackspace}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold">
              ← 退格
            </button>
            <button onClick={handleClear}
              className="flex-1 py-3 bg-red-100 text-red-600 rounded-xl font-bold">
              清除
            </button>
          </div>
        </div>

        {/* 反饋 */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`text-center p-4 rounded-xl ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className="text-4xl mb-1">{isCorrect ? '✅' : '❌'}</div>
              <p className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? '正確！' : `正確答案: ${currentWord.en}`}
              </p>
              {!isCorrect && <p className="text-sm text-red-500 mt-1">再試一次...</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
