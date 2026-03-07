'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { StudyCard } from './types';

// Web Speech API 類型
interface SpeechRecognitionAlternative {
  transcript: string;
  confidence?: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResult[];
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeakingQuizProps {
  cards: StudyCard[];
  onComplete: () => void;
  onBack: () => void;
}

type QuizState = 'intro' | 'question' | 'recording' | 'review' | 'finished';

export function SpeakingQuiz({ cards, onComplete, onBack }: SpeakingQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>('intro');
  const [score, setScore] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<StudyCard[]>(() => {
    return [...cards].sort(() => Math.random() - 0.5).slice(0, Math.min(5, cards.length));
  });
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  
  // 錄音相關
  const [, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  // 語音識別相關
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // 評判結果
  const [parentJudgment, setParentJudgment] = useState<'correct' | 'incorrect' | null>(null);
  const [results, setResults] = useState<{correct: number, total: number}>({ correct: 0, total: 0 });

  // cards 變化時由於已經使用函數式初始化，不需要在這裡再次設置

  // 初始化語音識別
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        recognitionRef.current = new SpeechRecognitionClass();
        recognitionRef.current.lang = 'zh-HK'; // 粵語
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setTranscript(prev => prev + finalTranscript);
          }
        };
        
        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const currentCard = shuffledCards[currentIndex];
  const currentExample = currentCard?.examples[currentExampleIndex];

