/**
 * 顏色配對組件
 * 認識所有港鐵路線顏色
 */

'use client';

import { useState, useEffect } from 'react';
import { mtrLines } from '../data/mtr-stations';

interface ColorMatchProps {
  onBack: () => void;
  onScore: (points: number) => void;
}

// 港鐵各路線顏色
const mtrColors = mtrLines.map(line => ({
  name: line.name,
  color: line.color,
  code: line.colorCode,
  icon: '🚇'
}));

export function ColorMatch({ onBack, onScore }: ColorMatchProps) {
  const [targetColor, setTargetColor] = useState(mtrColors[0]);
  const [options, setOptions] = useState<typeof mtrColors>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const maxRounds = 10;

  // 初始化題目
  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    // 隨機選一個顏色作為目標
    const target = mtrColors[Math.floor(Math.random() * mtrColors.length)];
    setTargetColor(target);
    
    // 隨機選3個其他顏色作為選項
    const otherColors = mtrColors.filter(c => c.name !== target.name);
    const shuffled = [...otherColors].sort(() => Math.random() - 0.5).slice(0, 3);
    
    // 加入正確答案並重新排序
    const allOptions = [...shuffled, target].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = (colorName: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(colorName);
    const correct = colorName === targetColor.name;
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
    }, 1500);
  };

  const isGameOver = round >= maxRounds && selectedAnswer !== null;

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 頂部欄 */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          ← 返回
        </button>
        <h2 className="text-xl font-bold text-gray-800">🎨 顏色配對</h2>
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
            className="px-8 py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600"
          >
            返回主頁
          </button>
        </div>
      ) : (
        <>
          {/* 問題區 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <p className="text-gray-500 text-center mb-4">呢個係邊條路線嘅顏色？</p>
            
            {/* 顏色展示 */}
            <div 
              className="w-32 h-32 rounded-2xl mx-auto mb-4 shadow-inner flex items-center justify-center"
              style={{ backgroundColor: targetColor.code }}
            >
              <span className="text-6xl">🚇</span>
            </div>
            
            <p className="text-center text-gray-400 text-sm">{targetColor.color}</p>
          </div>

          {/* 選項 */}
          <div className="grid grid-cols-2 gap-4">
            {options.map((option) => (
              <button
                key={option.name}
                onClick={() => handleAnswer(option.name)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-xl font-bold text-center transition-all ${
                  selectedAnswer === option.name
                    ? isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : selectedAnswer && option.name === targetColor.name
                      ? 'bg-green-500 text-white'
                      : 'bg-white shadow-lg hover:shadow-xl'
                }`}
              >
                <span className="text-2xl block mb-1">{option.icon}</span>
                <span className="text-sm">{option.name}</span>
              </button>
            ))}
          </div>

          {/* 提示 */}
          <div className="mt-6 bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-700 text-center">
              💡 提示：東鐵綫係淺藍色 🔵，觀塘綫係綠色 🟢，港島綫係深藍色 🔵
            </p>
          </div>
        </>
      )}
    </div>
  );
}
