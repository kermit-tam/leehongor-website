'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MathBroAvatar } from './components/MathBroAvatar';
import { AnswerButtons } from './components/AnswerButtons';
import { useMathBroSpeech } from './hooks/use-speech';
import { useBackgroundMusic } from './hooks/use-background-music';
import { useSound } from './hooks/use-sound';
import { 
  generateQuestion, 
  TOPICS,
  GRADES,
  getTopicsForGrade,
  MathTopic, 
  Grade,
  Question 
} from './data/question-bank';
import Link from 'next/link';

// 遊戲狀態
type GameState = 
  | 'welcome'      // 歡迎畫面
  | 'intro'        // 自我介紹
  | 'ask-name'     // 問名字
  | 'ask-grade'    // 問年級
  | 'ask-math-love' // 問喜不喜歡數學
  | 'select-speed' // 選擇語速
  | 'select-topic' // 選擇題型
  | 'playing'      // 遊戲中
  | 'feedback'     // 答題反饋
  | 'summary';     // 總結

export default function MathBroPage() {
  // 遊戲狀態
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [selectedTopic, setSelectedTopic] = useState<MathTopic | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [broEmotion, setBroEmotion] = useState<'normal' | 'happy' | 'thinking' | 'encouraging'>('normal');
  const [showHint, setShowHint] = useState(false);
  const [retryCount, setRetryCount] = useState(0); // 重試次數
  
  // 用戶資料
  const [userName, setUserName] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');
  const [userGrade, setUserGrade] = useState<Grade | null>(null);
  const [likesMath, setLikesMath] = useState<boolean | null>(null);
  const [speechRate, setSpeechRate] = useState<'slow' | 'normal' | 'fast'>('normal');

  // 語音鉤子（傳入用戶名字、語速和年級）
  const { 
    intro,
    greetWithName,
    askGrade,
    askMathLove,
    askSpeed,
    askTopic, 
    askQuestion, 
    correct, 
    wrong, 
    giveHint, 
    summary,
    isSpeaking,
    stop 
  } = useMathBroSpeech(userName, speechRate, userGrade || '');

  // 背景音樂鉤子
  const { isMuted: isMusicMuted, toggle: toggleMusic } = useBackgroundMusic();

  // 音效鉤子
  const { playCorrect, playWrong, playHint, playComplete } = useSound();

  // 用戶點擊開始後才播放自我介紹
  const handleStartIntro = useCallback(() => {
    setGameState('intro');
    setTimeout(() => {
      intro(() => {
        setTimeout(() => setGameState('ask-name'), 500);
      });
    }, 300);
  }, [intro]);

  // 處理提交名字
  const handleSubmitName = useCallback(() => {
    if (nameInput.trim()) {
      const name = nameInput.trim();
      setUserName(name);
      greetWithName(name, () => {
        setTimeout(() => setGameState('ask-grade'), 500);
      });
    }
  }, [nameInput, greetWithName]);

  // 選擇年級
  const handleSelectGrade = useCallback((grade: Grade) => {
    setUserGrade(grade);
    setGameState('ask-math-love');
    setTimeout(() => askMathLove(), 300);
  }, [askMathLove]);

  // 選擇喜不喜歡數學
  const handleSelectMathLove = useCallback((likes: boolean) => {
    setLikesMath(likes);
    setGameState('select-speed');
    setTimeout(() => askSpeed(), 300);
  }, [askSpeed]);

  // 選擇語速
  const handleSelectSpeed = useCallback((speed: 'slow' | 'normal' | 'fast') => {
    setSpeechRate(speed);
    setGameState('select-topic');
    // 延遲一下讓語速設置生效
    setTimeout(() => askTopic(), 800);
  }, [askTopic]);

  // 選擇題型
  const handleSelectTopic = useCallback((topic: MathTopic) => {
    setSelectedTopic(topic);
    const question = generateQuestion(topic, userGrade!, 1);
    setCurrentQuestion(question);
    setQuestionNumber(1);
    setScore(0);
    setMistakes([]);
    setGameState('playing');
    
    setTimeout(() => {
      askQuestion(question.questionText);
    }, 500);
  }, [userGrade, askQuestion]);

  // 回答問題
  const handleAnswer = useCallback((answer: number) => {
    if (!currentQuestion || showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === currentQuestion.correctAnswer;

    if (isCorrect) {
      // 答啱：播放音效、加分、讚佢
      playCorrect();
      setScore(s => s + 1);
      setBroEmotion('happy');
      correct(() => {
        setTimeout(() => nextQuestion(), 1500);
      });
    } else {
      // 答錯：播放音效、顯示錯誤
      playWrong();
      setBroEmotion('encouraging');
      wrong('唔啱呀，再試過！', () => {
        // 唔自動跳下一題，俾佢再試
      });
    }
  }, [currentQuestion, showResult, correct, wrong, playCorrect, playWrong]);

  // 再試一次（答錯後）
  const handleRetry = useCallback(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setRetryCount(c => c + 1);
    setBroEmotion('normal');
    // 如果重試超過2次，顯示提示
    if (retryCount >= 1) {
      setShowHint(true);
      playHint();
    }
  }, [retryCount, playHint]);

  // 顯示答案並去下一題（放棄重試）
  const handleShowAnswer = useCallback(() => {
    if (!currentQuestion) return;
    setMistakes(m => [...m, currentQuestion]);
    setShowHint(true);
    giveHint(currentQuestion.explanation);
    // 3秒後自動去下一題
    setTimeout(() => nextQuestion(), 4000);
  }, [currentQuestion, giveHint]);

  // 下一題
  const nextQuestion = useCallback(() => {
    setQuestionNumber(prevNum => {
      if (prevNum >= 10) {
        setGameState('summary');
        setTimeout(() => {
          setScore(currentScore => {
            summary(currentScore, 10);
            return currentScore;
          });
        }, 100);
        return prevNum;
      } else {
        const nextNum = prevNum + 1;
        const question = generateQuestion(selectedTopic!, userGrade!, nextNum);
        setCurrentQuestion(question);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowHint(false);
        setBroEmotion('normal');
        
        setTimeout(() => {
          askQuestion(question.questionText);
        }, 500);
        return nextNum;
      }
    });
  }, [selectedTopic, userGrade, summary, askQuestion]);

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
    setUserName('');
    setNameInput('');
    setUserGrade(null);
    setLikesMath(null);
    setSpeechRate('normal');
  }, []);

  // 獲取適合該年級的主題
  const availableTopics = userGrade ? getTopicsForGrade(userGrade) : [];

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
          {/* 歡迎畫面 */}
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
              <p className="text-white/70 mt-4 mb-8">準備好未？一齊學數學啦！</p>
              
              <motion.button
                onClick={handleStartIntro}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-xl shadow-lg"
              >
                開始 🚀
              </motion.button>
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
                  下一步 👉
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* 問年級 */}
          {gameState === 'ask-grade' && (
            <motion.div
              key="ask-grade"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <MathBroAvatar isSpeaking={isSpeaking} emotion="happy" size="sm" />
                <p className="text-lg text-gray-700">哈囉{nameInput}！你讀緊幾多年班呀？</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {GRADES.map((grade) => (
                  <motion.button
                    key={grade.id}
                    onClick={() => handleSelectGrade(grade.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl text-center hover:shadow-md transition-shadow"
                  >
                    <span className="text-2xl">{grade.emoji}</span>
                    <p className="font-bold text-gray-800 mt-1">{grade.name}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* 問喜不喜歡數學 */}
          {gameState === 'ask-math-love' && (
            <motion.div
              key="ask-math-love"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <MathBroAvatar isSpeaking={isSpeaking} emotion="happy" size="sm" />
                <p className="text-lg text-gray-700">{nameInput}，你鍾唔鍾意數學呀？</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={() => handleSelectMathLove(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-6 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-2xl text-center shadow-lg"
                >
                  <span className="text-4xl">😍</span>
                  <p className="font-bold text-lg mt-2">鍾意！</p>
                </motion.button>
                <motion.button
                  onClick={() => handleSelectMathLove(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-6 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-2xl text-center shadow-lg"
                >
                  <span className="text-4xl">😐</span>
                  <p className="font-bold text-lg mt-2">一般般</p>
                </motion.button>
              </div>
              
              {likesMath === false && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-purple-600 mt-4 text-sm"
                >
                  唔緊要！數學BRO會令數學變得有趣！✨
                </motion.p>
              )}
            </motion.div>
          )}

          {/* 選擇語速 */}
          {gameState === 'select-speed' && (
            <motion.div
              key="select-speed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <MathBroAvatar isSpeaking={isSpeaking} emotion="happy" size="sm" />
                <p className="text-lg text-gray-700">你想我講嘢快定慢呀？</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'slow', name: '慢慢講', desc: '清楚易明', emoji: '🐢' },
                  { id: 'normal', name: '正常', desc: '剛剛好', emoji: '🚶' },
                  { id: 'fast', name: '快啲講', desc: '節奏明快', emoji: '🏃' },
                ].map((speed) => (
                  <motion.button
                    key={speed.id}
                    onClick={() => handleSelectSpeed(speed.id as 'slow' | 'normal' | 'fast')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-2xl shadow-lg flex items-center gap-4"
                  >
                    <span className="text-3xl">{speed.emoji}</span>
                    <div className="text-left">
                      <div className="font-bold text-lg">{speed.name}</div>
                      <div className="text-white/80 text-sm">{speed.desc}</div>
                    </div>
                  </motion.button>
                ))}
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
                {availableTopics.map((topic) => (
                  <motion.button
                    key={topic.id}
                    onClick={() => handleSelectTopic(topic.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl text-center hover:shadow-md transition-shadow"
                  >
                    <span className="text-3xl">{topic.emoji}</span>
                    <p className="font-bold text-gray-800 mt-2">{topic.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{topic.description}</p>
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
                    <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-4 h-4 bg-purple-100 rotate-45" />
                    <p className="text-2xl font-bold text-gray-800 text-center">
                      {currentQuestion.questionText}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* 視覺輔助 - 水果/手指/圓圈 */}
              {currentQuestion.visual?.type === 'fruits' && currentQuestion.visual.values[0] && (
                <div className="flex justify-center gap-2 mb-6 flex-wrap">
                  {Array.from({ length: currentQuestion.visual.values[0] }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-3xl"
                    >
                      {currentQuestion.visual?.labels?.[0] || '🍎'}
                    </motion.span>
                  ))}
                </div>
              )}
              
              {currentQuestion.visual?.type === 'fingers' && (
                <div className="flex justify-center gap-4 mb-6">
                  {currentQuestion.visual.values.map((count, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="flex flex-wrap gap-1 justify-center w-20">
                        {Array.from({ length: count }).map((_, i) => (
                          <motion.span
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="text-2xl"
                          >
                            👆
                          </motion.span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 mt-1">{count}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {currentQuestion.visual?.type === 'circles' && (
                <div className="flex justify-center gap-4 mb-6">
                  {currentQuestion.visual.values.map((count, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="flex flex-wrap gap-1 justify-center w-24">
                        {Array.from({ length: Math.min(count, 10) }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.03 }}
                            className="w-4 h-4 rounded-full bg-purple-400"
                          />
                        ))}
                        {count > 10 && <span className="text-sm text-gray-500">+{count - 10}</span>}
                      </div>
                      <span className="text-sm text-gray-500 mt-1">{count}</span>
                    </div>
                  ))}
                </div>
              )}

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

              {/* 答錯後：再試 / 睇答案 按鈕 */}
              {showResult && selectedAnswer !== currentQuestion.correctAnswer && (
                <div className="flex gap-3 mt-6 justify-center">
                  <motion.button
                    onClick={handleRetry}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-500 text-white rounded-2xl font-bold shadow-lg"
                  >
                    🔄 再試一次
                  </motion.button>
                  <motion.button
                    onClick={handleShowAnswer}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-orange-500 text-white rounded-2xl font-bold shadow-lg"
                  >
                    💡 睇答案
                  </motion.button>
                </div>
              )}

              {/* 提示按鈕（未答題時） */}
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

              <motion.button
                onClick={handleRestart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-lg"
              >
                再玩一次 🔄
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
