/**
 * Flash Card 組件（含例句切換器 + 自動讀音）
 * 
 * 功能：
 * - 自動播放廣東話讀音（翻卡/切換生字時）
 * - 口語 + 書面語都可以揀廣東話/普通話
 * - 3個情景例句切換
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { StudyCard } from './types';

interface FlashCardProps {
  cards: StudyCard[];
  subject: 'chinese' | 'english';
  onComplete: (learnedCount: number) => void;
  onBack: () => void;
}

export function FlashCard({ cards, subject, onComplete, onBack }: FlashCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCards, setLearnedCards] = useState<Set<string>>(new Set());
  const [showComplete, setShowComplete] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  
  // 記錄用戶偏好：口語和書面語分別用咩語言讀
  const [spokenLang, setSpokenLang] = useState<'cantonese' | 'mandarin'>('cantonese');
  const [writtenLang, setWrittenLang] = useState<'cantonese' | 'mandarin'>('cantonese');
  
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;
  const currentExample = currentCard.examples[currentExampleIndex];

  // TTS 朗讀
  const speak = useCallback((text: string, lang: string = 'zh-HK') => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  // 自動播放廣東話讀音（生字）
  const autoPlayCantonese = useCallback(() => {
    if (!autoPlayEnabled || subject !== 'chinese') return;
    
    // 清除之前的定時器
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
    
    // 延遲一點先讀，等畫面更新
    autoPlayRef.current = setTimeout(() => {
      const text = currentCard.character || '';
      if (text) speak(text, 'zh-HK');
    }, 500);
  }, [autoPlayEnabled, subject, currentCard, speak]);

  // 當切換生字時，自動播放
  useEffect(() => {
    autoPlayCantonese();
    // 使用 setTimeout 將 setState 移到下一個 tick，避免同步調用
    const timer = setTimeout(() => setCurrentExampleIndex(0), 0);
    
    return () => {
      clearTimeout(timer);
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [currentIndex, autoPlayCantonese]);

  // 根據設置讀例句
  const speakExample = (type: 'spoken' | 'written') => {
    const text = type === 'spoken' ? currentExample.spoken : currentExample.written;
    const langPref = type === 'spoken' ? spokenLang : writtenLang;
    const lang = langPref === 'cantonese' ? 'zh-HK' : 'zh-CN';
    speak(text, lang);
  };

  // 手動讀音按
  const speakCantonese = () => {
    const text = currentCard.character || currentCard.word || '';
    speak(text, 'zh-HK');
  };

  const speakMandarin = () => {
    const text = currentCard.character || currentCard.word || '';
    speak(text, 'zh-CN');
  };

  const speakEnglish = () => {
    const text = currentCard.word || '';
    speak(text, 'en-GB');
  };

  // 切換例句
  const nextExample = () => {
    setCurrentExampleIndex((prev) => (prev + 1) % currentCard.examples.length);
  };

  const prevExample = () => {
    setCurrentExampleIndex((prev) => (prev - 1 + currentCard.examples.length) % currentCard.examples.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    // 翻卡後再讀一次（如果開咗自動讀）
    if (!isFlipped && autoPlayEnabled && subject === 'chinese') {
      autoPlayCantonese();
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      window.speechSynthesis.cancel();
    } else {
      setShowComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      window.speechSynthesis.cancel();
    }
  };

  const markAsLearned = () => {
    setLearnedCards(prev => new Set([...prev, currentCard.id]));
    handleNext();
  };

  // 鍵盤控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        if (isFlipped) nextExample();
        else handleNext();
      } else if (e.code === 'ArrowLeft') {
        if (isFlipped) prevExample();
        else handlePrev();
      } else if (e.code === 'KeyS') {
        if (subject === 'chinese') speakCantonese();
        else speakEnglish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFlipped, subject, currentExampleIndex]);

  useEffect(() => () => { window.speechSynthesis.cancel(); }, []);

  if (showComplete) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">完成！</h2>
        <p className="text-gray-600 mb-6">你學咗 {cards.length} 張卡，標記識咗 {learnedCards.size} 個！</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => onComplete(learnedCards.size)}
            className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600">返回主頁</button>
          <button onClick={() => { setCurrentIndex(0); setIsFlipped(false); setShowComplete(false); setLearnedCards(new Set()); }}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200">再溫一次</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* 頂部欄 */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700 flex items-center text-sm">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          退出
        </button>
        <span className="text-sm text-gray-500">{currentIndex + 1} / {cards.length}</span>
      </div>

      {/* 進度條 */}
      <div className="h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* 🔊 自動讀音開關 + 播放控制 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              autoPlayEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}>
            {autoPlayEnabled ? '🔊' : '🔇'} 自動讀音
          </button>
          {isSpeaking && <span className="text-xs text-gray-500 animate-pulse">🔊 朗讀中...</span>}
        </div>
        
        {subject === 'chinese' ? (
          <div className="flex gap-2">
            <button onClick={speakCantonese} disabled={isSpeaking}
              className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 disabled:opacity-50">
              ▶️ 廣東話
            </button>
            <button onClick={speakMandarin} disabled={isSpeaking}
              className="flex items-center gap-1 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 disabled:opacity-50">
              ▶️ 普通話
            </button>
          </div>
        ) : (
          <button onClick={speakEnglish} disabled={isSpeaking}
            className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 disabled:opacity-50">
            ▶️ 朗讀
          </button>
        )}
      </div>

      {/* 閃卡 */}
      <div className="relative h-64 mb-6 cursor-pointer" onClick={handleFlip}>
        <div className={`absolute inset-0 w-full h-full transition-all duration-500`}
          style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          
          {/* 正面 */}
          <div className={`absolute inset-0 w-full h-full rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 ${
            subject === 'chinese' ? 'bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-100' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100'
          }`} style={{ backfaceVisibility: 'hidden' }}>
            <span className="text-xs text-gray-400 mb-4">{currentCard.category}</span>
            {subject === 'chinese' ? (
              <>
                <div className="text-8xl font-bold text-gray-800 mb-4">{currentCard.character}</div>
                <div className="flex gap-2 text-xs text-gray-400">
                  <span>👆 點擊翻卡</span>
                  <span>|</span>
                  <span>按 S 播放</span>
                </div>
              </>
            ) : (
              <>
                <div className="text-5xl font-bold text-gray-800 mb-4">{currentCard.word}</div>
                <p className="text-gray-500">點擊查看詳情</p>
              </>
            )}
          </div>

          {/* 背面 */}
          <div className={`absolute inset-0 w-full h-full rounded-2xl shadow-lg flex flex-col items-center justify-center p-5 ${
            subject === 'chinese' ? 'bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-100' : 'bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-100'
          }`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            {subject === 'chinese' ? (
              <div className="text-center w-full">
                <div className="text-4xl font-bold text-gray-800 mb-2">{currentCard.character}</div>
                <div className="flex justify-center gap-3 mb-2">
                  <button onClick={(e) => { e.stopPropagation(); speakCantonese(); }}
                    className="flex items-center gap-1 text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
                    🔊 粵 {currentCard.jyutping}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); speakMandarin(); }}
                    className="flex items-center gap-1 text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    🔊 普 {currentCard.pinyin}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-2">{currentCard.strokes} 畫</p>
                <div className="bg-white rounded-xl p-2">
                  <p className="text-gray-700 font-medium">{currentCard.meaning}</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-2">{currentCard.word}</div>
                <button onClick={(e) => { e.stopPropagation(); speakEnglish(); }}
                  className="flex items-center gap-1 text-lg text-blue-600 mb-3 mx-auto">
                  🔊 {currentCard.phonetic}
                </button>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-gray-700 font-medium">{currentCard.meaning}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔄 例句切換器 */}
      {isFlipped && subject === 'chinese' && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-4">
          {/* 情景標籤 + 語言選擇 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                情景 {currentExampleIndex + 1}/3：{currentExample.scenario}
              </span>
            </div>
            <div className="flex gap-1">
              <button onClick={prevExample} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600">←</button>
              <button onClick={nextExample} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600">→</button>
            </div>
          </div>

          {/* 口語 */}
          <div className="mb-3 p-3 bg-yellow-50 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-yellow-700 font-medium">口語</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setSpokenLang(spokenLang === 'cantonese' ? 'mandarin' : 'cantonese')}
                  className="text-xs px-2 py-1 bg-white rounded text-gray-600">
                  {spokenLang === 'cantonese' ? '🇭🇰 粵' : '🇨🇳 普'}
                </button>
                <button onClick={() => speakExample('spoken')} className="text-yellow-600 hover:text-yellow-700 text-sm">🔊</button>
              </div>
            </div>
            <p className="text-gray-800">{currentExample.spoken}</p>
          </div>

          {/* 書面語 */}
          <div className="p-3 bg-blue-50 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-blue-700 font-medium">書面語</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setWrittenLang(writtenLang === 'cantonese' ? 'mandarin' : 'cantonese')}
                  className="text-xs px-2 py-1 bg-white rounded text-gray-600">
                  {writtenLang === 'cantonese' ? '🇭🇰 粵' : '🇨🇳 普'}
                </button>
                <button onClick={() => speakExample('written')} className="text-blue-600 hover:text-blue-700 text-sm">🔊</button>
              </div>
            </div>
            <p className="text-gray-800">{currentExample.written}</p>
          </div>
        </div>
      )}

      {/* 控制按 */}
      <div className="flex gap-3 mb-4">
        <button onClick={handlePrev} disabled={currentIndex === 0}
          className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium disabled:opacity-50 hover:bg-gray-200">
          ← 上一個
        </button>
        <button onClick={handleFlip}
          className="flex-1 py-3 rounded-xl bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200">
          {isFlipped ? '🔙 返去' : '👆 翻卡'}
        </button>
        <button onClick={handleNext}
          className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
          下一個 →
        </button>
      </div>

      {/* 識得按 */}
      <button onClick={markAsLearned}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg shadow-lg hover:shadow-xl active:scale-[0.98]">
        ✅ 我識呢個！
      </button>

      <p className="text-center text-xs text-gray-400 mt-4">
        快捷鍵：空白鍵翻卡 | ← → 切換 | S 播放 | 自動讀音：{autoPlayEnabled ? '開' : '關'}
      </p>
    </div>
  );
}
