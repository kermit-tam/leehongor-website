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
  const maleVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // 檢查瀏覽器支援並選擇男聲
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSupported(false);
      return;
    }
    
    synthesisRef.current = window.speechSynthesis;
    
    // 獲取男聲
    const loadVoices = () => {
      const voices = synthesisRef.current?.getVoices() || [];
      // 搵粵語男聲（Microsoft Danny 或其他男聲）
      const cantoneseMaleVoice = voices.find(v => 
        v.lang === 'zh-HK' && (v.name.includes('Danny') || v.name.includes('男') || v.name.includes('Male'))
      );
      // 如果搵唔到粵語男聲，試下搵普通話男聲
      const chineseMaleVoice = voices.find(v => 
        (v.lang === 'zh-CN' || v.lang === 'zh-TW') && 
        (v.name.includes('Yunxi') || v.name.includes('Yunjian') || v.name.includes('Kangkang'))
      );
      maleVoiceRef.current = cantoneseMaleVoice || chineseMaleVoice || null;
    };
    
    loadVoices();
    // Chrome 需要等待 voices loaded
    synthesisRef.current?.addEventListener('voiceschanged', loadVoices);
    
    return () => {
      synthesisRef.current?.removeEventListener('voiceschanged', loadVoices);
    };
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
    
    // 使用男聲（如果有）
    if (maleVoiceRef.current) {
      utterance.voice = maleVoiceRef.current;
    }

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
  // 先移除所有 emoji
  const withoutEmoji = text
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')  // 雜項符號和象形文字
    .replace(/[\u{2600}-\u{26FF}]/gu, '')    // 雜項符號
    .replace(/[\u{2700}-\u{27BF}]/gu, '')    // 裝飾符號
    .replace(/\p{Emoji}/gu, '');              // 其他 emoji
  
  return withoutEmoji
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
    .replace(/過/g, '過')     // 過保持不變
    .trim();
}

