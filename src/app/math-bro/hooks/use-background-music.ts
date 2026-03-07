/**
 * 數學BRO - 背景音樂鉤子
 * Math Bro - Background Music Hook
 * 
 * 生成輕柔的環境音樂，幫助專注
 */

import { useCallback, useRef, useState, useEffect } from 'react';

export function useBackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // 默認靜音，需要用戶開啟
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 初始化音頻上下文
  const initAudio = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
  }, []);

  // 播放一個柔和的和弦
  const playChord = useCallback(() => {
    if (!audioContextRef.current || isMuted) return;

    const ctx = audioContextRef.current;
    
    // 清除之前的振盪器
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); } catch {}
    });
    oscillatorsRef.current = [];

    // 創建主增益節點（控制音量）
    if (!gainNodeRef.current) {
      gainNodeRef.current = ctx.createGain();
      gainNodeRef.current.connect(ctx.destination);
      gainNodeRef.current.gain.value = 0.03; // 很輕柔的音量
    }

    // 定義一些柔和的大調和弦頻率
    const chords = [
      [261.63, 329.63, 392.00], // C major (C4, E4, G4)
      [329.63, 415.30, 493.88], // E minor (E4, G#4, B4)
      [392.00, 493.88, 587.33], // G major (G4, B4, D5)
      [349.23, 440.00, 523.25], // F major (F4, A4, C5)
    ];

    // 隨機選擇一個和弦
    const randomChord = chords[Math.floor(Math.random() * chords.length)];

    // 為每個音符創建振盪器
    randomChord.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      
      osc.type = 'sine'; // 正弦波最柔和
      osc.frequency.value = freq;
      
      // 漸入漸出效果
      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.5 + index * 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);
      
      osc.connect(noteGain);
      noteGain.connect(gainNodeRef.current!);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 3);
      
      oscillatorsRef.current.push(osc);
    });
  }, [isMuted]);

  // 開始播放背景音樂
  const start = useCallback(() => {
    initAudio();
    
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    setIsMuted(false);
    setIsPlaying(true);
    
    // 立即播放第一個和弦
    playChord();
    
    // 每4秒播放一個新和弦
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(playChord, 4000);
  }, [initAudio, playChord]);

  // 停止播放
  const stop = useCallback(() => {
    setIsMuted(true);
    setIsPlaying(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); } catch {}
    });
    oscillatorsRef.current = [];
  }, []);

  // 切換靜音
  const toggle = useCallback(() => {
    if (isMuted) {
      start();
    } else {
      stop();
    }
  }, [isMuted, start, stop]);

  // 清理
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch {}
      });
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, []);

  return {
    isPlaying,
    isMuted,
    start,
    stop,
    toggle,
  };
}
