/**
 * 地標配對組件
 * 站名 + 地標圖片配對
 */

'use client';

import { useState } from 'react';
import { MTRLine, MTRStation } from '../data/mtr-stations';

interface LandmarkMatchProps {
  line: MTRLine;
  onBack: () => void;
  onScore: (points: number) => void;
  speak: (text: string, lang?: string, rate?: number) => void;
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

// 生成隨機題目的輔助函數
const generateRandomQuestion = (line: MTRLine): { target: MTRStation; options: MTRStation[] } => {
  const target = line.stations[Math.floor(Math.random() * line.stations.length)];
  const otherStations = line.stations.filter(s => s.id !== target.id);
  const shuffled = shuffleArray(otherStations).slice(0, 3);
  const allOptions = shuffleArray([...shuffled, target]);
  return { target, options: allOptions };
};

export function LandmarkMatch({ line, onBack, onScore, speak }: LandmarkMatchProps) {
  // 使用函數式初始化
  const [currentStation, setCurrentStation] = useState<MTRStation | null>(() => {
    const { target } = generateRandomQuestion(line);
    return target;
  });
  const [options, setOptions] = useState<MTRStation[]>(() => {
    const { options } = generateRandomQuestion(line);
    return options;
  });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const maxRounds = 10;

  const generateQuestion = () => {
    const { target, options: newOptions } = generateRandomQuestion(line);
    setCurrentStation(target);
    setOptions(newOptions);
    setSelectedAnswer(null);
    setIsCorrect(null);
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

    // 下一題
    setTimeout(() => {
      if (round < maxRounds) {
        setRound(r => r + 1);
        generateQuestion();
      }
    }, 2000);
  };

  const isGameOver = round >= maxRounds && selectedAnswer !== null;

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 頂部欄 */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          ← 返回
        </button>
        <h2 className="text-xl font-bold text-gray-800">🏢 地標配對</h2>
        <span className="text-sm text-gray-500">{Math.min(round, maxRounds)}/{maxRounds}</span>
      </div>

      {/* 分數 */}
      <div className="bg-white rounded-2xl p-4 shadow-lg mb-6 text-center">
        <p className="text-3xl font-bold text-orange-500">⭐ {score}</p>
      </div>

      {/* 遊戲結束畫面 */}
      {isGameOver ? (
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">完成！</h3>
          <p className="text-gray-600 mb-4">你答對咗 {score / 10} 題</p>
          <button
            onClick={onBack}
            className="px-8 py-3 rounded-xl text-white font-bold"
            style={{ backgroundColor: line.colorCode }}
          >
            返回主頁
          </button>
        </div>
      ) : currentStation ? (
        <>
          {/* 問題區 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 text-center">
            <p className="text-gray-500 mb-4">呢個地標係邊個站？</p>
            
            {/* 地標圖示（大） */}
            <div className="text-8xl mb-4 animate-bounce">
              {currentStation.landmarkIcon}
            </div>
            
            {/* 地標名稱 */}
            <div className="bg-gray-100 rounded-xl p-4 mb-2">
              <p className="text-xl font-bold text-gray-800">{currentStation.landmark}</p>
            </div>
            
            {/* 提示 */}
            <p className="text-gray-400 text-sm">{currentStation.description}</p>

            {/* 讀提示按鈕 */}
            <button
              onClick={() => speak(`${currentStation.landmark}，${currentStation.description}`, 'zh-HK', 0.6)}
              className="mt-4 px-4 py-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 text-sm"
            >
              🔊 聽提示
            </button>
          </div>

          {/* 選項 */}
          <div className="space-y-3">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-xl font-bold text-center transition-all flex items-center justify-between ${
                  selectedAnswer === option.id
                    ? isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : selectedAnswer && option.id === currentStation.id
                      ? 'bg-green-500 text-white'
                      : 'bg-white shadow-lg hover:shadow-xl'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-2xl">{option.landmarkIcon}</span>
                  <span>{option.name}</span>
                </span>
                {selectedAnswer === option.id && (
                  <span className="text-2xl">{isCorrect ? '✓' : '✗'}</span>
                )}
              </button>
            ))}
          </div>

          {/* 進度 */}
          <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-500"
              style={{ 
                width: `${(round / maxRounds) * 100}%`,
                backgroundColor: line.colorCode 
              }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
