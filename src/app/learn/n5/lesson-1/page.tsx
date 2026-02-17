'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { lesson1Data, getQuizReward, getUnitProgressKey, scoringConfig } from '@/data/n5-lessons';

function Lesson1Content() {
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
  const [unitExp, setUnitExp] = useState(0);

  const currentUnitData = lesson1Data.units[currentUnit];

  useEffect(() => {
    const saved = localStorage.getItem('n5-unit-completed');
    if (saved) {
      setCompletedUnits(new Set(JSON.parse(saved)));
    }
  }, []);

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

  const startStudy = (unitIndex: number) => {
    setCurrentUnit(unitIndex);
    setMode('study');
    setFlippedCards(new Set());
  };

  const startQuiz = () => {
    setMode('quiz');
    setQuizIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedOption(null);
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

  const nextQuestion = () => {
    if (quizIndex < currentUnitData.vocab.length - 1) {
      setQuizIndex(quizIndex + 1);
      setAnswered(false);
      setSelectedOption(null);
    } else {
      // 計算總分和經驗值
      const finalScore = score + (selectedOption === currentUnitData.vocab[quizIndex].meaning ? 1 : 0);
      const percentage = Math.round((finalScore / currentUnitData.vocab.length) * 100);
      const reward = getQuizReward(percentage);
      const totalExp = scoringConfig.unitBaseExp + reward.exp;
      
      setUnitExp(totalExp);
      saveCompleted(currentUnitData.id);
      setMode('result');
    }
  };

  const backToMenu = () => {
    setMode('menu');
    setFlippedCards(new Set());
  };

  // 選單模式
  if (mode === 'menu') {
    return (
      <div className="min-h-screen bg-[#F5F5F0] pb-20">
        {/* 頂部導航 */}
        <div className="bg-white border-b border-[#E5E5E5] px-4 py-6 sticky top-0 z-50">
          <div className="max-w-lg mx-auto">
            <Link href="/learn" className="text-[#8C8C8C] text-sm mb-2 inline-block">
              ← 返回課程列表
            </Link>
            <h1 className="text-2xl font-normal text-[#4A4A4A] mb-1">第1課：初次見面</h1>
            <p className="text-sm text-[#8C8C8C]">選擇微單元開始學習</p>
            
            {/* 廣東話諧音開關 */}
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
                <span className={`w-8 h-4 rounded-full relative transition-colors ${showCantonese ? 'bg-white/30' : 'bg-[#E0E0E0]'}`}>
                  <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${showCantonese ? 'left-[18px]' : 'left-0.5'}`} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 單元列表 */}
        <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
          {lesson1Data.units.map((unit, index) => {
            const isCompleted = completedUnits.has(getUnitProgressKey(lesson1Data.id, unit.id));
            
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
                  {isCompleted ? (
                    <span className="text-2xl">✓</span>
                  ) : (
                    <span className="text-sm text-[#C4B9AC]">{unit.vocab.length}詞</span>
                  )}
                </div>
                
                {/* 預覽詞彙 */}
                <div className="flex gap-2 mt-3">
                  {unit.vocab.slice(0, 3).map((v, i) => (
                    <span key={i} className="text-xs bg-[#F5F5F0] px-2 py-1 rounded text-[#8C8C8C]">
                      {showCantonese && v.cantonese ? v.cantonese : v.hiragana}
                    </span>
                  ))}
                </div>

                {/* 內容標籤 */}
                <div className="flex gap-2 mt-3">
                  <span className="text-xs px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded">詞彙</span>
                  {unit.grammar && <span className="text-xs px-2 py-0.5 bg-[#F3E5F5] text-[#7B1FA2] rounded">文法</span>}
                  {unit.listening && <span className="text-xs px-2 py-0.5 bg-[#E8F5E9] text-[#388E3C] rounded">聽力</span>}
                  {unit.dialogue && <span className="text-xs px-2 py-0.5 bg-[#FFF3E0] text-[#F57C00] rounded">對話</span>}
                </div>
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
        {/* 頂部導航 */}
        <div className="bg-white border-b border-[#E5E5E5] px-4 py-3 sticky top-0 z-50">
          <div className="max-w-lg mx-auto flex justify-between items-center">
            <button onClick={backToMenu} className="text-[#8C8C8C] text-sm">← 返回</button>
            <div className="text-center">
              <span className="text-sm text-[#4A4A4A]">{currentUnitData.title}</span>
              <span className="text-xs text-[#8C8C8C] ml-2">單元 {currentUnitData.id}/4</span>
            </div>
            <button 
              onClick={startQuiz} 
              className="text-sm bg-[#C4B9AC] text-white px-3 py-1.5 rounded-full"
            >
              測驗 →
            </button>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6">
          {/* 文法點 */}
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

          {/* 詞彙卡片 */}
          <p className="text-center text-sm text-[#8C8C8C] mb-4">
            👆 撳卡片睇答案 • 再撳聽發音
          </p>
          
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
                  {/* 正面 */}
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

                  {/* 背面 */}
                  <div 
                    className="absolute inset-0 bg-[#FAF8F5] rounded-lg shadow-sm border border-[#E0D5C7] flex flex-col items-center justify-center p-3"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-lg text-[#4A4A4A] mb-1">{word.kanji}</span>
                    <span className="text-base text-[#4A4A4A] font-medium text-center mb-1">
                      {word.meaning}
                    </span>
                    {word.note && (
                      <span className="text-xs text-[#8C8C8C]">{word.note}</span>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* 情境對話 */}
          {currentUnitData.dialogue && (
            <div className="mt-6 bg-white rounded-xl p-4 border border-[#E8E8E8]">
              <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">💬 情境對話</h3>
              {currentUnitData.dialogue.map((d, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-medium text-[#C4B9AC] w-12 shrink-0">{d.speaker}</span>
                    <div className="flex-1">
                      <p className="text-sm text-[#4A4A4A]">{d.japanese}</p>
                      {showCantonese && d.cantonese && (
                        <p className="text-xs text-[#C4B9AC]">{d.cantonese}</p>
                      )}
                      <p className="text-xs text-[#8C8C8C]">{d.meaning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 聽力練習 */}
          {currentUnitData.listening && (
            <div className="mt-6 bg-[#E8F5E9] rounded-xl p-4 border border-[#A5D6A7]">
              <h3 className="text-sm font-medium text-[#2E7D32] mb-2">🎧 {currentUnitData.listening.title}</h3>
              <p className="text-sm text-[#4A4A4A] mb-2">{currentUnitData.listening.audioScript}</p>
              <p className="text-xs text-[#8C8C8C] mb-2">{currentUnitData.listening.translation}</p>
              <div className="flex flex-wrap gap-2">
                {currentUnitData.listening.keyPhrases.map((phrase, i) => (
                  <span key={i} className="text-xs bg-white px-2 py-1 rounded text-[#388E3C]">{phrase}</span>
                ))}
              </div>
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
          {/* 進度條 */}
          <div className="h-2 bg-[#E5E5E5] rounded-full mb-6 overflow-hidden">
            <div className="h-full bg-[#C4B9AC] rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>

          {/* 題目 */}
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

          {/* 選項 */}
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

          {/* 反饋 */}
          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-white rounded-lg border-l-4 border-[#C4B9AC]"
              >
                <p className="text-sm text-[#4A4A4A]">
                  {selectedOption === currentWord.meaning ? (
                    '✓ 正確！'
                  ) : (
                    <>正確答案：<strong>{currentWord.kanji}</strong>（{currentWord.meaning}）</>
                  )}
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
    const totalQuestions = currentUnitData.vocab.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const reward = getQuizReward(percentage);
    const isNewCompletion = !completedUnits.has(getUnitProgressKey(lesson1Data.id, currentUnitData.id));
    
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-sm w-full text-center border border-[#E8E8E8]"
        >
          {/* 分數圓環 */}
          <div className="w-24 h-24 rounded-full border-4 border-[#C4B9AC] flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-[#4A4A4A]">{percentage}%</span>
          </div>
          
          <h3 className="text-xl text-[#4A4A4A] mb-2">
            {reward.label}
          </h3>
          
          {/* 星星評級 */}
          <div className="flex justify-center gap-2 mb-3">
            {[1, 2, 3].map((star) => (
              <span 
                key={star} 
                className={`text-2xl ${star <= reward.stars ? 'text-[#FFC107]' : 'text-[#E0E0E0]'}`}
              >
                ⭐
              </span>
            ))}
          </div>
          
          <p className="text-sm text-[#8C8C8C] mb-2">
            {currentUnitData.title} • {score}/{totalQuestions} 正確
          </p>

          {/* 經驗值獲得 */}
          {isNewCompletion && (
            <div className="bg-[#FFF8E1] rounded-lg p-3 mb-4">
              <p className="text-sm text-[#4A4A4A]">
                🎉 獲得 <span className="font-bold text-[#C4B9AC]">+{unitExp} EXP</span>
              </p>
              <p className="text-xs text-[#8C8C8C]">
                單元完成 +{scoringConfig.unitBaseExp} | 測驗獎勵 +{unitExp - scoringConfig.unitBaseExp}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <button
              onClick={backToMenu}
              className="w-full py-3 bg-[#C4B9AC] text-white rounded-lg"
            >
              返回單元列表
            </button>
            {percentage < 80 && (
              <button
                onClick={() => {
                  setMode('study');
                  setFlippedCards(new Set());
                }}
                className="w-full py-3 border border-[#C4B9AC] text-[#C4B9AC] rounded-lg"
              >
                重新溫習
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}

// 主組件包裹在 Suspense 中
export default function Lesson1Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
        <div className="text-[#8C8C8C]">載入中...</div>
      </div>
    }>
      <Lesson1Content />
    </Suspense>
  );
}
