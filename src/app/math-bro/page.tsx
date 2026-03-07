'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MathBroAvatar } from './components/MathBroAvatar';
import { AnswerButtons } from './components/AnswerButtons';
import { useMathBroSpeech } from './hooks/use-speech';
import { useBackgroundMusic } from './hooks/use-background-music';
import { 
  generateQuestion, 
  TOPICS, 
  MathTopic, 
  Difficulty,
  Question 
} from './data/question-bank';
import Link from 'next/link';

// 遊戲狀態
type GameState = 
  | 'welcome'      // 歡迎畫面
  | 'intro'        // 自我介紹
  | 'ask-name'     // 問名字
  | 'select-topic' // 選擇題型
  | 'select-difficulty' // 選擇難度
  | 'playing'      // 遊戲中
  | 'feedback'     // 答題反饋
  | 'summary';     // 總結

export default function MathBroPage() {
  // 遊戲狀態
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [selectedTopic, setSelectedTopic] = useState<MathTopic | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [broEmotion, setBroEmotion] = useState<'normal' | 'happy' | 'thinking' | 'encouraging'>('normal');
  const [showHint, setShowHint] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');

  // 語音鉤子（傳入用戶名字）
  const { 
    intro,
    welcome, 
    greetWithName,
    askTopic, 
    askDifficulty, 
    askQuestion, 
    correct, 
    wrong, 
    giveHint, 
    summary,
    encourage,
    isSpeaking,
    stop 
  } = useMathBroSpeech(userName);

  // 背景音樂鉤子
  const { isMuted: isMusicMuted, toggle: toggleMusic } = useBackgroundMusic();

  // 開始時播放自我介紹
  useEffect(() => {
    if (gameState === 'welcome') {
      // 先進入 intro 狀態，顯示 BRO 並播放自我介紹
      setTimeout(() => {
        setGameState('intro');
        intro(() => {
          setTimeout(() => setGameState('ask-name'), 500);
        });
      }, 500);
    }
  }, [gameState, intro]);

  // 處理提交名字
  const handleSubmitName = useCallback(() => {
    if (nameInput.trim()) {
      const name = nameInput.trim();
      setUserName(name);
      // 問候用戶
      greetWithName(name, () => {
        setTimeout(() => setGameState('select-topic'), 500);
      });
    }
  }, [nameInput, greetWithName]);

  // 選擇題型
  const handleSelectTopic = useCallback((topic: MathTopic) => {
    setSelectedTopic(topic);
    setGameState('select-difficulty');
    askDifficulty();
  }, [askDifficulty]);

  // 選擇難度並開始
  const handleStartGame = useCallback((difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    const question = generateQuestion(selectedTopic!, difficulty, 1);
    setCurrentQuestion(question);
    setQuestionNumber(1);
    setScore(0);
    setMistakes([]);
    setGameState('playing');
    
    setTimeout(() => {
      askQuestion(question.questionText);
    }, 500);
  }, [selectedTopic, askQuestion]);

  // 回答問題
  const handleAnswer = useCallback((answer: number) => {
    if (!currentQuestion || showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(s => s + 1);
      setBroEmotion('happy');
      correct(() => {
        setTimeout(() => nextQuestion(), 1500);
      });
    } else {
      setMistakes(m => [...m, currentQuestion]);
      setBroEmotion('encouraging');
      wrong(currentQuestion.explanation, () => {
        setTimeout(() => nextQuestion(), 3000);
      });
    }
  }, [currentQuestion, showResult, correct, wrong]);

  // 下一題
  const nextQuestion = useCallback(() => {
    if (questionNumber >= 10) {
      // 完咗
      setGameState('summary');
      summary(score + (selectedAnswer === currentQuestion?.correctAnswer ? 1 : 0), 10);
    } else {
      // 下一題
      const nextNum = questionNumber + 1;
      const question = generateQuestion(selectedTopic!, selectedDifficulty, nextNum);
      setCurrentQuestion(question);
      setQuestionNumber(nextNum);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
      setBroEmotion('normal');
      
      setTimeout(() => {
        askQuestion(question.questionText);
      }, 500);
    }
  }, [questionNumber, score, selectedAnswer, currentQuestion, selectedTopic, selectedDifficulty, summary, askQuestion]);

  // 顯示提示
  const handleShowHint = useCallback(() => {
    if (currentQuestion && !showHint) {
      setShowHint(true);
      setBroEmotion('thinking');
      giveHint(currentQuestion.hint);
    }
  }, [currentQuestion, showHint, giveHint]);

  // 重新開始
  const handleRestart = useCallback(() => {
    setGameState('welcome');
    setSelectedTopic(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
    setBroEmotion('normal');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 頂部導航 */}
        <div className="flex justify-between items-center mb-6">
          <Link 
            href="/" 
            className="text-white text-2xl hover:scale-110 transition-transform"
          >
            ←
          </Link>
          <h1 className="text-2xl font-bold text-white">數學BRO</h1>
          {/* 音樂切換按鈕 */}
          <motion.button
            onClick={toggleMusic}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            title={isMusicMuted ? '開啟背景音樂' : '關閉背景音樂'}
          >
            {isMusicMuted ? '🔇' : '🎵'}
          </motion.button>
        </div>

        {/* 主要內容 */}
        <AnimatePresence mode="wait">
          {/* 歡迎畫面 - 只顯示 BRO */}
          {gameState === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <MathBroAvatar isSpeaking={isSpeaking} emotion="happy" size="lg" />
              <motion.h2 
                className="text-3xl font-bold text-white mt-8"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                數學BRO
              </motion.h2>
              <p className="text-white/70 mt-4">準備好未？一齊學數學啦！</p>
            </motion.div>
          )}

          {/* 自我介紹 */}
          {gameState === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 shadow-2xl text-center"
            >
              <MathBroAvatar isSpeaking={isSpeaking} emotion="happy" size="lg" />
              <h2 className="text-2xl font-bold text-gray-800 mt-6">數學BROTHER</h2>
              <p className="text-gray-500 mt-2">你嘅數學好兄弟</p>
            </motion.div>
          )}

          {/* 問名字 */}
          {gameState === 'ask-name' && (
            <motion.div
              key="ask-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <MathBroAvatar isSpeaking={isSpeaking} emotion="happy" size="md" />
                <div className="flex-1">
                  <div className="bg-purple-100 rounded-2xl p-4 relative">
                    <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-4 h-4 bg-purple-100 rotate-45" />
                    <p className="text-lg text-gray-800">請問你叫咩名呀？😊</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="輸入你的名字..."
                  className="w-full p-4 text-xl text-center border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitName()}
                  autoFocus
                />
                <motion.button
                  onClick={handleSubmitName}
                  disabled={!nameInput.trim()}
                  whileHover={{ scale: nameInput.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: nameInput.trim() ? 0.98 : 1 }}
                  className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  開始學數學！🚀
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* 選擇題型 */}
          {gameState === 'select-topic' && (
            <motion.div
              key="select-topic"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-6 shadow-2xl"
            >
              {/* 顯示用戶名字問候 */}
              {userName && (
                <div className="text-center mb-4">
                  <span className="text-purple-600 font-medium">哈囉 {userName}！👋</span>
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-6">
                <MathBroAvatar emotion="normal" size="sm" />
                <p className="text-lg text-gray-700">今日想練乜嘢呀?</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {TOPICS.map((topic) => (
                  <motion.button
                    key={topic.id}
                    onClick={() => handleSelectTopic(topic.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-colors"
                  >
                    <div className="text-4xl mb-2">{topic.emoji}</div>
                    <div className="font-bold text-gray-800">{topic.name}</div>
                    <div className="text-sm text-gray-500">{topic.description}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* 選擇難度 */}
          {gameState === 'select-difficulty' && (
            <motion.div
              key="select-difficulty"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <MathBroAvatar emotion="thinking" size="sm" />
                <p className="text-lg text-gray-700">想由邊度開始?</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'easy', name: '簡單', desc: '輕鬆熱身', emoji: '🌱', color: 'from-green-400 to-green-500' },
                  { id: 'medium', name: '中等', desc: '挑戰自己', emoji: '🔥', color: 'from-orange-400 to-orange-500' },
                  { id: 'hard', name: '困難', desc: '高手對決', emoji: '👑', color: 'from-red-400 to-red-500' },
                ].map((diff) => (
                  <motion.button
                    key={diff.id}
                    onClick={() => handleStartGame(diff.id as Difficulty)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-5 bg-gradient-to-r ${diff.color} text-white rounded-2xl shadow-lg`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{diff.emoji}</span>
                      <div className="text-left">
                        <div className="font-bold text-xl">{diff.name}</div>
                        <div className="text-white/80">{diff.desc}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* 遊戲中 */}
          {gameState === 'playing' && currentQuestion && (
            <motion.div
              key={`playing-${currentQuestion.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-6 shadow-2xl"
            >
              {/* 進度 */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">題目 {questionNumber}/10</span>
                <span className="text-purple-600 font-bold">分數: {score}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${(questionNumber / 10) * 100}%` }}
                />
              </div>

              {/* BRO 同題目 */}
              <div className="flex items-center gap-4 mb-6">
                <MathBroAvatar 
                  isSpeaking={isSpeaking} 
                  emotion={broEmotion} 
                  size="md" 
                />
                <div className="flex-1">
                  <motion.div 
                    className="bg-purple-100 rounded-2xl p-4 relative"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                  >
                    {/* 對話框尾巴 */}
                    <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-4 h-4 bg-purple-100 rotate-45" />
                    <p className="text-2xl font-bold text-gray-800 text-center">
                      {currentQuestion.questionText}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* 提示 */}
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4"
                >
                  <p className="text-yellow-800">💡 {currentQuestion.hint}</p>
                </motion.div>
              )}

              {/* 答案按鈕 */}
              <AnswerButtons
                options={currentQuestion.options}
                onSelect={handleAnswer}
                disabled={showResult}
                selectedAnswer={selectedAnswer}
                correctAnswer={currentQuestion.correctAnswer}
                showResult={showResult}
              />

              {/* 提示按鈕 */}
              {!showResult && !showHint && (
                <motion.button
                  onClick={handleShowHint}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 mx-auto block px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
                >
                  💡 要比提示嗎?
                </motion.button>
              )}
            </motion.div>
          )}

          {/* 總結 */}
          {gameState === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-6 shadow-2xl text-center"
            >
              <MathBroAvatar emotion="happy" size="lg" />
              
              {userName && (
                <p className="text-purple-600 font-medium mt-4">{userName}，</p>
              )}
              <h2 className="text-3xl font-bold text-gray-800 mt-2">練習完成!</h2>
              
              <div className="my-8">
                <div className="text-6xl font-bold text-purple-600">
                  {score}/10
                </div>
                <p className="text-gray-500 mt-2">
                  {score === 10 ? '完美! 🎉' : 
                   score >= 8 ? '好勁! ⭐' : 
                   score >= 6 ? '唔錯! 👍' : '繼續加油! 💪'}
                </p>
              </div>

              {/* 錯題回顧 */}
              {mistakes.length > 0 && (
                <div className="bg-red-50 rounded-2xl p-4 mb-6 text-left">
                  <h3 className="font-bold text-red-600 mb-2">錯咗嘅題目:</h3>
                  {mistakes.map((m, i) => (
                    <p key={i} className="text-sm text-red-500">
                      {m.questionText.replace('?', '')} = {m.correctAnswer}
                    </p>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                <motion.button
                  onClick={handleRestart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg"
                >
                  再練過 🔄
                </motion.button>
                <Link 
                  href="/"
                  className="block w-full p-4 bg-gray-100 text-gray-600 rounded-2xl font-bold"
                >
                  返屋企 🏠
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
