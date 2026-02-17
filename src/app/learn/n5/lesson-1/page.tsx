'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 第1課：4個微單元（每單元10-11詞，3分鐘完成）
const lessonData = [
  {
    id: 1,
    title: "人稱與稱呼",
    subtitle: "自我介绍的第一步",
    vocab: [
      { hiragana: "わたし", kanji: "私", meaning: "我", note: "女性常用" },
      { hiragana: "あなた", kanji: "貴方", meaning: "你/您", note: "禮貌說法" },
      { hiragana: "あのひと", kanji: "あの人", meaning: "他/她/那個人", note: "口語" },
      { hiragana: "あのかた", kanji: "あの方", meaning: "那一位", note: "敬語" },
      { hiragana: "～さん", kanji: "～さん", meaning: "先生/女士", note: "尊稱" },
      { hiragana: "～ちゃん", kanji: "～ちゃん", meaning: "小～", note: "對小孩或親暱稱呼" },
      { hiragana: "～じん", kanji: "～人", meaning: "～人", note: "國籍" },
      { hiragana: "せんせい", kanji: "先生", meaning: "老師", note: "稱呼他人" },
      { hiragana: "きょうし", kanji: "教師", meaning: "教師", note: "職業名稱" },
      { hiragana: "がくせい", kanji: "学生", meaning: "學生", note: "" }
    ]
  },
  {
    id: 2,
    title: "職業與場所",
    subtitle: "工作場合用語",
    vocab: [
      { hiragana: "かいしゃいん", kanji: "会社員", meaning: "公司職員", note: "" },
      { hiragana: "しゃいん", kanji: "社員", meaning: "～公司職員", note: "前面加公司名" },
      { hiragana: "ぎんこういん", kanji: "銀行員", meaning: "銀行行員", note: "" },
      { hiragana: "いしゃ", kanji: "医者", meaning: "醫生", note: "" },
      { hiragana: "けんきゅうしゃ", kanji: "研究者", meaning: "研究人員", note: "" },
      { hiragana: "だいがく", kanji: "大学", meaning: "大學", note: "" },
      { hiragana: "びょういん", kanji: "病院", meaning: "醫院", note: "" },
      { hiragana: "だれ", kanji: "誰", meaning: "誰", note: "口語" },
      { hiragana: "どなた", kanji: "何方", meaning: "哪位", note: "敬語" },
      { hiragana: "なんさい", kanji: "何歳", meaning: "幾歲", note: "問年齡" },
      { hiragana: "おいくつ", kanji: "お幾つ", meaning: "多大歲數", note: "禮貌問法" }
    ]
  },
  {
    id: 3,
    title: "初次見面",
    subtitle: "基本禮貌會話",
    vocab: [
      { hiragana: "はじめまして", kanji: "初めまして", meaning: "初次見面", note: "見面必說" },
      { hiragana: "～からきました", kanji: "～から来ました", meaning: "從～來的", note: "來自..." },
      { hiragana: "よろしくおねがいします", kanji: "よろしくお願いします", meaning: "請多關照", note: "結束語" },
      { hiragana: "しつれいですが", kanji: "失礼ですが", meaning: "對不起/請問", note: "打斷別人時" },
      { hiragana: "おなまえは", kanji: "お名前は", meaning: "您貴姓？", note: "問名字" },
      { hiragana: "こちらは～さんです", kanji: "こちらは～さんです", meaning: "這位是～", note: "介紹他人" },
      { hiragana: "はい", kanji: "はい", meaning: "是/對", note: "" },
      { hiragana: "いいえ", kanji: "いいえ", meaning: "不/不是", note: "" },
      { hiragana: "あ", kanji: "あ", meaning: "啊", note: "驚訝時" },
      { hiragana: "～さい", kanji: "～歳", meaning: "～歲", note: "數字+歳" }
    ]
  },
  {
    id: 4,
    title: "國家名稱",
    subtitle: "來自哪裡？",
    vocab: [
      { hiragana: "アメリカ", kanji: "America", meaning: "美國", note: "" },
      { hiragana: "イギリス", kanji: "UK", meaning: "英國", note: "" },
      { hiragana: "にほん", kanji: "日本", meaning: "日本", note: "" },
      { hiragana: "かんこく", kanji: "韓国", meaning: "韓國", note: "" },
      { hiragana: "ちゅうごく", kanji: "中国", meaning: "中國", note: "" },
      { hiragana: "フランス", kanji: "France", meaning: "法國", note: "" },
      { hiragana: "ドイツ", kanji: "Germany", meaning: "德國", note: "" },
      { hiragana: "タイ", kanji: "Thailand", meaning: "泰國", note: "" },
      { hiragana: "インド", kanji: "India", meaning: "印度", note: "" },
      { hiragana: "ブラジル", kanji: "Brazil", meaning: "巴西", note: "" }
    ]
  }
];

