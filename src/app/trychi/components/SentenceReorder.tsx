'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface SentenceSet {
  id: number;
  sentences: string[];
  hint: string;
}

const SENTENCE_SETS: SentenceSet[] = [
  {
    id: 1,
    sentences: [
      "今天天氣很好。",
      "我們去公園玩。",
      "公園裏有很多花。",
      "我們玩得很開心。"
    ],
    hint: "去公園"
  },
  {
    id: 2,
    sentences: [
      "媽媽買了水果。",
      "有蘋果和香蕉。",
      "我把水果洗乾淨。",
      "然後開心地吃。"
    ],
    hint: "買水果"
  },
  {
    id: 3,
    sentences: [
      "老師走進課室。",
      "同學起立敬禮。",
      "我們開始上課。",
      "今天學中文。"
    ],
    hint: "上課"
  },
  {
    id: 4,
    sentences: [
      "小狗在公園跑。",
      "牠看到一個球。",
      "小狗追着球跑。",
      "最後撿到了球。"
    ],
    hint: "小狗玩球"
  },
  {
    id: 5,
    sentences: [
      "昨天晚上下雨。",
      "今天早上停雨。",
      "太陽出來了。",
      "天空很藍很美。"
    ],
    hint: "雨後"
  },
  {
    id: 6,
    sentences: [
      "爺爺在田裏工作。",
      "他種了很多菜。",
      "蔬菜長得很高。",
      "爺爺辛勤地工作。"
    ],
    hint: "爺爺種菜"
  },
  {
    id: 7,
    sentences: [
      "我吃過早餐。",
      "早餐吃了麵包。",
      "還喝了牛奶。",
      "現在我很飽。"
    ],
    hint: "吃早餐"
  },
  {
    id: 8,
    sentences: [
      "小鳥在樹上。",
      "牠在唱歌。",
      "歌聲很好聽。",
      "我很喜歡聽。"
    ],
    hint: "小鳥唱歌"
  },
  {
    id: 9,
    sentences: [
      "星期日下午媽媽帶子瑜去上游泳課。",
      "到達泳池後發現忘記帶泳鏡。",
      "媽媽立即回家拿泳鏡回來。",
      "最後子瑜順利上完游泳課。"
    ],
    hint: "星期日去游泳"
  },
  {
    id: 10,
    sentences: [
      "媽媽下班回到家裏。",
      "淨浠迫不及待地把單車推出門外。",
      "他在公園裏開心地騎着單車。",
      "直到天黑，他才捨得回家。"
    ],
    hint: "淨浠放學後踩單車"
  }
];

interface LeaderboardEntry {
  name: string;
  score: number;
  time: string;
  date: string;
}

type Screen = 'menu' | 'game' | 'result' | 'leaderboard';

