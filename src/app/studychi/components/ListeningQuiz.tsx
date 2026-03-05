/**
 * 聆聽測驗組件 - 改進版
 * 聽站名，揀答案，選項顯示該站顏色
 */

'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MTRLine, MTRStation } from '../data/mtr-stations';

interface ListeningQuizProps {
  line: MTRLine;
  onBack: () => void;
  onScore: (points: number) => void;
  speak: (text: string, lang?: string, rate?: number) => void;
}

export function ListeningQuiz({ line, onBack, onScore, speak }: ListeningQuizProps) {
  // 所有狀態必須先聲明
  const [currentStation, setCurrentStation] = useState<MTRStation | null>(() => {
    const target = line.stations[Math.floor(Math.random() * line.stations.length)];
    return target || null;
  });
  const [options, setOptions] = useState<MTRStation[]>(() => {
    const target = line.stations[Math.floor(Math.random() * line.stations.length)];
    const allStations = [...line.stations];
    const otherStations = allStations.filter(s => s.id !== target.id);
    const shuffled = [...otherStations].sort(() => Math.random() - 0.5).slice(0, 3);
    return [...shuffled, target].sort(() => Math.random() - 0.5);
  });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const maxRounds = 10;

  // 生成題目函數 - 在狀態聲明之後定義
  const generateQuestion = useCallback(() => {
    // 隨機選一個站作為目標
    const targetIndex = Math.floor(Math.random() * line.stations.length);
    const target = line.stations[targetIndex];
    
    // 隨機選3個其他站作為選項（從所有路線選，增加難度）
    const allStations = [...line.stations];
    const otherStations = allStations.filter(s => s.id !== target.id);
    const shuffled = [...otherStations].sort(() => Math.random() - 0.5).slice(0, 3);
    
    // 加入正確答案並重新排序
    const allOptions = [...shuffled, target].sort(() => Math.random() - 0.5);
    
    // 批次更新所有狀態
    setCurrentStation(target);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setIsPlaying(false);
  }, [line.stations]);

  const playQuestion = () => {
    if (!currentStation || isPlaying) return;
    setIsPlaying(true);
    speak(currentStation.name, 'zh-HK', 0.6);
    setTimeout(() => setIsPlaying(false), 1000);
  };

  const handleAnswer = (stationId: string) => {
    if (selectedAnswer || !currentStation) return;
    
    setSelectedAnswer(stationId);
    const correct = stationId === currentStation.id;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 10);
      onScore(10);
    }

    // 下一題或結束
    setTimeout(() => {
      if (round < maxRounds) {
        setRound(r => r + 1);
        generateQuestion();
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const getOptionStyle = (option: MTRStation): React.CSSProperties => {
    // 根據選項所屬路線顯示顏色邊框
    const baseStyle: React.CSSProperties = {
      borderWidth: '4px',
      borderColor: option.lineColorCode,
      backgroundColor: `${option.lineColorCode}15`, // 15 = 約10% 透明度
    };

    if (selectedAnswer === null) {
      return baseStyle;
    }

    if (option.id === currentStation?.id) {
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

    // 其他未選選項變淡
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
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">測驗完成！</h3>
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

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 頂部欄 */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800 font-medium">
          ← 返回
        </button>
        <h2 className="text-xl font-bold text-gray-800">🎧 聆聽測驗</h2>
        <span className="text-sm font-medium text-gray-500">{round}/{maxRounds}</span>
      </div>

      {/* 分數 */}
      <div className="bg-white rounded-2xl p-4 shadow-lg mb-6 text-center">
        <p className="text-3xl font-bold" style={{ color: line.colorCode }}>⭐ {score}</p>
      </div>

      {currentStation && (
        <>
          {/* 播放區 */}
          <motion.div 
            className="bg-white rounded-3xl p-8 shadow-lg mb-6 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <p className="text-gray-500 mb-6 text-lg">聽清楚，揀出正確嘅站名！</p>
            
            {/* 大播放按鈕 */}
            <motion.button
              onClick={playQuestion}
              disabled={isPlaying}
              whileTap={{ scale: 0.95 }}
              className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl transition-all ${
                isPlaying ? 'animate-pulse' : 'hover:shadow-2xl'
              }`}
              style={{ backgroundColor: line.colorCode }}
            >
              <span className="text-6xl">{isPlaying ? '🔊' : '▶️'}</span>
            </motion.button>
            
            <p className="text-gray-400 text-sm">
              {isPlaying ? '播放緊...' : '撳一下聽站名'}
            </p>
          </motion.div>

          {/* 選項 - 根據所屬路線顯示顏色 */}
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence mode="wait">
              {options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(option.id)}
                  disabled={selectedAnswer !== null}
                  className={`p-5 rounded-2xl font-bold text-center transition-all text-lg shadow-md hover:shadow-lg active:scale-95`}
                  style={getOptionStyle(option)}
                >
                  {option.name}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* 提示 */}
          <div className="mt-6 bg-blue-50 rounded-2xl p-4 text-center">
            <p className="text-sm text-blue-600">
              💡 留意每個選項嘅顏色框代表嗰個站所屬嘅路線！
            </p>
          </div>

          {/* 進度條 */}
          <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full rounded-full"
              style={{ backgroundColor: line.colorCode }}
              initial={{ width: 0 }}
              animate={{ width: `${(round / maxRounds) * 100}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
