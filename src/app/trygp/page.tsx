'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CEMNavbar } from '@/components/cem-navbar';
import { allQuestions, wordBank1, wordBankQ16, matchingOptions, scientists, type Question } from './data/questions';

type AnswerState = {
  [key: number]: string | string[];
};

type RevealedState = {
  [key: number]: boolean;
};

export default function TryGPPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [revealed, setRevealed] = useState<RevealedState>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = allQuestions[currentQ];
  const totalQuestions = allQuestions.length;

  const handleAnswer = (qId: number, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  const handleReveal = (qId: number) => {
    setRevealed(prev => ({ ...prev, [qId]: true }));
  };

  const checkAnswer = (q: Question, userAnswer: string | string[] | undefined): boolean => {
    if (!userAnswer) return false;
    if (Array.isArray(q.answer)) {
      return Array.isArray(userAnswer) && 
        q.answer.every((ans, i) => userAnswer[i] === ans);
    }
    return userAnswer === q.answer;
  };

  const calculateScore = () => {
    let correct = 0;
    allQuestions.forEach(q => {
      if (checkAnswer(q, answers[q.id])) correct++;
    });
    setScore(correct);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setAnswers({});
    setRevealed({});
    setShowResult(false);
    setScore(0);
  };

  // 渲染MC選項
  const renderMCOptions = (q: Question) => {
    if (!q.options) return null;
    
    // 有圖片的MC題 (Q15)
    if (q.images && q.imageLabels && q.images.length === 4) {
      return (
        <div className="space-y-4">
          {/* 圖片網格 */}
          <div className="grid grid-cols-2 gap-4">
            {q.images.map((img, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 shadow-sm">
                <div className="text-center font-bold text-gray-600 mb-2">{q.imageLabels?.[idx]}</div>
                <div className="relative h-32 w-full">
                  <Image src={img} alt={`選項 ${q.imageLabels?.[idx]}`} fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>
          {/* 選項按鈕 */}
          <div className="grid grid-cols-2 gap-3">
            {q.options.map(opt => (
              <button
                key={opt.label}
                onClick={() => handleAnswer(q.id, opt.label)}
                className={`p-4 rounded-xl text-left transition-all ${
                  answers[q.id] === opt.label
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white hover:bg-green-50 shadow-sm'
                }`}
              >
                <span className="font-bold">{opt.label}.</span> {opt.text}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // 普通MC題
    return (
      <div className="space-y-3">
        {q.options.map(opt => (
          <button
            key={opt.label}
            onClick={() => handleAnswer(q.id, opt.label)}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              answers[q.id] === opt.label
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-white hover:bg-green-50 shadow-sm'
            }`}
          >
            <span className="font-bold">{opt.label}.</span> {opt.text}
          </button>
        ))}
      </div>
    );
  };

  // 渲染實驗題 (Q30)
  const renderExperiment = (q: Question) => {
    if (!q.options) return null;
    
    return (
      <div className="space-y-4">
        {/* 實驗圖片 - 橫向排列 */}
        {q.images && q.imageLabels && (
          <div className="flex gap-4">
            {q.images.map((img, idx) => (
              <div key={idx} className="flex-1 bg-white rounded-xl p-3 shadow-sm">
                <div className="text-center font-bold text-gray-600 mb-2 text-sm">{q.imageLabels?.[idx]}</div>
                <div className="relative h-40 w-full">
                  <Image src={img} alt={q.imageLabels?.[idx] || ''} fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* 問題 */}
        <p className="font-bold text-gray-700">以下哪一項是實驗中要測試的項目？</p>
        
        {/* 選項 */}
        <div className="space-y-3">
          {q.options.map(opt => (
            <button
              key={opt.label}
              onClick={() => handleAnswer(q.id, opt.label)}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                answers[q.id] === opt.label
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white hover:bg-green-50 shadow-sm'
              }`}
            >
              <span className="font-bold">{opt.label}.</span> {opt.text}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // 渲染看圖判斷題 (Q27, Q28)
  const renderImageTrueFalse = (q: Question) => {
    if (!q.options || !q.images) return null;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {q.options.map((opt, idx) => (
            <div key={opt.label} className="bg-white rounded-xl p-3 shadow-sm">
              <div className="relative h-32 w-full mb-3">
                <Image src={q.images![idx]} alt={opt.text} fill className="object-contain" />
              </div>
              <p className="text-sm text-gray-600 mb-2">{opt.label}. {opt.text}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const current = (answers[q.id] as string[]) || [];
                    const newAnswers = [...current];
                    newAnswers[idx] = '✓';
                    handleAnswer(q.id, newAnswers);
                  }}
                  className={`flex-1 py-2 rounded-lg font-bold ${
                    (answers[q.id] as string[])?.[idx] === '✓'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 hover:bg-green-100'
                  }`}
                >
                  ✓
                </button>
                <button
                  onClick={() => {
                    const current = (answers[q.id] as string[]) || [];
                    const newAnswers = [...current];
                    newAnswers[idx] = '✗';
                    handleAnswer(q.id, newAnswers);
                  }}
                  className={`flex-1 py-2 rounded-lg font-bold ${
                    (answers[q.id] as string[])?.[idx] === '✗'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 hover:bg-red-100'
                  }`}
                >
                  ✗
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染簡答題（開估模式）
  const renderShortAnswer = (q: Question) => {
    const isRevealed = revealed[q.id];
    
    return (
      <div className="space-y-4">
        {q.hint && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
            <p className="text-sm text-yellow-700">💡 提示：{q.hint}</p>
          </div>
        )}
        
        {!isRevealed ? (
          <button
            onClick={() => handleReveal(q.id)}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            🔍 開估睇答案
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-100 border-2 border-green-500 rounded-xl p-4"
          >
            <p className="font-bold text-green-800">✅ 答案：{q.answer as string}</p>
            <p className="text-sm text-green-600 mt-2">請問你答啱咗未？</p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleAnswer(q.id, 'correct')}
                className={`flex-1 py-2 rounded-lg font-bold ${
                  answers[q.id] === 'correct' ? 'bg-green-500 text-white' : 'bg-white hover:bg-green-200'
                }`}
              >
                👍 啱咗
              </button>
              <button
                onClick={() => handleAnswer(q.id, 'wrong')}
                className={`flex-1 py-2 rounded-lg font-bold ${
                  answers[q.id] === 'wrong' ? 'bg-red-500 text-white' : 'bg-white hover:bg-red-200'
                }`}
              >
                👎 錯咗
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  // 渲染填表題 (Q16) - 橫向顯示
  const renderFillTable = (q: Question) => {
    if (!q.options) return null;
    const currentAnswers = (answers[q.id] as string[]) || [];
    
    return (
      <div className="space-y-4">
        {/* 詞庫 */}
        {q.wordBank && (
          <div className="bg-blue-50 rounded-xl p-3">
            <p className="text-sm text-blue-700 font-bold mb-2">詞庫：</p>
            <div className="flex flex-wrap gap-2">
              {q.wordBank.map(word => (
                <span key={word} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm">{word}</span>
              ))}
            </div>
          </div>
        )}
        
        {/* 橫向表格 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            {q.options.map((opt, idx) => (
              <div key={opt.label} className="p-4">
                <div className="font-bold text-gray-700 mb-3 text-center">{opt.label}</div>
                <div className="text-sm text-gray-600 mb-3 min-h-[60px]">
                  {opt.text.split('______').map((part, partIdx) => (
                    <span key={partIdx}>
                      {part}
                      {partIdx < opt.text.split('______').length - 1 && (
                        <select
                          value={currentAnswers[idx] || ''}
                          onChange={(e) => {
                            const newAnswers = [...currentAnswers];
                            newAnswers[idx] = e.target.value;
                            handleAnswer(q.id, newAnswers);
                          }}
                          className="bg-yellow-50 border-2 border-yellow-300 rounded px-2 py-1 text-sm mx-1"
                        >
                          <option value="">請選擇</option>
                          {q.wordBank?.map(word => (
                            <option key={word} value={word}>{word}</option>
                          ))}
                        </select>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 渲染配對題 (Q23) - 同一個畫面
  const renderMatching = (q: Question) => {
    const currentMatches = (answers[q.id] as string[]) || [];
    const scientistsList = ['萊特兄弟', '畢昇', '伽利略', '愛迪生', '蔡倫'];
    const optionsList = [
      { label: 'A', text: '發明電燈泡' },
      { label: 'B', text: '改良造紙方法' },
      { label: 'C', text: '發明活字印刷術' },
      { label: 'D', text: '發明了飛機' },
      { label: 'E', text: '通過實驗驗證或革新多個不同理論，推動科學發展' },
    ];
    
    return (
      <div className="space-y-4">
        {/* 提示 */}
        <p className="text-sm text-gray-500">點擊科學家，再點擊對應的發明進行配對</p>
        
        <div className="grid grid-cols-2 gap-4">
          {/* 左邊：科學家 */}
          <div className="space-y-2">
            <p className="font-bold text-gray-700 mb-2">科學家</p>
            {scientistsList.map((name, idx) => (
              <div key={name} className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-2">
                <span className="font-bold text-gray-600 w-20">{name}</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm min-w-[40px] text-center">
                  {currentMatches[idx] || '?'}
                </span>
              </div>
            ))}
          </div>
          
          {/* 右邊：發明 */}
          <div className="space-y-2">
            <p className="font-bold text-gray-700 mb-2">發明或貢獻</p>
            {optionsList.map(opt => (
              <button
                key={opt.label}
                onClick={() => {
                  // 找到當前選中的科學家索引（第一個未配對的）
                  const firstEmptyIdx = currentMatches.findIndex(m => !m);
                  const targetIdx = firstEmptyIdx === -1 ? currentMatches.length : firstEmptyIdx;
                  
                  if (targetIdx < 5) {
                    const newMatches = [...currentMatches];
                    newMatches[targetIdx] = opt.label;
                    handleAnswer(q.id, newMatches);
                  }
                }}
                className={`w-full bg-white rounded-lg p-3 shadow-sm text-left text-sm hover:bg-green-50 transition-all ${
                  currentMatches.includes(opt.label) ? 'opacity-50' : ''
                }`}
              >
                <span className="font-bold">{opt.label}.</span> {opt.text}
              </button>
            ))}
          </div>
        </div>
        
        {/* 重置按 */}
        <button
          onClick={() => handleAnswer(q.id, [])}
          className="w-full py-2 text-sm text-gray-500 hover:text-gray-700"
        >
          重新配對
        </button>
      </div>
    );
  };

  // 渲染分類題 (Q29)
  const renderClassify = (q: Question) => {
    if (!q.options) return null;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* 應有 */}
          <div className="bg-green-50 rounded-xl p-4">
            <p className="font-bold text-green-700 mb-3">✅ 應有的條件</p>
            <div className="space-y-2">
              {q.options.map(opt => (
                <button
                  key={opt.label}
                  onClick={() => {
                    const current = (answers[q.id] as string) || '';
                    let selected = current.split('|')[0] || '';
                    if (selected.includes(opt.label)) {
                      selected = selected.replace(opt.label, '').replace(/,/g, ',').replace(/^,|,$/g, '');
                    } else {
                      selected = selected ? selected + ',' + opt.label : opt.label;
                    }
                    const notSelected = ((answers[q.id] as string) || '').split('|')[1] || '';
                    handleAnswer(q.id, selected + '|' + notSelected);
                  }}
                  className={`w-full p-2 rounded-lg text-sm text-left transition-all ${
                    ((answers[q.id] as string) || '').split('|')[0]?.includes(opt.label)
                      ? 'bg-green-500 text-white'
                      : 'bg-white hover:bg-green-100'
                  }`}
                >
                  {opt.label}. {opt.text}
                </button>
              ))}
            </div>
          </div>
          
          {/* 不應有 */}
          <div className="bg-red-50 rounded-xl p-4">
            <p className="font-bold text-red-700 mb-3">❌ 不應有的態度</p>
            <div className="space-y-2">
              {q.options.map(opt => (
                <button
                  key={opt.label}
                  onClick={() => {
                    const current = (answers[q.id] as string) || '';
                    const selected = current.split('|')[0] || '';
                    let notSelected = current.split('|')[1] || '';
                    if (notSelected.includes(opt.label)) {
                      notSelected = notSelected.replace(opt.label, '').replace(/,/g, ',').replace(/^,|,$/g, '');
                    } else {
                      notSelected = notSelected ? notSelected + ',' + opt.label : opt.label;
                    }
                    handleAnswer(q.id, selected + '|' + notSelected);
                  }}
                  className={`w-full p-2 rounded-lg text-sm text-left transition-all ${
                    ((answers[q.id] as string) || '').split('|')[1]?.includes(opt.label)
                      ? 'bg-red-500 text-white'
                      : 'bg-white hover:bg-red-100'
                  }`}
                >
                  {opt.label}. {opt.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 渲染題目
  const renderQuestion = (q: Question) => {
    switch (q.type) {
      case 'mc':
      case 'mc-word-bank':
        return renderMCOptions(q);
      case 'experiment':
        return renderExperiment(q);
      case 'image-true-false':
        return renderImageTrueFalse(q);
      case 'short-answer':
        return renderShortAnswer(q);
      case 'fill-table':
        return renderFillTable(q);
      case 'matching':
        return renderMatching(q);
      case 'classify':
        return renderClassify(q);
      default:
        return renderMCOptions(q);
    }
  };

  // 結果頁
  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100">
        <CEMNavbar />
        <main className="max-w-2xl mx-auto px-4 py-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 shadow-xl text-center"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-black text-gray-800 mb-4">測驗完成！</h1>
            <div className="text-5xl font-black text-teal-500 mb-2">
              {score} / {totalQuestions}
            </div>
            <p className="text-gray-600 mb-6">
              答對 {Math.round((score / totalQuestions) * 100)}% 的題目
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <h3 className="font-bold text-gray-700 mb-3">答題情況</h3>
              <div className="grid grid-cols-6 gap-2">
                {allQuestions.map((q, idx) => {
                  const isCorrect = checkAnswer(q, answers[q.id]);
                  return (
                    <div
                      key={q.id}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                        isCorrect ? 'bg-green-500 text-white' : 'bg-red-200 text-red-700'
                      }`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <button
              onClick={resetQuiz}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              🔄 再試一次
            </button>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100">
      <CEMNavbar />
      
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* 進度條 */}
        <div className="bg-white rounded-full h-4 mb-6 shadow-sm overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-400 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }}
          />
        </div>
        
        {/* 題號 */}
        <div className="text-center mb-4">
          <span className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-600 font-bold">
            題目 {currentQ + 1} / {totalQuestions}
          </span>
        </div>
        
        {/* 題目卡片 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl p-6 shadow-xl mb-6"
          >
            {/* 供詞填充題顯示詞庫 */}
            {question.wordBank && question.type !== 'fill-table' && (
              <div className="bg-blue-50 rounded-xl p-3 mb-4">
                <p className="text-sm text-blue-700 font-bold mb-2">詞庫：</p>
                <div className="flex flex-wrap gap-2">
                  {question.wordBank.map(word => (
                    <span key={word} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm">{word}</span>
                  ))}
                </div>
              </div>
            )}
            
            {/* 題目 */}
            <h2 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
              {question.question}
            </h2>
            
            {/* 答案區域 */}
            {renderQuestion(question)}
          </motion.div>
        </AnimatePresence>
        
        {/* 導航按鈕 */}
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
            disabled={currentQ === 0}
            className="px-6 py-3 bg-white rounded-xl font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← 上一題
          </button>
          
          {currentQ < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentQ(currentQ + 1)}
              className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold shadow-lg"
            >
              下一題 →
            </button>
          ) : (
            <button
              onClick={calculateScore}
              className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold shadow-lg"
            >
              ✅ 提交答案
            </button>
          )}
        </div>
        
        {/* 題目導航 */}
        <div className="mt-8 bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-3 text-center">快速跳轉</p>
          <div className="grid grid-cols-8 gap-2">
            {allQuestions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentQ(idx)}
                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                  currentQ === idx
                    ? 'bg-teal-500 text-white'
                    : answers[q.id]
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
