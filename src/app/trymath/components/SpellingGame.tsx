'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Word {
  en: string;
  zh: string;
  emoji: string;
}

const UNIT4_WORDS: Word[] = [
  { en: 'banana', zh: '香蕉', emoji: '🍌' },
  { en: 'bananas', zh: '香蕉（複數）', emoji: '🍌' },
  { en: 'pear', zh: '梨', emoji: '🍐' },
  { en: 'pears', zh: '梨（複數）', emoji: '🍐' },
  { en: 'mango', zh: '芒果', emoji: '🥭' },
  { en: 'mangoes', zh: '芒果（複數）', emoji: '🥭' },
  { en: 'potato', zh: '薯仔', emoji: '🥔' },
  { en: 'potatoes', zh: '薯仔（複數）', emoji: '🥔' },
  { en: 'peach', zh: '桃', emoji: '🍑' },
  { en: 'peaches', zh: '桃（複數）', emoji: '🍑' },
  { en: 'sandwich', zh: '三文治', emoji: '🥪' },
  { en: 'sandwiches', zh: '三文治（複數）', emoji: '🥪' },
  { en: 'cherry', zh: '車厘子', emoji: '🍒' },
  { en: 'cherries', zh: '車厘子（複數）', emoji: '🍒' },
  { en: 'strawberry', zh: '草莓', emoji: '🍓' },
  { en: 'strawberries', zh: '草莓（複數）', emoji: '🍓' },
  { en: 'thirsty', zh: '口渴', emoji: '🥤' },
  { en: 'hungry', zh: '肚餓', emoji: '😋' },
  { en: 'full', zh: '飽', emoji: '😌' },
  { en: 'thank you', zh: '多謝', emoji: '🙏' },
  { en: 'sweet', zh: '甜的', emoji: '🍬' },
  { en: 'fine', zh: '好的', emoji: '👍' },
  { en: 'sweets', zh: '糖果', emoji: '🍭' },
  { en: 'cake', zh: '蛋糕', emoji: '🎂' },
  { en: 'cakes', zh: '蛋糕（複數）', emoji: '🎂' },
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

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ '.split('');

export default function SpellingGame() {
  const [screen, setScreen] = useState<'start' | 'game' | 'result'>('start');
  const [unit, setUnit] = useState<4 | 5>(4);
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);

  const startGame = (selectedUnit: 4 | 5) => {
    setUnit(selectedUnit);
    const wordList = selectedUnit === 4 ? [...UNIT4_WORDS] : [...UNIT5_WORDS];
    // 隨機排序
    for (let i = wordList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordList[i], wordList[j]] = [wordList[j], wordList[i]];
    }
    setWords(wordList);
    setCurrentIndex(0);
    setScore(0);
    setWrongCount(0);
    setUserAnswer('');
    setScreen('game');
  };

  const handleLetter = (letter: string) => {
    if (showFeedback) return;
    
    const currentWord = words[currentIndex];
    const targetLength = currentWord.en.length;
    
    if (userAnswer.length >= targetLength) return;
    
    const newAnswer = userAnswer + letter.toLowerCase();
    setUserAnswer(newAnswer);
    
    // 檢查是否完成
    if (newAnswer.length === targetLength) {
      checkAnswer(newAnswer);
    }
  };

  const checkAnswer = (answer: string) => {
    const currentWord = words[currentIndex];
    const correct = answer.toLowerCase() === currentWord.en.toLowerCase();
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(s => s + 1);
    } else {
      setWrongCount(w => w + 1);
    }
    
    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(c => c + 1);
        setUserAnswer('');
        setShowFeedback(false);
      } else {
        setScreen('result');
      }
    }, 1500);
  };

  const handleBackspace = () => {
    if (showFeedback) return;
    setUserAnswer(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (showFeedback) return;
    setUserAnswer('');
  };

  // 開始畫面
  if (screen === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative"
        >
          <Link href="/trychi" className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl">
            ←
          </Link>
          
          <div className="text-6xl mb-4">🔤</div>
          <h1 className="text-4xl font-black mb-2 text-purple-600">英文串字王</h1>
          <p className="text-gray-600 mb-6 text-lg">睇中文意思，串出英文單字！</p>
          
          <div className="space-y-3">
            <button
              onClick={() => startGame(4)}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
            >
              🍎 2A Unit 4 (食物)
              <span className="block text-sm font-normal opacity-90">{UNIT4_WORDS.length}個單字</span>
            </button>
            <button
              onClick={() => startGame(5)}
              className="w-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
            >
              🚌 2A Unit 5 (交通工具)
              <span className="block text-sm font-normal opacity-90">{UNIT5_WORDS.length}個單字</span>
            </button>
          </div>
        </motion.div>
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
          <p className="text-gray-500 mb-6">答錯次數：{wrongCount}</p>
          
          <div className="space-y-3">
            <button
              onClick={() => startGame(unit)}
              className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              再玩一次 🔄
            </button>
            <button
              onClick={() => setScreen('start')}
              className="w-full bg-gradient-to-r from-gray-300 to-gray-400 text-white py-4 rounded-2xl text-xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              選擇其他單元
            </button>
            <Link 
              href="/trychi" 
              className="block w-full bg-gray-200 text-gray-700 py-4 rounded-2xl text-xl font-bold"
            >
              返回
            </Link>
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
          
          {/* 答案格 */}
          <div className="flex justify-center gap-1 flex-wrap my-4">
            {currentWord.en.split('').map((char, i) => (
              <div
                key={i}
                className={`w-10 h-12 sm:w-12 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold border-2 transition-all ${
                  i < userAnswer.length
                    ? showFeedback
                      ? isCorrect
                        ? 'bg-green-100 border-green-400 text-green-700'
                        : 'bg-red-100 border-red-400 text-red-700'
                      : 'bg-purple-100 border-purple-400 text-purple-700'
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}
              >
                {i < userAnswer.length ? userAnswer[i].toUpperCase() : ''}
              </div>
            ))}
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

        {/* 字母鍵盤 */}
        {!showFeedback && (
          <div>
            {/* 第一行 QWERTYUIOP */}
            <div className="flex justify-center gap-1 mb-2">
              {'QWERTYUIOP'.split('').map(letter => (
                <button
                  key={letter}
                  onClick={() => handleLetter(letter)}
                  className="w-8 h-10 sm:w-10 sm:h-12 rounded-lg bg-gray-100 hover:bg-purple-100 active:bg-purple-200 text-gray-700 font-bold text-sm sm:text-base shadow transition-colors"
                >
                  {letter}
                </button>
              ))}
            </div>
            {/* 第二行 ASDFGHJKL */}
            <div className="flex justify-center gap-1 mb-2">
              {'ASDFGHJKL'.split('').map(letter => (
                <button
                  key={letter}
                  onClick={() => handleLetter(letter)}
                  className="w-8 h-10 sm:w-10 sm:h-12 rounded-lg bg-gray-100 hover:bg-purple-100 active:bg-purple-200 text-gray-700 font-bold text-sm sm:text-base shadow transition-colors"
                >
                  {letter}
                </button>
              ))}
            </div>
            {/* 第三行 ZXCVBNM + 空格 */}
            <div className="flex justify-center gap-1 mb-2">
              {'ZXCVBNM'.split('').map(letter => (
                <button
                  key={letter}
                  onClick={() => handleLetter(letter)}
                  className="w-8 h-10 sm:w-10 sm:h-12 rounded-lg bg-gray-100 hover:bg-purple-100 active:bg-purple-200 text-gray-700 font-bold text-sm sm:text-base shadow transition-colors"
                >
                  {letter}
                </button>
              ))}
              <button
                onClick={() => handleLetter(' ')}
                className="w-16 h-10 sm:w-20 sm:h-12 rounded-lg bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-blue-700 font-bold text-xs sm:text-sm shadow transition-colors"
              >
                空格
              </button>
            </div>
            {/* 功能鍵 */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={handleBackspace}
                className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded-xl text-yellow-700 font-bold shadow transition-colors"
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
          </div>
        )}
      </div>
    </div>
  );
}