// 數學BRO 專用語音鉤子（有預設對白）
export function useMathBroSpeech(
  userName: string = '', 
  speechRate: 'slow' | 'normal' | 'fast' = 'normal',
  grade: string = ''
) {
  // 根據語速設置 rate：慢 0.7, 正常 0.9, 快 1.2
  const rate = speechRate === 'slow' ? 0.7 : speechRate === 'fast' ? 1.2 : 0.9;
  const { speak: baseSpeak, isSpeaking, isSupported, stop } = useSpeech({ rate, pitch: 1.1 });
  
  // 包裝 speak 函數，自動轉換廣東話口語
  const speak = useCallback((text: string, onEnd?: () => void) => {
    baseSpeak(toSpokenCantonese(text), onEnd);
  }, [baseSpeak]);

  // 生成帶名字的稱呼
  const nameCall = userName ? `${userName}，` : '';

  // 根據年級獲取適合的選項提示
  const getTopicOptions = () => {
    if (grade === 'kindergarten') {
      return '數水果、加數同減數';
    } else if (grade === 'p1') {
      return '數水果、加數、減數、排次序同方向';
    } else if (grade === 'p2') {
      return '加數、減數、乘數、三位數同排次序';
    } else if (grade === 'p3' || grade === 'p4') {
      return '加減乘除、三位數、四位數、排次序同方向';
    } else {
      return '加減乘除、大數、排次序、方向同角度';
    }
  };

  // 自我介紹 + 問名字
  const intro = useCallback((onEnd?: () => void) => {
    speak('哈囉，大家好！我係你哋嘅數學BROTHER，數學BRO！我會教你哋數學㗎。請問，你叫咩名呀？', onEnd);
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
    speak(`哈囉${name}！好開心認識你呀！我哋一齊學數學啦！`, onEnd);
  }, [speak]);

  // 問想做乜題目 - 根據年級顯示不同選項
  const askTopic = useCallback((onEnd?: () => void) => {
    const useName = userName && Math.random() < 0.5;
    const options = getTopicOptions();
    const text = useName 
      ? `${nameCall}你想玩${options}呀？揀一樣啦！`
      : `你想玩${options}呀？揀一樣啦！`;
    speak(text, onEnd);
  }, [speak, nameCall, userName, grade]);

  // 問年級
  const askGrade = useCallback((onEnd?: () => void) => {
    const text = userName 
      ? `${nameCall}你讀緊幾多年班呀？`
      : '你讀緊幾多年班呀？';
    speak(text, onEnd);
  }, [speak, nameCall, userName]);

  // 問喜不喜歡數學
  const askMathLove = useCallback((onEnd?: () => void) => {
    const text = userName 
      ? `${nameCall}你鍾唔鍾意數學㗎？`
      : '你鍾唔鍾意數學㗎？';
    speak(text, onEnd);
  }, [speak, nameCall, userName]);

  // 選擇語速
  const askSpeed = useCallback((onEnd?: () => void) => {
    speak('你想我講嘢快啲定慢啲呀？', onEnd);
  }, [speak]);

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

  // 答啱咗 - 更多兒童友好語句（無emoji）
  const correct = useCallback((onEnd?: () => void) => {
    const useName = userName && Math.random() < 0.5;
    const responses = useName ? [
      `${nameCall}啱晒！好叻呀！`,
      `${nameCall}你真係好掂！繼續加油！`,
      `${nameCall}啱咗！數學BRO為你驕傲！`,
      `哇！${nameCall}好勁呀！`,
      `答啱咗！${nameCall}好聰明！`,
      `${nameCall}太勁啦！繼續保持！`,
      `啱！${nameCall}計得好快！`,
      `好正呀${nameCall}！你識諗！`,
      `${nameCall}叻叻！俾個掌聲你！`,
      `耶！${nameCall}又啱咗！`,
      `${nameCall}好叻仔！數學高手！`,
      `叻叻豬${nameCall}！好叻呀！`,
      `${nameCall}計得好快！厲害！`,
      `又啱咗！${nameCall}好勁！`,
      `正呀${nameCall}！一百分！`,
    ] : [
      '啱晒！好叻呀！',
      '正確！繼續加油！',
      '你真係好掂！',
      '啱咗！數學BRO為你驕傲！',
      '哇！好勁呀！',
      '答啱咗！好聰明！',
      '太勁啦！繼續保持！',
      '啱！計得好快！',
      '好正呀！你識諗！',
      '叻叻！俾個掌聲你！',
      '耶！又啱咗！',
      '好叻仔！數學高手！',
      '叻叻豬！好叻呀！',
      '計得好快！厲害！',
      '又啱咗！好勁！',
      '正呀！一百分！',
    ];
    const random = responses[Math.floor(Math.random() * responses.length)];
    speak(random, onEnd);
  }, [speak, nameCall, userName]);

  // 答錯咗 - 更多兒童友好語句（無emoji）
  const wrong = useCallback((explanation: string, onEnd?: () => void) => {
    const useName = userName && Math.random() < 0.5;
    const responses = useName ? [
      `唔緊要${nameCall}！再試過！你可以嘅！`,
      `差少少${nameCall}！諗清楚啲！慢慢嚟！`,
      `唔啱喎${nameCall}！唔緊要，再嚟過！`,
      `錯咗${nameCall}，但唔緊要！學緊嘢！`,
      `噢${nameCall}！今次唔啱，再試吓！`,
      `冇所謂${nameCall}！錯咗先識學！`,
      `試多一次${nameCall}！下次一定啱！`,
      `唔緊要${nameCall}！數學係要練㗎！`,
      `唔啱呀${nameCall}！再嚟過！你一定得！`,
      `錯咗${nameCall}！唔緊要！試多次！`,
      `差啲啲${nameCall}！再諗吓！`,
      `今次唔啱${nameCall}！下次會啱！`,
      `唔緊要${nameCall}！慢慢嚟！`,
      `錯咗都冇所謂${nameCall}！繼續試！`,
      `再試吓${nameCall}！你會識㗎！`,
    ] : [
      '唔緊要！再試過！你可以嘅！',
      '差少少！諗清楚啲！慢慢嚟！',
      '唔啱喎！唔緊要，再嚟過！',
      '錯咗，但唔緊要！學緊嘢！',
      '噢！今次唔啱，再試吓！',
      '冇所謂！錯咗先識學！',
      '試多一次！下次一定啱！',
      '唔緊要！數學係要練㗎！',
      '唔啱呀！再嚟過！你一定得！',
      '錯咗！唔緊要！試多次！',
      '差啲啲！再諗吓！',
      '今次唔啱！下次會啱！',
      '唔緊要！慢慢嚟！',
      '錯咗都冇所謂！繼續試！',
      '再試吓！你會識㗎！',
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
    askGrade,
    askMathLove,
    askSpeed,
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
