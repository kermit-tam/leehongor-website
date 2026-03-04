'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface SentenceSet {
  id: number;
  sentences: string[];
  hint: string;
}

// 進階版 - 難度較高，需要理解因果關係
const ADVANCED_SETS: SentenceSet[] = [
  {
    id: 1,
    sentences: [
      "小明一直很想學彈鋼琴。",
      "媽媽幫他報名了興趣班。",
      "他每天都認真地練習。",
      "半年後終於可以彈奏一首完整的歌。"
    ],
    hint: "學彈鋼琴"
  },
  {
    id: 2,
    sentences: [
      "森林裏發生了大火。",
      "動物們慌忙地逃跑。",
      "消防員趕來救火。",
      "最後成功把火撲滅了。"
    ],
    hint: "森林大火"
  },
  {
    id: 3,
    sentences: [
      "小紅的成績一直很差。",
      "她決定每天放學後去圖書館溫習。",
      "遇到唔識的題目就問老師。",
      "期末考试終於攞到了全班第一名。"
    ],
    hint: "努力溫習"
  },
  {
    id: 4,
    sentences: [
      "小華看到一位老婆婆跌倒了。",
      "他立刻上前扶起老婆婆。",
      "還幫她執番啲散落地上的東西。",
      "老婆婆很感激，稱讚他是個好孩子。"
    ],
    hint: "幫助他人"
  },
  {
    id: 5,
    sentences: [
      "因為連續下了幾天大雨。",
      "河裏的水位不斷上升。",
      "附近的村民要緊急疏散。",
      "救護人員把他們安置到安全的地方。"
    ],
    hint: "水災疏散"
  },
  {
    id: 6,
    sentences: [
      "小兔子發現前面的樹林有狼。",
      "牠趕快跑回窩裏告訴媽媽。",
      "媽媽立即把門窗關好。",
      "狼找不到獵物，只好離開了。"
    ],
    hint: "小兔遇狼"
  },
  {
    id: 7,
    sentences: [
      "科學家發現了一顆新的行星。",
      "他們用望遠鏡仔細觀察。",
      "經過多年的研究和分析。",
      "最終確定了這顆行星的運行軌道。"
    ],
    hint: "發現行星"
  },
  {
    id: 8,
    sentences: [
      "這座城市決定推行垃圾分類。",
      "市民們都收到教育宣傳單張。",
      "大家學習如何正確分類垃圾。",
      "幾個月後城市的環境明顯改善了。"
    ],
    hint: "垃圾分類"
  },
  {
    id: 9,
    sentences: [
      "小鳥的翅膀受了傷。",
      "牠飛不起來，掉在地上。",
      "一位好心的男孩撿起牠。",
      "帶回家悉心照顧直到康復。"
    ],
    hint: "救傷小鳥"
  },
  {
    id: 10,
    sentences: [
      "工廠為了節省成本亂排污水。",
      "附近河裏的魚開始大量死亡。",
      "居民發現食水有異味。",
      "政府介入調查並處罰了工廠。"
    ],
    hint: "環保意識"
  }
];

interface LeaderboardEntry {
  name: string;
  score: number;
  time: string;
  date: string;
}

type Screen = 'menu' | 'game' | 'result' | 'leaderboard';

