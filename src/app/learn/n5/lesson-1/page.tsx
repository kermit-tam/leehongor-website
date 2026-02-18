'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { lesson1Data, getQuizReward, getUnitProgressKey, scoringConfig, calculateParticipationExp, saveExpHistory, ExpSource } from '@/data/n5-lessons';
import { useAuth } from '@/lib/auth-context';
import { UserService } from '@/lib/firestore';

function LessonContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const initialUnit = parseInt(searchParams.get('unit') || '1');
  
  const [currentUnit, setCurrentUnit] = useState(initialUnit - 1);
  const [mode, setMode] = useState<'menu' | 'study' | 'quiz' | 'result'>('menu');
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [showCantonese, setShowCantonese] = useState(true);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [completedUnits, setCompletedUnits] = useState<Set<string>>(new Set());
  const [participationClaimed, setParticipationClaimed] = useState<Set<string>>(new Set());
  const [unitExp, setUnitExp] = useState(0);
  const [expBreakdown, setExpBreakdown] = useState<{participation: number, assessment: number}>({ participation: 0, assessment: 0 });
  const [showExpDetail, setShowExpDetail] = useState(false);

  const currentUnitData = lesson1Data.units[currentUnit];

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
    const key = `${lesson1Data.id}-unit${unitId}-participation`;
    if (participationClaimed.has(key)) return; // 已領取過

    const unit = lesson1Data.units.find(u => u.id === unitId);
    if (!unit) return;

    const exp = calculateParticipationExp(unit);
    
    // 記錄到 localStorage
    const newClaimed = new Set(participationClaimed);
    newClaimed.add(key);
    setParticipationClaimed(newClaimed);
    localStorage.setItem('n5-participation-claimed', JSON.stringify([...newClaimed]));

    // 保存 EXP 記錄
    const expSource: ExpSource = {
      type: 'participation',
      action: `完成${unit.title}學習`,
      exp,
      timestamp: new Date(),
      lessonId: lesson1Data.id,
      unitId,
    };
    saveExpHistory(expSource);

    // 如果用戶已登入，同步到 Firestore
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
    
    // 保存 EXP 記錄
    const expSource: ExpSource = {
      type: 'assessment',
      action: `測驗得分 ${percentage}%`,
      exp: reward.exp,
      timestamp: new Date(),
      lessonId: lesson1Data.id,
      unitId: currentUnitData.id,
    };
    saveExpHistory(expSource);

    // 如果用戶已登入，同步到 Firestore
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
    const key = getUnitProgressKey(lesson1Data.id, unitId);
    const newCompleted = new Set(completedUnits);
    newCompleted.add(key);
    setCompletedUnits(newCompleted);
    localStorage.setItem('n5-unit-completed', JSON.stringify([...newCompleted]));
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
    
    // 檢查是否已領取過參與分
    const key = `${lesson1Data.id}-unit${lesson1Data.units[unitIndex].id}-participation`;
    if (!participationClaimed.has(key)) {
      // 給予參與分
      const exp = await awardParticipationExp(lesson1Data.units[unitIndex].id);
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
    setAnswered(false);
    setSelectedOption(null);
    setExpBreakdown({ participation: 0, assessment: 0 });
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
    if (isCorrect) setScore(score + 1);
    playAudio(currentWord.hiragana);
  };

  const nextQuestion = async () => {
    if (quizIndex < currentUnitData.vocab.length - 1) {
      setQuizIndex(quizIndex + 1);
      setAnswered(false);
      setSelectedOption(null);
    } else {
      // 完成測驗，計算分數
      const finalScore = score + (selectedOption === currentUnitData.vocab[quizIndex].meaning ? 1 : 0);
      const percentage = Math.round((finalScore / currentUnitData.vocab.length) * 100);
      
      // 給予考核分
      const assessmentExp = await awardAssessmentExp(percentage);
      
      setExpBreakdown(prev => ({ ...prev, assessment: assessmentExp || 0 }));
      setUnitExp((prev) => prev + (assessmentExp || 0));
      saveCompleted(currentUnitData.id);
      setMode('result');
    }
  };

  const backToMenu = () => {
    setMode('menu');
    setFlippedCards(new Set());
    setExpBreakdown({ participation: 0, assessment: 0 });
  };

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

        <div className="bg-white border-b border-[#E5E5E5] px-4 py-6 sticky top-0 z-40">
          <div className="max-w-lg mx-auto">
            <Link href="/learn" className="text-[#8C8C8C] text-sm mb-2 inline-block">
              ← 返回課程列表
            </Link>
            <h1 className="text-2xl font-normal text-[#4A4A4A] mb-1">第1課：初次見面</h1>
            <p className="text-sm text-[#8C8C8C]">4個微單元 • 完成學習獲參與分，測驗獲考核分</p>
            
            <div className="mt-4 flex justify-end">
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
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
          {lesson1Data.units.map((unit, index) => {
            const isCompleted = completedUnits.has(getUnitProgressKey(lesson1Data.id, unit.id));
            const hasParticipation = participationClaimed.has(`${lesson1Data.id}-unit${unit.id}-participation`);
            
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
                  {unit.listening && <span className="text-xs px-2 py-0.5 bg-[#E8F5E9] text-[#388E3C] rounded">聽力</span>}
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
          {currentUnitData.grammar && (
            <div className="bg-white rounded-xl p-4 mb-6 border border-[#E8E8E8]">
              <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">📚 文法重點</h3>
              {currentUnitData.grammar.map((g, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#C4B9AC] font-medium">{g.pattern}</span>
                    <span className="text-xs text-[#8C8C8C]">→ {g.meaning}</span>
                  </div>
                  <p className="text-sm text-[#4A4A4A] bg-[#F5F5F0] px-3 py-2 rounded">
                    {g.example}
                    <span className="text-[#8C8C8C] ml-2">({g.exampleMeaning})</span>
                  </p>
                </div>
              ))}
            </div>
          )}

          <p className="text-center text-sm text-[#8C8C8C] mb-4">👆 撳卡片睇答案 • 再撳聽發音</p>
          
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

          {currentUnitData.dialogue && (
            <div className="mt-6 bg-white rounded-xl p-4 border border-[#E8E8E8]">
              <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">💬 情境對話</h3>
              {currentUnitData.dialogue.map((d, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-medium text-[#C4B9AC] w-12 shrink-0">{d.speaker}</span>
                    <div className="flex-1">
                      <p className="text-sm text-[#4A4A4A]">{d.japanese}</p>
                      {showCantonese && d.cantonese && <p className="text-xs text-[#C4B9AC]">{d.cantonese}</p>}
                      <p className="text-xs text-[#8C8C8C]">{d.meaning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 測驗模式
  if (mode === 'quiz') {
    const currentWord = currentUnitData.vocab[quizIndex];
    const progress = ((quizIndex + 1) / currentUnitData.vocab.length) * 100;
    
    return (
      <div className="min-h-screen bg-[#F5F5F0] pb-20">
        <div className="bg-white border-b border-[#E5E5E5] px-4 py-3 sticky top-0 z-50">
          <div className="max-w-lg mx-auto flex justify-between items-center">
            <span className="text-sm text-[#8C8C8C]">測驗模式</span>
            <span className="text-sm text-[#4A4A4A]">{quizIndex + 1}/{currentUnitData.vocab.length}</span>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6">
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

          <div className="grid grid-cols-2 gap-3">
            {generateOptions(currentWord).map((option, idx) => (
              <motion.button
                key={idx}
                onClick={() => checkAnswer(option)}
                disabled={answered}
                className={`p-4 rounded-lg border-2 text-center text-sm transition-all ${
                  answered
                    ? option === currentWord.meaning
                      ? 'bg-[#F0F5F0] border-[#A8B5A0] text-[#4A4A4A]'
                      : option === selectedOption
                        ? 'bg-[#F5F0F0] border-[#D4C5B9] text-[#4A4A4A] opacity-60'
                        : 'bg-white border-[#E5E5E5] text-[#4A4A4A] opacity-40'
                    : 'bg-white border-[#E5E5E5] text-[#4A4A4A] hover:border-[#C4B9AC]'
                }`}
                whileTap={!answered ? { scale: 0.95 } : {}}
              >
                {option}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-white rounded-lg border-l-4 border-[#C4B9AC]"
              >
                <p className="text-sm text-[#4A4A4A]">
                  {selectedOption === currentWord.meaning ? '✓ 正確！' : <>
                    正確答案：<strong>{currentWord.kanji}</strong>（{currentWord.meaning}）
                  </>}
                </p>
                {showCantonese && currentWord.cantonese && <p className="text-xs text-[#C4B9AC] mt-1">廣東話諧音：{currentWord.cantonese}</p>}
                <button onClick={nextQuestion} className="w-full mt-3 py-3 bg-[#8C8C8C] text-white rounded-lg">
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
    const totalQuestions = currentUnitData.vocab.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const reward = getQuizReward(percentage);
    const isNewCompletion = !completedUnits.has(getUnitProgressKey(lesson1Data.id, currentUnitData.id));
    
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 max-w-sm w-full text-center border border-[#E8E8E8]">
          <div className="w-24 h-24 rounded-full border-4 border-[#C4B9AC] flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-[#4A4A4A]">{percentage}%</span>
          </div>
          
          <h3 className="text-xl text-[#4A4A4A] mb-2">{reward.label}</h3>
          
          <div className="flex justify-center gap-2 mb-3">
            {[1, 2, 3].map((star) => <span key={star} className={`text-2xl ${star <= reward.stars ? 'text-[#FFC107]' : 'text-[#E0E0E0]'}`}>⭐</span>)}
          </div>
          
          <p className="text-sm text-[#8C8C8C] mb-2">{currentUnitData.title} • {score}/{totalQuestions} 正確</p>

          {/* EXP 明細 */}
          <div className="bg-[#FAFAFA] rounded-lg p-4 mb-4 text-left">
            <h4 className="text-sm font-medium text-[#4A4A4A] mb-2">🏆 經驗值明細</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-[#8C8C8C]">參與分（完成學習）</span>
                <span className="text-[#C4B9AC]">+{expBreakdown.participation || calculateParticipationExp(currentUnitData)}</span>
              </div>
              {isNewCompletion && (
                <div className="flex justify-between">
                  <span className="text-[#8C8C8C]">考核分（測驗得分）</span>
                  <span className="text-[#C4B9AC]">+{expBreakdown.assessment}</span>
                </div>
              )}
              <div className="border-t border-[#E0E0E0] pt-1 mt-2">
                <div className="flex justify-between font-medium">
                  <span className="text-[#4A4A4A]">總計</span>
                  <span className="text-[#C4B9AC]">+{(expBreakdown.participation || calculateParticipationExp(currentUnitData)) + expBreakdown.assessment} EXP</span>
                </div>
              </div>
            </div>
            {user?.uid && <p className="text-xs text-[#8C8C8C] mt-2">✓ 已同步到個人資料</p>}
          </div>

          <div className="space-y-2">
            <button onClick={backToMenu} className="w-full py-3 bg-[#C4B9AC] text-white rounded-lg">返回單元列表</button>
            {percentage < 80 && <button onClick={() => { setMode('study'); setFlippedCards(new Set()); }} className="w-full py-3 border border-[#C4B9AC] text-[#C4B9AC] rounded-lg">重新溫習</button>}
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}

export default function Lesson1Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center"><div className="text-[#8C8C8C]">載入中...</div></div>}>
      <LessonContent />
    </Suspense>
  );
}
