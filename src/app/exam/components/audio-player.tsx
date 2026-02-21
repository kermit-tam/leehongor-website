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
  rate?: number;
  onPlay?: () => void;
}

export function AudioPlayer({ 
  text, 
  lang = 'ja-JP', 
  rate = 0.8,
  onPlay,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const play = useCallback(() => {
    if (!window.speechSynthesis) {
      alert('你的瀏覽器不支援語音播放');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
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
  }, [text, lang, rate, onPlay]);

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

// 對話播放器（考試模式 - 默認隱藏內容）
interface DialoguePlayerProps {
  lines: Array<{
    speaker: string;
    text: string;
  }>;
  onShowTranscript?: () => void; // 當用戶查看內容時回調
}

export function DialoguePlayer({ lines, onShowTranscript }: DialoguePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<0.7 | 0.9 | 1.0>(0.9);
  const [currentLine, setCurrentLine] = useState(-1);

  const playAll = useCallback(async () => {
    if (!window.speechSynthesis) {
      alert('你的瀏覽器不支援語音播放');
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlaying(true);
    setHasPlayed(true);

    for (let i = 0; i < lines.length; i++) {
      setCurrentLine(i);
      
      await new Promise<void>((resolve) => {
        const utterance = new SpeechSynthesisUtterance(lines[i].text);
        utterance.lang = 'ja-JP';
        utterance.rate = playbackRate;
        utterance.pitch = 1;
        
        utterance.onend = () => {
          setTimeout(resolve, 600); // 句子之間停頓
        };
        
        utterance.onerror = () => resolve();
        
        window.speechSynthesis.speak(utterance);
      });
    }

    setCurrentLine(-1);
    setIsPlaying(false);
  }, [lines, playbackRate]);

  const toggleTranscript = () => {
    if (!showTranscript) {
      // 第一次顯示時觸發回調
      onShowTranscript?.();
    }
    setShowTranscript(!showTranscript);
  };

  return (
    <div className="space-y-4">
      {/* 播放控制區 */}
      <div className="bg-amber-50 rounded-xl p-4">
        {/* 播放速度選擇 */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-amber-800 font-medium">播放速度：</span>
          <div className="flex gap-1">
            {([0.7, 0.9, 1.0] as const).map((rate) => (
              <button
                key={rate}
                onClick={() => !isPlaying && setPlaybackRate(rate)}
                disabled={isPlaying}
                className={`px-3 py-1 text-sm rounded-lg transition-all ${
                  playbackRate === rate
                    ? 'bg-amber-500 text-white'
                    : 'bg-white text-amber-700 hover:bg-amber-100'
                } ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {rate === 0.7 ? '慢' : rate === 0.9 ? '中' : '快'}
              </button>
            ))}
          </div>
        </div>

        {/* 播放按鈕 */}
        <button
          onClick={playAll}
          disabled={isPlaying}
          className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
            isPlaying
              ? 'bg-amber-200 text-amber-700 cursor-not-allowed'
              : 'bg-amber-500 text-white hover:bg-amber-600'
          }`}
        >
          <span className="text-xl">
            {isPlaying ? '🔊 播放中...' : hasPlayed ? '🔁 再聽一次' : '▶️ 撳掣聽對話'}
          </span>
        </button>

        {/* 播放進度指示 */}
        {isPlaying && currentLine >= 0 && (
          <div className="mt-3 text-center text-sm text-amber-700">
            正在播放：{lines[currentLine]?.speaker} 的對話...
          </div>
        )}
      </div>

      {/* 對話內容（默認隱藏） */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={toggleTranscript}
          className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-medium flex items-center justify-between transition-all"
        >
          <span>{showTranscript ? '🔒 隱藏對話內容' : '👁️ 顯示對話內容（考試時不建議）'}</span>
          <span className="transform transition-transform">
            {showTranscript ? '▲' : '▼'}
          </span>
        </button>
        
        {showTranscript && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-4 bg-gray-50"
          >
            {lines.map((line, index) => (
              <div
                key={index}
                className={`py-2 transition-all ${
                  currentLine === index ? 'text-amber-700 font-medium' : 'text-gray-700'
                }`}
              >
                <span className="font-bold">{line.speaker}：</span>
                <span>{line.text}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
