/**
 * 考試部分組件
 * Exam Section Component
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExamSectionData, ExamQuestion, listeningQuestionData } from '../exam-data';
import { Button } from '@/components/ui/button';
import { AudioPlayer, DialoguePlayer } from './audio-player';

interface ExamSectionProps {
  section: ExamSectionData;
  answers: Record<string, string | number>;
  onSubmitAnswer: (questionId: string, answer: number) => void;
  onNext: () => void;
  isLastSection: boolean;
}

export function ExamSectionComponent({
  section,
  answers,
  onSubmitAnswer,
  onNext,
  isLastSection,
}: ExamSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(section.timeLimit * 60); // 轉換為秒
  const [showConfirm, setShowConfirm] = useState(false);
  const [showHint, setShowHint] = useState(false); // 顯示提示（語文運用的中文翻譯）
  const [showTranscript, setShowTranscript] = useState(false); // 顯示聆聽對話內容
  
  // 安全檢查：確保有題目
  const hasQuestions = section.questions.length > 0;
  const currentQuestion = hasQuestions ? section.questions[currentQuestionIndex] : null;
  const answeredCount = section.questions.filter(q => answers[q.id] !== undefined).length;
  const progress = hasQuestions ? ((currentQuestionIndex + 1) / section.questions.length) * 100 : 0;
  
  // 倒計時
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // 格式化時間
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // 選擇答案
  const selectAnswer = (answer: number) => {
    if (!currentQuestion) return;
    onSubmitAnswer(currentQuestion.id, answer);
  };
  
  // 下一題
  const nextQuestion = () => {
    if (currentQuestionIndex < section.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowConfirm(true);
    }
  };
  
  // 上一題
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  // 跳轉到指定題目
  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowConfirm(false);
  };
  
  // 提交部分
  const submitSection = () => {
    setShowConfirm(false);
    onNext();
  };
  
  return (
    <div>
      {/* 部分標題 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">
                {section.id === 'reading' && '📖'}
                {section.id === 'language' && '✏️'}
                {section.id === 'listening' && '🎧'}
              </span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {section.title}
                  <span className="text-gray-400 font-normal ml-2">{section.titleJp}</span>
                </h2>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
            </div>
          </div>
          
          {/* 倒計時 */}
          <div className={`text-right ${timeLeft < 60 ? 'text-red-500' : 'text-gray-900'}`}>
            <div className="text-2xl font-bold font-mono">
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs">剩餘時間</div>
          </div>
        </div>
        
        {/* 題目進度 */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>題目 {currentQuestionIndex + 1} / {section.questions.length}</span>
            <span>已作答 {answeredCount} / {section.questions.length}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${
                section.id === 'reading' ? 'bg-blue-500' :
                section.id === 'language' ? 'bg-green-500' : 'bg-amber-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
      
      {/* 題目 */}
      {!hasQuestions ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">此部分暫無題目</h3>
          <p className="text-gray-500 mb-4">可能是課程數據加載失敗，請稍後再試。</p>
          <button
            onClick={onNext}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            進入下一部分
          </button>
        </div>
      ) : (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion?.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          {/* 題目內容 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                第 {currentQuestionIndex + 1} 題
              </span>
              {currentQuestion?.difficulty === 1 && (
                <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">簡單</span>
              )}
              {currentQuestion?.difficulty === 2 && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded text-xs">中等</span>
              )}
              {currentQuestion?.difficulty === 3 && (
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs">困難</span>
              )}
            </div>
            
            <h3 className="text-lg text-gray-900 whitespace-pre-line leading-relaxed">
              {currentQuestion?.question}
            </h3>
            
            {/* 語文運用：顯示中文翻譯的選項 */}
            {section.id === 'language' && currentQuestion && (
              <div className="mt-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 transition-all"
                >
                  <span>{showHint ? '🙈' : '💡'}</span>
                  <span>{showHint ? '隱藏中文翻譯' : '顯示中文翻譯（考試時不會有）'}</span>
                </button>
                
                {showHint && currentQuestion.explanation && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-2 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800"
                  >
                    <strong>提示：</strong>
                    {currentQuestion.explanation.split('\n')[0]?.replace('【原文】', '') || ''}
                  </motion.div>
                )}
              </div>
            )}
            
            {/* 聆聽音頻播放器 */}
            {section.id === 'listening' && currentQuestion && (
              <div className="mt-6">
                {(() => {
                  const data = listeningQuestionData.get(currentQuestion.id);
                  if (!data) return null;
                  
                  // 如果有多句對話，用 DialoguePlayer
                  if (data.dialogue.length > 1) {
                    return (
                      <DialoguePlayer 
                        lines={data.dialogue} 
                        onShowTranscript={() => setShowTranscript(true)}
                      />
                    );
                  }
                  
                  // 單句用 AudioPlayer
                  return (
                    <div className="bg-amber-50 rounded-xl p-4 text-center">
                      <AudioPlayer 
                        text={data.dialogue[0]?.text || ''} 
                        rate={0.8}
                      />
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
          
          {/* 選項 */}
          {currentQuestion?.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentQuestion!.id] === index;
                
                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 ${
                        isSelected
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className={isSelected ? 'text-indigo-900' : 'text-gray-700'}>
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          
          {/* 填空題 */}
          {currentQuestion?.type === 'fill-in-blank' && (
            <div className="flex flex-wrap gap-2">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    answers[currentQuestion!.id] === index
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                      : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          
          {/* 答題後顯示解釋 */}
          {currentQuestion && answers[currentQuestion.id] !== undefined && currentQuestion.explanation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100"
            >
              <div className="flex items-center gap-2 mb-2 text-green-800 font-medium">
                <span>✅</span>
                <span>正確答案：{String.fromCharCode(65 + currentQuestion.correctAnswer)}</span>
              </div>
              <p className="text-sm text-green-700 whitespace-pre-line">
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      )}
      
      {/* 導航按鈕 */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          ← 上一題
        </button>
        
        {/* 題目導航 */}
        <div className="hidden md:flex gap-1">
          {section.questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => jumpToQuestion(index)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                index === currentQuestionIndex
                  ? 'bg-indigo-500 text-white'
                  : answers[q.id] !== undefined
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        
        <button
          onClick={nextQuestion}
          className="px-6 py-3 rounded-xl font-medium transition-all bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {currentQuestionIndex === section.questions.length - 1 ? '完成' : '下一題 →'}
        </button>
      </div>
      
      {/* 確認提交彈窗 */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {isLastSection ? '提交考試' : '提交部分'}
            </h3>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">總題數</span>
                <span className="font-medium">{section.questions.length} 題</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">已作答</span>
                <span className="font-medium text-green-600">{answeredCount} 題</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">未作答</span>
                <span className="font-medium text-red-600">
                  {section.questions.length - answeredCount} 題
                </span>
              </div>
            </div>
            
            {section.questions.length - answeredCount > 0 && (
              <p className="text-amber-600 text-sm mb-4">
                ⚠️ 還有 {section.questions.length - answeredCount} 題未作答，確定要提交嗎？
              </p>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                繼續作答
              </button>
              <button
                onClick={submitSection}
                className="flex-1 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                {isLastSection ? '提交考試' : '下一部分'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
