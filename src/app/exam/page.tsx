/**
 * 考試模式主頁面
 * Exam Mode Main Page
 * 
 * 提供N5考試模擬：閱讀理解、語文運用、聆聽
 * 每課考試包含該課及之前所有課的內容
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useAuth, useRequireAuth } from '@/lib/auth-context';
import { n5LessonsList } from '@/data/n5-lessons';

import { Exam, ExamResult, getAvailableExams, calculateExamScore } from './exam-data';
import { ExamSectionComponent } from './components/exam-section';
import { ExamResultComponent } from './components/exam-result';
import { AbilityRadarChart } from '@/components/charts/radar-chart';

type ExamMode = 'menu' | 'section-select' | 'exam' | 'result';

export default function ExamPage() {
  const { user } = useAuth();
  useRequireAuth('/');
  
  const [mode, setMode] = useState<ExamMode>('menu');
  const [exams, setExams] = useState<Exam[]>(() => getAvailableExams(n5LessonsList));
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [sectionOrder, setSectionOrder] = useState<number[]>([]);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  

  // 選擇考試，進入部分選擇界面
  const selectExam = (exam: Exam) => {
    setSelectedExam(exam);
    // 默認順序：0, 1, 2...
    setSectionOrder(exam.sections.map((_, i) => i));
    setCurrentSection(0);
    setAnswers({});
    setMode('section-select');
  };
  
  // 開始考試（從選中的部分開始）
  const startExamFromSection = (sectionIndex: number) => {
    // 重新排序：把選中的部分放到第一個
    const newOrder = [...sectionOrder];
    const selectedIdx = newOrder.indexOf(sectionIndex);
    if (selectedIdx > -1) {
      newOrder.splice(selectedIdx, 1);
      newOrder.unshift(sectionIndex);
    }
    setSectionOrder(newOrder);
    setCurrentSection(0);
    setStartTime(new Date());
    setMode('exam');
  };
  
  // 開始考試（默認順序）
  const startExam = (exam: Exam) => {
    setSelectedExam(exam);
    setSectionOrder(exam.sections.map((_, i) => i));
    setCurrentSection(0);
    setAnswers({});
    setStartTime(new Date());
    setMode('exam');
  };
  
  // 提交答案
  const submitAnswer = (questionId: string, answer: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };
  
  // 下一部分
  const nextSection = () => {
    if (!selectedExam) return;
    
    if (currentSection < sectionOrder.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else {
      // 考試完成
      finishExam();
    }
  };
  
  // 完成考試
  const finishExam = () => {
    if (!selectedExam || !startTime) return;
    
    const result = calculateExamScore(selectedExam, answers);
    result.timeSpent = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
    
    setExamResult(result);
    setMode('result');
    
    // 保存到 localStorage
    const history = JSON.parse(localStorage.getItem('exam-history') || '[]');
    history.push({
      ...result,
      startedAt: startTime.toISOString(),
      completedAt: new Date().toISOString(),
    });
    localStorage.setItem('exam-history', JSON.stringify(history));
  };
  
  // 重新考試
  const retryExam = () => {
    if (!selectedExam) return;
    setCurrentSection(0);
    setAnswers({});
    setStartTime(new Date());
    setMode('exam');
  };
  
  // 返回選單
  const backToMenu = () => {
    setMode('menu');
    setSelectedExam(null);
    setExamResult(null);
    setAnswers({});
  };
  
  // 渲染主選單
  const renderMenu = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* 頁面標題 */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl mb-4"
        >
          📝
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900 mb-3"
        >
          考試模式
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          模擬N5考試格式，測試你的日文實力。每課考試包含該課及之前所有課的內容，
          分為閱讀理解、語文運用、聆聽三部分。
        </motion.p>
      </div>
      
      {/* 考試列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam, index) => {
          // 計算是否解鎖（完成前一課或解鎖了該課）
          const isUnlocked = exam.lessonNum === 1 || true; // 暫時全部開放
          
          return (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden ${
                isUnlocked 
                  ? 'border-indigo-100 hover:border-indigo-300 cursor-pointer' 
                  : 'border-gray-100 opacity-60'
              }`}
              onClick={() => isUnlocked && selectExam(exam)}
            >
              {/* 頂部色塊 */}
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
              
              <div className="p-6">
                {/* 課程編號 */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    第 {exam.lessonNum} 課
                  </span>
                  {exam.lessonNum > 1 && (
                    <span className="text-xs text-gray-500">
                      包含 1-{exam.lessonNum} 課
                    </span>
                  )}
                </div>
                
                {/* 標題 */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {exam.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {exam.subtitle}
                </p>
                
                {/* 考試資訊 */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">總題數</span>
                    <span className="font-medium text-gray-900">{exam.totalQuestions} 題</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">考試時間</span>
                    <span className="font-medium text-gray-900">{exam.totalTime} 分鐘</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">及格分數</span>
                    <span className="font-medium text-gray-900">{exam.passScore} 分</span>
                  </div>
                </div>
                
                {/* 三部分 */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-blue-50 rounded-lg p-2">
                      <div className="text-blue-600 font-medium">📖</div>
                      <div className="text-blue-700">閱讀</div>
                      <div className="text-blue-600">{exam.sections[0]?.questionCount || 0}題</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2">
                      <div className="text-green-600 font-medium">✏️</div>
                      <div className="text-green-700">語文</div>
                      <div className="text-green-600">{exam.sections[1]?.questionCount || 0}題</div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-2">
                      <div className="text-amber-600 font-medium">🎧</div>
                      <div className="text-amber-700">聆聽</div>
                      <div className="text-amber-600">{exam.sections[2]?.questionCount || 0}題</div>
                    </div>
                  </div>
                </div>
                
                {/* 按鈕 */}
                <button
                  disabled={!isUnlocked}
                  className={`w-full mt-4 py-2 rounded-xl font-medium transition-all ${
                    isUnlocked
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isUnlocked ? '開始考試' : '尚未解鎖'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* 說明 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-3">📋 考試說明</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>考試分為三部分：閱讀理解（読解）、語文運用（文法・語彙）、聆聽理解（聴解）</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>每課考試包含該課及之前所有課的內容，循序漸進測試你的實力</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>及格分數為60%，達到及格分數會更新你的六角雷達能力分數</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>考試結果會保存，你可以隨時查看進步曲線</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
  
  // 渲染部分選擇界面
  const renderSectionSelect = () => {
    if (!selectedExam) return null;
    
    const sectionIcons: Record<string, string> = {
      reading: '📖',
      language: '✏️',
      listening: '🎧',
    };
    
    const sectionColors: Record<string, string> = {
      reading: 'blue',
      language: 'green',
      listening: 'amber',
    };
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl mb-4"
          >
            🎯
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-gray-900 mb-3"
          >
            選擇開始部分
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600"
          >
            {selectedExam.title} - 你想先做哪個部分？
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {selectedExam.sections.map((section, index) => {
            const icon = sectionIcons[section.id] || '📝';
            const color = sectionColors[section.id] || 'gray';
            
            const colorClasses: Record<string, { bg: string; hover: string; text: string; border: string }> = {
              blue: { bg: 'bg-blue-50', hover: 'hover:bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
              green: { bg: 'bg-green-50', hover: 'hover:bg-green-100', text: 'text-green-700', border: 'border-green-200' },
              amber: { bg: 'bg-amber-50', hover: 'hover:bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
              gray: { bg: 'bg-gray-50', hover: 'hover:bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' },
            };
            
            const c = colorClasses[color];
            
            return (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => startExamFromSection(index)}
                className={`${c.bg} ${c.hover} border-2 ${c.border} rounded-2xl p-6 text-left transition-all hover:shadow-md`}
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className={`text-xl font-bold ${c.text} mb-2`}>{section.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{section.titleJp}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">題數</span>
                    <span className="font-medium text-gray-900">{section.questionCount} 題</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">時間</span>
                    <span className="font-medium text-gray-900">{section.timeLimit} 分鐘</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setSelectedExam(null);
              setMode('menu');
            }}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
          >
            ← 返回選單
          </button>
          <button
            onClick={() => startExam(selectedExam)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            按默認順序開始 →
          </button>
        </div>
      </div>
    );
  };
  
  // 渲染考試
  const renderExam = () => {
    if (!selectedExam) return null;
    
    // 檢查是否有 section
    if (selectedExam.sections.length === 0) {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">暫無可用題目</h2>
            <p className="text-gray-600 mb-6">此課程暫時沒有生成考試題目，請稍後再試。</p>
            <button
              onClick={backToMenu}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
            >
              返回選單
            </button>
          </div>
        </div>
      );
    }
    
    const actualSectionIndex = sectionOrder[currentSection];
    const section = selectedExam.sections[actualSectionIndex];
    const progress = ((currentSection + 1) / sectionOrder.length) * 100;
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* 頂部資訊 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{selectedExam.title}</h2>
              <p className="text-sm text-gray-500">
                第 {currentSection + 1} / {selectedExam.sections.length} 部分
              </p>
            </div>
            <button
              onClick={() => {
                if (confirm('確定要退出考試嗎？你的答案將不會被保存。')) {
                  backToMenu();
                }
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          {/* 進度條 */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        
        {/* 考試部分 */}
        <ExamSectionComponent
          key={section.id}
          section={section}
          answers={answers}
          onSubmitAnswer={submitAnswer}
          onNext={nextSection}
          isLastSection={currentSection === sectionOrder.length - 1}
        />
      </div>
    );
  };
  
  // 渲染結果
  const renderResult = () => {
    if (!examResult || !selectedExam) return null;
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <ExamResultComponent
          result={examResult}
          exam={selectedExam}
          answers={answers}
          onRetry={retryExam}
          onBackToMenu={backToMenu}
        />
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <AnimatePresence mode="wait">
        {mode === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderMenu()}
          </motion.div>
        )}
        
        {mode === 'section-select' && (
          <motion.div
            key="section-select"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {renderSectionSelect()}
          </motion.div>
        )}
        
        {mode === 'exam' && (
          <motion.div
            key="exam"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {renderExam()}
          </motion.div>
        )}
        
        {mode === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderResult()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