export default function Lesson1Page() {
  const [currentUnit, setCurrentUnit] = useState(0);
  const [mode, setMode] = useState<'menu' | 'study' | 'quiz' | 'result'>('menu');
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [completedUnits, setCompletedUnits] = useState<Set<number>>(new Set());
  const [unitProgress, setUnitProgress] = useState<number[]>([0, 0, 0, 0]);

  const currentUnitData = lessonData[currentUnit];

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
      // 完成單元
      const newCompleted = new Set(completedUnits);
      newCompleted.add(currentUnit);
      setCompletedUnits(newCompleted);
      
      const newProgress = [...unitProgress];
      newProgress[currentUnit] = Math.round((score + (selectedOption === currentUnitData.vocab[quizIndex].meaning ? 1 : 0)) / currentUnitData.vocab.length * 100);
      setUnitProgress(newProgress);
      
      setMode('result');
    }
  };

  const backToMenu = () => {
    setMode('menu');
    setFlippedCards(new Set());
  };

  if (mode === 'menu') {
    return (
      <div className="min-h-screen bg-[#F5F5F0] pb-20">
        <div className="bg-white border-b border-[#E5E5E5] px-4 py-6 sticky top-0 z-50">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-normal text-[#4A4A4A] mb-1">第1課：初次見面</h1>
            <p className="text-sm text-[#8C8C8C]">大家的日本語 • 分4個微單元學習</p>
            
            {/* 總進度條 */}
            <div className="mt-4 flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`flex-1 h-2 rounded-full ${completedUnits.has(i) ? 'bg-[#A8B5A0]' : 'bg-[#E5E5E5]'}`} />
              ))}
            </div>
            <p className="text-xs text-[#8C8C8C] mt-2 text-right">
              已完成 {completedUnits.size}/4 單元
            </p>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
          {lessonData.map((unit, index) => (
            <motion.button
              key={unit.id}
              onClick={() => startStudy(index)}
              className="w-full bg-white rounded-xl p-5 border border-[#E8E8E8] text-left relative overflow-hidden"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs text-[#C4B9AC] tracking-wider">UNIT 0{unit.id}</span>
                  <h3 className="text-lg text-[#4A4A4A] mt-1">{unit.title}</h3>
                  <p className="text-sm text-[#8C8C8C]">{unit.subtitle}</p>
                </div>
                {completedUnits.has(index) ? (
                  <span className="text-2xl">✓</span>
                ) : (
                  <span className="text-sm text-[#C4B9AC]">{unit.vocab.length}詞</span>
                )}
              </div>
              
              <div className="flex gap-2 mt-3">
                {unit.vocab.slice(0, 4).map((v, i) => (
                  <span key={i} className="text-xs bg-[#F5F5F0] px-2 py-1 rounded text-[#8C8C8C]">
                    {v.hiragana}
                  </span>
                ))}
                {unit.vocab.length > 4 && (
                  <span className="text-xs text-[#C4B9AC] px-1">+{unit.vocab.length - 4}</span>
                )}
              </div>
              
              {completedUnits.has(index) && (
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#F0F5F0] rounded-bl-full opacity-50" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'study') {
    return (
      <div className="min-h-screen bg-[#F5F5F0] pb-20">
        <div className="bg-white border-b border-[#E5E5E5] px-4 py-3 sticky top-0 z-50 flex justify-between items-center">
          <button onClick={backToMenu} className="text-[#8C8C8C] text-sm">← 返回</button>
          <span className="text-sm text-[#4A4A4A]">單元 {currentUnit + 1}/4</span>
          <button 
            onClick={startQuiz} 
            className="text-sm bg-[#C4B9AC] text-white px-3 py-1.5 rounded-full"
          >
            測驗 →
          </button>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6">
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
                  <div className="absolute inset-0 bg-white rounded-lg shadow-sm border border-[#E8E8E8] flex flex-col items-center justify-center p-3 backface-hidden">
                    <span className="text-2xl text-[#4A4A4A]" style={{ fontFamily: 'Noto Sans JP' }}>
                      {word.hiragana}
                    </span>
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
        </div>
      </div>
    );
  }

  if (mode === 'quiz') {
    const currentWord = currentUnitData.vocab[quizIndex];
    return (
      <div className="min-h-screen bg-[#F5F5F0] pb-20">
        <div className="bg-white border-b border-[#E5E5E5] px-4 py-3 sticky top-0 z-50">
          <div className="max-w-lg mx-auto flex justify-between items-center">
            <span className="text-sm text-[#8C8C8C]">測驗模式</span>
            <span className="text-sm text-[#4A4A4A]">{quizIndex + 1}/{currentUnitData.vocab.length}</span>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="h-1 bg-[#E5E5E5] rounded-full mb-6 overflow-hidden">
            <div 
              className="h-full bg-[#C4B9AC] transition-all duration-300"
              style={{ width: `${((quizIndex + 1) / currentUnitData.vocab.length) * 100}%` }}
            />
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E8E8E8] text-center mb-6">
            <div className="text-5xl text-[#4A4A4A] mb-2" style={{ fontFamily: 'Noto Sans JP' }}>
              {currentWord.hiragana}
            </div>
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
                  {selectedOption === currentWord.meaning ? (
                    '✓ 正確！'
                  ) : (
                    <>正確答案：<strong>{currentWord.kanji}</strong>（{currentWord.meaning}）</>
                  )}
                </p>
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

  if (mode === 'result') {
    const percentage = Math.round((score / currentUnitData.vocab.length) * 100);
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-sm w-full text-center border border-[#E8E8E8]"
        >
          <div className="w-24 h-24 rounded-full border-4 border-[#C4B9AC] flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-[#4A4A4A]">{percentage}%</span>
          </div>
          
          <h3 className="text-xl text-[#4A4A4A] mb-2">
            {percentage >= 80 ? '完成！🎉' : percentage >= 60 ? '及格！👍' : '再試一次 💪'}
          </h3>
          
          <p className="text-sm text-[#8C8C8C] mb-6">
            {currentUnitData.title} • {score}/{currentUnitData.vocab.length} 正確
          </p>

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
