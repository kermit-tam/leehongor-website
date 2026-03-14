'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  allSampleQuestions,
  AVAILABLE_YEARS,
  SECTION_TITLES,
  ExamSection,
  ExamQuestion,
  filterQuestions,
} from '@/data/jlpt-n5-exam';
import { ExamQuestionCard } from './components/exam-question-card';
import { ExamFilters } from './components/exam-filters';
import { ExamResults } from './components/exam-results';

export default function JLPTExamPage() {
  // 篩選狀態 - 預設選擇所有年份和部份
  const [selectedYears, setSelectedYears] = useState<number[]>(
    [...new Set(AVAILABLE_YEARS.map(y => y.year))]
  );
  const [selectedSections, setSelectedSections] = useState<ExamSection[]>(['vocabulary', 'grammar', 'reading']);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [questionCount, setQuestionCount] = useState<number | null>(null);

  // 測驗狀態
  const [isExamMode, setIsExamMode] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  // 過濾題目
  const filteredQuestions = useMemo(() => {
    return filterQuestions(
      allSampleQuestions,
      selectedYears,
      selectedSections,
      false // 不在這裡打亂，等開始測驗時再打亂
    );
  }, [selectedYears, selectedSections]);

  // 開始測驗
  const startExam = useCallback(() => {
    let questions = filterQuestions(
      allSampleQuestions,
      selectedYears,
      selectedSections,
      shuffleMode
    );

    // 如果設定了題數限制
    if (questionCount && questionCount < questions.length) {
      questions = questions.slice(0, questionCount);
    }

    setCurrentQuestions(questions);
    setAnswers({});
    setShowResults(false);
    setIsExamMode(true);
  }, [selectedYears, selectedSections, shuffleMode, questionCount]);

  // 提交答案
  const submitAnswer = useCallback((questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  }, []);

  // 結束測驗並顯示結果
  const finishExam = useCallback(() => {
    setShowResults(true);
  }, []);

  // 重新開始
  const restartExam = useCallback(() => {
    setIsExamMode(false);
    setShowResults(false);
    setAnswers({});
    setCurrentQuestions([]);
  }, []);

  // 計算結果
  const examResult = useMemo(() => {
    if (!showResults) return null;

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    currentQuestions.forEach(q => {
      const answer = answers[q.id];
      if (!answer) {
        unanswered++;
      } else if (answer === q.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const total = currentQuestions.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;

    return {
      total,
      correct,
      wrong,
      unanswered,
      score,
    };
  }, [showResults, currentQuestions, answers]);

  // 渲染篩選界面
  const renderFilterView = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 標題 */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-[#4A4A4A]">📚 歷屆試題</h1>
        <p className="text-[#8C8C8C]">JLPT N5 日本語能力試驗歷年考古題</p>
      </div>

      {/* 篩選器 */}
      <ExamFilters
        selectedYears={selectedYears}
        selectedSections={selectedSections}
        shuffleMode={shuffleMode}
        questionCount={questionCount}
        onYearsChange={setSelectedYears}
        onSectionsChange={setSelectedSections}
        onShuffleChange={setShuffleMode}
        onQuestionCountChange={setQuestionCount}
        availableYears={AVAILABLE_YEARS}
        sectionTitles={SECTION_TITLES}
      />

      {/* 題目預覽 */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[#4A4A4A]">題目預覽</h2>
          <span className="text-sm text-[#8C8C8C]">
            共 {filteredQuestions.length} 題
          </span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 text-[#8C8C8C]">
            <div className="text-4xl mb-3">📝</div>
            <p>請選擇年份和部份以開始練習</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.slice(0, 3).map((q, index) => (
              <div
                key={q.id}
                className="p-4 bg-[#F5F5F0] rounded-lg text-sm text-[#4A4A4A]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-[#A8B5A0] text-white text-xs rounded">
                    {q.year}年{q.month}月
                  </span>
                  <span className="px-2 py-0.5 bg-[#C4B9AC] text-white text-xs rounded">
                    {SECTION_TITLES[q.section].title}
                  </span>
                  <span className="text-[#8C8C8C]">第{q.questionNumber}題</span>
                </div>
                <p className="line-clamp-2">{q.question}</p>
              </div>
            ))}
            {filteredQuestions.length > 3 && (
              <p className="text-center text-sm text-[#8C8C8C] pt-2">
                ... 還有 {filteredQuestions.length - 3} 題
              </p>
            )}
          </div>
        )}
      </div>

      {/* 開始按鈕 */}
      <div className="flex justify-center">
        <button
          onClick={startExam}
          disabled={filteredQuestions.length === 0}
          className="px-8 py-4 bg-[#A8B5A0] text-white rounded-xl font-medium text-lg
                     disabled:bg-[#E5E5E5] disabled:text-[#8C8C8C] disabled:cursor-not-allowed
                     hover:bg-[#8B9A80] transition-colors shadow-lg"
        >
          {shuffleMode ? '🔀 開始亂序練習' : '📋 開始練習'}
        </button>
      </div>
    </div>
  );

  // 渲染測驗界面
  const renderExamView = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 頂部導航 */}
      <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-[#E5E5E5]">
        <button
          onClick={restartExam}
          className="flex items-center gap-2 text-[#8C8C8C] hover:text-[#4A4A4A] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回選單
        </button>
        <div className="text-center">
          <span className="text-lg font-medium text-[#4A4A4A]">
            {Object.keys(answers).length} / {currentQuestions.length}
          </span>
          <span className="text-sm text-[#8C8C8C] ml-1">已答題數</span>
        </div>
        <button
          onClick={finishExam}
          className="px-4 py-2 bg-[#C4B9AC] text-white rounded-lg hover:bg-[#A09088] transition-colors"
        >
          結束測驗
        </button>
      </div>

      {/* 進度條 */}
      <div className="w-full h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#A8B5A0]"
          initial={{ width: 0 }}
          animate={{ width: `${(Object.keys(answers).length / currentQuestions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* 題目列表 */}
      <div className="space-y-6">
        {currentQuestions.map((question, index) => (
          <ExamQuestionCard
            key={question.id}
            question={question}
            questionNumber={index + 1}
            selectedAnswer={answers[question.id] || null}
            showResult={showResults}
            onSelectAnswer={(answer) => submitAnswer(question.id, answer)}
          />
        ))}
      </div>

      {/* 底部操作 */}
      {!showResults && (
        <div className="flex justify-center pb-8">
          <button
            onClick={finishExam}
            className="px-8 py-4 bg-[#A8B5A0] text-white rounded-xl font-medium text-lg hover:bg-[#8B9A80] transition-colors shadow-lg"
          >
            ✅ 提交答案
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 頂部導航 */}
        <div className="mb-8">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-[#8C8C8C] hover:text-[#4A4A4A] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回學習中心
          </Link>
        </div>

        {/* 結果顯示 */}
        <AnimatePresence>
          {showResults && examResult && (
            <ExamResults
              result={examResult}
              onRestart={restartExam}
              onReview={() => {}} // 保持顯示答案狀態
            />
          )}
        </AnimatePresence>

        {/* 主內容 */}
        <AnimatePresence mode="wait">
          {!isExamMode ? (
            <motion.div
              key="filter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {renderFilterView()}
            </motion.div>
          ) : (
            <motion.div
              key="exam"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {renderExamView()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
