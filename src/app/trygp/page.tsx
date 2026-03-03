'use client';

import { useState, useEffect } from 'react';
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

type CheckedState = {
  [key: number]: boolean;
};

export default function TryGPPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [revealed, setRevealed] = useState<RevealedState>({});
  const [checked, setChecked] = useState<CheckedState>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedScientist, setSelectedScientist] = useState<number | null>(null);

  const question = allQuestions[currentQ];
  const totalQuestions = allQuestions.length;

  const handleAnswer = (qId: number, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [qId]: answer }));
    // 自動檢查答案
    setTimeout(() => {
      setChecked(prev => ({ ...prev, [qId]: true }));
    }, 300);
  };

  const handleReveal = (qId: number) => {
    setRevealed(prev => ({ ...prev, [qId]: true }));
  };

  const checkAnswer = (q: Question, userAnswer: string | string[] | undefined): boolean => {
    if (!userAnswer) return false;
    if (Array.isArray(q.answer)) {
      if (!Array.isArray(userAnswer)) return false;
      // 配對題和看圖判斷題
      if (q.type === 'image-true-false') {
        return q.answer.every((ans, i) => userAnswer[i] === ans);
      }
      return q.answer.every((ans, i) => userAnswer[i] === ans);
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
    setChecked({});
    setShowResult(false);
    setScore(0);
    setSelectedScientist(null);
  };

  // 讀卷功能
  const readQuestion = (q: Question) => {
    if ('speechSynthesis' in window) {
      // 取消之前的朗讀
      window.speechSynthesis.cancel();
      
      const text = q.question;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-HK';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // 顯示答案狀態
  const renderAnswerStatus = (q: Question) => {
    if (!checked[q.id]) return null;
    
    const isCorrect = checkAnswer(q, answers[q.id]);
    if (isCorrect) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-green-100 border-2 border-green-500 rounded-xl p-3 mb-4 text-center"
        >
          <span className="text-2xl">✅</span>
          <p className="font-bold text-green-700">答對了！</p>
        </motion.div>
      );
    } else {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-red-100 border-2 border-red-500 rounded-xl p-3 mb-4 text-center"
        >
          <span className="text-2xl">❌</span>
          <p className="font-bold text-red-700">答錯了</p>
          <p className="text-sm text-red-600">正確答案：{Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}</p>
        </motion.div>
      );
    }
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
                onClick={() => !checked[q.id] && handleAnswer(q.id, opt.label)}
                disabled={checked[q.id]}
                className={`p-4 rounded-xl text-left transition-all ${
                  answers[q.id] === opt.label
                    ? checkAnswer(q, opt.label) ? 'bg-green-500 text-white shadow-lg' : 'bg-red-500 text-white shadow-lg'
                    : checked[q.id] && q.answer === opt.label ? 'bg-green-200 text-green-800' : 'bg-white hover:bg-green-50 shadow-sm'
                } ${checked[q.id] ? 'cursor-not-allowed opacity-70' : ''}`}
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
            onClick={() => !checked[q.id] && handleAnswer(q.id, opt.label)}
            disabled={checked[q.id]}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              answers[q.id] === opt.label
                ? checkAnswer(q, opt.label) ? 'bg-green-500 text-white shadow-lg' : 'bg-red-500 text-white shadow-lg'
                : checked[q.id] && q.answer === opt.label ? 'bg-green-200 text-green-800' : 'bg-white hover:bg-green-50 shadow-sm'
            } ${checked[q.id] ? 'cursor-not-allowed opacity-70' : ''}`}
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
              onClick={() => !checked[q.id] && handleAnswer(q.id, opt.label)}
              disabled={checked[q.id]}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                answers[q.id] === opt.label
                  ? checkAnswer(q, opt.label) ? 'bg-green-500 text-white shadow-lg' : 'bg-red-500 text-white shadow-lg'
                  : checked[q.id] && q.answer === opt.label ? 'bg-green-200 text-green-800' : 'bg-white hover:bg-green-50 shadow-sm'
              } ${checked[q.id] ? 'cursor-not-allowed opacity-70' : ''}`}
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
          {q.options.map((opt, idx) => {
            const userAnswer = (answers[q.id] as string[])?.[idx];
            const correctAnswer = (q.answer as string[])[idx];
            const isCorrect = userAnswer === correctAnswer;
            
            return (
              <div key={opt.label} className="bg-white rounded-xl p-3 shadow-sm">
                <div className="relative h-32 w-full mb-3">
                  <Image src={q.images![idx]} alt={opt.text} fill className="object-contain" />
                </div>
                <p className="text-sm text-gray-600 mb-2">{opt.label}. {opt.text}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (checked[q.id]) return;
                      const current = (answers[q.id] as string[]) || [];
                      const newAnswers = [...current];
                      newAnswers[idx] = '✓';
                      handleAnswer(q.id, newAnswers);
                    }}
                    disabled={checked[q.id]}
                    className={`flex-1 py-2 rounded-lg font-bold ${
                      userAnswer === '✓'
                        ? isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        : checked[q.id] && correctAnswer === '✓' ? 'bg-green-200 text-green-800' : 'bg-gray-100 hover:bg-green-100'
                    }`}
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => {
                      if (checked[q.id]) return;
                      const current = (answers[q.id] as string[]) || [];
                      const newAnswers = [...current];
                      newAnswers[idx] = '✗';
                      handleAnswer(q.id, newAnswers);
                    }}
                    disabled={checked[q.id]}
                    className={`flex-1 py-2 rounded-lg font-bold ${
                      userAnswer === '✗'
                        ? isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        : checked[q.id] && correctAnswer === '✗' ? 'bg-green-200 text-green-800' : 'bg-gray-100 hover:bg-red-100'
                    }`}
                  >
                    ✗
                  </button>
                </div>
              </div>
            );
          })}
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
                disabled={checked[q.id]}
                className={`flex-1 py-2 rounded-lg font-bold ${
                  answers[q.id] === 'correct' ? 'bg-green-500 text-white' : 'bg-white hover:bg-green-200'
                } ${checked[q.id] ? 'cursor-not-allowed' : ''}`}
              >
                👍 啱咗
              </button>
              <button
                onClick={() => handleAnswer(q.id, 'wrong')}
                disabled={checked[q.id]}
                className={`flex-1 py-2 rounded-lg font-bold ${
                  answers[q.id] === 'wrong' ? 'bg-red-500 text-white' : 'bg-white hover:bg-red-200'
                } ${checked[q.id] ? 'cursor-not-allowed' : ''}`}
              >
                👎 錯咗
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  // 渲染配對題 (Q23) - 兩邊選擇
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
    
    const handleScientistClick = (idx: number) => {
      if (checked[q.id]) return;
      setSelectedScientist(idx);
    };
    
    const handleOptionClick = (label: string) => {
      if (checked[q.id] || selectedScientist === null) return;
      
      const newMatches = [...currentMatches];
      newMatches[selectedScientist] = label;
      handleAnswer(q.id, newMatches);
      setSelectedScientist(null);
    };
    
    // 檢查是否全部配對完成
    const isComplete = currentMatches.length === 5 && currentMatches.every(m => m);
    
    return (
      <div className="space-y-4">
        {/* 提示 */}
        <p className="text-sm text-gray-500">
          {selectedScientist === null ? '請先點擊左邊的科學家，再點擊右邊的發明' : `正在為「${scientistsList[selectedScientist]}」選擇答案`}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {/* 左邊：科學家 */}
          <div className="space-y-2">
            <p className="font-bold text-gray-700 mb-2">科學家</p>
            {scientistsList.map((name, idx) => {
              const match = currentMatches[idx];
              const isSelected = selectedScientist === idx;
              
              return (
                <button
                  key={name}
                  onClick={() => handleScientistClick(idx)}
                  disabled={checked[q.id] || !!match}
                  className={`w-full bg-white rounded-lg p-3 shadow-sm flex items-center justify-between transition-all ${
                    isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  } ${checked[q.id] ? 'cursor-not-allowed' : ''} ${match ? 'opacity-70' : ''}`}
                >
                  <span className="font-bold text-gray-600">{name}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    match ? (match === (q.answer as string[])[idx] ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700') : 'bg-gray-100 text-gray-500'
                  }`}>
                    {match || '?'}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* 右邊：發明 */}
          <div className="space-y-2">
            <p className="font-bold text-gray-700 mb-2">發明或貢獻</p>
            {optionsList.map(opt => {
              const isUsed = currentMatches.includes(opt.label);
              
              return (
                <button
                  key={opt.label}
                  onClick={() => handleOptionClick(opt.label)}
                  disabled={checked[q.id] || isUsed || selectedScientist === null}
                  className={`w-full rounded-lg p-3 shadow-sm text-left text-sm transition-all ${
                    isUsed ? 'bg-gray-100 opacity-50' : selectedScientist !== null ? 'bg-white hover:bg-blue-50' : 'bg-white opacity-70'
                  } ${checked[q.id] ? 'cursor-not-allowed' : ''}`}
                >
                  <span className="font-bold">{opt.label}.</span> {opt.text}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* 重置按 */}
        {!checked[q.id] && (
          <button
            onClick={() => {
              handleAnswer(q.id, []);
              setSelectedScientist(null);
            }}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            重新配對
          </button>
        )}
      </div>
    );
  };

  // 渲染分類題 (Q29)
  const renderClassify = (q: Question) => {
    if (!q.options) return null;
    const currentAnswer = (answers[q.id] as string) || '|';
    const yesSelected = currentAnswer.split('|')[0]?.split(',').filter(Boolean) || [];
    const noSelected = currentAnswer.split('|')[1]?.split(',').filter(Boolean) || [];
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* 應有 */}
          <div className="bg-green-50 rounded-xl p-4">
            <p className="font-bold text-green-700 mb-3">✅ 應有的條件</p>
            <div className="space-y-2">
              {q.options.map(opt => {
                const isSelected = yesSelected.includes(opt.label);
                
                return (
                  <button
                    key={`yes-${opt.label}`}
                    onClick={() => {
                      if (checked[q.id]) return;
                      let newYes = [...yesSelected];
                      let newNo = [...noSelected];
                      
                      if (isSelected) {
                        newYes = newYes.filter(l => l !== opt.label);
                      } else {
                        newYes.push(opt.label);
                        newNo = newNo.filter(l => l !== opt.label);
                      }
                      
                      handleAnswer(q.id, newYes.join(',') + '|' + newNo.join(','));
                    }}
                    disabled={checked[q.id]}
                    className={`w-full p-2 rounded-lg text-sm text-left transition-all ${
                      isSelected
                        ? checked[q.id] ? (['A','D'].includes(opt.label) ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-green-500 text-white'
                        : 'bg-white hover:bg-green-100'
                    }`}
                  >
                    {opt.label}. {opt.text}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* 不應有 */}
          <div className="bg-red-50 rounded-xl p-4">
            <p className="font-bold text-red-700 mb-3">❌ 不應有的態度</p>
            <div className="space-y-2">
              {q.options.map(opt => {
                const isSelected = noSelected.includes(opt.label);
                
                return (
                  <button
                    key={`no-${opt.label}`}
                    onClick={() => {
                      if (checked[q.id]) return;
                      let newYes = [...yesSelected];
                      let newNo = [...noSelected];
                      
                      if (isSelected) {
                        newNo = newNo.filter(l => l !== opt.label);
                      } else {
                        newNo.push(opt.label);
                        newYes = newYes.filter(l => l !== opt.label);
                      }
                      
                      handleAnswer(q.id, newYes.join(',') + '|' + newNo.join(','));
                    }}
                    disabled={checked[q.id]}
                    className={`w-full p-2 rounded-lg text-sm text-left transition-all ${
                      isSelected
                        ? checked[q.id] ? (['B','C'].includes(opt.label) ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-red-500 text-white'
                        : 'bg-white hover:bg-red-100'
                    }`}
                  >
                    {opt.label}. {opt.text}
                  </button>
                );
              })}
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
            
            {/* 題目 + 讀卷按鈕 */}
            <div className="flex items-start gap-3 mb-6">
              <h2 className="text-xl font-bold text-gray-800 leading-relaxed flex-1">
                {question.question}
              </h2>
              <button
                onClick={() => readQuestion(question)}
                className="flex items-center gap-1 bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-lg text-sm font-bold transition-colors shrink-0"
                title="讀卷"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                讀卷
              </button>
            </div>
            
            {/* 答案狀態（答完後顯示） */}
            {renderAnswerStatus(question)}
            
            {/* 答案區域 */}
            {renderQuestion(question)}
          </motion.div>
        </AnimatePresence>
        
        {/* 導航按鈕 */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              setCurrentQ(Math.max(0, currentQ - 1));
              setSelectedScientist(null);
            }}
            disabled={currentQ === 0}
            className="px-6 py-3 bg-white rounded-xl font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← 上一題
          </button>
          
          {currentQ < totalQuestions - 1 ? (
            <button
              onClick={() => {
                setCurrentQ(currentQ + 1);
                setSelectedScientist(null);
              }}
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
                onClick={() => {
                  setCurrentQ(idx);
                  setSelectedScientist(null);
                }}
                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                  currentQ === idx
                    ? 'bg-teal-500 text-white'
                    : checked[q.id]
                    ? checkAnswer(q, answers[q.id]) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    : answers[q.id]
                    ? 'bg-yellow-100 text-yellow-700'
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
