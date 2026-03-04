'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

interface Question {
  text: string;
  a: number;
  b: number;
  answer: number;
}

interface LeaderboardEntry {
  name: string;
  time: string;
  timeMs: number;
  date: string;
}

export default function LightningMath() {
  // 遊戲狀態
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [timer, setTimer] = useState('00:00.00');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [combo, setCombo] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [screen, setScreen] = useState<'start' | 'game' | 'result' | 'leaderboard'>('start');
  const [feedback, setFeedback] = useState<{ emoji: string; show: boolean }>({ emoji: '', show: false });
  const [errorMsg, setErrorMsg] = useState(false);
  
  // 排行榜相關
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [finalTime, setFinalTime] = useState('');
  const [finalTimeMs, setFinalTimeMs] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // 初始化音頻
  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
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

  // 播放答錯聲（低音嗶）
  const playWrongSound = useCallback(() => {
    if (!soundEnabled || !audioCtxRef.current) return;
    
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    
    osc.frequency.setValueAtTime(200, audioCtxRef.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtxRef.current.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.4, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 0.3);
  }, [soundEnabled]);

  // 生成題目
  const generateQuestions = useCallback(() => {
    const qs: Question[] = [];
    for (let i = 0; i < 15; i++) {
      const a = Math.floor(Math.random() * 9) + 1;
      const b = Math.floor(Math.random() * 9) + 1;
      qs.push({
        text: `${a} + ${b} = ?`,
        a,
        b,
        answer: a + b
      });
    }
    return qs;
  }, []);

  // 開始背景節奏
  const startBGM = useCallback(() => {
    if (bgmIntervalRef.current) clearInterval(bgmIntervalRef.current);
    bgmIntervalRef.current = setInterval(() => {
      playDadSound();
    }, 500);
  }, [playDadSound]);

  // 停止背景節奏
  const stopBGM = useCallback(() => {
    if (bgmIntervalRef.current) {
      clearInterval(bgmIntervalRef.current);
      bgmIntervalRef.current = null;
    }
  }, []);

  // 開始遊戲
  const startGame = useCallback(() => {
    initAudio();
    
    const qs = generateQuestions();
    setQuestions(qs);
    setCurrentQ(0);
    setCombo(0);
    setWrongCount(0);
    setIsProcessing(false);
    setCurrentAnswer('');
    setScreen('game');
    setTimer('00:00.00');
    
    // 用 ref 儲存開始時間，確保計時準確
    startTimeRef.current = Date.now();
    
    timerIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const mins = Math.floor(elapsed / 60000);
      const secs = Math.floor((elapsed % 60000) / 1000);
      const ms = Math.floor((elapsed % 1000) / 10);
      setTimer(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`);
    }, 10);
    
    startBGM();
  }, [generateQuestions, initAudio, startBGM]);

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

  // 答對處理
  const handleCorrect = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    playCorrectSound();
    setCombo(c => c + 1);
    setFeedback({ emoji: '✨', show: true });
    
    setTimeout(() => {
      setFeedback({ emoji: '', show: false });
      
      if (currentQ + 1 >= questions.length) {
        endGame();
      } else {
        setCurrentQ(q => q + 1);
        setCurrentAnswer('');
        setIsProcessing(false);
      }
    }, 300);
  };

  // 答錯處理
  const handleWrong = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    playWrongSound();
    setCombo(0);
    setWrongCount(w => w + 1);
    setErrorMsg(true);
    setFeedback({ emoji: '❌', show: true });
    
    setTimeout(() => {
      setFeedback({ emoji: '', show: false });
      setErrorMsg(false);
      setCurrentAnswer('');
      setIsProcessing(false);
    }, 800);
  };

  // 結束遊戲
  const endGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    stopBGM();
    
    const totalTime = Date.now() - startTimeRef.current;
    const mins = Math.floor(totalTime / 60000);
    const secs = Math.floor((totalTime % 60000) / 1000);
    const ms = Math.floor((totalTime % 1000) / 10);
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    
    setFinalTime(timeStr);
    setFinalTimeMs(totalTime);
    setScreen('result');
  };

  // 從伺服器載入排行榜
  const loadLeaderboard = useCallback(async () => {
    try {
      const response = await fetch('/api/leaderboard?game=lightningmath');
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.entries || []);
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      setLeaderboard([]);
    }
    setScreen('leaderboard');
  }, []);

  // 儲存到伺服器排行榜
  const saveToLeaderboard = async () => {
    if (!playerName.trim()) return;
    
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game: 'lightningmath',
          name: playerName.trim(),
          score: finalTimeMs,
          time: finalTime,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.entries || []);
        setScreen('leaderboard');
      }
    } catch (error) {
      console.error('Failed to save leaderboard:', error);
    }
  };

  // 清除計時器
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (bgmIntervalRef.current) clearInterval(bgmIntervalRef.current);
    };
  }, []);

  // 開始畫面
  if (screen === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚡</div>
          <h1 className="text-3xl font-black text-gray-800 mb-2">閃電加法王</h1>
          <p className="text-gray-600 mb-6">15題加法挑戰，答錯要答啱先可以過！</p>
          
          <div className="space-y-3">
            <button
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              🎮 開始挑戰
            </button>
            
            <button
              onClick={loadLeaderboard}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              🏆 排行榜
            </button>
            
            <Link href="/trymath">
              <button className="w-full py-3 text-gray-500 hover:text-gray-700 transition-all">
                ← 返回
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 遊戲畫面
  if (screen === 'game') {
    const q = questions[currentQ];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex flex-col">
        {/* 頂部資訊 */}
        <div className="bg-white/90 backdrop-blur p-4 flex justify-between items-center shadow-lg">
          <div className="text-2xl font-black text-orange-600">⚡ {timer}</div>
          <div className="text-lg font-bold text-gray-700">
            {currentQ + 1} / {questions.length}
          </div>
        </div>

        {/* 連擊顯示 */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          {combo > 0 && (
            <div className="text-4xl font-black text-white mb-4 drop-shadow-lg">
              🔥 {combo} 連擊！
            </div>
          )}
          
          {/* 題目 */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6 min-w-[200px] text-center">
            <div className="text-5xl font-black text-gray-800 mb-4">{q?.text}</div>
            
            {/* 答案顯示 */}
            <div className={`text-4xl font-bold h-16 flex items-center justify-center rounded-xl transition-all ${
              errorMsg ? 'bg-red-100 text-red-600 animate-shake' : 'bg-gray-100 text-gray-800'
            }`}>
              {currentAnswer || '?'}
            </div>
          </div>

          {/* 反饋動畫 */}
          {feedback.show && (
            <div className="text-6xl animate-bounce mb-4">{feedback.emoji}</div>
          )}

          {/* 數字鍵盤 */}
          <div className="grid grid-cols-3 gap-3 max-w-[300px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
              <button
                key={n}
                onClick={() => inputNum(n)}
                disabled={isProcessing}
                className="w-20 h-20 bg-white rounded-2xl text-3xl font-bold text-gray-800 shadow-lg hover:bg-orange-50 active:scale-95 transition-all disabled:opacity-50"
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => inputNum(0)}
              disabled={isProcessing}
              className="w-20 h-20 bg-white rounded-2xl text-3xl font-bold text-gray-800 shadow-lg hover:bg-orange-50 active:scale-95 transition-all col-start-2 disabled:opacity-50"
            >
              0
            </button>
          </div>

          {/* 錯誤次數 */}
          {wrongCount > 0 && (
            <div className="mt-4 text-white font-bold">
              錯誤次數: {wrongCount}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 結束畫面 - 輸入名
  if (screen === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-black text-gray-800 mb-2">挑戰完成！</h1>
          
          <div className="bg-orange-50 rounded-2xl p-6 mb-6">
            <p className="text-gray-600 mb-2">用時</p>
            <p className="text-5xl font-black text-orange-600">{finalTime}</p>
            <p className="text-gray-500 mt-2">錯誤次數: {wrongCount}</p>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="輸入你嘅名"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-orange-500 focus:outline-none"
              maxLength={10}
            />
            
            <button
              onClick={saveToLeaderboard}
              disabled={!playerName.trim()}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🏆 儲存到排行榜
            </button>
            
            <button
              onClick={startGame}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              🔄 再玩一次
            </button>
            
            <button
              onClick={() => setScreen('start')}
              className="w-full py-3 text-gray-500 hover:text-gray-700 transition-all"
            >
              ← 返回主頁
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 排行榜畫面
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-black text-gray-800 mb-6 text-center">🏆 排行榜</h1>
        
        {leaderboard.length === 0 ? (
          <p className="text-gray-500 text-center py-8">暫時未有記錄</p>
        ) : (
          <div className="space-y-3 mb-6">
            {leaderboard.map((entry, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  idx === 0 ? 'bg-yellow-100' :
                  idx === 1 ? 'bg-gray-100' :
                  idx === 2 ? 'bg-orange-50' :
                  'bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  idx === 0 ? 'bg-yellow-500 text-white' :
                  idx === 1 ? 'bg-gray-400 text-white' :
                  idx === 2 ? 'bg-orange-400 text-white' :
                  'bg-gray-300 text-gray-700'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{entry.name}</p>
                  <p className="text-sm text-gray-500">{entry.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-orange-600">{entry.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={startGame}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg shadow-lg"
          >
            🎮 開始挑戰
          </button>
          
          <button
            onClick={() => setScreen('start')}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
          >
            ← 返回主頁
          </button>
        </div>
      </div>
    </div>
  );
}
