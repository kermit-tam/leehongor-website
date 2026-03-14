'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExamQuestion, SECTION_TITLES } from '@/data/jlpt-n5-exam';

interface ExamQuestionCardProps {
  question: ExamQuestion;
  questionNumber: number;
  selectedAnswer: string | null;
  showResult: boolean;
  onSelectAnswer: (answer: string) => void;
}

// 朗讀日文
function speakJapanese(text: string) {
  if (!('speechSynthesis' in window)) return;
  
  // 取消之前的播放
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.8;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}

export function ExamQuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  showResult,
  onSelectAnswer,
}: ExamQuestionCardProps) {
  // 中文顯示狀態
  const [showQuestionMeaning, setShowQuestionMeaning] = useState(false);
  const [showContextMeaning, setShowContextMeaning] = useState(false);
  const [showOptionMeanings, setShowOptionMeanings] = useState<Record<string, boolean>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const isCorrect = selectedAnswer === question.correctAnswer;
  const isAnswered = selectedAnswer !== null;

  const sectionInfo = SECTION_TITLES[question.section];

  // 播放題目讀音
  const playQuestionAudio = useCallback(() => {
    const textToRead = question.questionReading || question.question;
    speakJapanese(textToRead);
  }, [question]);

  // 播放文章讀音
  const playContextAudio = useCallback(() => {
    if (question.context) {
      const textToRead = question.contextReading || question.context;
      speakJapanese(textToRead);
    }
  }, [question]);

  // 播放選項讀音
  const playOptionAudio = useCallback((e: React.MouseEvent, optionText: string, optionReading?: string) => {
    e.stopPropagation();
    const textToRead = optionReading || optionText;
    speakJapanese(textToRead);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl border-2 overflow-hidden
        ${showResult
          ? isCorrect
            ? 'border-green-200 bg-green-50/30'
            : 'border-red-200 bg-red-50/30'
          : 'border-[#E5E5E5]'
        }`}
    >
      {/* 題目頭部 */}
      <div className="p-6 border-b border-[#E5E5E5]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 bg-[#A8B5A0] text-white rounded-full flex items-center justify-center font-bold">
              {questionNumber}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{sectionInfo.icon}</span>
                <span className="text-sm text-[#8C8C8C]">{sectionInfo.title}</span>
              </div>
              <div className="text-xs text-[#C4B9AC]">
                {question.year}年{question.month}月 · {question.questionType}
              </div>
            </div>
          </div>

          {/* 作答結果 */}
          {showResult && (
            <div className={`px-3 py-1 rounded-full text-sm font-medium
              ${isCorrect
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
              }`}
            >
              {isCorrect ? '✓ 正確' : '✗ 錯誤'}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* 上下文（讀解用） */}
        {question.context && (
          <div className="mb-6 p-4 bg-[#F5F5F0] rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#8C8C8C]">📖 文章</span>
              <div className="flex items-center gap-2">
                {/* 播放文章讀音 */}
                <button
                  onClick={playContextAudio}
                  className="p-2 rounded-full bg-white hover:bg-[#E0D5C7] transition-colors"
                  title="播放讀音"
                >
                  <span className="text-lg">🔊</span>
                </button>
                {/* 顯示/隱藏中文 */}
                <button
                  onClick={() => setShowContextMeaning(!showContextMeaning)}
                  className="p-2 rounded-full bg-white hover:bg-[#E0D5C7] transition-colors"
                  title="中文翻譯"
                >
                  <span className="text-lg">☝️</span>
                </button>
              </div>
            </div>
            <p className="text-[#4A4A4A] leading-relaxed whitespace-pre-line">{question.context}</p>
            
            {/* 文章中文翻譯 */}
            <AnimatePresence>
              {showContextMeaning && question.contextMeaning && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 p-3 bg-white rounded-lg text-[#C4B9AC] border border-[#E5E5E5]">
                    {question.contextMeaning}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* 題目 */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <p className="text-lg text-[#4A4A4A] leading-relaxed flex-1">{question.question}</p>
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* 播放題目讀音 */}
              <button
                onClick={playQuestionAudio}
                className="p-2 rounded-full hover:bg-[#F5F5F0] transition-colors"
                title="播放讀音"
              >
                <span className="text-xl">🔊</span>
              </button>
              {/* 顯示/隱藏中文 */}
              {question.questionMeaning && (
                <button
                  onClick={() => setShowQuestionMeaning(!showQuestionMeaning)}
                  className="p-2 rounded-full hover:bg-[#F5F5F0] transition-colors"
                  title="中文翻譯"
                >
                  <span className="text-xl">☝️</span>
                </button>
              )}
            </div>
          </div>

          {/* 題目中文翻譯 */}
          <AnimatePresence>
            {showQuestionMeaning && question.questionMeaning && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="mt-2 p-3 bg-[#F5F5F0] rounded-lg text-[#C4B9AC]">
                  {question.questionMeaning}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 選項 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const isCorrectOption = option.id === question.correctAnswer;
            const showCorrectness = showResult;

            return (
              <motion.button
                key={option.id}
                onClick={() => !showResult && onSelectAnswer(option.id)}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 text-left transition-all
                  ${showCorrectness
                    ? isCorrectOption
                      ? 'border-green-400 bg-green-50'
                      : isSelected
                        ? 'border-red-400 bg-red-50'
                        : 'border-[#E5E5E5]'
                    : isSelected
                      ? 'border-[#A8B5A0] bg-[#A8B5A0]/10'
                      : 'border-[#E5E5E5] hover:border-[#C4B9AC]'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0
                    ${showCorrectness
                      ? isCorrectOption
                        ? 'bg-green-400 text-white'
                        : isSelected
                          ? 'bg-red-400 text-white'
                          : 'bg-[#E5E5E5] text-[#8C8C8C]'
                      : isSelected
                        ? 'bg-[#A8B5A0] text-white'
                        : 'bg-[#F5F5F0] text-[#4A4A4A]'
                    }`}
                  >
                    {option.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#4A4A4A] break-words">{option.text}</p>

                    {/* 選項操作按鈕 */}
                    <div className="flex items-center gap-1 mt-2">
                      {/* 播放選項讀音 */}
                      <button
                        onClick={(e) => playOptionAudio(e, option.text, option.reading)}
                        className="p-1.5 rounded-full hover:bg-[#F5F5F0] transition-colors"
                        title="播放讀音"
                      >
                        <span className="text-base">🔊</span>
                      </button>
                      {/* 顯示/隱藏中文 */}
                      {option.meaning && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowOptionMeanings(prev => ({
                              ...prev,
                              [option.id]: !prev[option.id]
                            }));
                          }}
                          className="p-1.5 rounded-full hover:bg-[#F5F5F0] transition-colors"
                          title="中文翻譯"
                        >
                          <span className="text-base">☝️</span>
                        </button>
                      )}
                    </div>

                    {/* 選項中文翻譯 */}
                    <AnimatePresence>
                      {showOptionMeanings[option.id] && option.meaning && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-1 text-sm text-[#C4B9AC]">{option.meaning}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* 答案解釋 */}
        {showResult && (
          <div className="mt-6 p-4 bg-[#F5F5F0] rounded-xl">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="font-medium text-[#4A4A4A]">💡 答案解釋</span>
              <span className="text-[#A8B5A0]">{showExplanation ? '🔼' : '🔽'}</span>
            </button>
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2">
                    {question.explanationReading && (
                      <p className="text-sm text-[#8C8C8C] italic">{question.explanationReading}</p>
                    )}
                    {question.explanationMeaning && (
                      <p className="text-[#C4B9AC]">{question.explanationMeaning}</p>
                    )}
                    {question.explanation && (
                      <p className="text-[#4A4A4A]">{question.explanation}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}
