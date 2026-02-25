/**
 * 聆聽測驗組件
 * 聽站名，揀答案
 */

'use client';

import { useState, useEffect } from 'react';
import { MTRLine, MTRStation } from '../data/mtr-stations';

interface ListeningQuizProps {
  line: MTRLine;
  onBack: () => void;
  onScore: (points: number) => void;
  speak: (text: string, lang?: string, rate?: number) => void;
}

export function ListeningQuiz({ line, onBack, onScore, speak }: ListeningQuizProps) {
  const [currentStation, setCurrentStation] = useState<MTRStation | null>(null);
  const [options, setOptions] = useState<MTRStation[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const maxRounds = 10;

  // 初始化題目
  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    // 隨機選一個站作為目標
    const target = line.stations[Math.floor(Math.random() * line.stations.length)];
    setCurrentStation(target);
    
    // 隨機選3個其他站作為選項
    const otherStations = line.stations.filter(s => s.id !== target.id);
    const shuffled = [...otherStations].sort(() => Math.random() - 0.5).slice(0, 3);
    
    // 加入正確答案並重新排序
    const allOptions = [...shuffled, target].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    
    setSelectedAnswer(null);
    setIsCorrect(null);
    setIsPlaying(false);
  };

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
        <h2 className="text-xl font-bold text-gray-800">🎧 聆聽測驗</h2>
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
          {/* 播放區 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-6 text-center">
            <p className="text-gray-500 mb-6">聽清楚，跟住揀答案！</p>
            
            {/* 播放按鈕 */}
            <button
              onClick={playQuestion}
              disabled={isPlaying}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 transition-all ${
                isPlaying ? 'bg-gray-300' : 'hover:scale-110'
              }`}
              style={{ backgroundColor: isPlaying ? undefined : line.colorCode }}
            >
              <span className="text-5xl">{isPlaying ? '🔊' : '▶️'}</span>
            </button>
            
            <p className="text-gray-400 text-sm">
              {isPlaying ? '播放中...' : '按一下聽站名'}
            </p>
          </div>

          {/* 選項 */}
          <div className="grid grid-cols-2 gap-4">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                disabled={selectedAnswer !== null || isPlaying}
                className={`p-4 rounded-xl font-bold text-center transition-all ${
                  selectedAnswer === option.id
                    ? isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : selectedAnswer && option.id === currentStation.id
                      ? 'bg-green-500 text-white'
                      : 'bg-white shadow-lg hover:shadow-xl'
                }`}
              >
                <span className="text-2xl block mb-2">{option.landmarkIcon}</span>
                <span className="text-lg">{option.name}</span>
              </button>
            ))}
          </div>

          {/* 提示 */}
          <div className="mt-6 bg-yellow-50 rounded-xl p-4">
            <p className="text-sm text-yellow-700 text-center">
              💡 唔記得可以按上面個掣再聽多次！
            </p>
          </div>

          {/* 進度 */}
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
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
