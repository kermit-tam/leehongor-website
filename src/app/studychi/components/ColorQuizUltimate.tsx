/**
 * 港鐵顏色終極測試
 * 10條題目，考98個港鐵站嘅顏色
 */

'use client';

import { useState, useMemo } from 'react';
import { allPlatformThemes } from '../data/platform-themes';

interface ColorQuizUltimateProps {
  onBack: () => void;
  onScore: (points: number) => void;
}

interface Question {
  id: number;
  theme: typeof allPlatformThemes[0];
  options: typeof allPlatformThemes[0][];
}

export function ColorQuizUltimate({ onBack, onScore }: ColorQuizUltimateProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<{q: number, correct: boolean, station: string}[]>([]);

  // 生成10條隨機題目
  const questions = useMemo(() => {
    const shuffled = [...allPlatformThemes].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);
    
    return selected.map((theme, idx) => {
      // 生成3個錯誤選項（隨機揀其他站）
      const otherStations = allPlatformThemes.filter(t => t.stationId !== theme.stationId);
      const wrongOptions = otherStations
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      // 混合正確答案同錯誤選項
      const options = [theme, ...wrongOptions].sort(() => Math.random() - 0.5);
      
      return {
        id: idx,
        theme,
        options,
      };
    });
  }, []);

  const currentQuestion = questions[currentQ];

  const handleAnswer = (optionId: string) => {
    if (selected) return; // 已經答咗
    
    const isCorrect = optionId === currentQuestion.theme.stationId;
    setSelected(optionId);
    setCorrect(isCorrect);
    
    if (isCorrect) {
      setScore(s => s + 10);
      onScore(10);
    }
    
    setAnswers(prev => [...prev, {
      q: currentQ + 1,
      correct: isCorrect,
      station: currentQuestion.theme.stationName
    }]);
  };

  const nextQuestion = () => {
    if (currentQ < 9) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  const getRating = (score: number) => {
    if (score >= 90) return { emoji: '🏆', title: '港鐵站長', desc: '神級！你係港鐵顏色百科全書！' };
    if (score >= 70) return { emoji: '🎖️', title: '高級站務員', desc: '好勁！差啲就滿分！' };
    if (score >= 50) return { emoji: '🚇', title: '車務主任', desc: '唔錯！對港鐵有認識！' };
    if (score >= 30) return { emoji: '🎫', title: '乘客', desc: '一般般，搭多啲車啦！' };
    return { emoji: '😅', title: '迷途羔羊', desc: '你係咪行路多過搭車？' };
  };

  if (showResult) {
    const rating = getRating(score);
    const correctCount = answers.filter(a => a.correct).length;
    
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="text-center mb-6">
          <button onClick={onBack} className="absolute left-4 text-gray-600 hover:text-gray-800">
            ← 返回
          </button>
          <h2 className="text-xl font-bold text-gray-800">測試完成！</h2>
        </div>

        {/* 成績卡片 */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center mb-6 shadow-xl">
          <div className="text-6xl mb-4">{rating.emoji}</div>
          <div className="text-5xl font-bold mb-2">{score}分</div>
          <div className="text-xl font-medium mb-2">{rating.title}</div>
          <div className="text-white/80 text-sm">{rating.desc}</div>
          <div className="mt-4 text-white/60 text-xs">
            答對 {correctCount}/10 題
          </div>
        </div>

        {/* 答案回顧 */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
          <h3 className="font-bold text-gray-800 mb-4">📋 答案回顧</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {answers.map((ans, idx) => (
              <div key={idx} className={`flex items-center gap-3 p-2 rounded-lg ${ans.correct ? 'bg-green-50' : 'bg-red-50'}`}>
                <span className="text-lg">{ans.correct ? '✅' : '❌'}</span>
                <div className="w-6 h-6 rounded border-2 border-gray-300" style={{ backgroundColor: questions[idx].theme.wallColor }} />
                <span className="flex-1 text-sm font-medium">{ans.station}</span>
                <span className="text-xs text-gray-500">第{ans.q}題</span>
              </div>
            ))}
          </div>
        </div>

        {/* 分享按鈕 */}
        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            🔄 再玩一次
          </button>
          <button
            onClick={onBack}
            className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            ← 返回主頁
          </button>
        </div>

        {/* 分享文字 */}
        <div className="mt-4 p-3 bg-gray-50 rounded-xl text-center">
          <p className="text-sm text-gray-600">分享你嘅成績：</p>
          <p className="text-xs text-gray-400 mt-1">
            「我在港鐵顏色終極測試中獲得{score}分，成為「{rating.title}」！你能超越我嗎？」
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 頂部欄 */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          ← 返回
        </button>
        <h2 className="text-xl font-bold text-gray-800">🎨 顏色終極測試</h2>
        <span className="text-sm font-bold text-purple-600">
          {currentQ + 1} / 10
        </span>
      </div>

      {/* 進度條 */}
      <div className="h-3 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${((currentQ + 1) / 10) * 100}%` }}
        />
      </div>

      {/* 題目區 */}
      <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
        <div className="text-center mb-2">
          <span className="text-sm text-gray-400">呢個係邊個站嘅顏色？</span>
        </div>
        
        {/* 大色塊 */}
        <div 
          className="w-full aspect-square rounded-2xl shadow-inner mb-6 flex items-center justify-center"
          style={{ 
            backgroundColor: currentQuestion.theme.wallColor,
            boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          {/* 馬賽克紋理 */}
          <div 
            className="w-full h-full rounded-2xl opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        {/* 選項 */}
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selected === option.stationId;
            const isCorrect = option.stationId === currentQuestion.theme.stationId;
            
            let buttonClass = 'p-4 rounded-xl font-bold text-center transition-all active:scale-95 ';
            
            if (selected === null) {
              // 未答：白色背景
              buttonClass += 'bg-gray-100 text-gray-800 hover:bg-gray-200';
            } else if (isCorrect) {
              // 正確答案：綠色
              buttonClass += 'bg-green-500 text-white';
            } else if (isSelected && !isCorrect) {
              // 錯誤選擇：紅色
              buttonClass += 'bg-red-500 text-white';
            } else {
              // 其他：灰色
              buttonClass += 'bg-gray-100 text-gray-400';
            }
            
            return (
              <button
                key={option.stationId}
                onClick={() => handleAnswer(option.stationId)}
                disabled={selected !== null}
                className={buttonClass}
              >
                {option.stationName}
                {isSelected && isCorrect && <span className="ml-2">✓</span>}
                {isSelected && !isCorrect && <span className="ml-2">✗</span>}
              </button>
            );
          })}
        </div>

        {/* 答對/錯提示 */}
        {selected && (
          <div className={`mt-4 p-3 rounded-xl text-center font-bold ${
            correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {correct ? '✅ 答啱！+10分' : `❌ 錯！正確答案係「${currentQuestion.theme.stationName}」`}
          </div>
        )}
      </div>

      {/* 下一題按鈕 */}
      {selected && (
        <button
          onClick={nextQuestion}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity animate-pulse"
        >
          {currentQ < 9 ? '下一題 →' : '睇成績 🏆'}
        </button>
      )}

      {/* 提示 */}
      <p className="text-center text-gray-400 text-xs mt-4">
        從98個港鐵站中隨機選出10個站考你！
      </p>
    </div>
  );
}
