'use client';

import { motion } from 'framer-motion';

interface ExamResultsProps {
  result: {
    total: number;
    correct: number;
    wrong: number;
    unanswered: number;
    score: number;
  };
  onRestart: () => void;
  onReview: () => void;
}

export function ExamResults({ result, onRestart, onReview }: ExamResultsProps) {
  // 根據分數給予評價
  const getEvaluation = (score: number) => {
    if (score >= 90) return { emoji: '🏆', text: '優秀！', color: 'text-yellow-600' };
    if (score >= 80) return { emoji: '🌟', text: '很好！', color: 'text-green-600' };
    if (score >= 70) return { emoji: '👍', text: '不錯！', color: 'text-blue-600' };
    if (score >= 60) return { emoji: '💪', text: '及格！', color: 'text-orange-600' };
    return { emoji: '📚', text: '繼續努力！', color: 'text-red-600' };
  };

  const evaluation = getEvaluation(result.score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
      >
        {/* 標題 */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-6xl mb-2"
          >
            {evaluation.emoji}
          </motion.div>
          <h2 className={`text-2xl font-bold ${evaluation.color}`}>{evaluation.text}</h2>
        </div>

        {/* 分數 */}
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-[#4A4A4A]">{result.score}</div>
          <div className="text-[#8C8C8C]">分</div>
        </div>

        {/* 統計 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{result.correct}</div>
            <div className="text-sm text-green-700">正確</div>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{result.wrong}</div>
            <div className="text-sm text-red-700">錯誤</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{result.unanswered}</div>
            <div className="text-sm text-blue-700">未答</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{result.total}</div>
            <div className="text-sm text-gray-700">總計</div>
          </div>
        </div>

        {/* 操作按鈕 */}
        <div className="space-y-3">
          <button
            onClick={onReview}
            className="w-full py-3 bg-[#A8B5A0] text-white rounded-xl font-medium hover:bg-[#8B9A80] transition-colors"
          >
            👁️ 查看解析
          </button>
          <button
            onClick={onRestart}
            className="w-full py-3 bg-[#F5F5F0] text-[#4A4A4A] rounded-xl font-medium hover:bg-[#E0D5C7] transition-colors"
          >
            🔄 重新開始
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
