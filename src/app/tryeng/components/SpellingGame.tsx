'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Word {
  en: string;
  zh: string;
  emoji: string;
  pair?: string; // 對應的單數/眾數
}

interface WordPair {
  singular: Word;
  plural: Word;
}

const UNIT4_PAIRS: WordPair[] = [
  { singular: { en: 'banana', zh: '香蕉', emoji: '🍌' }, plural: { en: 'bananas', zh: '香蕉（複數）', emoji: '🍌' } },
  { singular: { en: 'pear', zh: '梨', emoji: '🍐' }, plural: { en: 'pears', zh: '梨（複數）', emoji: '🍐' } },
  { singular: { en: 'mango', zh: '芒果', emoji: '🥭' }, plural: { en: 'mangoes', zh: '芒果（複數）', emoji: '🥭' } },
  { singular: { en: 'potato', zh: '薯仔', emoji: '🥔' }, plural: { en: 'potatoes', zh: '薯仔（複數）', emoji: '🥔' } },
  { singular: { en: 'peach', zh: '桃', emoji: '🍑' }, plural: { en: 'peaches', zh: '桃（複數）', emoji: '🍑' } },
  { singular: { en: 'sandwich', zh: '三文治', emoji: '🥪' }, plural: { en: 'sandwiches', zh: '三文治（複數）', emoji: '🥪' } },
  { singular: { en: 'cherry', zh: '車厘子', emoji: '🍒' }, plural: { en: 'cherries', zh: '車厘子（複數）', emoji: '🍒' } },
  { singular: { en: 'strawberry', zh: '草莓', emoji: '🍓' }, plural: { en: 'strawberries', zh: '草莓（複數）', emoji: '🍓' } },
  { singular: { en: 'sweet', zh: '甜的', emoji: '🍬' }, plural: { en: 'sweets', zh: '糖果', emoji: '🍭' } },
  { singular: { en: 'cake', zh: '蛋糕', emoji: '🎂' }, plural: { en: 'cakes', zh: '蛋糕（複數）', emoji: '🎂' } },
];

const UNIT4_SINGLE: Word[] = [
  { en: 'thirsty', zh: '口渴', emoji: '🥤' },
  { en: 'hungry', zh: '肚餓', emoji: '😋' },
  { en: 'full', zh: '飽', emoji: '😌' },
  { en: 'thank you', zh: '多謝', emoji: '🙏' },
  { en: 'fine', zh: '好的', emoji: '👍' },
  { en: 'king', zh: '國王', emoji: '👑' },
  { en: 'sorry', zh: '對不起', emoji: '😔' },
  { en: 'please', zh: '請', emoji: '🙏' },
];

const UNIT5_WORDS: Word[] = [
  { en: 'on foot', zh: '步行', emoji: '🚶' },
  { en: 'bus', zh: '巴士', emoji: '🚌' },
  { en: 'minibus', zh: '小巴', emoji: '🚐' },
  { en: 'school bus', zh: '校巴', emoji: '🚌' },
  { en: 'taxi', zh: '的士', emoji: '🚕' },
  { en: 'MTR', zh: '港鐵', emoji: '🚇' },
  { en: 'train', zh: '火車', emoji: '🚆' },
  { en: 'light rail', zh: '輕鐵', emoji: '🚊' },
  { en: 'tram', zh: '電車', emoji: '🚋' },
  { en: 'ferry', zh: '渡輪', emoji: '⛴️' },
  { en: 'come', zh: '來', emoji: '👋' },
  { en: 'school', zh: '學校', emoji: '🏫' },
  { en: 'Shatin', zh: '沙田', emoji: '📍' },
];

type Difficulty = 'easy' | 'medium' | 'hard';
type Screen = 'menu' | 'learn' | 'difficulty' | 'game' | 'result' | 'leaderboard';
type Unit = 4 | 5;

interface LeaderboardEntry {
  name: string;
  score: number;
  difficulty: Difficulty;
  unit: Unit;
  date: string;
}

interface GameWord extends Word {
  id: number;
}

interface SpellingGameProps {
  onExit?: () => void;
}

