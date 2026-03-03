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
  const [selectedToy, setSelectedToy] = useState<number | null>(null);
  const [orderingSequence, setOrderingSequence] = useState<number[]>([]);

  const question = allQuestions[currentQ];
  const totalQuestions = allQuestions.length;

  const handleAnswer = (qId: number, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [qId]: answer }));
    // 只有簡單MC題先自動檢查，其他要等用戶按確認
    const q = allQuestions.find(qq => qq.id === qId);
    if (q && (q.type === 'mc' || q.type === 'mc-word-bank' || q.type === 'short-answer')) {
      setTimeout(() => {
        setChecked(prev => ({ ...prev, [qId]: true }));
      }, 300);
    }
  };

  // 確認答案（用於配對、排序、看圖判斷、分類題）
  const handleConfirm = (qId: number) => {
    setChecked(prev => ({ ...prev, [qId]: true }));
  };

  const handleReveal = (qId: number) => {
    setRevealed(prev => ({ ...prev, [qId]: true }));
  };

  const checkAnswer = (q: Question, userAnswer: string | string[] | undefined): boolean => {
    if (!userAnswer) return false;
    
    // 簡答題：用戶自己判斷對錯，'correct' 代表答對
    if (q.type === 'short-answer') {
      return userAnswer === 'correct';
    }
    
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
    setSelectedToy(null);
    setOrderingSequence([]);
  };

  // 讀卷功能 - 把填空位讀成「乜乜」
  const readQuestion = (q: Question) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      // 將 ___ 或 ______ 替換成「乜乜」
      const text = q.question.replace(/_{2,}/g, '乜乜');
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-HK';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // 讀答案功能
  const readAnswer = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
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
          {/* 圖片網格 - 手機單欄，桌面2欄 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {q.images.map((img, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 shadow-sm">
                <div className="text-center font-bold text-gray-600 mb-2">{q.imageLabels?.[idx]}</div>
                <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
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
          
          {/* 讀完整句子按鈕 */}
          {answers[q.id] && !Array.isArray(answers[q.id]) && (
            <button
              onClick={() => {
                const selectedOption = q.options?.find(o => o.label === answers[q.id]);
                if (selectedOption) {
                  // 將題目中的 ___ 替換成答案
                  const fullSentence = q.question.replace(/_{2,}/g, selectedOption.text);
                  readAnswer(fullSentence);
                }
              }}
              className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              讀完整句子
            </button>
          )}
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
        
        {/* 讀完整句子按鈕（供詞填充題） */}
        {answers[q.id] && !Array.isArray(answers[q.id]) && q.type === 'mc-word-bank' && (
          <button
              onClick={() => {
                const selectedOption = q.options?.find(o => o.label === answers[q.id]);
                if (selectedOption) {
                  // 將題目中的 ___ 替換成答案
                  const fullSentence = q.question.replace(/_{2,}/g, selectedOption.text);
                  readAnswer(fullSentence);
                }
              }}
              className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              讀完整句子
            </button>
        )}
      </div>
    );
  };

  // 渲染實驗題 (Q30)
  const renderExperiment = (q: Question) => {
    if (!q.options) return null;
    
    return (
      <div className="space-y-4">
        {/* 實驗圖片 - 手機直向，桌面橫向 */}
        {q.images && q.imageLabels && (
          <div className="flex flex-col sm:flex-row gap-4">
            {q.images.map((img, idx) => (
              <div key={idx} className="flex-1 bg-white rounded-xl p-3 shadow-sm">
                <div className="text-center font-bold text-gray-600 mb-2 text-sm">{q.imageLabels?.[idx]}</div>
                <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
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
    const currentAnswers = (answers[q.id] as string[]) || [];
    const isAllAnswered = currentAnswers.length === 4 && currentAnswers.every(a => a);
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {q.options.map((opt, idx) => {
            const userAnswer = currentAnswers?.[idx];
            const correctAnswer = (q.answer as string[])[idx];
            const isCorrect = userAnswer === correctAnswer;
            
            return (
              <div key={opt.label} className="bg-white rounded-xl p-3 shadow-sm">
                <div className="relative w-full mb-3" style={{ aspectRatio: '1/1' }}>
                  <Image src={q.images![idx]} alt={opt.text} fill className="object-contain" />
                </div>
                <p className="text-sm text-gray-600 mb-2">{opt.label}. {opt.text}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (checked[q.id]) return;
                      const newAnswers = [...currentAnswers];
                      newAnswers[idx] = '✓';
                      handleAnswer(q.id, newAnswers);
                    }}
                    disabled={checked[q.id]}
                    className={`flex-1 py-2 rounded-lg font-bold ${
                      userAnswer === '✓'
                        ? checked[q.id] ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-blue-500 text-white'
                        : checked[q.id] && correctAnswer === '✓' ? 'bg-green-200 text-green-800' : 'bg-gray-100 hover:bg-green-100'
                    }`}
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => {
                      if (checked[q.id]) return;
                      const newAnswers = [...currentAnswers];
                      newAnswers[idx] = '✗';
                      handleAnswer(q.id, newAnswers);
                    }}
                    disabled={checked[q.id]}
                    className={`flex-1 py-2 rounded-lg font-bold ${
                      userAnswer === '✗'
                        ? checked[q.id] ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-blue-500 text-white'
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
        
        {/* 確認答案按鈕 */}
        {!checked[q.id] && isAllAnswered && (
          <button
            onClick={() => handleConfirm(q.id)}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold shadow-lg"
          >
            ✅ 確認答案
          </button>
        )}
      </div>
    );
  };

  // 渲染簡答題（開估模式）
  const renderShortAnswer = (q: Question) => {
    const isRevealed = revealed[q.id];
    
    return (
      <div className="space-y-4">
        {/* 圖片（如果有） */}
        {q.images && q.imageLabels && (
          <div className="flex flex-col sm:flex-row gap-4">
            {q.images.map((img, idx) => (
              <div key={idx} className="flex-1 bg-white rounded-xl p-3 shadow-sm">
                <div className="text-center font-bold text-gray-600 mb-2 text-sm">{q.imageLabels?.[idx]}</div>
                <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                  <Image src={img} alt={q.imageLabels?.[idx] || ''} fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        )}
        
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
        
        {/* 確認答案按鈕 */}
        {!checked[q.id] && isComplete && (
          <button
            onClick={() => handleConfirm(q.id)}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold shadow-lg"
          >
            ✅ 確認答案
          </button>
        )}
        
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
        
        {/* 確認答案按鈕 */}
        {!checked[q.id] && (yesSelected.length + noSelected.length) === 4 && (
          <button
            onClick={() => handleConfirm(q.id)}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold shadow-lg"
          >
            ✅ 確認答案
          </button>
        )}
      </div>
    );
  };

  // 渲染玩具配對題 (Q24)
  const renderMatchingToy = (q: Question) => {
    const currentMatches = (answers[q.id] as string[]) || [];
    const batteryOptions = [
      { label: 'A', text: 'AAA 乾電池' },
      { label: 'B', text: '鋰離子電池' },
      { label: 'C', text: '鈕型乾電池' },
    ];
    
    const handleToyClick = (idx: number) => {
      if (checked[q.id]) return;
      setSelectedToy(idx);
    };
    
    const handleBatteryClick = (label: string) => {
      if (checked[q.id] || selectedToy === null) return;
      
      const newMatches = [...currentMatches];
      newMatches[selectedToy] = label;
      handleAnswer(q.id, newMatches);
      setSelectedToy(null);
    };
    
    return (
      <div className="space-y-4">
        {/* 提示 */}
        <p className="text-sm text-gray-500">
          {selectedToy === null ? '請先點擊左邊的玩具，再點擊右邊的電池類型' : `正在為「玩具${String.fromCharCode(65 + selectedToy)}」選擇電池`}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {/* 左邊：玩具圖片 */}
          <div className="space-y-3">
            <p className="font-bold text-gray-700 mb-2">玩具</p>
            {q.images?.map((img, idx) => {
              const match = currentMatches[idx];
              const isSelected = selectedToy === idx;
              const toyLabel = String.fromCharCode(65 + idx); // A, B
              
              return (
                <button
                  key={idx}
                  onClick={() => handleToyClick(idx)}
                  disabled={checked[q.id] || !!match}
                  className={`w-full bg-white rounded-lg p-3 shadow-sm transition-all ${
                    isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  } ${checked[q.id] ? 'cursor-not-allowed' : ''} ${match ? 'opacity-70' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-24 h-24 shrink-0">
                      <Image src={img} alt={`玩具${toyLabel}`} fill className="object-contain" />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="font-bold text-gray-600">玩具 {toyLabel}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      match ? (match === (q.answer as string[])[idx] ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700') : 'bg-gray-100 text-gray-500'
                    }`}>
                      {match || '?'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* 右邊：電池選項 */}
          <div className="space-y-2">
            <p className="font-bold text-gray-700 mb-2">電池類型</p>
            {batteryOptions.map(opt => {
              const isUsed = currentMatches.includes(opt.label);
              
              return (
                <button
                  key={opt.label}
                  onClick={() => handleBatteryClick(opt.label)}
                  disabled={checked[q.id] || isUsed || selectedToy === null}
                  className={`w-full rounded-lg p-3 shadow-sm text-left transition-all ${
                    isUsed ? 'bg-gray-100 opacity-50' : selectedToy !== null ? 'bg-white hover:bg-blue-50' : 'bg-white opacity-70'
                  } ${checked[q.id] ? 'cursor-not-allowed' : ''}`}
                >
                  <span className="font-bold">{opt.label}.</span> {opt.text}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* 確認答案按鈕 */}
        {!checked[q.id] && currentMatches.length === 2 && currentMatches.every(m => m) && (
          <button
            onClick={() => handleConfirm(q.id)}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold shadow-lg"
          >
            ✅ 確認答案
          </button>
        )}
        
        {/* 重置按 */}
        {!checked[q.id] && (
          <button
            onClick={() => {
              handleAnswer(q.id, []);
              setSelectedToy(null);
            }}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            重新配對
          </button>
        )}
      </div>
    );
  };

  // 渲染排序題 (Q25, Q26)
  const renderOrdering = (q: Question) => {
    const currentOrder = (answers[q.id] as string[]) || [];
    const allOptions = q.options || [];
    const correctOrder = q.answer as string[];
    
    // 將答案轉換為選項對象
    const orderedOptions = currentOrder.map(label => allOptions.find(o => o.label === label)).filter(Boolean);
    const remainingOptions = allOptions.filter(opt => !currentOrder.includes(opt.label));
    
    const handleOptionClick = (label: string) => {
      if (checked[q.id]) return;
      
      const newOrder = [...currentOrder, label];
      handleAnswer(q.id, newOrder);
    };
    
    const handleRemove = (index: number) => {
      if (checked[q.id]) return;
      
      const newOrder = currentOrder.filter((_, i) => i !== index);
      handleAnswer(q.id, newOrder);
    };
    
    return (
      <div className="space-y-4">
        {/* 排序結果區域 */}
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="font-bold text-blue-700 mb-3">排序（先後次序）：</p>
          <div className="space-y-2 min-h-[60px]">
            {orderedOptions.length === 0 ? (
              <p className="text-gray-400 text-sm">請點擊下方選項加入排序</p>
            ) : (
              orderedOptions.map((opt, idx) => {
                const isCorrect = !checked[q.id] || correctOrder[idx] === opt?.label;
                
                return (
                  <div 
                    key={`${opt?.label}-${idx}`}
                    className={`flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm ${
                      checked[q.id] ? (isCorrect ? 'border-2 border-green-400' : 'border-2 border-red-400') : ''
                    }`}
                  >
                    <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="flex-1">{opt?.label}. {opt?.text}</span>
                    {!checked[q.id] && (
                      <button
                        onClick={() => handleRemove(idx)}
                        className="text-red-400 hover:text-red-600 px-2"
                      >
                        ✕
                      </button>
                    )}
                    {checked[q.id] && (
                      <span className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {isCorrect ? '✓' : `應為 ${correctOrder[idx]}`}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
        
        {/* 待選選項 */}
        {remainingOptions.length > 0 && !checked[q.id] && (
          <div className="space-y-2">
            <p className="font-bold text-gray-700">請選擇：</p>
            <div className="grid grid-cols-1 gap-2">
              {remainingOptions.map(opt => (
                <button
                  key={opt.label}
                  onClick={() => handleOptionClick(opt.label)}
                  className="bg-white rounded-lg p-3 shadow-sm text-left hover:bg-blue-50 transition-all"
                >
                  <span className="font-bold">{opt.label}.</span> {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* 確認答案按鈕 */}
        {!checked[q.id] && remainingOptions.length === 0 && currentOrder.length > 0 && (
          <button
            onClick={() => handleConfirm(q.id)}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold shadow-lg"
          >
            ✅ 確認答案
          </button>
        )}
        
        {/* 重置按 */}
        {!checked[q.id] && currentOrder.length > 0 && (
          <button
            onClick={() => handleAnswer(q.id, [])}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            重新排序
          </button>
        )}
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
      case 'matching-toy':
        return renderMatchingToy(q);
      case 'ordering':
        return renderOrdering(q);
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
            {question.wordBank && (
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
              setSelectedToy(null);
              setOrderingSequence([]);
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
                setSelectedToy(null);
                setOrderingSequence([]);
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
                  setSelectedToy(null);
                  setOrderingSequence([]);
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
