'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SentenceBuilder from './sentence-builder';
import { n5Lessons5to7V2 } from '@/data/n5-lessons-5to15';
import { getUnitProgressKey, getQuizReward, calculateParticipationExp, saveExpHistory, ExpSource } from '@/data/n5-lessons';
import { useAuth } from '@/lib/auth-context';
import { UserService } from '@/lib/firestore';

// 獲取第5課數據
const lesson5Data = n5Lessons5to7V2[0];

function Lesson5Content() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'menu' | 'study' | 'quiz' | 'builder' | 'listening' | 'result'>('menu');
  const [currentUnit, setCurrentUnit] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [showCantonese, setShowCantonese] = useState(true);
  
  // 測驗狀態
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // 進度
  const [completedUnits, setCompletedUnits] = useState<Set<string>>(new Set());
  const [participationClaimed, setParticipationClaimed] = useState<Set<string>>(new Set());
  const [showExpDetail, setShowExpDetail] = useState(false);
  const [expBreakdown, setExpBreakdown] = useState<{participation: number, assessment: number}>({ participation: 0, assessment: 0 });
  
  // 重置確認
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const currentUnitData = lesson5Data.units[currentUnit];

  useEffect(() => {
    const savedCompleted = localStorage.getItem('n5-unit-completed');
    if (savedCompleted) {
      setCompletedUnits(new Set(JSON.parse(savedCompleted)));
    }
    const savedParticipation = localStorage.getItem('n5-participation-claimed');
    if (savedParticipation) {
      setParticipationClaimed(new Set(JSON.parse(savedParticipation)));
    }
  }, []);

  // 給予參與分
  const awardParticipationExp = async (unitId: number) => {
    const key = `${lesson5Data.id}-unit${unitId}-participation`;
    if (participationClaimed.has(key)) return;

    const unit = lesson5Data.units.find(u => u.id === unitId);
    if (!unit) return;

    const exp = calculateParticipationExp(unit);
    
    const newClaimed = new Set(participationClaimed);
    newClaimed.add(key);
    setParticipationClaimed(newClaimed);
    localStorage.setItem('n5-participation-claimed', JSON.stringify([...newClaimed]));

    const expSource: ExpSource = {
      type: 'participation',
      action: `完成${unit.title}學習`,
      exp,
      timestamp: new Date(),
      lessonId: lesson5Data.id,
      unitId,
    };
    saveExpHistory(expSource);

    if (user?.uid) {
      try {
        const userData = await UserService.getUser(user.uid);
        if (userData) {
          await UserService.updateUser(user.uid, {
            achievementExp: userData.achievementExp + exp,
          });
        }
      } catch (err) {
        console.error('Failed to sync exp to Firestore:', err);
      }
    }

    return exp;
  };

  // 給予考核分
  const awardAssessmentExp = async (percentage: number) => {
    const reward = getQuizReward(percentage);
    
    const expSource: ExpSource = {
      type: 'assessment',
      action: `測驗得分 ${percentage}%`,
      exp: reward.exp,
      timestamp: new Date(),
      lessonId: lesson5Data.id,
      unitId: currentUnitData.id,
    };
    saveExpHistory(expSource);

    if (user?.uid) {
      try {
        const userData = await UserService.getUser(user.uid);
        if (userData) {
          await UserService.updateUser(user.uid, {
            achievementExp: userData.achievementExp + reward.exp,
          });
        }
      } catch (err) {
        console.error('Failed to sync exp to Firestore:', err);
      }
    }

    return reward.exp;
  };

  const saveCompleted = (unitId: number) => {
    const key = getUnitProgressKey(lesson5Data.id, unitId);
    const newCompleted = new Set(completedUnits);
    newCompleted.add(key);
    setCompletedUnits(newCompleted);
    localStorage.setItem('n5-unit-completed', JSON.stringify([...newCompleted]));
  };

  // 重置進度
  const resetProgress = () => {
    localStorage.removeItem('n5-unit-completed');
    localStorage.removeItem('n5-participation-claimed');
    localStorage.removeItem('n5-exp-history');
    localStorage.removeItem('n5-unit-scores');
    setCompletedUnits(new Set());
    setParticipationClaimed(new Set());
    setShowResetConfirm(false);
    window.location.reload();
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleCard = (index: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(index)) {
      newFlipped.delete(index);
    } else {
      newFlipped.add(index);
      playAudio(currentUnitData.vocab[index].hiragana);
    }
    setFlippedCards(newFlipped);
  };

  const startStudy = async (unitIndex: number) => {
    setCurrentUnit(unitIndex);
    setMode('study');
    setFlippedCards(new Set());
    
    const key = `${lesson5Data.id}-unit${lesson5Data.units[unitIndex].id}-participation`;
    if (!participationClaimed.has(key)) {
      const exp = await awardParticipationExp(lesson5Data.units[unitIndex].id);
      if (exp) {
        setExpBreakdown(prev => ({ ...prev, participation: exp }));
        setShowExpDetail(true);
        setTimeout(() => setShowExpDetail(false), 3000);
      }
    }
  };

  const startQuiz = () => {
    setMode('quiz');
    setQuizIndex(0);
    setScore(0);
    setWrongCount(0);
    setAnswered(false);
    setSelectedOption(null);
  };

  const startBuilder = () => {
    setMode('builder');
  };

  const generateOptions = (correctWord: typeof currentUnitData.vocab[0]) => {
    const wrongOptions = currentUnitData.vocab
      .filter(w => w.meaning !== correctWord.meaning)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.meaning);
    return [correctWord.meaning, ...wrongOptions].sort(() => Math.random() - 0.5);
  };

  const checkAnswer = (selected: string) => {
    if (answered) return;
    const currentWord = currentUnitData.vocab[quizIndex];
    const isCorrect = selected === currentWord.meaning;
    
    setSelectedOption(selected);
    setAnswered(true);
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setWrongCount(wrongCount + 1);
    }
    playAudio(currentWord.hiragana);
  };

  const nextQuestion = async () => {
    if (quizIndex < currentUnitData.vocab.length - 1) {
      setQuizIndex(quizIndex + 1);
      setAnswered(false);
      setSelectedOption(null);
    } else {
      const finalScore = score + (selectedOption === currentUnitData.vocab[quizIndex].meaning ? 1 : 0);
      const percentage = Math.round((finalScore / currentUnitData.vocab.length) * 100);
      const assessmentExp = await awardAssessmentExp(percentage);
      
      setExpBreakdown(prev => ({ ...prev, assessment: assessmentExp || 0 }));
      saveCompleted(currentUnitData.id);
      setMode('result');
    }
  };

  const backToMenu = () => {
    setMode('menu');
    setFlippedCards(new Set());
    setExpBreakdown({ participation: 0, assessment: 0 });
  };

  // 積木造句機模式
  if (mode === 'builder') {
    return <SentenceBuilder />;
  }

  // 選單模式
  if (mode === 'menu') {
    return (
      <div className="min-h-screen bg-[#F5F5F0] pb-20">
        {/* EXP 獲得提示 */}
        <AnimatePresence>
          {showExpDetail && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#C4B9AC] text-white px-6 py-3 rounded-full shadow-lg"
            >
              🎉 +{expBreakdown.participation} 參與分！已加到個人資料
            </motion.div>
          )}
        </AnimatePresence>

        {/* 重置確認對話框 */}
        <AnimatePresence>
          {showResetConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl p-6 max-w-sm w-full"
              >
                <div className="text-center mb-4">
                  <span className="text-4xl">⚠️</span>
                  <h3 className="text-xl font-bold text-[#4A4A4A] mt-2">確定重置進度？</h3>
                  <p className="text-sm text-[#8C8C8C] mt-2">
                    此操作會清除所有學習進度、測驗記錄和已領取的經驗值，無法恢復。
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 py-3 border border-[#E0E0E0] text-[#8C8C8C] rounded-lg"
                  >
                    取消
                  </button>
                  <button
                    onClick={resetProgress}
                    className="flex-1 py-3 bg-red-500 text-white rounded-lg"
                  >
                    確定重置
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white border-b border-[#E5E5E5] px-4 py-6 sticky top-0 z-40">
          <div className="max-w-lg mx-auto">
            <div className="flex justify-between items-start">
              <Link href="/learn" className="text-[#8C8C8C] text-sm mb-2 inline-block">
                ← 返回課程列表
              </Link>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-xs text-red-400 hover:text-red-600"
              >
                🔄 重置進度
              </button>
            </div>
            <h1 className="text-2xl font-normal text-[#4A4A4A] mb-1">第5課：{lesson5Data.title}</h1>
            <p className="text-sm text-[#8C8C8C]">4個微單元 • 積木造句機 • 完成學習獲參與分</p>
            
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setShowCantonese(!showCantonese)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                  showCantonese 
                    ? 'bg-[#C4B9AC] text-white' 
                    : 'bg-[#F5F5F0] text-[#8C8C8C] border border-[#E0E0E0]'
                }`}
              >
                <span>🇭🇰</span>
                <span>廣東話諧音</span>
              </button>
              
              {/* 積木造句機按鈕 */}
              <button
                onClick={startBuilder}
                className="flex items-center gap-2 px-4 py-2 bg-[#6B5B95] text-white rounded-full text-sm hover:bg-[#5A4A84] transition-colors"
              >
                🧱 積木造句機
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
          {/* 特色功能卡片 - 積木造句機 */}
          <motion.button
            onClick={startBuilder}
            className="w-full rounded-xl p-5 text-left relative overflow-hidden border-2 border-[#6B5B95] bg-gradient-to-r from-[#6B5B95]/10 to-transparent hover:shadow-lg transition-all"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧱</span>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-[#6B5B95]">積木造句機</h3>
                <p className="text-sm text-[#8C8C8C]">組合時間、人物、交通工具，創造你的日文句子</p>
              </div>
              <span className="text-[#6B5B95]">→</span>
            </div>
          </motion.button>

          {lesson5Data.units.map((unit, index) => {
            const isCompleted = completedUnits.has(getUnitProgressKey(lesson5Data.id, unit.id));
            const hasParticipation = participationClaimed.has(`${lesson5Data.id}-unit${unit.id}-participation`);
            
            return (
              <motion.button
                key={unit.id}
                onClick={() => startStudy(index)}
                className={`w-full rounded-xl p-5 text-left relative overflow-hidden border transition-all ${
                  isCompleted 
                    ? 'bg-[#E8F5E9] border-[#A5D6A7]' 
                    : 'bg-white border-[#E8E8E8] hover:border-[#C4B9AC]'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className={`text-xs tracking-wider ${isCompleted ? 'text-[#4CAF50]' : 'text-[#C4B9AC]'}`}>
                      單元 0{unit.id}
                    </span>
                    <h3 className="text-lg text-[#4A4A4A] mt-1">{unit.title}</h3>
                    <p className="text-sm text-[#8C8C8C]">{unit.subtitle}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isCompleted && <span className="text-2xl">✓</span>}
                    {hasParticipation && <span className="text-xs text-[#C4B9AC]">已領參與分</span>}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <span className="text-xs px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded">詞彙</span>
                  {unit.grammar && <span className="text-xs px-2 py-0.5 bg-[#F3E5F5] text-[#7B1FA2] rounded">文法</span>}
                  {unit.dialogue && <span className="text-xs px-2 py-0.5 bg-[#FFF3E0] text-[#F57C00] rounded">對話</span>}
                </div>
                
                <p className="text-xs text-[#8C8C8C] mt-2">
                  學習獲 +{calculateParticipationExp(unit)} 參與分
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // 其他模式（學習、測驗、結果）與 Lesson 1 相同...
  // 為了簡潔，這裡省略重複的代碼
  // 學習模式
  if (mode === 'study') {
    return (
      <div className="min-h-screen bg-[#F5F5F0] pb-20">
        <div className="bg-white border-b border-[#E5E5E5] px-4 py-3 sticky top-0 z-50 flex justify-between items-center">
          <button onClick={backToMenu} className="text-[#8C8C8C] text-sm">← 返回</button>
          <div className="text-center">
            <span className="text-sm text-[#4A4A4A]">{currentUnitData.title}</span>
            <span className="text-xs text-[#8C8C8C] ml-2">單元 {currentUnitData.id}/4</span>
          </div>
          <button onClick={startQuiz} className="text-sm bg-[#C4B9AC] text-white px-3 py-1.5 rounded-full">
            測驗 →
          </button>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6">
          <p className="text-center text-sm text-[#8C8C8C] mb-4">👆 撳卡片睇答案 · 再撳聽發音</p>
          
          <div className="grid grid-cols-2 gap-3">
            {currentUnitData.vocab.map((word, index) => (
              <motion.div
                key={index}
                onClick={() => toggleCard(index)}
                className="relative aspect-[4/3] cursor-pointer"
                style={{ perspective: '1000px' }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="w-full h-full relative"
                  animate={{ rotateY: flippedCards.has(index) ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute inset-0 bg-white rounded-lg shadow-sm border border-[#E8E8E8] flex flex-col items-center justify-center p-3">
                    {showCantonese && word.cantonese ? (
                      <>
                        <span className="text-xl text-[#4A4A4A]">{word.cantonese}</span>
                        <span className="text-sm text-[#C4B9AC] mt-1">{word.hiragana}</span>
                      </>
                    ) : (
                      <span className="text-2xl text-[#4A4A4A]">{word.hiragana}</span>
                    )}
                    <span className="text-xs text-[#C4B9AC] mt-2">點擊翻轉</span>
                  </div>

                  <div 
                    className="absolute inset-0 bg-[#FAF8F5] rounded-lg shadow-sm border border-[#E0D5C7] flex flex-col items-center justify-center p-3"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-lg text-[#4A4A4A] mb-1">{word.kanji}</span>
                    <span className="text-base text-[#4A4A4A] font-medium text-center mb-1">{word.meaning}</span>
                    {word.note && <span className="text-xs text-[#8C8C8C]">{word.note}</span>}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 測驗模式
  if (mode === 'quiz') {
    const currentWord = currentUnitData.vocab[quizIndex];
    const progress = ((quizIndex + 1) / currentUnitData.vocab.length) * 100;
    const options = generateOptions(currentWord);
    
    return (
      <div className="min-h-screen bg-[#F5F5F0] pb-20">
        <div className="bg-white border-b border-[#E5E5E5] px-4 py-3 sticky top-0 z-50">
          <div className="max-w-lg mx-auto flex justify-between items-center">
            <span className="text-sm text-[#8C8C8C]">測驗模式</span>
            <span className="text-sm text-[#4A4A4A]">{quizIndex + 1}/{currentUnitData.vocab.length}</span>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6">
          {/* 進度同統計 */}
          <div className="flex justify-between text-xs text-[#8C8C8C] mb-2">
            <span>進度: {quizIndex + 1}/{currentUnitData.vocab.length}</span>
            <span>
              <span className="text-green-600">✓ {score}</span>
              {' · '}
              <span className="text-red-500">✗ {wrongCount}</span>
            </span>
          </div>
          <div className="h-2 bg-[#E5E5E5] rounded-full mb-6 overflow-hidden">
            <div className="h-full bg-[#C4B9AC] rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E8E8E8] text-center mb-6">
            {showCantonese && currentWord.cantonese ? (
              <>
                <div className="text-3xl text-[#C4B9AC] mb-1">{currentWord.cantonese}</div>
                <div className="text-lg text-[#8C8C8C] mb-2">{currentWord.hiragana}</div>
              </>
            ) : (
              <div className="text-5xl text-[#4A4A4A] mb-2">{currentWord.hiragana}</div>
            )}
            <div className="text-sm text-[#C4B9AC]">這是什麼意思？</div>
          </div>

          <div className="space-y-3">
            {options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentWord.meaning;
              const showResult = answered;
              
              let buttonClass = 'w-full p-4 text-left border-2 rounded-lg text-center text-base font-medium transition-all ';
              
              if (showResult) {
                if (isCorrect) {
                  buttonClass += 'bg-[#E8F5E9] border-[#4CAF50] text-[#4A4A4A]';
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'bg-[#FFEBEE] border-[#F44336] text-[#4A4A4A]';
                } else {
                  buttonClass += 'bg-white border-[#E5E5E5] text-[#8C8C8C] opacity-50';
                }
              } else {
                if (isSelected) {
                  buttonClass += 'bg-[#E0D5C7] border-[#8C8C8C] text-[#4A4A4A]';
                } else {
                  buttonClass += 'bg-white border-[#E5E5E5] text-[#4A4A4A] hover:border-[#C4B9AC]';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => checkAnswer(option)}
                  disabled={answered}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-center gap-3">
                    {showResult && isCorrect && <span className="text-green-600 text-xl">✓</span>}
                    {showResult && isSelected && !isCorrect && <span className="text-red-500 text-xl">✗</span>}
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-lg border-l-4 ${
                  selectedOption === currentWord.meaning
                    ? 'bg-[#E8F5E9] border-l-[#4CAF50]'
                    : 'bg-[#FFEBEE] border-l-[#F44336]'
                }`}
              >
                <p className="text-sm text-[#4A4A4A] font-medium">
                  {selectedOption === currentWord.meaning
                    ? '✓ 正確！'
                    : <>
                        ✗ 正確答案：<strong>{currentWord.kanji}</strong>（{currentWord.meaning}）
                      </>
                  }
                </p>
                {showCantonese && currentWord.cantonese && (
                  <p className="text-xs text-[#C4B9AC] mt-1">廣東話諧音：{currentWord.cantonese}</p>
                )}
                <button
                  onClick={nextQuestion}
                  className="w-full mt-3 py-3 bg-[#8C8C8C] text-white rounded-lg"
                >
                  {quizIndex === currentUnitData.vocab.length - 1 ? '看結果' : '下一題'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // 結果模式
  if (mode === 'result') {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-sm w-full text-center border border-[#E8E8E8]"
        >
          <div className="w-24 h-24 rounded-full border-4 border-[#C4B9AC] flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-[#4A4A4A]">{score}/{currentUnitData.vocab.length}</span>
          </div>
          
          <h3 className="text-xl text-[#4A4A4A] mb-2">單元測驗完成！</h3>

          <div className="space-y-2">
            <button onClick={backToMenu} className="w-full py-3 bg-[#C4B9AC] text-white rounded-lg">
              返回單元列表
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}

export default function Lesson5Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center"><div className="text-[#8C8C8C]">載入中...</div></div>}>
      <Lesson5Content />
    </Suspense>
  );
}
