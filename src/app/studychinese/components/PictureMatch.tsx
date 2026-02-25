/**
 * 圖畫配對遊戲
 * 
 * 玩法：左邊有圖片/emoji，右邊有生字
 * 小朋友要將圖片拖曳/點擊配對到正確生字
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { StudyCard } from '../data/types';
import { getImageMappings } from '../data/image-service';

interface PictureMatchProps {
  cards: StudyCard[];
  lessonId: string;
  onComplete: () => void;
  onBack: () => void;
}

// 為每個類別定義對應的 emoji（後備用）
const getEmojiForCard = (card: StudyCard): string => {
  const character = card.character || '';
  
  // 根據字的意思配對 emoji
  const emojiMap: Record<string, string> = {
    // 第一課
    '山': '⛰️', '水': '💧', '上': '⬆️', '下': '⬇️',
    '我': '🧒', '你': '👦', '在': '📍', '有': '✋',
    '人': '👤', '牛': '🐮',
    // 第二課
    '去': '🚶', '個': '🔢', '爸': '👨', '媽': '👩',
    '家': '🏠', '和': '🤝', '沒': '❌', '中': '🎯',
    '草': '🌱', '走': '🏃',
    // 第三課
    '哥': '👦', '姐': '👧', '弟': '👶', '妹': '🧒',
    '叔': '👨‍💼', '愛': '❤️', '打': '👊', '很': '⭐',
    '高': '📏', '的': '🔗',
  };
  
  return emojiMap[character] || '❓';
};

// 獲取圖片顯示內容（優先用後台上傳圖片，其次用預設圖片，冇就用 emoji）
const getImageContent = (card: StudyCard, dynamicMappings: Record<string, string>): { type: 'image' | 'emoji', content: string } => {
  // 優先使用後台上傳的圖片
  if (dynamicMappings[card.id]) {
    return { type: 'image', content: dynamicMappings[card.id] };
  }
  // 其次使用預設圖片
  if (card.image) {
    return { type: 'image', content: card.image };
  }
  // 最後用 emoji
  return { type: 'emoji', content: getEmojiForCard(card) };
};

export function PictureMatch({ cards, lessonId, onComplete, onBack }: PictureMatchProps) {
  const [gameCards, setGameCards] = useState<StudyCard[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // cardId -> icon
  const [showComplete, setShowComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [wrongAttempt, setWrongAttempt] = useState<string | null>(null);
  const [imageMappings, setImageMappings] = useState<Record<string, string>>({});

  // 載入圖片映射
  useEffect(() => {
    const mappings = getImageMappings();
    setImageMappings(mappings);
  }, []);

  // 初始化遊戲
  useEffect(() => {
    // 過濾適合圖畫配對的字
    const picturableCards = cards.filter(c => c.isPicturable !== false);
    // 隨機選 6 個字（或者全部）
    const shuffled = [...picturableCards].sort(() => Math.random() - 0.5).slice(0, 6);
    setGameCards(shuffled);
  }, [cards]);

  // 計算進度
  const progress = (Object.keys(matches).length / gameCards.length) * 100;

  // 處理圖片選擇
  const handleImageClick = (cardId: string) => {
    if (matches[cardId]) return; // 已配對
    setSelectedEmoji(cardId);
    setWrongAttempt(null);
  };

  // 重置遊戲
  const resetGame = () => {
    const picturableCards = cards.filter(c => c.isPicturable !== false);
    const shuffled = [...picturableCards].sort(() => Math.random() - 0.5).slice(0, 6);
    setGameCards(shuffled);
    setMatches({});
    setSelectedEmoji(null);
    setShowComplete(false);
    setScore(0);
    setAttempts(0);
  };

  // 播放讀音
  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-HK';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  if (gameCards.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p>載入遊戲中...</p>
      </div>
    );
  }

  if (showComplete) {
    const accuracy = attempts > 0 ? Math.round((Object.keys(matches).length / attempts) * 100) : 0;
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">完成！</h2>
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6">
          <div className="text-4xl font-bold text-orange-600 mb-2">{score} 分</div>
          <p className="text-gray-600">準確率：{accuracy}%</p>
          <p className="text-sm text-gray-500">嘗試次數：{attempts}</p>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={onComplete}
            className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600">
            返回主頁
          </button>
          <button onClick={resetGame}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200">
            再玩一次
          </button>
        </div>
      </div>
    );
  }

  // 獲取所有需要的圖片/emoji（隨機排列）
  const imageItems = gameCards.map(card => ({ 
    cardId: card.id, 
    ...getImageContent(card, imageMappings) 
  })).sort(() => Math.random() - 0.5);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* 頂部欄 */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700 flex items-center text-sm">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          退出
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-orange-600">⭐ {score} 分</span>
          <span className="text-sm text-gray-500">
            {Object.keys(matches).length} / {gameCards.length}
          </span>
        </div>
      </div>

      {/* 進度條 */}
      <div className="h-3 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-pink-500 transition-all" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      {/* 說明 */}
      <div className="bg-blue-50 rounded-xl p-3 mb-4 text-sm text-blue-700">
        <p>👆 先點擊圖片，再點擊對應的生字進行配對</p>
      </div>

      {/* 遊戲區域 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 左邊：圖片區 */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-700 text-center">圖片</h3>
          {imageItems.map((item, idx) => {
            const isMatched = matches[item.cardId] !== undefined;
            const isSelected = selectedEmoji === item.cardId;
            
            return (
              <button
                key={idx}
                disabled={isMatched}
                onClick={() => !isMatched && setSelectedEmoji(item.cardId)}
                className={`w-full aspect-square rounded-2xl flex items-center justify-center transition-all relative overflow-hidden
                  ${isMatched 
                    ? 'bg-gray-100 opacity-30' 
                    : isSelected 
                      ? 'bg-orange-200 ring-4 ring-orange-400 scale-105' 
                      : 'bg-white shadow-md hover:shadow-lg hover:scale-105'
                  }
                `}
              >
                {item.type === 'image' ? (
                  <img 
                    src={item.content} 
                    alt="配對圖片"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 圖片載入失敗，顯示 emoji 後備
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement('span');
                        fallback.className = 'text-5xl';
                        fallback.textContent = getEmojiForCard(gameCards.find(c => c.id === item.cardId)!);
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                ) : (
                  <span className="text-5xl">{item.content}</span>
                )}
                {isMatched && (
                  <span className="absolute inset-0 flex items-center justify-center bg-white/50">
                    <span className="text-4xl">✅</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 右邊：生字區 */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-700 text-center">生字</h3>
          {gameCards.map((card) => {
            const isMatched = !!matches[card.id];
            const isWrong = wrongAttempt === card.id;
            const matchedItem = imageItems.find(i => i.cardId === card.id);
            
            return (
              <button
                key={card.id}
                disabled={isMatched}
                onClick={() => {
                  if (!selectedEmoji) return;
                  setAttempts(prev => prev + 1);
                  
                  if (selectedEmoji === card.id) {
                    // 配對成功！
                    const item = imageItems.find(i => i.cardId === card.id);
                    if (item) {
                      setMatches(prev => ({ ...prev, [card.id]: item.type === 'image' ? '🖼️' : item.content }));
                    }
                    setScore(prev => prev + 10);
                    setSelectedEmoji(null);
                    
                    // 檢查是否完成
                    if (Object.keys(matches).length + 1 === gameCards.length) {
                      setTimeout(() => setShowComplete(true), 500);
                    }
                  } else {
                    // 配對錯誤
                    setWrongAttempt(card.id);
                    setTimeout(() => setWrongAttempt(null), 500);
                  }
                }}
                className={`w-full aspect-square rounded-2xl flex flex-col items-center justify-center transition-all
                  ${isMatched 
                    ? 'bg-green-100 border-2 border-green-400' 
                    : isWrong
                      ? 'bg-red-100 border-2 border-red-400 animate-shake'
                      : selectedEmoji
                        ? 'bg-white shadow-md hover:shadow-lg cursor-pointer border-2 border-orange-200'
                        : 'bg-white shadow-md border-2 border-gray-100'
                  }
                `}
              >
                <span className={`text-4xl font-bold ${isMatched ? 'text-green-700' : 'text-gray-800'}`}>
                  {card.character}
                </span>
                {isMatched && matchedItem && (
                  <span className="text-2xl mt-1">
                    {matchedItem.type === 'emoji' ? matchedItem.content : '🖼️'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 提示按鈕 */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => {
            // 播放所有未配對生字的讀音
            gameCards.filter(c => !matches[c.id]).forEach((card, idx) => {
              setTimeout(() => speak(card.character || ''), idx * 800);
            });
          }}
          className="flex-1 py-3 rounded-xl bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200"
        >
          🔊 聽讀音提示
        </button>
        <button
          onClick={resetGame}
          className="py-3 px-4 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
        >
          🔄 重置
        </button>
      </div>

      {/* 已配對顯示 */}
      {Object.keys(matches).length > 0 && (
        <div className="mt-4 bg-green-50 rounded-xl p-3">
          <p className="text-sm text-green-700 font-medium mb-2">已配對：</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(matches).map(([cardId, icon]) => {
              const card = gameCards.find(c => c.id === cardId);
              return (
                <span key={cardId} className="bg-white px-2 py-1 rounded-lg text-sm">
                  {icon} = {card?.character}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
