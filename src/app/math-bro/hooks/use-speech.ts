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

// 將書面語轉換為廣東話口語（用於語音）
function toSpokenCantonese(text: string): string {
  return text
    .replace(/的/g, '嘅')     // 的 → 嘅
    .replace(/是/g, '係')     // 是 → 係
    .replace(/這/g, '呢')     // 這 → 呢
    .replace(/那/g, '嗰')     // 那 → 嗰
    .replace(/不/g, '唔')     // 不 → 唔
    .replace(/沒/g, '冇')     // 沒 → 冇
    .replace(/他/g, '佢')     // 他 → 佢
    .replace(/她/g, '佢')     // 她 → 佢
    .replace(/它/g, '佢')     // 它 → 佢
    .replace(/們/g, '哋')     // 們 → 哋
    .replace(/了/g, '咗')     // 了 → 咗
    .replace(/著/g, '住')     // 著 → 住
    .replace(/過/g, '過');    // 過保持不變
}

// 數學BRO 專用語音鉤子（有預設對白）
export function useMathBroSpeech(userName: string = '') {
  const { speak: baseSpeak, isSpeaking, isSupported, stop } = useSpeech({ rate: 0.85 });
  
  // 包裝 speak 函數，自動轉換廣東話口語
  const speak = useCallback((text: string, onEnd?: () => void) => {
    baseSpeak(toSpokenCantonese(text), onEnd);
  }, [baseSpeak]);

  // 生成帶名字的稱呼
  const nameCall = userName ? `${userName}，` : '';

  // 自我介紹 + 問名字
  const intro = useCallback((onEnd?: () => void) => {
    speak('大家好！我係你哋嘅數學BROTHER，數學BRO！我會教你哋數學。請問你叫咩名呀？', onEnd);
  }, [speak]);

  // 歡迎語（記住名字後）
  const welcome = useCallback((onEnd?: () => void) => {
    const greetings = userName ? [
      `${nameCall}歡迎嚟到數學BRO！今日想練乜嘢呀？`,
      `哈囉${nameCall}！準備好未呀？一齊學數學啦！`,
      `Hey${nameCall}！數學BRO上線！今日我哋學啲咩好呢？`,
    ] : [
      'Yo！歡迎嚟到數學BRO！今日想練乜嘢呀？',
      '哈囉！我係數學BRO，準備好未呀？',
      'Hey！數學BRO上線！今日一齊學數學啦！',
    ];
    const random = greetings[Math.floor(Math.random() * greetings.length)];
    speak(random, onEnd);
  }, [speak, nameCall, userName]);

  // 記住名字後的問候
  const greetWithName = useCallback((name: string, onEnd?: () => void) => {
    speak(`哈囉${name}！好開心認識你！我哋一齊學數學啦！`, onEnd);
  }, [speak]);

  // 問想做乜題目 - 50% 機率叫名字
  const askTopic = useCallback((onEnd?: () => void) => {
    const useName = userName && Math.random() < 0.5;
    const text = useName 
      ? `${nameCall}你想練加法、減法、乘法定除法呀？揀一樣啦！`
      : '你想練加法、減法、乘法定除法呀？揀一樣啦！';
    speak(text, onEnd);
  }, [speak, nameCall, userName]);

  // 問難度 - 50% 機率叫名字
  const askDifficulty = useCallback((onEnd?: () => void) => {
    const useName = userName && Math.random() < 0.5;
    const text = useName
      ? `${nameCall}想由簡單開始定係挑戰難啲嘅？`
      : '想由簡單開始定係挑戰難啲嘅？';
    speak(text, onEnd);
  }, [speak, nameCall, userName]);

  // 出題 - 偶爾叫名字 (30% 機率)
  const askQuestion = useCallback((question: string, onEnd?: () => void) => {
    // 將 "3 + 2 = ?" 轉為 "3加2等於幾多？"
    const spokenQuestion = question
      .replace(/\s*\+\s*/g, '加')
      .replace(/\s*-\s*/g, '減')
      .replace(/\s*×\s*/g, '乘')
      .replace(/\s*÷\s*/g, '除')
      .replace(/\s*=\s*\?/g, '等於幾多？');
    const useName = userName && Math.random() < 0.3;
    const text = useName 
      ? `${nameCall}${spokenQuestion}`
      : spokenQuestion;
    speak(text, onEnd);
  }, [speak, nameCall, userName]);

  // 答啱咗 - 50% 機率叫名字
  const correct = useCallback((onEnd?: () => void) => {
    const useName = userName && Math.random() < 0.5;
    const responses = useName ? [
      `${nameCall}啱晒！好叻呀！`,
      `正確！${nameCall}你真係好掂！`,
      `無錯！${nameCall}繼續加油！`,
      `${nameCall}啱咗！數學BRO為你驕傲！`,
      `Perfect${nameCall}！下一題！`,
    ] : [
      '啱晒！好叻呀！',
      '正確！繼續加油！',
      '無錯！你真係好掂！',
      '啱咗！數學BRO為你驕傲！',
      'Perfect！下一題！',
    ];
    const random = responses[Math.floor(Math.random() * responses.length)];
    speak(random, onEnd);
  }, [speak, nameCall, userName]);

  // 答錯咗 - 50% 機率叫名字
  const wrong = useCallback((explanation: string, onEnd?: () => void) => {
    const useName = userName && Math.random() < 0.5;
    const responses = useName ? [
      `唔緊要${nameCall}！${explanation} 再試過！`,
      `差少少${nameCall}！${explanation} 諗清楚啲！`,
      `唔啱喎${nameCall}！${explanation} 慢慢嚟！`,
    ] : [
      `唔緊要！${explanation} 再試過！`,
      `差少少！${explanation} 諗清楚啲！`,
      `唔啱喎！${explanation} 慢慢嚟！`,
    ];
    const random = responses[Math.floor(Math.random() * responses.length)];
    speak(random, onEnd);
  }, [speak, nameCall, userName]);

  // 提示 - 30% 機率叫名字
  const giveHint = useCallback((hint: string, onEnd?: () => void) => {
    const useName = userName && Math.random() < 0.3;
    const text = useName
      ? `${nameCall}提示你啦！${hint}`
      : `提示你啦！${hint}`;
    speak(text, onEnd);
  }, [speak, nameCall, userName]);

  // 總結 - 70% 機率叫名字（總結比較重要，所以機率高點）
  const summary = useCallback((score: number, total: number, onEnd?: () => void) => {
    const percentage = Math.round((score / total) * 100);
    const useName = userName && Math.random() < 0.7;
    let message: string;
    
    if (percentage === 100) {
      message = useName 
        ? `Wow${nameCall}！全中！${total}題全部啱晒！你係數學天才呀！`
        : `Wow！全中！${total}題全部啱晒！你係數學天才呀！`;
    } else if (percentage >= 80) {
      message = useName
        ? `好勁呀${nameCall}！啱咗${score}題！繼續保持！`
        : `好勁呀！啱咗${score}題！繼續保持！`;
    } else if (percentage >= 60) {
      message = useName
        ? `唔錯呀${nameCall}，啱咗${score}題！再練多啲會更好！`
        : `唔錯呀，啱咗${score}題！再練多啲會更好！`;
    } else {
      message = userName
        ? `啱咗${score}題，唔緊要${nameCall}！慢慢嚟，數學BRO陪你練！`
        : `啱咗${score}題，唔緊要！慢慢嚟，數學BRO陪你練！`;
    }
    
    speak(message, onEnd);
  }, [speak, nameCall, userName]);

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
    intro,
    welcome,
    greetWithName,
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
