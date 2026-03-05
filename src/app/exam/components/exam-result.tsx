/**
 * 考試結果組件
 * Exam Result Component
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Exam, ExamResult } from '../exam-data';


interface ExamResultProps {
  result: ExamResult;
  exam: Exam;
  answers: Record<string, number>; // 用戶答案
  onRetry: () => void;
  onBackToMenu: () => void;
}

export function ExamResultComponent({
  result,
  exam,
  answers,
  onRetry,
  onBackToMenu,
}: ExamResultProps) {
  const { percentage, isPassed, totalScore, maxScore, sectionScores } = result;
  const [showReview, setShowReview] = useState(false);
  
  // 評語
  const getFeedback = () => {
    if (percentage >= 90) return { emoji: '🏆', text: '太棒了！你的日文實力非常強！', color: 'text-purple-600' };
    if (percentage >= 80) return { emoji: '🌟', text: '非常好！繼續保持！', color: 'text-indigo-600' };
    if (percentage >= 70) return { emoji: '👏', text: '不錯！還有進步空間！', color: 'text-blue-600' };
    if (percentage >= 60) return { emoji: '👍', text: '及格了！再努力一點！', color: 'text-green-600' };
    if (percentage >= 40) return { emoji: '💪', text: '繼續努力，下次會更好！', color: 'text-amber-600' };
    return { emoji: '📚', text: '多複習，再挑戰！', color: 'text-red-600' };
  };
  
  const feedback = getFeedback();
  
  // 格式化時間
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  };
  
  return (
    <div>
      {/* 結果標題 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center mb-6"
      >
        {/* 表情 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10 }}
          className="text-7xl mb-4"
        >
          {feedback.emoji}
        </motion.div>
        
        {/* 通過/未通過標記 */}
        <div className={`inline-block px-4 py-2 rounded-full text-lg font-bold mb-4 ${
          isPassed 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {isPassed ? '✓ 考試通過' : '✗ 未通過'}
        </div>
        
        {/* 分數 */}
        <div className="mb-4">
          <div className={`text-6xl font-bold ${feedback.color}`}>
            {percentage}%
          </div>
          <div className="text-gray-500 mt-2">
            {totalScore} / {maxScore} 分
          </div>
        </div>
        
        {/* 評語 */}
        <p className="text-lg text-gray-700 mb-6">{feedback.text}</p>
        
        {/* 考試資訊 */}
        <div className="flex justify-center gap-6 text-sm text-gray-500">
          <div>
            <span className="block font-medium text-gray-900">{formatTime(result.timeSpent)}</span>
            <span>用時</span>
          </div>
          <div>
            <span className="block font-medium text-gray-900">第 {exam.lessonNum} 課</span>
            <span>考試範圍</span>
          </div>
        </div>
      </motion.div>
      
      {/* 各部分成績 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">📊 各部分成績</h3>
        
        <div className="space-y-4">
          {/* 閱讀理解 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">📖</span>
                <span className="font-medium">閱讀理解</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-900">
                  {sectionScores.reading.correct} / {sectionScores.reading.total}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  ({Math.round((sectionScores.reading.correct / sectionScores.reading.total) * 100) || 0}%)
                </span>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(sectionScores.reading.correct / sectionScores.reading.total) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="h-full bg-blue-500"
              />
            </div>
          </div>
          
          {/* 語文運用 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">✏️</span>
                <span className="font-medium">語文運用</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-900">
                  {sectionScores.language.correct} / {sectionScores.language.total}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  ({Math.round((sectionScores.language.correct / sectionScores.language.total) * 100) || 0}%)
                </span>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(sectionScores.language.correct / sectionScores.language.total) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="h-full bg-green-500"
              />
            </div>
          </div>
          
          {/* 聆聽理解 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎧</span>
                <span className="font-medium">聆聽理解</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-900">
                  {sectionScores.listening.correct} / {sectionScores.listening.total}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  ({Math.round((sectionScores.listening.correct / sectionScores.listening.total) * 100) || 0}%)
                </span>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(sectionScores.listening.correct / sectionScores.listening.total) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="h-full bg-amber-500"
              />
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* 能力分析 */}
      {isPassed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6 border border-indigo-100"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-3">🎉 能力分數已更新</h3>
          <p className="text-gray-600 mb-3">
            恭喜你通過考試！你的六角雷達能力分數已經更新。
            前往個人中心查看詳細的能力分析。
          </p>
          <div className="flex flex-wrap gap-2">
            {sectionScores.reading.correct >= sectionScores.reading.total * 0.7 && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">📖 閱讀理解 +</span>
            )}
            {sectionScores.language.correct >= sectionScores.language.total * 0.7 && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">✏️ 語文運用 +</span>
            )}
            {sectionScores.listening.correct >= sectionScores.listening.total * 0.7 && (
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">🎧 聆聽理解 +</span>
            )}
          </div>
        </motion.div>
      )}
      
      {/* 建議 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 rounded-2xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-3">💡 學習建議</h3>
        <ul className="space-y-2 text-gray-600">
          {sectionScores.reading.correct < sectionScores.reading.total * 0.6 && (
            <li>• 閱讀理解需要加強，建議多複習詞彙和課文內容</li>
          )}
          {sectionScores.language.correct < sectionScores.language.total * 0.6 && (
            <li>• 語文運用需要練習，建議多做助詞和文法練習</li>
          )}
          {sectionScores.listening.correct < sectionScores.listening.total * 0.6 && (
            <li>• 聆聽理解需要提升，建議多聽日文發音和對話</li>
          )}
          {isPassed && (
            <li>• 你已經掌握了這些內容，可以繼續挑戰下一課！</li>
          )}
          {!isPassed && (
            <li>• 建議複習後再次挑戰，及格分數是60%</li>
          )}
        </ul>
      </motion.div>
      
      {/* 重溫答案 */}
      {showReview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">📝 答案回顧</h3>
            <button
              onClick={() => setShowReview(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕ 關閉
            </button>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {exam.sections.map((section) => 
              section.questions.map((q, idx) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                  <div key={q.id} className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {isCorrect ? '✓' : '✗'}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">
                          {section.title} - 第 {idx + 1} 題
                        </p>
                        <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                        <div className="space-y-1">
                          {q.options.map((opt, optIdx) => (
                            <div key={optIdx} className={`text-sm px-3 py-2 rounded ${
                              optIdx === q.correctAnswer 
                                ? 'bg-green-200 text-green-800 font-medium' 
                                : optIdx === userAnswer 
                                  ? 'bg-red-200 text-red-800' 
                                  : 'bg-gray-100 text-gray-600'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}. {opt}
                              {optIdx === q.correctAnswer && ' ✓ 正確'}
                              {optIdx === userAnswer && optIdx !== q.correctAnswer && ' ✗ 你的答案'}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      )}

      {/* 操作按 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex gap-3"
      >
        <button
          onClick={onBackToMenu}
          className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
        >
          返回選單
        </button>
        <button
          onClick={() => setShowReview(true)}
          className="flex-1 px-4 py-3 rounded-xl bg-amber-100 text-amber-700 font-medium hover:bg-amber-200 transition-colors"
        >
          📝 重溫答案
        </button>
        <button
          onClick={onRetry}
          className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
        >
          重新考試
        </button>
      </motion.div>
    </div>
  );
}
