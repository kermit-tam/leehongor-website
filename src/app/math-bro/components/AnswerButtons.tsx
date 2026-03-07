'use client';

import { motion } from 'framer-motion';

interface AnswerButtonsProps {
  options: number[];
  onSelect: (answer: number) => void;
  disabled?: boolean;
  selectedAnswer?: number | null;
  correctAnswer?: number | null;
  showResult?: boolean;
}

export function AnswerButtons({
  options,
  onSelect,
  disabled = false,
  selectedAnswer,
  correctAnswer,
  showResult = false,
}: AnswerButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
      {options.map((option, index) => {
        const isSelected = selectedAnswer === option;
        const isCorrect = correctAnswer === option;
        const isWrong = showResult && isSelected && !isCorrect;
        const showCorrect = showResult && isCorrect;

        return (
          <motion.button
            key={`${option}-${index}`}
            onClick={() => !disabled && onSelect(option)}
            disabled={disabled}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            animate={showCorrect ? {
              scale: [1, 1.1, 1],
              backgroundColor: ['#22c55e', '#16a34a', '#22c55e'],
            } : isWrong ? {
              x: [-5, 5, -5, 5, 0],
              backgroundColor: '#ef4444',
            } : {}}
            transition={{ duration: 0.3 }}
            className={`
              relative h-24 rounded-2xl text-4xl font-bold shadow-lg
              transition-all duration-200
              ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:shadow-xl'}
              ${showCorrect 
                ? 'bg-green-500 text-white ring-4 ring-green-300' 
                : isWrong 
                  ? 'bg-red-500 text-white' 
                  : isSelected 
                    ? 'bg-blue-500 text-white ring-4 ring-blue-300'
                    : 'bg-white text-gray-800 hover:bg-gray-50 border-2 border-gray-200'
              }
            `}
          >
            {/* 數字顯示 */}
            <span className="relative z-10">{option}</span>
            
            {/* 正確/錯誤圖標 */}
            {showCorrect && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 text-2xl"
              >
                ✅
              </motion.div>
            )}
            {isWrong && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 text-2xl"
              >
                ❌
              </motion.div>
            )}
            
            {/* 背景動畫效果 */}
            {!disabled && !showResult && (
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0"
                whileHover={{ opacity: 0.1 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

// 數字鍵盤（用於開放式輸入，如果需要）
interface NumberPadProps {
  onNumber: (num: number) => void;
  onClear: () => void;
  onSubmit: () => void;
  currentValue: string;
  maxLength?: number;
}

export function NumberPad({
  onNumber,
  onClear,
  onSubmit,
  currentValue,
  maxLength = 3,
}: NumberPadProps) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* 顯示目前輸入 */}
      <div className="bg-gray-100 rounded-xl p-4 mb-4 text-center">
        <span className="text-4xl font-bold text-gray-800">
          {currentValue || '?'}
        </span>
      </div>
      
      {/* 數字鍵盤 */}
      <div className="grid grid-cols-3 gap-2">
        {numbers.slice(0, 9).map((num) => (
          <motion.button
            key={num}
            onClick={() => currentValue.length < maxLength && onNumber(num)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-16 bg-white rounded-xl text-2xl font-bold shadow-md hover:shadow-lg border-2 border-gray-200"
          >
            {num}
          </motion.button>
        ))}
        
        {/* 清除鍵 */}
        <motion.button
          onClick={onClear}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-16 bg-red-100 text-red-600 rounded-xl text-xl font-bold shadow-md hover:shadow-lg"
        >
          清除
        </motion.button>
        
        {/* 0 */}
        <motion.button
          onClick={() => currentValue.length < maxLength && onNumber(0)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-16 bg-white rounded-xl text-2xl font-bold shadow-md hover:shadow-lg border-2 border-gray-200"
        >
          0
        </motion.button>
        
        {/* 確認鍵 */}
        <motion.button
          onClick={onSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!currentValue}
          className="h-16 bg-green-500 text-white rounded-xl text-xl font-bold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          確認
        </motion.button>
      </div>
    </div>
  );
}
