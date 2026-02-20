/**
 * 音頻播放器組件
 * Audio Player Component
 * 
 * 使用 Web Speech API 播放日文
 */

'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  text: string;
  lang?: string;
  onPlay?: () => void;
  autoPlay?: boolean;
}

export function AudioPlayer({ 
  text, 
  lang = 'ja-JP', 
  onPlay,
  autoPlay = false 
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const play = useCallback(() => {
    if (!window.speechSynthesis) {
      alert('你的瀏覽器不支援語音播放');
      return;
    }

    // 停止之前的播放
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8; // 稍慢，方便學習
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
      setHasPlayed(true);
      onPlay?.();
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [text, lang, onPlay]);

  // 自動播放（如果需要）
  // useEffect(() => {
  //   if (autoPlay) play();
  // }, [autoPlay, play]);

  return (
    <button
      onClick={play}
      disabled={isPlaying}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
        isPlaying
          ? 'bg-amber-100 text-amber-700 animate-pulse'
          : hasPlayed
          ? 'bg-green-100 text-green-700 hover:bg-green-200'
          : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
      }`}
    >
      <motion.span
        animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: Infinity, duration: 0.5 }}
        className="text-xl"
      >
        {isPlaying ? '🔊' : hasPlayed ? '🔁' : '▶️'}
      </motion.span>
      <span>
        {isPlaying ? '播放中...' : hasPlayed ? '再聽一次' : '撳掣聽'}
      </span>
    </button>
  );
}

// 對話播放器（多個句子連續播放）
interface DialoguePlayerProps {
  lines: Array<{
    speaker: string;
    text: string;
  }>;
  onComplete?: () => void;
}

export function DialoguePlayer({ lines, onComplete }: DialoguePlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const playAll = useCallback(async () => {
    if (!window.speechSynthesis) {
      alert('你的瀏覽器不支援語音播放');
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlaying(true);
    setHasPlayed(true);

    for (let i = 0; i < lines.length; i++) {
      setCurrentIndex(i);
      
      await new Promise<void>((resolve) => {
        const utterance = new SpeechSynthesisUtterance(lines[i].text);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        utterance.onend = () => {
          // 句子之間停頓
          setTimeout(resolve, 500);
        };
        
        utterance.onerror = () => resolve();
        
        window.speechSynthesis.speak(utterance);
      });
    }

    setCurrentIndex(-1);
    setIsPlaying(false);
    onComplete?.();
  }, [lines, onComplete]);

  return (
    <div className="space-y-3">
      {/* 對話內容（播放時顯示） */}
      <div className="bg-gray-50 rounded-xl p-4 min-h-[120px]">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`transition-all ${
              currentIndex === index
                ? 'opacity-100 font-medium text-amber-700'
                : hasPlayed
                ? 'opacity-50'
                : 'opacity-0'
            }`}
          >
            <span className="font-bold">{line.speaker}：</span>
            <span>{line.text}</span>
          </div>
        ))}
        {!hasPlayed && (
          <div className="text-gray-400 text-center py-8">
            撳掣播放對話後，內容會顯示在呢度
          </div>
        )}
      </div>

      {/* 播放按鈕 */}
      <button
        onClick={playAll}
        disabled={isPlaying}
        className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
          isPlaying
            ? 'bg-amber-100 text-amber-700 cursor-not-allowed'
            : 'bg-amber-500 text-white hover:bg-amber-600'
        }`}
      >
        <span className="text-xl">{isPlaying ? '🔊' : hasPlayed ? '🔁 再聽一次' : '▶️ 播放對話'}</span>
      </button>
    </div>
  );
}
