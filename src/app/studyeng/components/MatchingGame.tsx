'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { CVCWord } from '../data/cvc-lessons';

interface MatchingGameProps {
  words: CVCWord[];
  onComplete?: (score: number, total: number) => void;
}

interface Card {
  id: string;
  type: 'word' | 'emoji';
  content: string;
  wordId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MatchingGame({ words, onComplete }: MatchingGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // 初始化 - 使用 setTimeout 避免在 effect 中直接 setState
  useEffect(() => {
    const timer = setTimeout(() => {
      const gameWords = words.slice(0, 6); // 取6個單字，共12張卡
      const newCards: Card[] = [];
      
      gameWords.forEach((word, index) => {
        // 單字卡
        newCards.push({
          id: `word-${index}`,
          type: 'word',
          content: word.word,
          wordId: word.id,
          isFlipped: false,
          isMatched: false,
        });
        
        // 圖片卡（emoji）
        newCards.push({
          id: `emoji-${index}`,
          type: 'emoji',
          content: word.emoji,
          wordId: word.id,
          isFlipped: false,
          isMatched: false,
        });
      });
      
      setCards(newCards.sort(() => Math.random() - 0.5));
    }, 0);
    return () => clearTimeout(timer);
  }, [words]);

  const handleCardClick = (card: Card) => {
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    const newCard = { ...card, isFlipped: true };
    const newFlipped = [...flippedCards, newCard];
    
    setCards(prev => prev.map(c => c.id === card.id ? newCard : c));
    setFlippedCards(newFlipped);

    // 發音
    if (card.type === 'word' && typeof window !== 'undefined') {
      const utterance = new SpeechSynthesisUtterance(card.content);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      
      // 檢查是否配對成功
      if (newFlipped[0].wordId === newFlipped[1].wordId) {
        // 配對成功
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.wordId === card.wordId ? { ...c, isMatched: true } : c
          ));
          setMatchedPairs(p => p + 1);
          setFlippedCards([]);
          
          // 播放成功音效
          if (typeof window !== 'undefined') {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
            audio.volume = 0.3;
            audio.play().catch(() => {});
          }
        }, 500);
      } else {
        // 配對失敗
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === newFlipped[0].id || c.id === newFlipped[1].id
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // 檢查遊戲完成
  useEffect(() => {
    if (matchedPairs === 6 && !isComplete) {
      // 使用 setTimeout 避免在 render 期間調用 setState
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete?.(matchedPairs, 6);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [matchedPairs, isComplete, onComplete]);

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-gradient-to-br from-green-100 to-teal-100 rounded-3xl"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">恭喜你完成配對！</h3>
        <p className="text-lg text-gray-700 mb-2">
          用了 <span className="text-3xl font-bold text-green-600">{moves}</span> 步完成
        </p>
        <p className="text-sm text-gray-500 mb-6">
          {moves <= 6 ? '太厲害了！完美配對！' : 
           moves <= 10 ? '做得很棒！' : 
           '繼續練習，會越來越快的！'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          再玩一次
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* 遊戲資訊 */}
      <div className="flex justify-between items-center mb-6 bg-white rounded-2xl p-4 shadow-sm">
        <div className="text-center">
          <p className="text-xs text-gray-500">配對</p>
          <p className="text-xl font-bold text-purple-600">{matchedPairs} / 6</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">步數</p>
          <p className="text-xl font-bold text-pink-600">{moves}</p>
        </div>
      </div>

      {/* 卡片網格 */}
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
            onClick={() => handleCardClick(card)}
            className={`aspect-square rounded-2xl flex items-center justify-center text-2xl font-bold transition-all ${
              card.isMatched
                ? 'bg-green-100 border-2 border-green-400 opacity-60'
                : card.isFlipped
                ? card.type === 'word'
                  ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-400'
                  : 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400'
                : 'bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-lg hover:shadow-xl'
            }`}
            disabled={card.isMatched || card.isFlipped}
          >
            {card.isFlipped || card.isMatched ? (
              card.type === 'word' ? (
                <span className="text-lg text-purple-700">{card.content}</span>
              ) : (
                <span className="text-4xl">{card.content}</span>
              )
            ) : (
              <span className="text-3xl">❓</span>
            )}
          </motion.button>
        ))}
      </div>

      <p className="text-center text-gray-500 text-sm mt-4">
        點擊卡片找出配對的單字和圖片
      </p>
    </div>
  );
}
