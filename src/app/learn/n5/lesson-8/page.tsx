'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 第八課：形容詞（N5）
const vocabData = [
  { hiragana: "たかい", kanji: "高い", romaji: "takai", meaning: "高的；貴的" },
  { hiragana: "やすい", kanji: "安い", romaji: "yasui", meaning: "便宜的" },
  { hiragana: "おもい", kanji: "重い", romaji: "omoi", meaning: "重的" },
  { hiragana: "かるい", kanji: "軽い", romaji: "karui", meaning: "輕的" },
  { hiragana: "ひろい", kanji: "広い", romaji: "hiroi", meaning: "寬敞的" },
  { hiragana: "せまい", kanji: "狭い", romaji: "semai", meaning: "狹窄的" },
  { hiragana: "あたたかい", kanji: "暖かい", romaji: "atatakai", meaning: "暖和的" },
  { hiragana: "すずしい", kanji: "涼しい", romaji: "suzushii", meaning: "涼爽的" },
  { hiragana: "あつい", kanji: "暑い", romaji: "atsui", meaning: "炎熱的" },
  { hiragana: "さむい", kanji: "寒い", romaji: "samui", meaning: "寒冷的" }
];

export default function Lesson8Page() {
  const [mode, setMode] = useState<'study' | 'quiz' | 'result'>('study');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [quizQuestions, setQuizQuestions] = useState<typeof vocabData>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    setQuizQuestions([...vocabData].sort(() => Math.random() - 0.5));
  }, []);

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      const voices = window.speechSynthesis.getVoices();
      const jpVoice = voices.find(v => v.lang.includes('ja'));
      if (jpVoice) utterance.voice = jpVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleCard = (index: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(index)) {
      newFlipped.delete(index);
    } else {
      newFlipped.add(index);
      playAudio(vocabData[index].hiragana);
    }
    setFlippedCards(newFlipped);
  };

  const checkAnswer = (selected: string) => {
    if (answered) return;
    const currentWord = quizQuestions[currentQuestion];
    const isCorrect = selected === currentWord.meaning;
    setSelectedOption(selected);
    setAnswered(true);
    if (isCorrect) setScore(score + 1);
    playAudio(currentWord.hiragana);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedOption(null);
    } else {
      setMode('result');
    }
  };

  const restartQuiz = () => {
    setQuizQuestions([...vocabData].sort(() => Math.random() - 0.5));
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setSelectedOption(null);
    setMode('quiz');
  };

  const generateOptions = (correctWord: typeof vocabData[0]) => {
    const wrongOptions = vocabData
      .filter(w => w.meaning !== correctWord.meaning)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.meaning);
    return [correctWord.meaning, ...wrongOptions].sort(() => Math.random() - 0.5);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] pb-20">
      {/* 頂部導航 */}
      <div className="bg-white border-b border-[#E5E5E5] px-4 py-3 sticky top-0 z-50 shadow-sm">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <h1 className="text-lg font-normal text-[#4A4A4A] tracking-wide">N5 第八課：形容詞</h1>
          <div className="flex bg-[#F0F0F0] rounded-full p-1 gap-1">
            <button
              onClick={() => setMode('study')}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                mode === 'study' 
                  ? 'bg-white text-[#4A4A4A] shadow-sm' 
                  : 'text-[#8C8C8C]'
              }`}
            >
              學習
            </button>
            <button
              onClick={() => setMode('quiz')}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                mode === 'quiz' || mode === 'result'
                  ? 'bg-white text-[#4A4A4A] shadow-sm' 
                  : 'text-[#8C8C8C]'
              }`}
            >
              測驗
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* 學習模式 */}
        {mode === 'study' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <p className="text-center text-sm text-[#8C8C8C] mb-4">
              撳卡片睇漢字同解釋
            </p>
            <div className="grid grid-cols-2 gap-3">
              {vocabData.map((word, index) => (
                <motion.div
                  key={index}
                  onClick={() => toggleCard(index)}
                  className="relative aspect-square cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="w-full h-full relative"
                    animate={{ rotateY: flippedCards.has(index) ? 180 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="absolute inset-0 bg-white rounded-lg shadow-sm border border-[#E8E8E8] flex flex-col items-center justify-center p-3">
                      <span className="text-3xl text-[#4A4A4A] font-medium">{word.hiragana}</span>
                      <span className="text-xs text-[#C4B9AC] mt-2">點擊睇答案</span>
                    </div>
                    <div 
                      className="absolute inset-0 bg-[#FAF8F5] rounded-lg shadow-sm border border-[#E0D5C7] flex flex-col items-center justify-center p-3"
                      style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                    >
                      <span className="text-xl text-[#4A4A4A] mb-1">{word.kanji}</span>
                      <span className="text-base text-[#4A4A4A] font-medium text-center mb-1">{word.meaning}</span>
                      <span className="text-xs text-[#8C8C8C]">{word.romaji}</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 測驗模式 */}
        {mode === 'quiz' && quizQuestions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="h-1 bg-[#E5E5E5] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#C4B9AC] transition-all"
                style={{ width: `${(currentQuestion / quizQuestions.length) * 100}%` }}
              />
            </div>
            <div className="text-right text-xs text-[#8C8C8C]">
              {currentQuestion + 1} / {quizQuestions.length}
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E8E8E8] text-center">
              <div className="text-sm text-[#C4B9AC] italic mb-2">{quizQuestions[currentQuestion].romaji}</div>
              <div className="text-5xl text-[#4A4A4A] font-medium">{quizQuestions[currentQuestion].hiragana}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {generateOptions(quizQuestions[currentQuestion]).map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => checkAnswer(option)}
                  disabled={answered}
                  className={`p-4 rounded-lg border-2 text-center text-sm font-medium transition-all ${
                    answered
                      ? option === quizQuestions[currentQuestion].meaning
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
                  className={`p-4 rounded-lg border-l-4 ${
                    selectedOption === quizQuestions[currentQuestion].meaning
                      ? 'bg-[#F0F5F0] border-l-[#A8B5A0]'
                      : 'bg-[#F5F0F0] border-l-[#C4B9AC]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedOption === quizQuestions[currentQuestion].meaning ? '✓' : '✕'}</span>
                    <div className="flex-1 text-sm text-[#4A4A4A]">
                      {selectedOption === quizQuestions[currentQuestion].meaning 
                        ? '正確！' 
                        : <>正確答案：<strong>{quizQuestions[currentQuestion].kanji}</strong>（{quizQuestions[currentQuestion].meaning}）</>
                      }
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {answered && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={nextQuestion}
                  className="w-full py-3.5 bg-[#8C8C8C] text-white rounded-lg text-base tracking-wider hover:bg-[#6B6B6B]"
                >
                  {currentQuestion === quizQuestions.length - 1 ? '看結果' : '下一題'}
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* 結果 */}
        {mode === 'result' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-32 h-32 rounded-full border-4 border-[#C4B9AC] flex items-center justify-center mx-auto mb-6 relative">
              <span className="text-4xl text-[#4A4A4A] font-light">{score}/{quizQuestions.length}</span>
              <span className="absolute -bottom-6 text-xs text-[#8C8C8C]">得分</span>
            </div>
            <p className="text-lg text-[#4A4A4A] mb-8">
              {score === 10 ? '完美！全對！' : score >= 8 ? '非常好！' : score >= 6 ? '及格了，再努力！' : '建議先溫習再試！'}
            </p>
            <div className="bg-white rounded-lg p-4 mb-6 text-left border border-[#E8E8E8]">
              <h3 className="text-sm text-[#8C8C8C] mb-3 font-normal">詞彙回顧</h3>
              <div className="space-y-2 text-sm">
                {vocabData.map((word, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-[#F0F0F0] last:border-0">
                    <span>{word.hiragana}（{word.kanji}）</span>
                    <span className="text-[#8C8C8C]">{word.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={restartQuiz}
              className="w-full max-w-xs py-3.5 bg-[#C4B9AC] text-white rounded-lg text-base tracking-wider hover:bg-[#B5A99D]"
            >
              再做一次
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
