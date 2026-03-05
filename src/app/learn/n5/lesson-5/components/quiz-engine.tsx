/**
 * 測驗引擎主組件
 * Quiz Engine Component
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameQuestion } from '../game-data';
import { generateQuestionsForUnit, setLessonData } from '../question-generator';
import { SpeedMatchGame } from './speed-match-game';
import { AudioSelectGame } from './audio-select-game';
import { SentencePuzzleGame } from './sentence-puzzle-game';
import { VisualQuizGame } from './visual-quiz-game';
import { TrueFalseGame } from './true-false-game';
import { ClozeGame } from './cloze-game';
import { 
  GameHUD, 
  ComboDisplay, 
  triggerConfetti, 
  triggerErrorFlash,
  playCorrectSound,
  playWrongSound,
} from './game-feedback';

interface QuizEngineProps {
  unitId: number;
  onComplete: (result: QuizResult) => void;
  onExit: () => void;
  // 可選：外部數據傳入（用於第6-10課）
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lessonVocab?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getVocabByUnit?: (unitId: number) => any[];
}

export interface QuizResult {
  score: number;
  correctCount: number;
  totalQuestions: number;
  livesRemaining: number;
  combo: number;
  timeBonus: number;
}

export function QuizEngine({ unitId, onComplete, onExit, lessonVocab, getVocabByUnit }: QuizEngineProps) {
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [combo, setCombo] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCombo, setShowCombo] = useState(false);
  const [timeBonus, setTimeBonus] = useState(0);

  // 初始化題目
  useEffect(() => {
    // 使用 setTimeout 避免同步調用 setState
    const initTimer = setTimeout(() => {
      // 設置課程數據（如果提供了外部數據）
      if (lessonVocab && getVocabByUnit) {
        setLessonData(lessonVocab, getVocabByUnit);
      }
      const qs = generateQuestionsForUnit(unitId, 10);
      setQuestions(qs);
    }, 0);

    return () => clearTimeout(initTimer);
  }, [unitId, lessonVocab, getVocabByUnit]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = useCallback((correct: boolean) => {
    if (answered) return;
    
    setAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      // 正確答案
      playCorrectSound();
      setCombo(prev => prev + 1);
      setShowCombo(true);
      setTimeout(() => setShowCombo(false), 1500);
      
      // 分數計算：基礎分 + combo獎勵
      const baseScore = 10;
      const comboBonus = Math.min(combo, 5);
      const points = baseScore + comboBonus;
      setScore(prev => prev + points);
      
      triggerConfetti();
    } else {
      // 錯誤答案
      playWrongSound();
      triggerErrorFlash();
      setCombo(0);
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          // 生命歸零，結束測驗
          setTimeout(() => {
            onComplete({
              score,
              correctCount: currentIndex,
              totalQuestions: questions.length,
              livesRemaining: 0,
              combo: 0,
              timeBonus: 0,
            });
          }, 1000);
        }
        return newLives;
      });
    }

    // 自動下一題
    setTimeout(() => {
      if (currentIndex < questions.length - 1 && lives > 1) {
        setCurrentIndex(prev => prev + 1);
        setAnswered(false);
        setIsCorrect(false);
      } else if (currentIndex >= questions.length - 1 || lives <= 1) {
        // 測驗完成
        onComplete({
          score: correct ? score + 10 + Math.min(combo, 5) : score,
          correctCount: correct ? currentIndex + 1 : currentIndex,
          totalQuestions: questions.length,
          livesRemaining: correct ? lives : lives - 1,
          combo: correct ? combo + 1 : combo,
          timeBonus: 0,
        });
      }
    }, 1500);
  }, [answered, combo, score, currentIndex, questions.length, lives, onComplete]);

  const handleTimeUp = useCallback(() => {
    if (answered) return;
    handleAnswer(false);
  }, [answered, handleAnswer]);

  const handleSpeedMatchComplete = useCallback((matchScore: number, timeLeft: number) => {
    if (answered) return;
    
    setAnswered(true);
    const earnedScore = Math.floor(matchScore / 10);
    setScore(prev => prev + earnedScore);
    setTimeBonus(prev => prev + timeLeft * 5);
    
    // 根據分數判斷是否正確（暫時設定50分為及格線）
    const correct = matchScore >= 50;
    setIsCorrect(correct);
    
    if (correct) {
      playCorrectSound();
      setCombo(prev => prev + 1);
      triggerConfetti();
    } else {
      playWrongSound();
      triggerErrorFlash();
      setCombo(0);
      setLives(prev => prev - 1);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1 && lives > 1) {
        setCurrentIndex(prev => prev + 1);
        setAnswered(false);
      } else {
        onComplete({
          score: score + earnedScore,
          correctCount: correct ? currentIndex + 1 : currentIndex,
          totalQuestions: questions.length,
          livesRemaining: correct ? lives : lives - 1,
          combo: correct ? combo + 1 : combo,
          timeBonus: timeLeft * 5,
        });
      }
    }, 1500);
  }, [answered, score, currentIndex, questions.length, lives, combo, onComplete]);

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'speed-match':
        return (
          <SpeedMatchGame
            question={currentQuestion}
            onComplete={handleSpeedMatchComplete}
            onTimeUp={handleTimeUp}
          />
        );
      case 'audio-select':
        return (
          <AudioSelectGame
            question={currentQuestion}
            onAnswer={handleAnswer}
            answered={answered}
          />
        );
      case 'sentence-puzzle':
        return (
          <SentencePuzzleGame
            question={currentQuestion}
            onAnswer={handleAnswer}
            answered={answered}
          />
        );
      case 'visual-quiz':
        return (
          <VisualQuizGame
            question={currentQuestion}
            onAnswer={handleAnswer}
            answered={answered}
          />
        );
      case 'true-false':
        return (
          <TrueFalseGame
            question={currentQuestion}
            onComplete={(correct) => {
              if (correct) {
                handleAnswer(true);
              } else {
                handleAnswer(false);
              }
            }}
          />
        );
      case 'cloze':
        return (
          <ClozeGame
            question={currentQuestion}
            onAnswer={handleAnswer}
            answered={answered}
          />
        );
      default:
        return null;
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-[#8C8C8C]">載入題目中...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Combo 顯示 */}
      {showCombo && <ComboDisplay combo={combo} />}

      {/* HUD */}
      <GameHUD
        currentQuestion={currentIndex + 1}
        totalQuestions={questions.length}
        score={score}
        lives={lives}
        combo={combo}
      />

      {/* 題目區域 */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderQuestion()}
          </motion.div>
        </AnimatePresence>

        {/* 答案反饋 */}
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 text-center p-4 rounded-xl ${
              isCorrect ? 'bg-[#A8B5A0]/20' : 'bg-[#B8A8A0]/20'
            }`}
          >
            <div className={`text-2xl font-bold ${isCorrect ? 'text-[#A8B5A0]' : 'text-[#B8A8A0]'}`}>
              {isCorrect ? '✓ 正確！' : '✗ 錯誤'}
            </div>
            {!isCorrect && lives > 0 && (
              <div className="text-[#8C8C8C] mt-2">生命 -1，繼續加油！</div>
            )}
          </motion.div>
        )}

        {/* 退出按鈕 */}
        <div className="mt-8 text-center">
          <button
            onClick={onExit}
            className="text-[#8C8C8C] hover:text-[#4A4A4A] text-sm underline"
          >
            退出測驗
          </button>
        </div>
      </div>
    </div>
  );
}
