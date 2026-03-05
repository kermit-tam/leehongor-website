'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

interface Question {
  text: string;
  a: number;
  b: number;
  answer: number;
}

export default function LightningMath() {
  // 遊戲狀態
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timer, setTimer] = useState('00:00.00');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [combo, setCombo] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [screen, setScreen] = useState<'start' | 'game' | 'result'>('start');
  const [feedback, setFeedback] = useState<{ emoji: string; show: boolean }>({ emoji: '', show: false });
  const [errorMsg, setErrorMsg] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 初始化音頻
  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    }
  }, []);

  // 播放 Dad 聲（低音節奏）
  const playDadSound = useCallback(() => {
    if (!soundEnabled || !audioCtxRef.current) return;
    
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    
    osc.frequency.setValueAtTime(60, audioCtxRef.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, audioCtxRef.current.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 0.15);
  }, [soundEnabled]);

  // 播放答對聲（高亢叮）
  const playCorrectSound = useCallback(() => {
    if (!soundEnabled || !audioCtxRef.current) return;
    
    const osc1 = audioCtxRef.current.createOscillator();
    const gain1 = audioCtxRef.current.createGain();
    osc1.frequency.setValueAtTime(880, audioCtxRef.current.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(1760, audioCtxRef.current.currentTime + 0.1);
    gain1.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.3);
    osc1.connect(gain1);
    gain1.connect(audioCtxRef.current.destination);
    osc1.start();
    osc1.stop(audioCtxRef.current.currentTime + 0.3);
    
    const osc2 = audioCtxRef.current.createOscillator();
    const gain2 = audioCtxRef.current.createGain();
    osc2.frequency.setValueAtTime(1109, audioCtxRef.current.currentTime);
    gain2.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.2);
    osc2.connect(gain2);
    gain2.connect(audioCtxRef.current.destination);
    osc2.start();
    osc2.stop(audioCtxRef.current.currentTime + 0.2);
  }, [soundEnabled]);

  // 播放答錯聲（低沉糴糴）
  const playWrongSound = useCallback(() => {
    if (!soundEnabled || !audioCtxRef.current) return;
    
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    
    osc.frequency.setValueAtTime(150, audioCtxRef.current.currentTime);
    osc.frequency.linearRampToValueAtTime(80, audioCtxRef.current.currentTime + 0.3);
    
    const lfo = audioCtxRef.current.createOscillator();
    lfo.frequency.value = 20;
    const lfoGain = audioCtxRef.current.createGain();
    lfoGain.gain.value = 30;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();
    lfo.stop(audioCtxRef.current.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.4, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.4);
    
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 0.4);
  }, [soundEnabled]);

  // 背景節奏循環
  const startBGM = useCallback(() => {
    if (!soundEnabled) return;
    let count = 0;
    bgmIntervalRef.current = setInterval(() => {
      playDadSound();
      if (count % 2 === 0) {
        setTimeout(() => playDadSound(), 200);
      }
      count++;
    }, 600);
  }, [soundEnabled, playDadSound]);

  const stopBGM = useCallback(() => {
    if (bgmIntervalRef.current) {
      clearInterval(bgmIntervalRef.current);
      bgmIntervalRef.current = null;
    }
  }, []);

  // 產生加法題目
  const generateQuestions = useCallback((): Question[] => {
    const qs: Question[] = [];
    const levels = [
      { min: 2, max: 10, count: 5 },
      { min: 6, max: 15, count: 5 },
      { min: 10, max: 19, count: 5 }
    ];
    
    levels.forEach(level => {
      for (let i = 0; i < level.count; i++) {
        let q = generateAddQuestion(level.min, level.max);
        while (qs.length > 0 && qs[qs.length-1].answer === q.answer) {
          q = generateAddQuestion(level.min, level.max);
        }
        qs.push(q);
      }
    });
    
    for (let i = qs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }
    
    return qs;
  }, []);

  const generateAddQuestion = (min: number, max: number): Question => {
    const answer = Math.floor(Math.random() * (max - min + 1)) + min;
    const a = Math.floor(Math.random() * (answer - 1)) + 1;
    const b = answer - a;
    return { text: `${a} + ${b}`, a, b, answer };
  };

  // 開始遊戲
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
    setStartTime(Date.now());
    
    timerIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime || Date.now();
      const mins = Math.floor(elapsed / 60000);
      const secs = Math.floor((elapsed % 60000) / 1000);
      const ms = Math.floor((elapsed % 1000) / 10);
      setTimer(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`);
    }, 10);
    
    startBGM();
  }, [generateQuestions, initAudio, startBGM, startTime]);

  // 輸入數字
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
    
    setCombo(c => c + 1);
    
    setFeedback({ emoji: '✅', show: true });
    setTimeout(() => setFeedback({ emoji: '', show: false }), 600);
    
    setTimeout(() => {
      if (currentQ >= 14) {
        endGame();
      } else {
        setCurrentQ(c => c + 1);
        setCurrentAnswer('');
        setIsProcessing(false);
      }
    }, 400);
  };

  const handleWrong = () => {
    playWrongSound();
    setWrongCount(w => w + 1);
    setCombo(0);
    
    setErrorMsg(true);
    setFeedback({ emoji: '❌', show: true });
    
    setTimeout(() => {
      setFeedback({ emoji: '', show: false });
      setCurrentAnswer('');
      setErrorMsg(false);
    }, 600);
  };

  const endGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    stopBGM();
    setScreen('result');
  };

  // 清理
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      stopBGM();
    };
  }, [stopBGM]);

  // 開始畫面
  if (screen === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white/95 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <Link href="/trychi" className="absolute top-4 left-4 text-gray-500 hover:text-gray-700">
            ← 返回
          </Link>
          <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ⚡ 閃電加法王
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            15題加法挑戰<br/>
            答案範圍：2 至 19<br/>
            答錯要答啱先可以過！
          </p>
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-transform"
          >
            開始挑戰 🚀
          </button>
        </div>
      </div>
    );
  }

  // 結果畫面
  if (screen === 'result') {
    const totalTime = Date.now() - startTime;
    const mins = Math.floor(totalTime / 60000);
    const secs = Math.floor((totalTime % 60000) / 1000);
    const accuracy = Math.max(0, Math.round((15 / (15 + wrongCount)) * 100));
    const avgTime = (totalTime / 15 / 1000).toFixed(1);
    
    let rank, title, msg;
    if (wrongCount === 0 && totalTime < 30000) {
      rank = '👑'; title = '數學之神！'; msg = '完美！零錯誤！';
    } else if (wrongCount <= 2 && totalTime < 45000) {
      rank = '🥇'; title = '金牌選手！'; msg = '非常出色！';
    } else if (wrongCount <= 5) {
      rank = '🥈'; title = '銀牌選手！'; msg = '做得很好！';
    } else {
      rank = '💪'; title = '繼續努力！'; msg = '加油！愈練愈強！';
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white/95 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="text-6xl mb-4">{rank}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
          
          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-indigo-600">{mins}:{secs.toString().padStart(2, '0')}</div>
              <div className="text-sm text-gray-500">總時間</div>
            </div>
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-600">{avgTime}s</div>
              <div className="text-sm text-gray-500">平均每題</div>
            </div>
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-600">{wrongCount}</div>
              <div className="text-sm text-gray-500">答錯次數</div>
            </div>
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
              <div className="text-sm text-gray-500">準確率</div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">{msg}</p>
          
          <div className="flex gap-3">
            <button
              onClick={startGame}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-full font-bold shadow-lg active:scale-95 transition-transform"
            >
              再玩一次 🔄
            </button>
            <Link href="/trychi" className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-bold flex items-center justify-center">
              返回
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 遊戲畫面
  const q = questions[currentQ];
  if (!q) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-2">
      <div className="bg-white/95 rounded-3xl w-full max-w-md p-4 shadow-2xl">
        {/* 聲音開關 */}
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            if (soundEnabled) stopBGM();
            else startBGM();
          }}
          className="absolute top-4 left-4 bg-white/90 rounded-full w-10 h-10 text-xl shadow"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
        
        {/* 狀態欄 */}
        <div className="flex justify-between items-center mb-4 p-3 bg-gray-100 rounded-xl">
          <div className="text-xl font-bold text-indigo-600 font-mono">{timer}</div>
          <div className="flex gap-1">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i < currentQ ? 'bg-green-400' : 
                  i === currentQ ? 'bg-indigo-500 animate-pulse' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* 題目區 */}
        <div className="text-center py-4 relative min-h-[200px]">
          {/* 連擊 */}
          {combo >= 3 && (
            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold animate-bounce">
              🔥 連擊 x{combo}
            </div>
          )}
          
          <div className="text-gray-500 mb-2">第 {currentQ + 1} 題</div>
          
          <div className="text-6xl font-black text-gray-800 my-4 animate-pop">
            {q.text} =
          </div>
          
          <div className={`text-5xl font-bold min-h-[60px] transition-all ${
            currentAnswer === '' ? 'text-gray-300' : errorMsg ? 'text-red-500 animate-shake' : 'text-indigo-600'
          }`}>
            {currentAnswer || '?'}
          </div>
          
          {/* 反饋 */}
          {feedback.show && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl animate-feedback">
              {feedback.emoji}
            </div>
          )}
          
          {/* 錯誤提示 */}
          {errorMsg && (
            <div className="text-red-500 font-bold mt-2 animate-pulse">
              ❌ 再試一次！
            </div>
          )}
        </div>
        
        {/* 鍵盤 */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => inputNum(num)}
              disabled={isProcessing}
              className="aspect-square rounded-2xl text-3xl font-bold bg-gradient-to-br from-white to-gray-100 shadow-md active:scale-95 disabled:opacity-50 transition-transform"
            >
              {num}
            </button>
          ))}
          <button
            onClick={clearAns}
            disabled={isProcessing}
            className="col-span-2 aspect-[2/1] rounded-2xl text-xl font-bold bg-gradient-to-br from-red-400 to-red-500 text-white shadow-md active:scale-95 disabled:opacity-50 transition-transform"
          >
            清除 ❌
          </button>
          <button
            onClick={() => inputNum(0)}
            disabled={isProcessing}
            className="aspect-square rounded-2xl text-3xl font-bold bg-gradient-to-br from-white to-gray-100 shadow-md active:scale-95 disabled:opacity-50 transition-transform"
          >
            0
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pop {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes feedback {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.5); }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-pop { animation: pop 0.3s ease-out; }
        .animate-feedback { animation: feedback 0.6s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
}
