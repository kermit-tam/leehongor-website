/**
 * 句子重組遊戲組件
 * Sentence Puzzle Game Component
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SentencePuzzleQuestion } from '../game-data';

interface SentencePuzzleGameProps {
  question: SentencePuzzleQuestion;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export function SentencePuzzleGame({ question, onAnswer, answered }: SentencePuzzleGameProps) {
  const [availableBlocks, setAvailableBlocks] = useState(question.blocks.map((b, i) => ({ ...b, id: i })));
  const [selectedBlocks, setSelectedBlocks] = useState<{ text: string; type: string; originalId: number }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleBlockClick = useCallback((blockId: number, text: string, type: string) => {
    if (answered) return;
    
    setAvailableBlocks(prev => prev.filter(b => b.id !== blockId));
    setSelectedBlocks(prev => [...prev, { text, type, originalId: blockId }]);
  }, [answered]);

  const handleRemoveBlock = useCallback((index: number) => {
    if (answered) return;
    
    const block = selectedBlocks[index];
    setSelectedBlocks(prev => prev.filter((_, i) => i !== index));
    setAvailableBlocks(prev => [...prev, { text: block.text, type: block.type as 'particle' | 'noun' | 'verb' | 'time' | 'place', id: block.originalId }]);
  }, [answered, selectedBlocks]);

  // 播放整句 - 提前定義以避免在 useEffect 中訪問時出現問題
  const playFullSentence = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    
    const fullText = selectedBlocks.map(b => b.text).join('');
    setIsPlaying(true);
    
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
  }, [selectedBlocks]);

  // 檢查答案
  useEffect(() => {
    if (selectedBlocks.length === question.blocks.length) {
      // 檢查順序是否正確：selectedBlocks 的 originalId 應該與 correctOrder 對應
      const isCorrect = question.correctOrder.every((correctOriginalIdx, i) => 
        selectedBlocks[i].originalId === correctOriginalIdx
      );
      onAnswer(isCorrect);
      
      // 如果正確，使用 setTimeout 延遲播放整句以避免同步調用 setState
      if (isCorrect && !isPlaying) {
        setTimeout(() => {
          playFullSentence();
        }, 0);
      }
    }
  }, [selectedBlocks, question.blocks, question.correctOrder, onAnswer, isPlaying, playFullSentence]);

  const getBlockColor = (type: string) => {
    const colors: Record<string, string> = {
      particle: 'bg-[#E0D5C7] border-[#C4B9AC]',
      noun: 'bg-[#D5E0D7] border-[#A8B5A0]',
      verb: 'bg-[#D5D7E0] border-[#A8A8B5]',
      time: 'bg-[#E0DDD5] border-[#C4B9AC]',
      place: 'bg-[#E0D5D5] border-[#C4A8A8]',
    };
    return colors[type] || 'bg-white border-[#E5E5E5]';
  };

  const isComplete = selectedBlocks.length === question.blocks.length;
  const isCorrect = isComplete && question.correctOrder.every((correctOriginalIdx, i) => 
    selectedBlocks[i].originalId === correctOriginalIdx
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 標題 */}
      <div className="text-lg font-medium text-[#4A4A4A] mb-2">
        句子重組 <span className="text-sm text-[#8C8C8C]">砌返句完整句子</span>
      </div>

      {/* 題目 */}
      <div className="bg-[#F5F5F0] p-4 rounded-lg mb-6">
        <div className="text-[#4A4A4A] font-medium">{question.translation}</div>
      </div>

      {/* 已選區域 */}
      <div className="min-h-[80px] bg-white border-2 border-dashed border-[#C4B9AC] rounded-lg p-4 mb-6">
        <AnimatePresence mode="popLayout">
          {selectedBlocks.length === 0 ? (
            <div className="text-center text-[#8C8C8C] py-2">點擊下面語塊砌句子</div>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedBlocks.map((block, index) => (
                <motion.button
                  key={`selected-${index}`}
                  layout
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => handleRemoveBlock(index)}
                  disabled={answered}
                  className={`px-3 py-2 rounded border-2 text-[#4A4A4A] font-medium
                    ${getBlockColor(block.type)}
                    ${!answered ? 'hover:opacity-80 cursor-pointer' : 'cursor-default'}
                  `}
                >
                  {block.text}
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* 播放按鈕 */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-4"
        >
          <button
            onClick={playFullSentence}
            disabled={isPlaying}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all
              ${isPlaying ? 'bg-[#A8B5A0] text-white' : 'bg-[#E0D5C7] text-[#4A4A4A] hover:bg-[#C4B9AC]'}
            `}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            {isPlaying ? '播放中...' : '播放整句'}
          </button>
        </motion.div>
      )}

      {/* 可選語塊 */}
      <div className="text-sm text-[#8C8C8C] mb-2">語塊選擇</div>
      <div className="flex flex-wrap gap-2 justify-center">
        <AnimatePresence mode="popLayout">
          {availableBlocks.map((block) => (
            <motion.button
              key={block.id}
              layout
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => handleBlockClick(block.id, block.text, block.type)}
              disabled={answered}
              whileTap={{ scale: 0.9 }}
              className={`px-4 py-3 rounded-lg border-2 text-[#4A4A4A] font-medium transition-all
                ${getBlockColor(block.type)}
                ${!answered ? 'hover:shadow-md cursor-pointer' : 'cursor-default'}
              `}
            >
              {block.text}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* 結果 */}
      {isComplete && answered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 text-center p-4 rounded-lg ${
            isCorrect ? 'bg-[#A8B5A0]/20 text-[#4A4A4A]' : 'bg-[#B8A8A0]/20 text-[#4A4A4A]'
          }`}
        >
          {isCorrect ? (
            <>
              <div className="text-2xl mb-2">🎉</div>
              <div className="font-medium">正確！句子砌好了！</div>
            </>
          ) : (
            <>
              <div className="text-2xl mb-2">💭</div>
              <div className="font-medium">再試吓，調換語塊順序</div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
