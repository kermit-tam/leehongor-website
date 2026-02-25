/**
 * 站長廣播組件
 * 小朋友讀出站名，錄音比對
 * 
 * 注意：由於瀏覽器限制，無法直接語音識別粵語
 * 改用簡化版：顯示站名，小朋友讀出，爸媽按掣確認
 */

'use client';

import { useState, useEffect } from 'react';
import { MTRLine, MTRStation } from '../data/mtr-stations';

interface SpeakingQuizProps {
  line: MTRLine;
  onBack: () => void;
  onScore: (points: number) => void;
}

export function SpeakingQuiz({ line, onBack, onScore }: SpeakingQuizProps) {
  const [currentStation, setCurrentStation] = useState<MTRStation | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const maxRounds = 10;

  // 初始化題目
  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    // 隨機選一個站
    const target = line.stations[Math.floor(Math.random() * line.stations.length)];
    setCurrentStation(target);
    setIsRevealed(false);
  };

  const handleReveal = () => {
    setIsRevealed(true);
    setScore(s => s + 10);
    onScore(10);
  };

  const nextQuestion = () => {
    if (round < maxRounds) {
      setRound(r => r + 1);
      generateQuestion();
    }
  };

  const isGameOver = round >= maxRounds && isRevealed;

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 頂部欄 */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          ← 返回
        </button>
        <h2 className="text-xl font-bold text-gray-800">🎤 站長廣播</h2>
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
          <p className="text-gray-600 mb-2">你讀咗 {maxRounds} 個站名！</p>
          <p className="text-gray-500 text-sm mb-4">真係好叻！下次做個小站長！</p>
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
          {/* 題目區 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-6 text-center">
            <p className="text-gray-500 mb-6">睇圖示，試下讀出呢個站名！</p>
            
            {/* 地標提示 */}
            <div className="text-8xl mb-6">{currentStation.landmarkIcon}</div>
            
            {/* 地標名稱提示 */}
            <p className="text-gray-400 text-lg mb-6">{currentStation.landmark}</p>

            {/* 答案顯示區 */}
            {isRevealed ? (
              <div 
                className="rounded-2xl p-6 animate-fade-in"
                style={{ backgroundColor: line.colorCode }}
              >
                <p className="text-4xl font-bold text-white mb-2">{currentStation.name}</p>
                <p className="text-white/80">{currentStation.nameEn}</p>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-2xl p-6">
                <p className="text-2xl text-gray-300">???</p>
              </div>
            )}
          </div>

          {/* 控制按鈕 */}
          {!isRevealed ? (
            <button
              onClick={handleReveal}
              className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
              style={{ backgroundColor: line.colorCode }}
            >
              ✓ 我讀完啦！睇答案
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="w-full py-4 rounded-xl bg-green-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              下一題 →
            </button>
          )}

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

          {/* 提示 */}
          <div className="mt-4 bg-green-50 rounded-xl p-4">
            <p className="text-sm text-green-700 text-center">
              💡 小貼士：大聲讀出「{currentStation?.name || '...'}」，跟住爸爸媽媽幫你睇啱唔啱！
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
