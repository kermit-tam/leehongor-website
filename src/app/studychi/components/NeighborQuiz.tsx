/**
 * 前後站估中間 - 新練習模式
 * 顯示前後兩個站，估中間係咩站
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MTRLine, MTRStation } from '../data/mtr-stations';

interface NeighborQuizProps {
  line: MTRLine;
  onBack: () => void;
  onScore: (points: number) => void;
  speak: (text: string, lang?: string, rate?: number) => void;
}

interface Question {
  prevStation: MTRStation;
  targetStation: MTRStation;
  nextStation: MTRStation;
  options: MTRStation[];
}

// 隨機打亂數組的輔助函數
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// 生成題目的輔助函數
const generateRandomQuestion = (line: MTRLine): Question | null => {
  // 只選有前後站的（排除第一個和最後一個）
  const validStations = line.stations.filter((_, index) => 
    index > 0 && index < line.stations.length - 1
  );
  
  if (validStations.length === 0) return null;

  // 隨機選一個目標站
  const target = validStations[Math.floor(Math.random() * validStations.length)];
  const targetIndex = line.stations.findIndex(s => s.id === target.id);
  
  const prevStation = line.stations[targetIndex - 1];
  const nextStation = line.stations[targetIndex + 1];

  // 生成選項（包含正確答案和5個「附近站」作為干擾項）
  // 從目標站前後各3個站內選干擾項，增加難度
  const nearbyStations: MTRStation[] = [];
  
  // 向前取最多3個站
  for (let i = targetIndex - 3; i < targetIndex; i++) {
    if (i >= 0 && line.stations[i].id !== target.id) {
      nearbyStations.push(line.stations[i]);
    }
  }
  
  // 向後取最多3個站
  for (let i = targetIndex + 3; i > targetIndex; i--) {
    if (i < line.stations.length && line.stations[i].id !== target.id) {
      nearbyStations.push(line.stations[i]);
    }
  }
  
  // 如果附近站不夠5個，從其他站補充
  const otherStations = line.stations.filter(s => 
    s.id !== target.id && !nearbyStations.find(ns => ns.id === s.id)
  );
  
  // 隨機排序附近站，取最多5個
  const selectedNearby = shuffleArray(nearbyStations).slice(0, 5);
  
  // 如果不夠5個，從其他站補充
  const neededCount = 5 - selectedNearby.length;
  const extraDistractors = neededCount > 0 
    ? shuffleArray(otherStations).slice(0, neededCount)
    : [];
  
  // 最終選項：正確答案 + 5個干擾項 = 6個選項
  const options = shuffleArray([...selectedNearby, ...extraDistractors, target]);

  return {
    prevStation,
    targetStation: target,
    nextStation,
    options
  };
};

export function NeighborQuiz({ line, onBack, onScore, speak }: NeighborQuizProps) {
  // 使用函數式初始化
  const [question, setQuestion] = useState<Question | null>(() => generateRandomQuestion(line));
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const maxRounds = 10;

  // 讀出題目
  const speakQuestion = () => {
    if (!question) return;
    const text = `${question.prevStation.name}之後，${question.nextStation.name}之前，係邊個站？`;
    speak(text, 'zh-HK', 0.7);
  };

  const handleAnswer = (stationId: string) => {
    if (selectedAnswer || !question) return;
    
    setSelectedAnswer(stationId);
    const correct = stationId === question.targetStation.id;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 10);
      onScore(10);
    }

    // 下一題或結束
    setTimeout(() => {
      if (round < maxRounds) {
        setRound(r => r + 1);
        const newQuestion = generateRandomQuestion(line);
        if (newQuestion) {
          setQuestion(newQuestion);
          setSelectedAnswer(null);
          setIsCorrect(null);
          setShowHint(false);
        }
      } else {
        setShowResult(true);
      }
    }, 2500);
  };

  const getOptionStyle = (option: MTRStation): React.CSSProperties => {
    // 根據選項所屬路線顯示顏色邊框
    const baseStyle: React.CSSProperties = {
      borderWidth: '4px',
      borderColor: option.lineColorCode,
      backgroundColor: `${option.lineColorCode}15`,
    };

    if (selectedAnswer === null) {
      return baseStyle;
    }

    if (option.id === question?.targetStation.id) {
      // 正確答案
      return {
        ...baseStyle,
        borderColor: '#22c55e',
        backgroundColor: '#dcfce7',
      };
    }

    if (selectedAnswer === option.id && !isCorrect) {
      // 錯誤選擇
      return {
        ...baseStyle,
        borderColor: '#ef4444',
        backgroundColor: '#fee2e2',
      };
    }

    return {
      ...baseStyle,
      opacity: 0.5,
    };
  };

  if (showResult) {
    return (
      <div className="max-w-md mx-auto p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-xl text-center"
        >
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">練習完成！</h3>
          <p className="text-gray-600 mb-4">你答對咗 {score / 10} / {maxRounds} 題</p>
          <div className="text-5xl font-bold mb-6" style={{ color: line.colorCode }}>
            {score} 分
          </div>
          <button
            onClick={onBack}
            className="w-full py-4 rounded-xl text-white font-bold text-lg"
            style={{ backgroundColor: line.colorCode }}
          >
            返回主頁
          </button>
        </motion.div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <p className="text-gray-500">載入緊...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 頂部欄 */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800 font-medium">
          ← 返回
        </button>
        <h2 className="text-xl font-bold text-gray-800">🚉 前後站估中間</h2>
        <span className="text-sm font-medium text-gray-500">{round}/{maxRounds}</span>
      </div>

      {/* 分數 */}
      <div className="bg-white rounded-2xl p-4 shadow-lg mb-6 text-center">
        <p className="text-3xl font-bold" style={{ color: line.colorCode }}>⭐ {score}</p>
      </div>

      {/* 題目顯示區 */}
      <motion.div 
        className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          {/* 前一站 */}
          <div className="text-center">
            <motion.div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-2 shadow-md"
              style={{ 
                backgroundColor: `${question.prevStation.lineColorCode}20`,
                border: `3px solid ${question.prevStation.lineColorCode}`
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => speak(question.prevStation.name, 'zh-HK', 0.6)}
            >
              {question.prevStation.landmarkIcon}
            </motion.div>
            <p className="font-bold text-gray-700">{question.prevStation.name}</p>
            <p className="text-xs text-gray-400">前一站</p>
          </div>

          {/* 箭頭 */}
          <div className="flex flex-col items-center">
            <span className="text-2xl text-gray-400">→</span>
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center my-2 border-4 border-dashed border-gray-300">
              <span className="text-3xl">❓</span>
            </div>
            <span className="text-2xl text-gray-400">→</span>
          </div>

          {/* 後一站 */}
          <div className="text-center">
            <motion.div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-2 shadow-md"
              style={{ 
                backgroundColor: `${question.nextStation.lineColorCode}20`,
                border: `3px solid ${question.nextStation.lineColorCode}`
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => speak(question.nextStation.name, 'zh-HK', 0.6)}
            >
              {question.nextStation.landmarkIcon}
            </motion.div>
            <p className="font-bold text-gray-700">{question.nextStation.name}</p>
            <p className="text-xs text-gray-400">後一站</p>
          </div>
        </div>

        {/* 播放題目按鈕 */}
        <button
          onClick={speakQuestion}
          className="w-full py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2"
          style={{ backgroundColor: line.colorCode }}
        >
          <span className="text-xl">🔊</span>
          聽題目
        </button>
      </motion.div>

      {/* 選項 - 6個選項，3列2行 */}
      <div className="grid grid-cols-3 gap-3">
        <AnimatePresence mode="wait">
          {question.options.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleAnswer(option.id)}
              disabled={selectedAnswer !== null}
              className="p-4 rounded-xl font-bold text-center transition-all text-base shadow-md hover:shadow-lg active:scale-95"
              style={getOptionStyle(option)}
            >
              {option.name}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* 提示按鈕 */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
          disabled={selectedAnswer !== null}
        >
          {showHint ? '隱藏提示' : '💡 需要提示？'}
        </button>
        
        <AnimatePresence>
          {showHint && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 text-sm text-gray-500 bg-yellow-50 rounded-xl p-3"
            >
              呢個站附近係：{question.targetStation.landmark}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* 進度條 */}
      <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="h-full rounded-full"
          style={{ backgroundColor: line.colorCode }}
          initial={{ width: 0 }}
          animate={{ width: `${(round / maxRounds) * 100}%` }}
        />
      </div>
    </div>
  );
}
