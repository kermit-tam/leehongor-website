/**
 * Flash Card 組件（含例句切換器）
 * 
 * 閃卡學習模式
 * - 中文：廣東話 + 普通話 TTS
 * - 英文：英式發音 TTS
 * - 例句：3個情景，撳掣切換（口語+書面語對比）
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { StudyCard } from '../data/types';

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

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;
  const currentExample = currentCard.examples[currentExampleIndex];

  // 切換生字時重置例句索引
  useEffect(() => {
    setCurrentExampleIndex(0);
  }, [currentIndex]);

  // TTS 朗讀
  const speak = useCallback((text: string, lang: string = 'zh-HK') => {
    if (!window.speechSynthesis) {
      alert('你的瀏覽器不支援語音播放');
      return;
    }
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

  // 朗讀例句（根據科目選擇語言）
  const speakExampleSpoken = () => {
    const lang = subject === 'chinese' ? 'zh-HK' : 'en-GB';
    speak(currentExample.spoken, lang);
  };

  const speakExampleWritten = () => {
    const lang = subject === 'chinese' ? 'zh-CN' : 'en-GB';
    speak(currentExample.written, lang);
  };

  // 切換例句
  const nextExample = () => {
    setCurrentExampleIndex((prev) => (prev + 1) % currentCard.examples.length);
  };

  const prevExample = () => {
    setCurrentExampleIndex((prev) => (prev - 1 + currentCard.examples.length) % currentCard.examples.length);
  };

  const handleFlip = () => setIsFlipped(!isFlipped);

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
        <p className="text-gray-600 mb-6">
          你學咗 {cards.length} 張卡，標記識咗 {learnedCards.size} 個！
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => onComplete(learnedCards.size)}
            className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-colors"
          >
            返回主頁
          </button>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setIsFlipped(false);
              setShowComplete(false);
              setLearnedCards(new Set());
            }}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            再溫一次
          </button>
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

      {/* 🔊 播放控制 */}
      <div className="flex justify-center gap-2 mb-4">
        {subject === 'chinese' ? (
          <>
            <button onClick={speakCantonese} disabled={isSpeaking}
              className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 disabled:opacity-50">
              {isSpeaking ? '🔊' : '▶️'} 廣東話
            </button>
            <button onClick={speakMandarin} disabled={isSpeaking}
              className="flex items-center gap-1 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 disabled:opacity-50">
              {isSpeaking ? '🔊' : '▶️'} 普通話
            </button>
          </>
        ) : (
          <button onClick={speakEnglish} disabled={isSpeaking}
            className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 disabled:opacity-50">
            {isSpeaking ? '🔊' : '▶️'} 朗讀
          </button>
        )}
      </div>

      {/* 閃卡 */}
      <div className="relative h-72 mb-6 cursor-pointer" onClick={handleFlip}>
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
                
                {/* 讀音 */}
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
                
                <div className="bg-white rounded-xl p-2 mb-3">
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
                <div className="bg-white rounded-xl p-3 mb-3">
                  <p className="text-gray-700 font-medium">{currentCard.meaning}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔄 例句切換器（只喺背面顯示，但放喺卡外面） */}
      {isFlipped && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-4">
          {/* 情景標籤 */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
              情景 {currentExampleIndex + 1}/3：{currentExample.scenario}
            </span>
            <div className="flex gap-1">
              <button onClick={prevExample} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600">←</button>
              <button onClick={nextExample} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600">→</button>
            </div>
          </div>

          {/* 口語 */}
          <div className="mb-3 p-3 bg-yellow-50 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-yellow-700 font-medium">{subject === 'chinese' ? '口語（粵語）' : 'Spoken'}</span>
              <button onClick={speakExampleSpoken} className="text-yellow-600 hover:text-yellow-700 text-sm">🔊</button>
            </div>
            <p className="text-gray-800">{currentExample.spoken}</p>
          </div>

          {/* 書面語 */}
          <div className="p-3 bg-blue-50 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-blue-700 font-medium">{subject === 'chinese' ? '書面語' : 'Written'}</span>
              <button onClick={speakExampleWritten} className="text-blue-600 hover:text-blue-700 text-sm">🔊</button>
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

      {/* 識得按鈕 */}
      <button onClick={markAsLearned}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg shadow-lg hover:shadow-xl active:scale-[0.98]">
        ✅ 我識呢個！
      </button>

      <p className="text-center text-xs text-gray-400 mt-4">
        快捷鍵：空白鍵翻卡 | ← → 切換（卡內/例句） | S 播放
      </p>
    </div>
  );
}
