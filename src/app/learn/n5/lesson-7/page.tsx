/**
 * 第7課：購物 - 遊戲化版本
 * Lesson 6: Food & Preferences - Gamified
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { UserService } from '@/lib/firestore';
import { 
  lesson7Vocab, 
  lesson7Units, 
  GameUnit, 
  getVocabByUnit,
  sentenceBlocks,
} from './game-data';
import { QuizEngine, QuizResult } from '../lesson-5/components/quiz-engine';
import { VocabFlashcard } from '../lesson-5/components/vocab-flashcard';
import { SentenceBuilder, SavedSentence } from '../lesson-5/components/sentence-builder';
import { triggerConfetti } from '../lesson-5/components/game-feedback';
import { usePWA } from '../lesson-5/hooks/use-pwa';

type Mode = 'menu' | 'study' | 'quiz' | 'builder';
type Tab = 'units' | 'progress' | 'sentences';

interface UnitProgress {
  unitId: number;
  completed: boolean;
  studyCompleted: boolean;
  quizCompleted: boolean;
  bestScore: number;
}

export default function Lesson6Page() {
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>('menu');
  const [activeTab, setActiveTab] = useState<Tab>('units');
  const [selectedUnit, setSelectedUnit] = useState<GameUnit | null>(null);
  const [showCantonese, setShowCantonese] = useState(true);
  
  const [unitProgress, setUnitProgress] = useState<UnitProgress[]>([]);
  const [savedSentences, setSavedSentences] = useState<SavedSentence[]>([]);
  const [totalExp, setTotalExp] = useState(0);
  
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const { isOffline, isInstallable, install, isInstalled } = usePWA();

  // 初始化
  useEffect(() => {
    const savedProgress = localStorage.getItem('lesson7-progress');
    if (savedProgress) {
      setUnitProgress(JSON.parse(savedProgress));
    } else {
      setUnitProgress(lesson7Units.map(u => ({
        unitId: u.id,
        completed: false,
        studyCompleted: false,
        quizCompleted: false,
        bestScore: 0,
      })));
    }

    const saved = localStorage.getItem('lesson7-sentences');
    if (saved) {
      setSavedSentences(JSON.parse(saved).map((s: any) => ({
        ...s,
        createdAt: new Date(s.createdAt),
      })));
    }

    const exp = localStorage.getItem('lesson7-exp');
    if (exp) {
      setTotalExp(parseInt(exp));
    }
  }, []);

  const saveProgress = useCallback((progress: UnitProgress[]) => {
    setUnitProgress(progress);
    localStorage.setItem('lesson7-progress', JSON.stringify(progress));
  }, []);

  const saveSentence = useCallback((sentence: SavedSentence) => {
    const updated = [...savedSentences, sentence];
    setSavedSentences(updated);
    localStorage.setItem('lesson7-sentences', JSON.stringify(updated));
    
    const newExp = totalExp + 5;
    setTotalExp(newExp);
    localStorage.setItem('lesson7-exp', newExp.toString());
  }, [savedSentences, totalExp]);

  const handleStudyComplete = useCallback(() => {
    if (!selectedUnit) return;

    const updated = unitProgress.map(p => 
      p.unitId === selectedUnit.id 
        ? { ...p, studyCompleted: true, completed: p.quizCompleted || p.completed }
        : p
    );
    saveProgress(updated);

    const newExp = totalExp + 10;
    setTotalExp(newExp);
    localStorage.setItem('lesson7-exp', newExp.toString());

    if (user?.uid) {
      UserService.updateUser(user.uid, {
        achievementExp: (user.achievementExp || 0) + 10,
      }).catch(console.error);
    }

    setMode('menu');
  }, [selectedUnit, unitProgress, totalExp, user, saveProgress]);

  const handleQuizComplete = useCallback((result: QuizResult) => {
    setQuizResult(result);
    setShowResult(true);

    if (!selectedUnit) return;

    const expEarned = Math.floor(result.score / 10) + result.timeBonus;
    const newExp = totalExp + expEarned;
    setTotalExp(newExp);
    localStorage.setItem('lesson7-exp', newExp.toString());

    const updated = unitProgress.map(p => {
      if (p.unitId === selectedUnit.id) {
        return {
          ...p,
          quizCompleted: true,
          completed: true,
          bestScore: Math.max(p.bestScore, result.score),
        };
      }
      return p;
    });
    saveProgress(updated);

    if (user?.uid) {
      UserService.updateUser(user.uid, {
        achievementExp: (user.achievementExp || 0) + expEarned,
      }).catch(console.error);
    }

    if (result.score >= 60) {
      triggerConfetti();
    }
  }, [selectedUnit, unitProgress, totalExp, user, saveProgress]);

  const completedCount = unitProgress.filter(p => p.completed).length;
  const progressPercent = (completedCount / lesson7Units.length) * 100;
  const unlockedUnits = unitProgress.filter(p => p.completed || p.unitId === 1 || 
    unitProgress.find(up => up.unitId === p.unitId - 1)?.completed
  ).length;

  // 渲染函數（與第5課相同）
  const renderMenu = () => (
    <div className="space-y-6">
      {/* 頂部資訊 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E5E5]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#4A4A4A] mb-1">第7課：購物</h1>
            <p className="text-[#8C8C8C]">服裝、顏色、購物對話</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#A8B5A0]">🎯 {totalExp}</div>
            <div className="text-sm text-[#8C8C8C]">EXP</div>
          </div>
        </div>
        
        {/* 進度條 */}
        <div className="flex justify-between text-sm text-[#8C8C8C] mb-2">
          <span>課程進度</span>
          <span>{completedCount}/{lesson7Units.length} 單元</span>
        </div>
        <div className="w-full h-3 bg-[#E5E5E5] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#A8B5A0] to-[#C4B9AC]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* 離線/安裝提示 */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#E0D5C7] text-[#4A4A4A] px-4 py-2 rounded-lg text-center text-sm"
          >
            📡 離線模式 - 數據會在連線後同步
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isInstallable && !isInstalled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#8B7EC8] text-white px-4 py-3 rounded-lg flex justify-between items-center"
          >
            <span className="text-sm">📲 安裝到主屏幕，離線也能學習！</span>
            <div className="flex gap-2">
              <button
                onClick={() => install()}
                className="px-3 py-1 bg-white text-[#8B7EC8] rounded text-sm font-medium hover:bg-[#F5F5F0] transition-colors"
              >
                安裝
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 標籤切換 */}
      <div className="flex gap-2 border-b border-[#E5E5E5]">
        {[
          { id: 'units', label: '單元', icon: '📚' },
          { id: 'progress', label: '進度', icon: '📊' },
          { id: 'sentences', label: '句子簿', icon: '📝' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-[2px] ${
              activeTab === tab.id
                ? 'border-[#4A4A4A] text-[#4A4A4A]'
                : 'border-transparent text-[#8C8C8C] hover:text-[#4A4A4A]'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 內容區域 */}
      <AnimatePresence mode="wait">
        {activeTab === 'units' && (
          <motion.div
            key="units"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {lesson7Units.map((unit, index) => {
              const progress = unitProgress.find(p => p.unitId === unit.id);
              const isLocked = index >= unlockedUnits;
              const isCompleted = progress?.completed;

              return (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    if (!isLocked) {
                      setSelectedUnit(unit);
                    }
                  }}
                  className={`bg-white rounded-xl p-5 border-2 transition-all cursor-pointer ${
                    isLocked
                      ? 'border-[#E5E5E5] opacity-60 cursor-not-allowed'
                      : isCompleted
                      ? 'border-[#A8B5A0] shadow-md'
                      : 'border-[#C4B9AC] hover:shadow-lg'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-xs text-[#8C8C8C] mb-1">Unit {unit.id}</div>
                      <h3 className="text-lg font-bold text-[#4A4A4A]">{unit.title}</h3>
                      <p className="text-sm text-[#8C8C8C]">{unit.subtitle}</p>
                    </div>
                    <div className="text-2xl">
                      {isLocked ? '🔒' : isCompleted ? '✅' : '📖'}
                    </div>
                  </div>

                  {!isLocked && (
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUnit(unit);
                          setMode('study');
                        }}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                          progress?.studyCompleted
                            ? 'bg-[#A8B5A0]/20 text-[#A8B5A0]'
                            : 'bg-[#F5F5F0] text-[#4A4A4A] hover:bg-[#E0D5C7]'
                        }`}
                      >
                        {progress?.studyCompleted ? '✓ 已學習' : '學習'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUnit(unit);
                          setMode('quiz');
                        }}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                          progress?.quizCompleted
                            ? 'bg-[#A8B5A0]/20 text-[#A8B5A0]'
                            : 'bg-[#C4B9AC] text-white hover:bg-[#A09088]'
                        }`}
                      >
                        {progress?.quizCompleted ? `最高分: ${progress.bestScore}` : '測驗'}
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'progress' && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-xl p-6 border border-[#E5E5E5]"
          >
            <h3 className="text-lg font-bold text-[#4A4A4A] mb-4">學習統計</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#F5F5F0] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#A8B5A0]">{completedCount}</div>
                <div className="text-sm text-[#8C8C8C]">完成單元</div>
              </div>
              <div className="bg-[#F5F5F0] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#C4B9AC]">{totalExp}</div>
                <div className="text-sm text-[#8C8C8C]">總 EXP</div>
              </div>
              <div className="bg-[#F5F5F0] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#8C8C8C]">{savedSentences.length}</div>
                <div className="text-sm text-[#8C8C8C]">保存句子</div>
              </div>
              <div className="bg-[#F5F5F0] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#8C8C8C]">
                  {Math.max(...unitProgress.map(p => p.bestScore), 0)}
                </div>
                <div className="text-sm text-[#8C8C8C]">最高分</div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'sentences' && (
          <motion.div
            key="sentences"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {savedSentences.length === 0 ? (
              <div className="bg-white rounded-xl p-8 border border-[#E5E5E5] text-center">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="text-lg font-bold text-[#4A4A4A] mb-2">暫無保存的句子</h3>
                <p className="text-[#8C8C8C] mb-4">在造句模式中創建並保存你的第一個句子</p>
                <button
                  onClick={() => setMode('builder')}
                  className="px-6 py-2 bg-[#C4B9AC] text-white rounded-lg hover:bg-[#A09088] transition-colors"
                >
                  開始造句
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {savedSentences.map((sentence) => (
                  <motion.div
                    key={sentence.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl p-4 border border-[#E5E5E5]"
                  >
                    <div className="text-xl font-medium text-[#4A4A4A] mb-1">{sentence.fullText}</div>
                    <div className="text-[#8C8C8C]">{sentence.meaning}</div>
                    <div className="text-xs text-[#C4B9AC] mt-2">
                      {new Date(sentence.createdAt).toLocaleDateString('zh-HK')}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 造句按 */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setMode('builder')}
          className="w-14 h-14 bg-[#8B7EC8] text-white rounded-full shadow-lg hover:bg-[#7A6DB7] transition-all hover:scale-110 flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </div>
    </div>
  );

  const renderStudy = () => {
    if (!selectedUnit) return null;
    const vocab = getVocabByUnit(selectedUnit.id);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMode('menu')}
            className="flex items-center gap-2 text-[#8C8C8C] hover:text-[#4A4A4A] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </button>
          <h2 className="text-lg font-bold text-[#4A4A4A]">{selectedUnit.title}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#8C8C8C]">廣東話</span>
            <button
              onClick={() => setShowCantonese(!showCantonese)}
              className={`w-10 h-6 rounded-full transition-colors relative ${
                showCantonese ? 'bg-[#A8B5A0]' : 'bg-[#E5E5E5]'
              }`}
            >
              <motion.div
                className="w-4 h-4 bg-white rounded-full absolute top-1"
                animate={{ left: showCantonese ? 'calc(100% - 20px)' : '4px' }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>

        <VocabFlashcard
          vocab={vocab}
          showCantonese={showCantonese}
          onComplete={handleStudyComplete}
        />
      </div>
    );
  };

  const renderQuiz = () => {
    if (!selectedUnit) return null;

    if (showResult && quizResult) {
      return (
        <div className="max-w-md mx-auto text-center py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            {quizResult.score >= 60 ? '🎉' : '💪'}
          </motion.div>
          <h2 className="text-2xl font-bold text-[#4A4A4A] mb-2">
            {quizResult.score >= 60 ? '測驗完成！' : '再試一次！'}
          </h2>
          <div className="bg-white rounded-xl p-6 border border-[#E5E5E5] mb-6">
            <div className="text-5xl font-bold text-[#A8B5A0] mb-2">{quizResult.score}</div>
            <div className="text-[#8C8C8C]">總分</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#F5F5F0] rounded-lg p-4">
              <div className="text-xl font-bold text-[#4A4A4A]">{quizResult.correctCount}/{quizResult.totalQuestions}</div>
              <div className="text-sm text-[#8C8C8C]">答對題數</div>
            </div>
            <div className="bg-[#F5F5F0] rounded-lg p-4">
              <div className="text-xl font-bold text-[#4A4A4A]">🔥 {quizResult.combo}</div>
              <div className="text-sm text-[#8C8C8C]">最高連擊</div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setShowResult(false);
                setQuizResult(null);
                setMode('menu');
              }}
              className="px-6 py-2 bg-[#8C8C8C] text-white rounded-lg hover:bg-[#6B6B6B] transition-colors"
            >
              返回目錄
            </button>
            <button
              onClick={() => {
                setShowResult(false);
                setQuizResult(null);
              }}
              className="px-6 py-2 bg-[#C4B9AC] text-white rounded-lg hover:bg-[#A09088] transition-colors"
            >
              再試一次
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setMode('menu')}
            className="flex items-center gap-2 text-[#8C8C8C] hover:text-[#4A4A4A] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            退出
          </button>
          <h2 className="text-lg font-bold text-[#4A4A4A]">{selectedUnit.title} - 測驗</h2>
          <div className="w-10" />
        </div>

        <QuizEngine
          unitId={selectedUnit.id}
          lessonVocab={lesson7Vocab}
          lessonUnits={lesson7Units}
          onComplete={handleQuizComplete}
          onExit={() => setMode('menu')}
        />
      </div>
    );
  };

  const renderBuilder = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setMode('menu')}
          className="flex items-center gap-2 text-[#8C8C8C] hover:text-[#4A4A4A] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回
        </button>
        <h2 className="text-lg font-bold text-[#4A4A4A]">積木造句機</h2>
        <div className="w-10" />
      </div>

      <SentenceBuilder
        maxUnitId={unlockedUnits}
        savedSentences={savedSentences}
        onSaveSentence={saveSentence}
        lessonBlocks={sentenceBlocks}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {mode === 'menu' && (
            <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {renderMenu()}
            </motion.div>
          )}
          {mode === 'study' && (
            <motion.div key="study" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              {renderStudy()}
            </motion.div>
          )}
          {mode === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              {renderQuiz()}
            </motion.div>
          )}
          {mode === 'builder' && (
            <motion.div key="builder" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}>
              {renderBuilder()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
