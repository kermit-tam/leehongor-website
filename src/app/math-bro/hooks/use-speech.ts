/**
 * 數學BRO - 語音鉤子
 * Math Bro - Speech Hook
 * 
 * 功能：
 * - 語音合成（粵語 TTS）
 * - 語音識別（可選）
 */

import { useCallback, useRef, useState, useEffect } from 'react';

interface UseSpeechOptions {
  rate?: number; // 語速 0.1-2.0
  pitch?: number; // 音調 0.1-2.0
  volume?: number; // 音量 0-1
}

export function useSpeech(options: UseSpeechOptions = {}) {
  const { rate = 0.9, pitch = 1.0, volume = 1.0 } = options;
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 檢查瀏覽器支援
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSupported(false);
      return;
    }
    
    synthesisRef.current = window.speechSynthesis;
  }, []);

  // 停止語音
  const stop = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // 播放語音（粵語）
  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!synthesisRef.current || !isSupported) {
      console.warn('語音合成唔支援');
      onEnd?.();
      return;
    }

    // 停止之前嘅語音
    stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-HK'; // 香港粵語
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };
    utterance.onerror = (event) => {
      console.error('語音播放錯誤:', event);
      setIsSpeaking(false);
      onEnd?.();
    };

    utteranceRef.current = utterance;
    synthesisRef.current.speak(utterance);
  }, [isSupported, rate, pitch, volume, stop]);

  // 數字轉語音（加啲語氣）
  const speakNumber = useCallback((num: number, onEnd?: () => void) => {
    const text = `${num}`;
    speak(text, onEnd);
  }, [speak]);

  // 暫停
  const pause = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.pause();
    }
  }, []);

  // 繼續
  const resume = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.resume();
    }
  }, []);

  return {
    speak,
    speakNumber,
    stop,
    pause,
    resume,
    isSpeaking,
    isSupported,
  };
}

// 數學BRO 專用語音鉤子（有預設對白）
export function useMathBroSpeech() {
  const { speak, isSpeaking, isSupported, stop } = useSpeech({ rate: 0.85 });

  // 歡迎語
  const welcome = useCallback((onEnd?: () => void) => {
    const greetings = [
      'Yo！歡迎嚟到數學BRO！今日想練乜嘢呀？',
      '哈囉！我係數學BRO，準備好未呀？',
      'Hey！數學BRO上線！今日一齊學數學啦！',
    ];
    const random = greetings[Math.floor(Math.random() * greetings.length)];
    speak(random, onEnd);
  }, [speak]);

  // 問想做乜題目
  const askTopic = useCallback((onEnd?: () => void) => {
    speak('你想練加法、減法、乘法定除法呀？揀一樣啦！', onEnd);
  }, [speak]);

  // 問難度
  const askDifficulty = useCallback((onEnd?: () => void) => {
    speak('想由簡單開始定係挑戰難啲嘅？', onEnd);
  }, [speak]);

  // 出題
  const askQuestion = useCallback((question: string, onEnd?: () => void) => {
    speak(question.replace('?', '等於幾多？'), onEnd);
  }, [speak]);

  // 答啱咗
  const correct = useCallback((onEnd?: () => void) => {
    const responses = [
      '啱晒！好叻呀！',
      '正確！繼續加油！',
      '無錯！你真係好掂！',
      '啱咗！數學BRO為你驕傲！',
      'Perfect！下一題！',
    ];
    const random = responses[Math.floor(Math.random() * responses.length)];
    speak(random, onEnd);
  }, [speak]);

  // 答錯咗
  const wrong = useCallback((explanation: string, onEnd?: () => void) => {
    const responses = [
      `唔緊要！${explanation} 再試過！`,
      `差少少！${explanation} 諗清楚啲！`,
      `唔啱喎！${explanation} 慢慢嚟！`,
    ];
    const random = responses[Math.floor(Math.random() * responses.length)];
    speak(random, onEnd);
  }, [speak]);

  // 提示
  const giveHint = useCallback((hint: string, onEnd?: () => void) => {
    speak(`提示你啦！${hint}`, onEnd);
  }, [speak]);

  // 總結
  const summary = useCallback((score: number, total: number, onEnd?: () => void) => {
    const percentage = Math.round((score / total) * 100);
    let message: string;
    
    if (percentage === 100) {
      message = `Wow！全中！${total}題全部啱晒！你係數學天才呀！`;
    } else if (percentage >= 80) {
      message = `好勁呀！啱咗${score}題！繼續保持！`;
    } else if (percentage >= 60) {
      message = `唔錯呀，啱咗${score}題！再練多啲會更好！`;
    } else {
      message = `啱咗${score}題，唔緊要！慢慢嚟，數學BRO陪你練！`;
    }
    
    speak(message, onEnd);
  }, [speak]);

  // 鼓勵
  const encourage = useCallback((onEnd?: () => void) => {
    const phrases = [
      '加油！你可以嘅！',
      '唔好放棄！繼續試！',
      '慢慢諗，唔使急！',
      '相信自己！',
      '錯咗唔緊要，學到嘢就得！',
    ];
    const random = phrases[Math.floor(Math.random() * phrases.length)];
    speak(random, onEnd);
  }, [speak]);

  return {
    welcome,
    askTopic,
    askDifficulty,
    askQuestion,
    correct,
    wrong,
    giveHint,
    summary,
    encourage,
    speak,
    isSpeaking,
    isSupported,
    stop,
  };
}
