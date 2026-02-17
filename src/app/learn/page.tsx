/**
 * 學習區主頁 - N5 微單元學習系統
 * Learn Page with Micro-Units & Cantonese Phonetics
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { UserService } from '@/lib/firestore';
import { LevelCard, StatCard } from '@/components/ui/card';
import { AbilityRadarChart } from '@/components/charts/radar-chart';
import { lesson1Data, calculateLevel, scoringConfig, getUnitProgressKey, calculateLessonProgress, n5LessonsList } from '@/data/n5-lessons';
import type { User } from '@/types';

// 廣東話諧音開關組件
function CantoneseToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
        enabled 
          ? 'bg-[#C4B9AC] text-white' 
          : 'bg-[#F5F5F0] text-[#8C8C8C] border border-[#E0E0E0]'
      }`}
    >
      <span>🇭🇰</span>
      <span>廣東話諧音</span>
      <span className={`w-8 h-4 rounded-full relative transition-colors ${enabled ? 'bg-white/30' : 'bg-[#E0E0E0]'}`}>
        <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
          enabled ? 'left-[18px]' : 'left-0.5'
        }`} />
      </span>
    </button>
  );
}

// 微單元卡片
function UnitCard({
  unit,
  lessonId,
  isCompleted,
  showCantonese,
  onClick,
}: {
  unit: typeof lesson1Data.units[0];
  lessonId: string;
  isCompleted: boolean;
  showCantonese: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      className={`relative p-5 rounded-xl border transition-all cursor-pointer ${
        isCompleted
          ? 'bg-[#E8F5E9] border-[#A5D6A7]'
          : 'bg-white border-[#E0E0E0] hover:border-[#C4B9AC] hover:shadow-md'
      }`}
      whileTap={{ scale: 0.98 }}
    >
      {/* 完成標記 */}
      {isCompleted && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-sm">
          ✓
        </div>
      )}

      {/* 單元編號 */}
      <div className="text-xs text-[#C4B9AC] mb-1 tracking-wider">
        單元 {unit.id}/4
      </div>

      {/* 標題 */}
      <h4 className="text-lg font-medium text-[#4A4A4A] mb-1">
        {unit.title}
      </h4>
      <p className="text-xs text-[#8C8C8C] mb-3">{unit.subtitle}</p>

      {/* 內容預覽 */}
      <div className="space-y-2">
        {/* 詞彙預覽 */}
        <div className="flex flex-wrap gap-1">
          {unit.vocab.slice(0, showCantonese ? 3 : 4).map((v, i) => (
            <span key={i} className="text-xs bg-[#F5F5F0] px-2 py-1 rounded">
              {showCantonese && v.cantonese ? v.cantonese : v.hiragana}
            </span>
          ))}
          {unit.vocab.length > (showCantonese ? 3 : 4) && (
            <span className="text-xs text-[#C4B9AC] px-1">+{unit.vocab.length - (showCantonese ? 3 : 4)}</span>
          )}
        </div>

        {/* 內容類型標籤 */}
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded">詞彙</span>
          {unit.grammar && <span className="px-2 py-0.5 bg-[#F3E5F5] text-[#7B1FA2] rounded">文法</span>}
          {unit.listening && <span className="px-2 py-0.5 bg-[#E8F5E9] text-[#388E3C] rounded">聽力</span>}
          {unit.dialogue && <span className="px-2 py-0.5 bg-[#FFF3E0] text-[#F57C00] rounded">對話</span>}
        </div>
      </div>

      {/* 時間預估 */}
      <div className="mt-3 text-xs text-[#BDBDBD]">
        約 {unit.estimatedTime} 分鐘 • {unit.vocab.length} 詞彙
      </div>
    </motion.div>
  );
}