export default function SentenceReorderAdvanced() {
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-HK';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startGame = () => {
    setCurrentSet(0);
    setScore(0);
    setTimer(0);
    setUserOrder([]);
    setShowFeedback(false);
    
    const indices = [0, 1, 2, 3];
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledIndices(indices);
    
    setScreen('game');
  };

  // 檢查答案 - 錯咗要重做
  const checkAnswer = () => {
    if (userOrder.length !== 4) return;

    const correct = userOrder.every((idx, i) => idx === i);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(s => s + 1);
      
      setTimeout(() => {
        if (currentSet < ADVANCED_SETS.length - 1) {
          setCurrentSet(c => c + 1);
          setUserOrder([]);
          setShowFeedback(false);
          
          const indices = [0, 1, 2, 3];
          for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
          }
          setShuffledIndices(indices);
        } else {
          setFinalTime(formatTime(timer));
          setScreen('result');
        }
      }, 2000);
    } else {
      // 錯咗 - 3秒後重置，要重做
      setTimeout(() => {
        setUserOrder([]);
        setShowFeedback(false);
      }, 3000);
    }
  };

  const handleSentenceClick = (originalIndex: number) => {
    if (showFeedback) return;
    
    if (userOrder.includes(originalIndex)) {
      setUserOrder(prev => prev.filter(i => i !== originalIndex));
    } else if (userOrder.length < 4) {
      setUserOrder(prev => [...prev, originalIndex]);
    }
  };

  const loadLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard?game=sentencereorderadvanced');
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
          game: 'sentencereorderadvanced',
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

  const currentSentences = ADVANCED_SETS[currentSet];

  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="text-6xl mb-4">🧩</div>
          <h1 className="text-3xl font-black text-indigo-700 mb-2">重組句子</h1>
          <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold mb-2">進階版</span>
          <p className="text-gray-600 mb-2">難度升級！理解因果先排到</p>
          <p className="text-sm text-gray-500 mb-6">{ADVANCED_SETS.length}組句子，錯咗要重做</p>
          
          <div className="space-y-3">
            <button onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-lg shadow-lg">
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

  if (screen === 'game') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
        <div className="bg-white/90 backdrop-blur p-4 flex justify-between items-center shadow-lg">
          <div className="text-xl font-bold text-indigo-600">⏱️ {formatTime(timer)}</div>
          <div className="text-lg font-bold text-gray-700">第 {currentSet + 1} / {ADVANCED_SETS.length} 組</div>
          <div className="text-lg font-bold text-green-600">✓ {score}</div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <motion.div
            key={currentSet}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-lg"
          >
            <div className="text-center mb-4">
              <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-bold">
                💡 提示：{currentSentences.hint}
              </span>
            </div>

            <p className="text-gray-600 text-center mb-4">請按正確順序點擊句子（思考因果關係）</p>

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
                        ? 'bg-indigo-500 text-white shadow-lg' 
                        : 'bg-gray-50 text-gray-800 hover:bg-indigo-50 border-2 border-gray-200'}`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                      ${isSelected ? 'bg-white text-indigo-600' : 'bg-gray-200 text-gray-600'}`}>
                      {isSelected ? orderNum : ['A', 'B', 'C', 'D'][originalIdx]}
                    </span>
                    <span className="flex-1 text-lg">{currentSentences.sentences[originalIdx]}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(currentSentences.sentences[originalIdx]);
                      }}
                      className={`p-2 rounded-full ${isSelected ? 'bg-indigo-400' : 'bg-gray-200'}`}
                    >
                      🔊
                    </button>
                  </motion.button>
                );
              })}
            </div>

            {userOrder.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">你的答案：</p>
                <div className="flex gap-2 justify-center">
                  {userOrder.map((idx, i) => (
                    <div key={i} className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center font-bold text-indigo-700">
                      {['A', 'B', 'C', 'D'][idx]}
                    </div>
                  ))}
                  {Array.from({ length: 4 - userOrder.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="w-10 h-10 bg-gray-200 rounded-lg" />
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={checkAnswer}
              disabled={userOrder.length !== 4 || showFeedback}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-lg shadow-lg disabled:opacity-50"
            >
              {userOrder.length === 4 ? '✓ 確認答案' : `已選 ${userOrder.length}/4 句`}
            </button>

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
                    {isCorrect ? '正確！下一組！' : '次序錯了！請重新排列'}
                  </p>
                  {!isCorrect && (
                    <div className="mt-2 text-sm text-red-600">
                      <p>再細心思考因果關係，錯咗要重做㗎！</p>
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

  if (screen === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-black text-indigo-700 mb-2">進階挑戰完成！</h1>
          <div className="bg-indigo-50 rounded-2xl p-6 mb-6">
            <p className="text-gray-600 mb-2">成績</p>
            <p className="text-5xl font-black text-indigo-600">{score} / {ADVANCED_SETS.length}</p>
            <p className="text-gray-500 mt-2">用時: {finalTime}</p>
          </div>
          <div className="space-y-3">
            <input type="text" placeholder="輸入你嘅名" value={playerName} onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg text-center" maxLength={10} />
            <button onClick={saveToLeaderboard} disabled={!playerName.trim()}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-lg disabled:opacity-50">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <h1 className="text-3xl font-black text-indigo-700 mb-6 text-center">🏆 重組句子進階版排行榜</h1>
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
                  <p className="text-xl font-black text-indigo-600">{entry.score}組</p>
                  {entry.time && <p className="text-sm text-gray-500">{entry.time}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="space-y-3">
          <button onClick={startGame} className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-lg">
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