  // 播放範例讀音
  const playExample = useCallback(() => {
    if (!currentExample) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentExample.spoken);
    utterance.lang = 'zh-HK';
    utterance.rate = 0.7;
    window.speechSynthesis.speak(utterance);
  }, [currentExample]);

  // 開始錄音
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };
      
      mediaRecorderRef.current.start();
      setQuizState('recording');
      
      // 同時開始語音識別
      if (recognitionRef.current) {
        setTranscript('');
        setIsListening(true);
        recognitionRef.current.start();
      }
    } catch {
      alert('無法開始錄音，請確認已允許麥克風權限');
    }
  };

  // 停止錄音
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    
    setQuizState('review');
  };

  // 播放錄音
  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  // 爸媽評判
  const judge = (isCorrect: boolean) => {
    setParentJudgment(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(s => s + 20);
      setResults(r => ({ correct: r.correct + 1, total: r.total + 1 }));
    } else {
      setResults(r => ({ correct: r.correct, total: r.total + 1 }));
    }
    
    // 延遲後下一題
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  // 下一題
  const nextQuestion = () => {
    // 清理
    setAudioBlob(null);
    setAudioUrl(null);
    setTranscript('');
    setParentJudgment(null);
    
    // 檢查是否還有例句
    if (currentCard && currentExampleIndex < currentCard.examples.length - 1) {
      setCurrentExampleIndex(i => i + 1);
      setQuizState('question');
    } else if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(i => i + 1);
      setCurrentExampleIndex(0);
      setQuizState('question');
    } else {
      setQuizState('finished');
    }
  };

  // 重新開始
  const restart = () => {
    setCurrentIndex(0);
    setCurrentExampleIndex(0);
    setScore(0);
    setResults({ correct: 0, total: 0 });
    setAudioBlob(null);
    setAudioUrl(null);
    setTranscript('');
    setParentJudgment(null);
    setQuizState('intro');
    setShuffledCards(() => [...cards].sort(() => Math.random() - 0.5).slice(0, Math.min(5, cards.length)));
  };

  if (shuffledCards.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p>準備中...</p>
      </div>
    );
  }

  // 開始畫面
  if (quizState === 'intro') {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700 mb-6 flex items-center">
          ← 返回
        </button>
        
        <div className="text-center">
          <div className="text-6xl mb-4">🎤</div>
          <h2 className="text-2xl font-bold mb-2">讀句子測驗</h2>
          <p className="text-gray-600 mb-4">跟住讀出例句，爸媽幫你評分</p>
          
          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left text-sm text-blue-700">
            <p className="font-medium mb-2">📋 玩法：</p>
            <ol className="space-y-1 ml-4 list-decimal">
              <li>聽範例讀音</li>
              <li>撳 🎙️ 開始錄音</li>
              <li>讀出句子</li>
              <li>撳 ⏹️ 停止</li>
              <li>撳 🔊 聽返自己把聲</li>
              <li>爸媽撳 ✓ 或 ✗ 評分</li>
            </ol>
          </div>
          
          <p className="text-sm text-gray-500 mb-6">
            共 {shuffledCards.length * 3} 句 · 每句 20 分
          </p>
          
          <button
            onClick={() => setQuizState('question')}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-teal-600 transition-all"
          >
            🎤 開始讀句子
          </button>
        </div>
      </div>
    );
  }

  // 完成畫面
  if (quizState === 'finished') {
    const maxScore = shuffledCards.length * 3 * 20;
    const percentage = Math.round((score / maxScore) * 100);
    
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">
          {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
        </div>
        <h2 className="text-2xl font-bold mb-2">測驗完成！</h2>
        <p className="text-4xl font-bold text-green-600 mb-2">{score} 分</p>
        <p className="text-gray-500 mb-2">
          讀啱咗 {results.correct} / {results.total} 句
        </p>
        <p className="text-gray-500 mb-6">
          {percentage >= 80 ? '太棒了！發音很準確！' : percentage >= 60 ? '做得不錯！繼續練習！' : '繼續加油！多聽多讀！'}
        </p>
        
        <div className="space-y-3">
          <button
            onClick={restart}
            className="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600"
          >
            🔄 再試一次
          </button>
          <button
            onClick={onComplete}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200"
          >
            ← 返回主頁
          </button>
        </div>
      </div>
    );
  }

  // 題目畫面
  const progress = ((currentIndex * 3 + currentExampleIndex + 1) / (shuffledCards.length * 3)) * 100;

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* 進度條 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>第 {currentIndex * 3 + currentExampleIndex + 1} / {shuffledCards.length * 3} 句</span>
          <span>{score} 分</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* 生字標題 */}
      <div className="text-center mb-4">
        <div className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-500 mb-2">
          生字：{currentCard.character}
        </div>
      </div>

      {/* 例句顯示 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-6 text-center">
        <p className="text-3xl font-bold text-gray-900 mb-3">{currentExample?.spoken}</p>
        <p className="text-gray-500 text-sm">{currentExample?.written}</p>
        
        <button
          onClick={playExample}
          className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
        >
          🔊 聽範例
        </button>
      </div>

      {/* 錄音區域 */}
      {quizState === 'question' && (
        <div className="text-center">
          <button
            onClick={startRecording}
            className="w-32 h-32 rounded-full bg-red-500 text-white text-4xl hover:bg-red-600 transition-all animate-pulse"
          >
            🎙️
          </button>
          <p className="mt-4 text-gray-500">撳一下開始錄音</p>
        </div>
      )}

      {/* 錄音中 */}
      {quizState === 'recording' && (
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-red-500 text-white text-4xl flex items-center justify-center mx-auto animate-pulse">
            ⏹️
          </div>
          <p className="mt-4 text-red-500 font-medium">錄音中... {isListening ? '(聽緊)' : ''}</p>
          <button
            onClick={stopRecording}
            className="mt-4 px-6 py-3 bg-gray-800 text-white rounded-xl font-bold"
          >
            停止錄音
          </button>
          
          {transcript && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-gray-600">
              <p className="text-xs text-gray-400 mb-1">系統聽到：</p>
              {transcript}
            </div>
          )}
        </div>
      )}

      {/* 評判區域 */}
      {quizState === 'review' && (
        <div className="space-y-4">
          {/* 回放按鈕 */}
          {audioUrl && (
            <button
              onClick={playRecording}
              className="w-full py-3 bg-indigo-100 text-indigo-600 rounded-xl font-bold hover:bg-indigo-200"
            >
              🔊 聽返自己把聲
            </button>
          )}
          
          {/* 語音識別結果 */}
          {transcript && (
            <div className="p-4 bg-yellow-50 rounded-xl">
              <p className="text-xs text-gray-400 mb-1">系統聽到：</p>
              <p className="text-lg">{transcript}</p>
              <p className={`text-sm mt-2 ${
                transcript.includes(currentExample?.spoken?.replace(/[。！？]/g, '') || '') 
                  ? 'text-green-600' : 'text-orange-500'
              }`}>
                {transcript.includes(currentExample?.spoken?.replace(/[。！？]/g, '') || '') 
                  ? '✓ 似乎讀得唔錯' : '⚠ 再聽聽範例'}
              </p>
            </div>
          )}
          
          {/* 爸媽評判 */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-center text-gray-600 mb-4 font-medium">爸媽評判：</p>
            <div className="flex gap-3">
              <button
                onClick={() => judge(true)}
                disabled={parentJudgment !== null}
                className={`flex-1 py-4 rounded-xl font-bold text-xl transition-all ${
                  parentJudgment === 'correct'
                    ? 'bg-green-500 text-white'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                ✓ 啱
              </button>
              <button
                onClick={() => judge(false)}
                disabled={parentJudgment !== null}
                className={`flex-1 py-4 rounded-xl font-bold text-xl transition-all ${
                  parentJudgment === 'incorrect'
                    ? 'bg-red-500 text-white'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                ✗ 唔啱
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 退出 */}
      <button
        onClick={onBack}
        className="w-full py-3 text-gray-500 hover:text-gray-700 mt-6"
      >
        退出測驗
      </button>
    </div>
  );
}