// 第1課卡片（展開式）
function Lesson1Card({
  showCantonese,
  onToggleCantonese,
  completedUnits,
  onUnitClick,
}: {
  showCantonese: boolean;
  onToggleCantonese: () => void;
  completedUnits: Set<string>;
  onUnitClick: (unitId: number) => void;
}) {
  const progress = calculateLessonProgress(lesson1Data, completedUnits);
  const completedCount = lesson1Data.units.filter(unit => 
    completedUnits.has(getUnitProgressKey(lesson1Data.id, unit.id))
  ).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8E8] overflow-hidden">
      {/* 課程標題區 */}
      <div className="p-6 border-b border-[#E8E8E8]">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs text-[#C4B9AC] tracking-wider mb-1">第 {lesson1Data.lessonNum} 課</div>
            <h2 className="text-2xl font-bold text-[#4A4A4A]">{lesson1Data.title}</h2>
            <p className="text-sm text-[#8C8C8C] mt-1">{lesson1Data.description}</p>
          </div>
          <CantoneseToggle enabled={showCantonese} onToggle={onToggleCantonese} />
        </div>

        {/* 總進度 */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-2 bg-[#F5F5F0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C4B9AC] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-sm text-[#8C8C8C] whitespace-nowrap">
            {completedCount}/4 單元
          </span>
        </div>
      </div>

      {/* 微單元網格 */}
      <div className="p-6 bg-[#FAFAFA]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson1Data.units.map((unit) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              lessonId={lesson1Data.id}
              isCompleted={completedUnits.has(getUnitProgressKey(lesson1Data.id, unit.id))}
              showCantonese={showCantonese}
              onClick={() => onUnitClick(unit.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LearnPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCantonese, setShowCantonese] = useState(true);
  const [completedUnits, setCompletedUnits] = useState<Set<string>>(new Set());
  const [unitScores, setUnitScores] = useState<Record<string, number>>({});

  // 加載數據
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // 讀取本地儲存的進度
        const savedCompleted = localStorage.getItem('n5-unit-completed');
        if (savedCompleted) {
          setCompletedUnits(new Set(JSON.parse(savedCompleted)));
        }

        const savedScores = localStorage.getItem('n5-unit-scores');
        if (savedScores) {
          setUnitScores(JSON.parse(savedScores));
        }

        // 如果用戶已登入，加載用戶數據
        if (user?.uid) {
          const fetchedUser = await UserService.getUser(user.uid);
          setUserData(fetchedUser);
        }
      } catch (err) {
        console.error('Error loading learn page:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user?.uid]);

  const handleUnitClick = (unitId: number) => {
    window.location.href = `/learn/n5/lesson-1?unit=${unitId}`;
  };

  // 計算用戶等級
  const userExp = userData?.achievementExp || 0;
  const { level, currentExp, nextLevelExp, progress: levelProgress } = calculateLevel(userExp);

  if (isLoading || authLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-48 bg-gray-200 rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* 頁面標題 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#4A4A4A] mb-2">🎯 N5 基礎課程</h1>
        <p className="text-[#8C8C8C]">
          大家的日本語 • 微單元學習 • 廣東話諧音輔助
        </p>
      </div>

      {/* 廣東話諧音說明 */}
      <div className="bg-gradient-to-r from-[#FFF8E1] to-[#FFECB3] rounded-xl p-4 mb-6 border border-[#FFE082]">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-medium text-[#4A4A4A] mb-1">廣東話諧音學習法</h3>
            <p className="text-sm text-[#8C8C8C]">
              用廣東話讀音幫助記憶日文發音，例如「わたし」(我) 讀作「哇他西」。
              點擊右上角開關切換顯示模式。
            </p>
          </div>
        </div>
      </div>

      {/* 第1課 - 展開式微單元 */}
      <div className="mb-8">
        <Lesson1Card
          showCantonese={showCantonese}
          onToggleCantonese={() => setShowCantonese(!showCantonese)}
          completedUnits={completedUnits}
          onUnitClick={handleUnitClick}
        />
      </div>

      {/* 第2-7課卡片 */}
      {n5LessonsList.slice(1, 7).map((lesson) => (
        <div 
          key={lesson.id}
          className={`bg-white rounded-2xl shadow-sm border border-[#E8E8E8] p-6 mb-4 ${
            lesson.units.length === 0 ? 'opacity-60' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-[#C4B9AC] tracking-wider mb-1">第 {lesson.lessonNum} 課</div>
              <h3 className="text-xl font-bold text-[#4A4A4A]">{lesson.title}</h3>
              <p className="text-sm text-[#8C8C8C]">{lesson.description}</p>
              {lesson.units.length > 0 && (
                <p className="text-xs text-[#C4B9AC] mt-1">
                  {lesson.units.length} 單元 • {lesson.totalVocab} 詞彙
                </p>
              )}
            </div>
            {lesson.units.length > 0 ? (
              <Link
                href={`/learn/n5/lesson-${lesson.lessonNum}`}
                className="px-6 py-3 bg-[#C4B9AC] text-white rounded-lg hover:bg-[#B5A99D] transition-colors"
              >
                開始學習 →
              </Link>
            ) : (
              <span className="px-4 py-2 bg-[#F5F5F0] text-[#8C8C8C] rounded-lg text-sm">
                準備中
              </span>
            )}
          </div>
        </div>
      ))}

      {/* 計分系統說明 */}
      <div className="bg-[#FAF9F7] rounded-2xl border border-[#E8E8E8] p-6 mb-8">
        <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">🏆 計分系統</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">經驗值獲取</h3>
            <ul className="space-y-2 text-sm text-[#8C8C8C]">
              <li className="flex justify-between">
                <span>完成單元學習</span>
                <span className="text-[#C4B9AC]">+{scoringConfig.unitBaseExp} EXP</span>
              </li>
              <li className="flex justify-between">
                <span>測驗 100% (⭐⭐⭐)</span>
                <span className="text-[#C4B9AC]">+{scoringConfig.quizRewards.perfect.exp} EXP</span>
              </li>
              <li className="flex justify-between">
                <span>測驗 80-99% (⭐⭐)</span>
                <span className="text-[#C4B9AC]">+{scoringConfig.quizRewards.excellent.exp} EXP</span>
              </li>
              <li className="flex justify-between">
                <span>完成整課 (4單元)</span>
                <span className="text-[#C4B9AC]">+{scoringConfig.lessonComplete.base} EXP</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">等級系統</h3>
            <div className="bg-white rounded-lg p-4 border border-[#E8E8E8]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-[#4A4A4A]">Lv.{level}</span>
                <span className="text-sm text-[#8C8C8C]">{currentExp}/{nextLevelExp} EXP</span>
              </div>
              <div className="h-2 bg-[#F5F5F0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C4B9AC] rounded-full transition-all"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 用戶數據 */}
      {userData && (
        <>
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <LevelCard
                level={level}
                exp={userExp}
                streakDays={userData.streakDays}
              />
            </div>

            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#E8E8E8] p-6">
              <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">📊 實力分析</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <AbilityRadarChart
                  abilityScores={userData.abilityScores}
                  size={200}
                />
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-violet-500 mr-2" />
                    <span className="text-[#8C8C8C]">發音 {userData.abilityScores.pronunciation.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-pink-500 mr-2" />
                    <span className="text-[#8C8C8C]">漢字 {userData.abilityScores.kanji.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2" />
                    <span className="text-[#8C8C8C]">詞彙 {userData.abilityScores.vocabulary.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
                    <span className="text-[#8C8C8C]">文法 {userData.abilityScores.grammar.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                    <span className="text-[#8C8C8C]">聽力 {userData.abilityScores.listening.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                    <span className="text-[#8C8C8C]">應用 {userData.abilityScores.application.best}分</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon="📖"
              label="已完成單元"
              value={completedUnits.size}
              subtext="共4單元"
              color="earth"
            />
            <StatCard
              icon="⭐"
              label="成就分數"
              value={userExp}
              color="warm"
            />
            <StatCard
              icon="🔥"
              label="連續登入"
              value={userData.streakDays}
              subtext="天"
              color="gray"
            />
            <StatCard
              icon="🏅"
              label="徽章"
              value={userData.badges.length}
              color="gray"
            />
          </div>
        </>
      )}

      {!user && (
        <div className="bg-gradient-to-r from-[#C4B9AC] to-[#8C8C8C] rounded-2xl p-8 text-white text-center">
          <div className="text-4xl mb-4">👋</div>
          <h2 className="text-2xl font-bold mb-2">歡迎來到 N5 課程！</h2>
          <p className="opacity-90 mb-4">登入後可追蹤每個微單元的學習進度</p>
          <Link href="/">
            <span className="inline-block px-6 py-3 bg-white text-[#4A4A4A] rounded-xl font-medium hover:bg-gray-100 transition-colors">
              登入開始學習
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