export default function SpellingGame({ onExit }: SpellingGameProps) {
  const [screen, setScreen] = useState<Screen>('menu');
  const [unit, setUnit] = useState<Unit>(4);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [words, setWords] = useState<GameWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [letterStatus, setLetterStatus] = useState<Record<number, 'correct' | 'wrong' | 'pending'>>({});
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [learnIndex, setLearnIndex] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [scoreSaved, setScoreSaved] = useState(false);

  // 載入排行榜
  const loadLeaderboard = useCallback(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('leaderboard-spelling');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLeaderboard(parsed);
        } catch (e) {
          console.error('Failed to parse leaderboard:', e);
        }
      }
    }
  }, []);

  // 保存到排行榜
  const saveToLeaderboard = useCallback(() => {
    if (!playerName.trim()) return;
    
    const newEntry: LeaderboardEntry = {
      name: playerName.trim(),
      score,
      difficulty,
      unit,
      date: new Date().toISOString(),
    };
    
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    setLeaderboard(updated);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('leaderboard-spelling', JSON.stringify(updated));
    }
    
    setScoreSaved(true);
  }, [playerName, score, difficulty, unit, leaderboard]);

  // 初始化載入排行榜
  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  // 語音合成
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // 生成遊戲單詞列表
  const generateWords = (selectedUnit: Unit): GameWord[] => {
    const list: GameWord[] = [];
    
    if (selectedUnit === 4) {
      // Unit 4: 從配對中選擇單數或眾數
      UNIT4_PAIRS.forEach((pair, idx) => {
        // 50% 機率選單數或眾數
        const word = Math.random() > 0.5 ? pair.singular : pair.plural;
        list.push({ ...word, id: idx * 2 });
      });
      // 加入單獨單詞
      UNIT4_SINGLE.forEach((word, idx) => {
        list.push({ ...word, id: 100 + idx });
      });
    } else {
      // Unit 5
      UNIT5_WORDS.forEach((word, idx) => {
        list.push({ ...word, id: 200 + idx });
      });
    }
    
    // 隨機排序
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    
    return list.slice(0, 10); // 取10題
  };

  // 開始遊戲
  const startGame = (selectedUnit: Unit, diff: Difficulty) => {
    setUnit(selectedUnit);
    setDifficulty(diff);
    const wordList = generateWords(selectedUnit);
    setWords(wordList);
    setCurrentIndex(0);
    setScore(0);
    setUserAnswer('');
    setLetterStatus({});
    setUsedIndices([]);
    setPlayerName('');
    setScoreSaved(false);
    setScreen('game');
    
    // 簡單模式：生成可用字母（包括空格）
    if (diff === 'easy' && wordList.length > 0) {
      const letters = wordList[0].en.toUpperCase().split('');
      // 打亂順序（但保留空格在原位或打亂後）
      for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
      }
      setAvailableLetters(letters);
    }
  };

  // 處理字母輸入（中等/困難模式）
  const handleLetterInput = (letter: string) => {
    if (showFeedback) return;
    
    const currentWord = words[currentIndex];
    const target = currentWord.en.toLowerCase();
    const newAnswer = userAnswer + letter.toLowerCase();
    const pos = userAnswer.length;
    
    // 檢查這個位置是否正確
    const isCorrect = target[pos] === letter.toLowerCase();
    
    if (difficulty === 'medium') {
      // 中等模式：必須順序正確
      if (isCorrect) {
        setUserAnswer(newAnswer);
        setLetterStatus(prev => ({ ...prev, [pos]: 'correct' }));
        
        // 檢查是否完成
        if (newAnswer.length === target.length) {
          handleCorrect();
        }
      } else {
        // 錯誤：標記為紅色，但不加入答案
        setLetterStatus(prev => ({ ...prev, [pos]: 'wrong' }));
        setTimeout(() => {
          setLetterStatus(prev => ({ ...prev, [pos]: 'pending' }));
        }, 500);
      }
    } else {
      // 困難模式：可以自由輸入
      setUserAnswer(newAnswer);
      
      if (newAnswer.length === target.length) {
        if (newAnswer.toLowerCase() === target) {
          handleCorrect();
        } else {
          handleWrong();
        }
      }
    }
  };

  // 簡單模式：點擊可用字母
  const handleEasyLetter = (letter: string, index: number) => {
    if (showFeedback || usedIndices.includes(index)) return;
    
    const currentWord = words[currentIndex];
    const target = currentWord.en.toLowerCase();
    const newAnswer = userAnswer + letter.toLowerCase();
    
    setUserAnswer(newAnswer);
    setUsedIndices(prev => [...prev, index]);
    
    if (newAnswer.length === target.length) {
      if (newAnswer.toLowerCase() === target) {
        handleCorrect();
      } else {
        handleWrong();
      }
    }
  };

  const handleCorrect = () => {
    setIsCorrect(true);
    setShowFeedback(true);
    setScore(s => s + 1);
    
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const handleWrong = () => {
    setIsCorrect(false);
    setShowFeedback(true);
    
    setTimeout(() => {
      // 重置
      setUserAnswer('');
      setLetterStatus({});
      setUsedIndices([]);
      if (difficulty === 'easy') {
        // 重新打亂字母（包括空格）
        const letters = words[currentIndex].en.toUpperCase().split('');
        for (let i = letters.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        setAvailableLetters(letters);
      }
      setShowFeedback(false);
    }, 1500);
  };

  const nextQuestion = () => {
    if (currentIndex < words.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setUserAnswer('');
      setLetterStatus({});
      setUsedIndices([]);
      setShowFeedback(false);
      
      if (difficulty === 'easy') {
        const letters = words[nextIdx].en.toUpperCase().split('');
        for (let i = letters.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        setAvailableLetters(letters);
      }
    } else {
      setScreen('result');
    }
  };

  const handleBackspace = () => {
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
  };

  const handleClear = () => {
    if (showFeedback) return;
    setUserAnswer('');
    setLetterStatus({});
    setUsedIndices([]);
    
    if (difficulty === 'easy') {
      const letters = words[currentIndex].en.toUpperCase().split('').filter(l => l !== ' ');
      for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
      }
      setAvailableLetters(letters);
    }
  };

  // 學習卡：獲取當前配對
  const getCurrentPair = (): WordPair | null => {
    if (unit !== 4) return null;
    const currentWord = words[learnIndex];
    return UNIT4_PAIRS.find(p => 
      p.singular.en === currentWord.en || p.plural.en === currentWord.en
    ) || null;
  };

  // 菜單畫面
  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative"
        >
          <button 
            onClick={() => onExit ? onExit() : window.location.href = '/tryeng'}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ←
          </button>
          
          <div className="text-6xl mb-4">🔤</div>
          <h1 className="text-4xl font-black mb-2 text-purple-600">英文串字王</h1>
          <p className="text-gray-600 mb-6 text-lg">選擇單元開始學習！</p>
          
          <div className="space-y-3">
            <button
              onClick={() => setScreen('learn')}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
            >
              📚 學習卡模式
              <span className="block text-sm font-normal opacity-90">先學習再挑戰</span>
            </button>
            <button
              onClick={() => { setUnit(4); setScreen('difficulty'); }}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
            >
              🍎 2A Unit 4 (食物)
              <span className="block text-sm font-normal opacity-90">18個單字</span>
            </button>
            <button
              onClick={() => { setUnit(5); setScreen('difficulty'); }}
              className="w-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
            >
              🚌 2A Unit 5 (交通工具)
              <span className="block text-sm font-normal opacity-90">13個單字</span>
            </button>
            <button
              onClick={() => setScreen('leaderboard')}
              className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
            >
              🏆 排行榜
              <span className="block text-sm font-normal opacity-90">查看最高紀錄</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 難度選擇
  if (screen === 'difficulty') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <button 
            onClick={() => setScreen('menu')}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ←
          </button>
          
          <div className="text-5xl mb-4">{unit === 4 ? '🍎' : '🚌'}</div>
          <h1 className="text-3xl font-black mb-2 text-purple-600">Unit {unit}</h1>
          <p className="text-gray-600 mb-6">選擇難度</p>
          
          <div className="space-y-3">
            <button
              onClick={() => startGame(unit, 'easy')}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
            >
              🌱 簡單
              <span className="block text-sm font-normal opacity-90">只給需要的字母</span>
            </button>
            <button
              onClick={() => startGame(unit, 'medium')}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
            >
              🌿 中等
              <span className="block text-sm font-normal opacity-90">26個字母，順序要對</span>
            </button>
            <button
              onClick={() => startGame(unit, 'hard')}
              className="w-full bg-gradient-to-r from-red-400 to-pink-500 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
            >
              🌳 困難
              <span className="block text-sm font-normal opacity-90">26個字母自由輸入</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 學習卡模式
  if (screen === 'learn') {
    const allWords = [...UNIT4_PAIRS.map(p => [p.singular, p.plural]).flat(), ...UNIT4_SINGLE, ...UNIT5_WORDS];
    const currentWord = allWords[learnIndex];
    const pair = UNIT4_PAIRS.find(p => 
      p.singular.en === currentWord.en || p.plural.en === currentWord.en
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={() => setScreen('menu')}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ←
            </button>
            <div className="text-lg font-bold text-green-600">
              {learnIndex + 1} / {allWords.length}
            </div>
          </div>
          
          <div className="text-center py-8">
            <div className="text-7xl mb-4">{currentWord.emoji}</div>
            <h2 className="text-4xl font-black text-gray-800 mb-2">{currentWord.en}</h2>
            <p className="text-xl text-gray-600 mb-4">{currentWord.zh}</p>
            
            {/* 播放按 */}
            <button
              onClick={() => speak(currentWord.en)}
              className="bg-green-100 hover:bg-green-200 text-green-700 px-6 py-3 rounded-full font-bold mb-6 inline-flex items-center gap-2"
            >
              🔊 聽發音
            </button>
            
            {/* 配對顯示（Unit 4 有單眾數） */}
            {pair && (
              <div className="bg-green-50 rounded-2xl p-4 mt-4">
                <p className="text-green-600 font-bold mb-2">📚 單數與眾數</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-3">
                    <div className="text-3xl mb-1">{pair.singular.emoji}</div>
                    <div className="font-bold text-gray-800">{pair.singular.en}</div>
                    <div className="text-sm text-gray-500">{pair.singular.zh}</div>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <div className="text-3xl mb-1">{pair.plural.emoji}</div>
                    <div className="font-bold text-gray-800">{pair.plural.en}</div>
                    <div className="text-sm text-gray-500">{pair.plural.zh}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setLearnIndex(i => Math.max(0, i - 1))}
              disabled={learnIndex === 0}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl font-bold disabled:opacity-50"
            >
              ← 上一個
            </button>
            <button
              onClick={() => {
                if (learnIndex < allWords.length - 1) {
                  setLearnIndex(i => i + 1);
                } else {
                  setScreen('menu');
                }
              }}
              className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 rounded-2xl font-bold"
            >
              {learnIndex < allWords.length - 1 ? '下一個 →' : '完成 ✓'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 結果畫面
  if (screen === 'result') {
    const total = words.length;
    const percentage = Math.round((score / total) * 100);
    let stars = '⭐';
    if (percentage >= 80) stars = '⭐⭐⭐';
    else if (percentage >= 50) stars = '⭐⭐';
    
    const difficultyLabel = difficulty === 'easy' ? '簡單' : difficulty === 'medium' ? '中等' : '困難';
    const unitLabel = unit === 4 ? 'Unit 4' : 'Unit 5';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="text-6xl mb-4">{stars}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {percentage >= 80 ? '太棒了！' : percentage >= 50 ? '做得好！' : '繼續努力！'}
          </h1>
          <p className="text-2xl text-purple-600 font-bold mb-2">{score} / {total} 題答對</p>
          <p className="text-sm text-gray-500 mb-6">{unitLabel} · {difficultyLabel}</p>
          
          {/* 保存到排行榜 */}
          {!scoreSaved ? (
            <div className="mb-6 p-4 bg-blue-50 rounded-2xl">
              <p className="text-blue-700 font-bold mb-3">🏆 保存你的成績</p>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="輸入你的名字"
                maxLength={20}
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-400 focus:outline-none text-center text-lg mb-3"
              />
              <button
                onClick={saveToLeaderboard}
                disabled={!playerName.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
              >
                🏆 儲存到排行榜
              </button>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-green-50 rounded-2xl">
              <p className="text-green-700 font-bold">✅ 已保存到排行榜！</p>
            </div>
          )}
          
          <div className="space-y-3">
            <button
              onClick={() => startGame(unit, difficulty)}
              className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              再玩一次 🔄
            </button>
            <button
              onClick={() => setScreen('leaderboard')}
              className="w-full bg-gradient-to-r from-indigo-400 to-blue-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              🏆 查看排行榜
            </button>
            <button
              onClick={() => setScreen('difficulty')}
              className="w-full bg-gradient-to-r from-gray-300 to-gray-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              選擇其他難度
            </button>
            <button
              onClick={() => onExit ? onExit() : setScreen('menu')}
              className="w-full bg-gray-200 text-gray-700 py-4 rounded-2xl text-xl font-bold"
            >
              {onExit ? '返回' : '返回主頁'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 排行榜畫面
  if (screen === 'leaderboard') {
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    };
    
    const getDifficultyEmoji = (diff: Difficulty) => {
      if (diff === 'easy') return '🌱';
      if (diff === 'medium') return '🌿';
      return '🌳';
    };
    
    const getUnitEmoji = (u: Unit) => {
      return u === 4 ? '🍎' : '🚌';
    };
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-400 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        >
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🏆</div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              英文串字排行榜
            </h1>
            <p className="text-gray-500 text-sm mt-2">Top 10 最高紀錄</p>
          </div>
          
          {leaderboard.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-3">📝</div>
              <p>暫時冇紀錄</p>
              <p className="text-sm">快啲玩遊戲創下紀錄啦！</p>
            </div>
          ) : (
            <div className="space-y-2 mb-6 max-h-80 overflow-y-auto">
              {leaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    index === 0
                      ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300'
                      : index === 1
                      ? 'bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300'
                      : index === 2
                      ? 'bg-gradient-to-r from-amber-50 to-yellow-100 border-2 border-amber-300'
                      : 'bg-blue-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-lg ${
                    index === 0
                      ? 'bg-yellow-400 text-white'
                      : index === 1
                      ? 'bg-gray-400 text-white'
                      : index === 2
                      ? 'bg-amber-500 text-white'
                      : 'bg-blue-200 text-blue-700'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-800">{entry.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <span>{getUnitEmoji(entry.unit)}</span>
                      <span>{getDifficultyEmoji(entry.difficulty)}</span>
                      <span>· {formatDate(entry.date)}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-purple-600">
                    {entry.score}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="space-y-3">
            <button
              onClick={() => setScreen('menu')}
              className="w-full bg-gradient-to-r from-purple-400 to-blue-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              返回主頁 🏠
            </button>
            {leaderboard.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('確定要清除所有排行榜紀錄嗎？')) {
                    setLeaderboard([]);
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('leaderboard-spelling');
                    }
                  }
                }}
                className="w-full bg-red-100 text-red-600 py-3 rounded-2xl font-bold hover:bg-red-200 transition-colors"
              >
                🗑️ 清除排行榜
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // 遊戲畫面
  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl">
        {/* 進度 */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-purple-600">第 {currentIndex + 1} / {words.length} 題</div>
          <div className="text-lg font-bold text-pink-500">⭐ {score}</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <motion.div 
            className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        {/* 題目區 */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{currentWord.emoji}</div>
          <p className="text-gray-500 mb-2 text-lg">{currentWord.zh}</p>
          
          {/* 播放按 */}
          <button
            onClick={() => speak(currentWord.en)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-full font-bold mb-4 inline-flex items-center gap-2"
          >
            🔊 聽發音
          </button>
          
          {/* 答案格 */}
          <div className="flex justify-center gap-1 flex-wrap my-4">
            {currentWord.en.split('').map((char, i) => {
              if (char === ' ') {
                return <div key={i} className="w-2" />;
              }
              const status = letterStatus[i];
              const filled = i < userAnswer.length;
              
              return (
                <div
                  key={i}
                  className={`w-10 h-12 sm:w-12 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold border-2 transition-all ${
                    status === 'correct'
                      ? 'bg-green-100 border-green-400 text-green-700'
                      : status === 'wrong'
                      ? 'bg-red-100 border-red-400 text-red-700 animate-shake'
                      : filled
                      ? 'bg-purple-100 border-purple-400 text-purple-700'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}
                >
                  {filled ? userAnswer[i].toUpperCase() : ''}
                </div>
              );
            })}
          </div>

          {/* 反饋 */}
          {showFeedback && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`text-2xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
            >
              {isCorrect ? '✅ 答對了！' : `❌ 正確答案：${currentWord.en}`}
            </motion.div>
          )}
        </div>

        {/* 簡單模式：可用字母 */}
        {difficulty === 'easy' && !showFeedback && (
          <div className="mb-4">
            <p className="text-center text-gray-500 mb-3 text-sm">點擊字母組成單字</p>
            <div className="flex flex-wrap justify-center gap-2">
              {availableLetters.map((letter, idx) => (
                <button
                  key={idx}
                  onClick={() => handleEasyLetter(letter, idx)}
                  disabled={usedIndices.includes(idx)}
                  className={`w-10 h-12 rounded-xl font-bold shadow transition-all ${
                    usedIndices.includes(idx)
                      ? 'bg-gray-200 text-gray-400'
                      : letter === ' '
                      ? 'bg-blue-200 text-blue-700 text-sm'
                      : 'bg-gradient-to-br from-yellow-300 to-orange-300 text-gray-800 hover:scale-110 active:scale-95 text-xl'
                  }`}
                >
                  {letter === ' ' ? '␣' : letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 中等/困難模式：字母鍵盤 */}
        {(difficulty === 'medium' || difficulty === 'hard') && !showFeedback && (
          <div>
            <p className="text-center text-gray-500 mb-3 text-sm">
              {difficulty === 'medium' ? '按正確順序輸入字母' : '輸入正確的單字'}
            </p>
            {/* QWERTY */}
            <div className="flex justify-center gap-1 mb-1">
              {'QWERTYUIOP'.split('').map(letter => (
                <button
                  key={letter}
                  onClick={() => handleLetterInput(letter)}
                  className="w-8 h-10 sm:w-10 sm:h-12 rounded-lg bg-gray-100 hover:bg-purple-100 active:bg-purple-200 text-gray-700 font-bold text-sm sm:text-base shadow transition-colors"
                >
                  {letter}
                </button>
              ))}
            </div>
            {/* ASDFGHJKL */}
            <div className="flex justify-center gap-1 mb-1">
              {'ASDFGHJKL'.split('').map(letter => (
                <button
                  key={letter}
                  onClick={() => handleLetterInput(letter)}
                  className="w-8 h-10 sm:w-10 sm:h-12 rounded-lg bg-gray-100 hover:bg-purple-100 active:bg-purple-200 text-gray-700 font-bold text-sm sm:text-base shadow transition-colors"
                >
                  {letter}
                </button>
              ))}
            </div>
            {/* ZXCVBNM + 空格 */}
            <div className="flex justify-center gap-1 mb-2">
              {'ZXCVBNM'.split('').map(letter => (
                <button
                  key={letter}
                  onClick={() => handleLetterInput(letter)}
                  className="w-8 h-10 sm:w-10 sm:h-12 rounded-lg bg-gray-100 hover:bg-purple-100 active:bg-purple-200 text-gray-700 font-bold text-sm sm:text-base shadow transition-colors"
                >
                  {letter}
                </button>
              ))}
              <button
                onClick={() => handleLetterInput(' ')}
                className="w-16 h-10 sm:w-20 sm:h-12 rounded-lg bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-blue-700 font-bold text-xs sm:text-sm shadow transition-colors"
              >
                空格
              </button>
            </div>
          </div>
        )}

        {/* 功能鍵 */}
        {!showFeedback && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={handleBackspace}
              disabled={userAnswer.length === 0}
              className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 disabled:opacity-50 rounded-xl text-yellow-700 font-bold shadow transition-colors"
            >
              ← 退格
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-xl text-red-700 font-bold shadow transition-colors"
            >
              ❌ 清除
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
