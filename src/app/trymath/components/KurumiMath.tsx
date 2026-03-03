'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  text: string;
  a: number;
  b: number;
  answer: number;
}

// 💜 可愛 Kuromi Emoji 組合
const KuromiEmoji = ({ mood }: { mood: 'normal' | 'happy' | 'excited' | 'think' | 'cheer' }) => {
  const moodEmojis = {
    normal: { face: '😈', decor: '🎀', bg: 'from-purple-400 to-pink-400' },
    happy: { face: '😊', decor: '💜', bg: 'from-purple-400 to-pink-400' },
    excited: { face: '🤩', decor: '✨', bg: 'from-pink-400 to-purple-400' },
    think: { face: '🤔', decor: '💭', bg: 'from-indigo-400 to-purple-400' },
    cheer: { face: '🥳', decor: '🎉', bg: 'from-pink-500 to-purple-500' },
  };
  
  const current = moodEmojis[mood];
  
  return (
    <motion.div 
      className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${current.bg} flex items-center justify-center shadow-xl`}
      animate={mood === 'cheer' ? { 
        scale: [1, 1.1, 1],
        rotate: [0, -5, 5, 0]
      } : {}}
      transition={{ duration: 0.5, repeat: mood === 'cheer' ? Infinity : 0 }}
    >
      <motion.div 
        className="absolute inset-2 rounded-full bg-white/20"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="text-6xl relative z-10">{current.face}</div>
      <motion.div 
        className="absolute -top-1 -right-1 text-2xl"
        animate={{ rotate: [0, 20, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >{current.decor}</motion.div>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xl">☠️</div>
    </motion.div>
  );
};

// 用戶上傳的圖片組件
const UserKuromi = ({ imageUrl, mood }: { imageUrl: string; mood: 'normal' | 'happy' | 'excited' | 'think' | 'cheer' }) => {
  const animations = {
    normal: {},
    happy: { scale: [1, 1.05, 1] },
    excited: { scale: [1, 1.1, 1], rotate: [0, -3, 3, 0] },
    think: {},
    cheer: { scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] },
  };
  
  return (
    <motion.div 
      className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-purple-400"
      animate={animations[mood]}
      transition={{ duration: 0.5, repeat: mood === 'cheer' ? Infinity : 0 }}
    >
      <img 
        src={imageUrl} 
        alt="Kuromi" 
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

// 💀 骷髅頭數字按鈕
const SkullButton = ({ number, onClick, disabled }: { number: number; onClick: () => void; disabled: boolean }) => (
  <motion.button
    whileHover={disabled ? {} : { scale: 1.1 }}
    whileTap={disabled ? {} : { scale: 0.9 }}
    onClick={onClick}
    disabled={disabled}
    className={`relative w-12 h-14 ${disabled ? 'opacity-40' : ''}`}
  >
    <svg viewBox="0 0 40 45" className="w-full h-full">
      <ellipse cx="20" cy="18" rx="14" ry="16" fill="#FF69B4" />
      <ellipse cx="14" cy="16" rx="4" ry="6" fill="#1a1a2e" />
      <ellipse cx="26" cy="16" rx="4" ry="6" fill="#1a1a2e" />
      <path d="M18 23 L22 23 L20 27 Z" fill="#1a1a2e" />
      <rect x="13" y="30" width="3" height="5" rx="1" fill="#1a1a2e" />
      <rect x="18.5" y="30" width="3" height="5" rx="1" fill="#1a1a2e" />
      <rect x="24" y="30" width="3" height="5" rx="1" fill="#1a1a2e" />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg pt-1">
      {number}
    </div>
  </motion.button>
);

// 圖片上傳組件
const ImageUpload = ({ onImageSelect, currentImage }: { onImageSelect: (url: string | null) => void; currentImage: string | null }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageSelect(result);
        localStorage.setItem('kuromi-custom-image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-3">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className={`border-2 border-dashed rounded-2xl p-4 cursor-pointer transition-all ${
          isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        {currentImage ? (
          <div className="flex items-center gap-3">
            <img src={currentImage} alt="Kuromi" className="w-16 h-16 rounded-full object-cover" />
            <div className="text-left">
              <p className="text-sm font-bold text-gray-700">已上傳自訂 Kuromi</p>
              <p className="text-xs text-gray-500">點擊或拖曳更換圖片</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-2">
            <div className="text-3xl mb-1">📸</div>
            <p className="text-sm font-bold text-gray-700">上傳你的 Kuromi 相片</p>
            <p className="text-xs text-gray-500">點擊選擇或拖曳圖片到這裡</p>
          </div>
        )}
      </div>
      
      {currentImage && (
        <button
          onClick={() => {
            onImageSelect(null);
            localStorage.removeItem('kuromi-custom-image');
          }}
          className="w-full py-2 bg-gray-200 text-gray-600 rounded-xl text-sm font-bold"
        >
          使用預設表情 🎀
        </button>
      )}
    </div>
  );
};

export default function KurumiMath() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timer, setTimer] = useState('00:00');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [combo, setCombo] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [screen, setScreen] = useState<'start' | 'game' | 'result'>('start');
  const [feedback, setFeedback] = useState<{ emoji: string; show: boolean }>({ emoji: '', show: false });
  const [errorMsg, setErrorMsg] = useState(false);
  const [kuromiMood, setKuromiMood] = useState<'normal' | 'happy' | 'excited' | 'think' | 'cheer'>('happy');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 加載已保存的自訂圖片
  useEffect(() => {
    const saved = localStorage.getItem('kuromi-custom-image');
    if (saved) setCustomImage(saved);
  }, []);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const playCorrectSound = useCallback(() => {
    if (!audioCtxRef.current) return;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    osc.frequency.setValueAtTime(600, audioCtxRef.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, audioCtxRef.current.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 0.3);
  }, []);

  const playWrongSound = useCallback(() => {
    if (!audioCtxRef.current) return;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    osc.frequency.setValueAtTime(200, audioCtxRef.current.currentTime);
    osc.frequency.linearRampToValueAtTime(150, audioCtxRef.current.currentTime + 0.3);
    gain.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 0.3);
  }, []);

  const generateQuestions = useCallback((): Question[] => {
    const qs: Question[] = [];
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * 5) + 1;
      const b = Math.floor(Math.random() * 5) + 1;
      const answer = a + b;
      qs.push({ text: `${a} + ${b}`, a, b, answer });
    }
    return qs;
  }, []);

  const startGame = useCallback(() => {
    initAudio();
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    const qs = generateQuestions();
    setQuestions(qs);
    setCurrentQ(0);
    setCombo(0);
    setWrongCount(0);
    setIsProcessing(false);
    setCurrentAnswer('');
    setScreen('game');
    setKuromiMood('think');
    setStartTime(Date.now());
    
    timerIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime || Date.now();
      const mins = Math.floor(elapsed / 60000);
      const secs = Math.floor((elapsed % 60000) / 1000);
      setTimer(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }, 1000);
  }, [generateQuestions, initAudio, startTime]);

  const inputNum = (n: number) => {
    if (isProcessing || currentAnswer.length >= 2) return;
    const newAnswer = currentAnswer + n;
    setCurrentAnswer(newAnswer);
    const ans = parseInt(newAnswer);
    const correct = questions[currentQ]?.answer;
    if (!correct) return;
    if (ans === correct) {
      handleCorrect();
    } else if (newAnswer.length === 2 || (newAnswer.length === 1 && ans > correct)) {
      handleWrong();
    }
  };

  const clearAns = () => {
    if (isProcessing) return;
    setCurrentAnswer('');
  };

  const handleCorrect = () => {
    setIsProcessing(true);
    playCorrectSound();
    setKuromiMood('excited');
    setCombo(c => c + 1);
    setFeedback({ emoji: '💜', show: true });
    setTimeout(() => setFeedback({ emoji: '', show: false }), 600);
    setTimeout(() => {
      if (currentQ >= 9) {
        endGame();
      } else {
        setCurrentQ(c => c + 1);
        setCurrentAnswer('');
        setIsProcessing(false);
        setKuromiMood('think');
      }
    }, 500);
  };

  const handleWrong = () => {
    playWrongSound();
    setWrongCount(w => w + 1);
    setCombo(0);
    setKuromiMood('normal');
    setErrorMsg(true);
    setFeedback({ emoji: '💔', show: true });
    setTimeout(() => {
      setFeedback({ emoji: '', show: false });
      setCurrentAnswer('');
      setErrorMsg(false);
    }, 600);
  };

  const endGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setScreen('result');
    setKuromiMood('cheer');
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // 開始畫面
  if (screen === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-purple-300 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/95 rounded-3xl p-6 max-w-md w-full text-center shadow-2xl relative overflow-hidden max-h-[95vh] overflow-y-auto"
        >
          <Link href="/trymath" className="absolute top-4 left-4 text-gray-500 hover:text-gray-700">← 返回</Link>
          
          <div className="absolute top-10 right-10 text-4xl opacity-20">💜</div>
          <div className="absolute bottom-10 left-10 text-4xl opacity-20">🎀</div>
          
          <div className="flex justify-center mb-3">
            {customImage ? (
              <UserKuromi imageUrl={customImage} mood="happy" />
            ) : (
              <KuromiEmoji mood="happy" />
            )}
          </div>
          
          <h1 className="text-2xl font-black mb-1 text-purple-700">💜 Kuromi 加法王</h1>
          <p className="text-purple-600 mb-4 text-sm">10題加法挑戰 · 1-5 + 1-5</p>
          
          {/* 上傳圖片掣 */}
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="mb-4 text-sm text-purple-600 underline"
          >
            {showUpload ? '隱藏上傳' : '📸 上傳你的 Kuromi 相片'}
          </button>
          
          {showUpload && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mb-4"
            >
              <ImageUpload onImageSelect={setCustomImage} currentImage={customImage} />
            </motion.div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-3 rounded-full text-lg font-bold shadow-lg"
          >
            開始挑戰 💀
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // 結果畫面
  if (screen === 'result') {
    const totalTime = Date.now() - startTime;
    const mins = Math.floor(totalTime / 60000);
    const secs = Math.floor((totalTime % 60000) / 1000);
    
    let rank, title;
    if (wrongCount === 0 && totalTime < 60000) {
      rank = '💀'; title = '骷髅大師！';
    } else if (wrongCount <= 2) {
      rank = '🥇'; title = '好棒呀！';
    } else if (wrongCount <= 4) {
      rank = '🥈'; title = '繼續努力！';
    } else {
      rank = '💜'; title = '加油加油！';
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-purple-300 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/95 rounded-3xl p-6 max-w-md w-full text-center shadow-2xl"
        >
          <div className="flex justify-center mb-3">
            {customImage ? (
              <UserKuromi imageUrl={customImage} mood="cheer" />
            ) : (
              <KuromiEmoji mood="cheer" />
            )}
          </div>
          
          <div className="text-5xl mb-2">{rank}</div>
          <h1 className="text-xl font-bold text-purple-700 mb-3">{title}</h1>
          
          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="bg-purple-50 rounded-xl p-2">
              <div className="text-lg font-bold text-purple-600">{mins}:{secs.toString().padStart(2, '0')}</div>
              <div className="text-xs text-gray-500">時間</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-2">
              <div className="text-lg font-bold text-pink-600">{wrongCount}</div>
              <div className="text-xs text-gray-500">錯誤</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-full font-bold text-sm"
            >
              再玩 🔄
            </motion.button>
            <Link href="/trymath" className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-full font-bold flex items-center justify-center text-sm">
              返回
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // 遊戲畫面
  const q = questions[currentQ];
  if (!q) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-purple-300 flex items-center justify-center p-2">
      <div className="bg-white/95 rounded-3xl w-full max-w-md p-4 shadow-2xl">
        <div className="flex justify-center mb-2">
          {customImage ? (
            <UserKuromi imageUrl={customImage} mood={kuromiMood} />
          ) : (
            <KuromiEmoji mood={kuromiMood} />
          )}
        </div>
        
        <div className="flex justify-between items-center mb-3 p-2 bg-purple-50 rounded-xl">
          <div className="text-base font-bold text-purple-600 font-mono">{timer}</div>
          <div className="flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < currentQ ? 'bg-green-400' : 
                  i === currentQ ? 'bg-purple-600 animate-pulse' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center py-2 relative">
          {combo >= 3 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 right-0 bg-pink-500 text-white px-2 py-0.5 rounded-full text-xs font-bold"
            >
              🔥 x{combo}
            </motion.div>
          )}
          
          <div className="text-gray-400 text-sm mb-1">第 {currentQ + 1} 題</div>
          
          <div className="flex justify-center items-center gap-3 my-3">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {q.a}
            </div>
            <div className="text-2xl font-bold text-purple-700">+</div>
            <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {q.b}
            </div>
            <div className="text-2xl font-bold text-purple-700">=</div>
          </div>
          
          <div className={`text-4xl font-bold min-h-[50px] transition-all ${
            currentAnswer === '' ? 'text-gray-200' : errorMsg ? 'text-red-400 animate-bounce' : 'text-purple-600'
          }`}>
            {currentAnswer || '?'}
          </div>
          
          <AnimatePresence>
            {feedback.show && (
              <motion.div 
                initial={{ scale: 0, y: 0 }}
                animate={{ scale: 1.5, y: -40 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl"
              >
                {feedback.emoji}
              </motion.div>
            )}
          </AnimatePresence>
          
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 font-bold text-sm mt-1"
            >
              再試一次！💪
            </motion.div>
          )}
        </div>
        
        <div className="grid grid-cols-5 gap-2 mt-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <SkullButton 
              key={num} 
              number={num} 
              onClick={() => inputNum(num)} 
              disabled={isProcessing}
            />
          ))}
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={clearAns}
          disabled={isProcessing}
          className="w-full mt-2 py-2 bg-pink-100 text-pink-600 rounded-xl font-bold disabled:opacity-50 text-sm"
        >
          ❌ 清除
        </motion.button>
      </div>
    </div>
  );
}