export default function SentenceReorder() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [currentSet, setCurrentSet] = useState(0);
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [finalTime, setFinalTime] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  // 計時器
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (screen === 'game') {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [screen]);

  // 格式化時間
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 語音朗讀
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-HK';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // 開始遊戲
  const startGame = () => {
    setCurrentSet(0);
    setScore(0);
    setTimer(0);
    setUserOrder([]);
    setShowFeedback(false);
    
    // 打亂第一句的順序
    const indices = [0, 1, 2, 3];
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledIndices(indices);
    
    setScreen('game');
  };

  // 檢查答案
  const checkAnswer = () => {
    if (userOrder.length !== 4) return;

    const correct = userOrder.every((idx, i) => idx === i);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(s => s + 1);
      
      setTimeout(() => {
        if (currentSet < SENTENCE_SETS.length - 1) {
          // 下一題
          setCurrentSet(c => c + 1);
          setUserOrder([]);
          setShowFeedback(false);
          
          // 打亂下一題順序
          const indices = [0, 1, 2, 3];
          for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
          }
          setShuffledIndices(indices);
        } else {
          // 完成
          setFinalTime(formatTime(timer));
          setScreen('result');
        }
      }, 2000);
    } else {
      // 錯咗 - 顯示正確答案3秒後重置，要重做
      setTimeout(() => {
        setUserOrder([]);
        setShowFeedback(false);
      }, 3000);
    }
  };

  // 處理句子點擊
  const handleSentenceClick = (originalIndex: number) => {
    if (showFeedback) return;
    
    if (userOrder.includes(originalIndex)) {
      // 已選，移除
      setUserOrder(prev => prev.filter(i => i !== originalIndex));
    } else if (userOrder.length < 4) {
      // 未選，加入
      setUserOrder(prev => [...prev, originalIndex]);
    }
  };

  // 載入排行榜
  const loadLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard?game=sentencereorder');
      const data = await res.json();
      setLeaderboard(data.entries || []);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    }
    setScreen('leaderboard');
  };

  // 儲存到排行榜
  const saveToLeaderboard = async () => {
    if (!playerName.trim()) return;

    try {
      const res = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game: 'sentencereorder',
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

  // 獲取當前句子組
  const currentSentences = SENTENCE_SETS[currentSet];

  // 選單畫面
  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="text-6xl mb-4">🧩</div>
          <h1 className="text-3xl font-black text-teal-700 mb-2">重組句子</h1>
          <p className="text-gray-600 mb-2">把句子排返正確次序</p>
          <p className="text-sm text-gray-500 mb-6">{SENTENCE_SETS.length}組句子，每組4句</p>
          
          <div className="space-y-3">
            <button onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-teal-400 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg">
              🎮 開始挑戰
            </button>
            <button onClick={loadLeaderboard}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-400 text-white rounded-xl font-bold shadow-lg">
              🏆 排行榜
            </button>
            <Link href="/trychi">
              <button className="w-full py-3 text-gray-500 hover:text-gray-700">← 返回</button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // 遊戲畫面
  if (screen === 'game') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100 flex flex-col">
        {/* 頂部資訊 */}
        <div className="bg-white/90 backdrop-blur p-4 flex justify-between items-center shadow-lg">
          <div className="text-xl font-bold text-teal-600">⏱️ {formatTime(timer)}</div>
          <div className="text-lg font-bold text-gray-700">第 {currentSet + 1} / {SENTENCE_SETS.length} 組</div>
          <div className="text-lg font-bold text-green-600">✓ {score}</div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4">
          {/* 題目 */}
          <motion.div
            key={currentSet}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-lg"
          >
            <div className="text-center mb-4">
              <span className="inline-block bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-sm font-bold">
                💡 提示：{currentSentences.hint}
              </span>
            </div>

            <p className="text-gray-600 text-center mb-4">請按正確順序點擊句子（A→B→C→D）</p>

            {/* 待選句子 */}
            <div className="space-y-3 mb-6">
              {shuffledIndices.map((originalIdx) => {
                const isSelected = userOrder.includes(originalIdx);
                const orderNum = userOrder.indexOf(originalIdx) + 1;
                
                return (
                  <motion.button
                    key={originalIdx}
                    onClick={() => handleSentenceClick(originalIdx)}
                    disabled={showFeedback}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-3
                      ${isSelected 
                        ? 'bg-teal-500 text-white shadow-lg' 
                        : 'bg-gray-50 text-gray-800 hover:bg-teal-50 border-2 border-gray-200'}`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                      ${isSelected ? 'bg-white text-teal-600' : 'bg-gray-200 text-gray-600'}`}>
                      {isSelected ? orderNum : ['A', 'B', 'C', 'D'][originalIdx]}
                    </span>
                    <span className="flex-1 text-lg">{currentSentences.sentences[originalIdx]}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(currentSentences.sentences[originalIdx]);
                      }}
                      className={`p-2 rounded-full ${isSelected ? 'bg-teal-400' : 'bg-gray-200'}`}
                    >
                      🔊
                    </button>
                  </motion.button>
                );
              })}
            </div>

            {/* 已選順序顯示 */}
            {userOrder.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">你的答案：</p>
                <div className="flex gap-2 justify-center">
                  {userOrder.map((idx, i) => (
                    <div key={i} className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center font-bold text-teal-700">
                      {['A', 'B', 'C', 'D'][idx]}
                    </div>
                  ))}
                  {Array.from({ length: 4 - userOrder.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="w-10 h-10 bg-gray-200 rounded-lg" />
                  ))}
                </div>
              </div>
            )}

            {/* 確認按鈕 */}
            <button
              onClick={checkAnswer}
              disabled={userOrder.length !== 4 || showFeedback}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg disabled:opacity-50"
            >
              {userOrder.length === 4 ? '✓ 確認答案' : `已選 ${userOrder.length}/4 句`}
            </button>

            {/* 反饋 */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`mt-4 p-4 rounded-xl text-center ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
                >
                  <div className="text-4xl mb-1">{isCorrect ? '✅' : '❌'}</div>
                  <p className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? '正確！下一組！' : '次序錯了！請重新排列，錯咗要重做㗎！'}
                  </p>
                  {!isCorrect && (
                    <div className="mt-2 text-sm text-left bg-white/50 rounded-lg p-3">
                      <p className="font-bold mb-1">正確次序：</p>
                      {currentSentences.sentences.map((s, i) => (
                        <p key={i} className="text-gray-700">{['A', 'B', 'C', 'D'][i]}. {s}</p>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  // 結果畫面
  if (screen === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-black text-teal-700 mb-2">挑戰完成！</h1>
          <div className="bg-teal-50 rounded-2xl p-6 mb-6">
            <p className="text-gray-600 mb-2">成績</p>
            <p className="text-5xl font-black text-teal-600">{score} / {SENTENCE_SETS.length}</p>
            <p className="text-gray-500 mt-2">用時: {finalTime}</p>
          </div>
          <div className="space-y-3">
            <input type="text" placeholder="輸入你嘅名" value={playerName} onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg text-center" maxLength={10} />
            <button onClick={saveToLeaderboard} disabled={!playerName.trim()}
              className="w-full py-4 bg-gradient-to-r from-teal-400 to-cyan-500 text-white rounded-xl font-bold text-lg disabled:opacity-50">
              🏆 儲存到排行榜
            </button>
            <button onClick={startGame} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold">
              🔄 再玩一次
            </button>
            <button onClick={() => setScreen('menu')} className="w-full py-3 text-gray-500">
              ← 返回主頁
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 排行榜畫面
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <h1 className="text-3xl font-black text-teal-700 mb-6 text-center">🏆 重組句子排行榜</h1>
        {leaderboard.length === 0 ? (
          <p className="text-gray-500 text-center py-8">暫時未有記錄</p>
        ) : (
          <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
            {leaderboard.map((entry, idx) => (
              <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl ${idx === 0 ? 'bg-yellow-100' : idx === 1 ? 'bg-gray-100' : idx === 2 ? 'bg-orange-50' : 'bg-gray-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${idx === 0 ? 'bg-yellow-500 text-white' : idx === 1 ? 'bg-gray-400 text-white' : idx === 2 ? 'bg-orange-400 text-white' : 'bg-gray-300 text-gray-700'}`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{entry.name}</p>
                  <p className="text-sm text-gray-500">{entry.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-teal-600">{entry.score}組</p>
                  {entry.time && <p className="text-sm text-gray-500">{entry.time}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="space-y-3">
          <button onClick={startGame} className="w-full py-4 bg-gradient-to-r from-teal-400 to-cyan-500 text-white rounded-xl font-bold text-lg">
            🎮 再玩一次
          </button>
          <button onClick={() => setScreen('menu')} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold">
            ← 返回主頁
          </button>
        </div>
      </div>
    </div>
  );
}
