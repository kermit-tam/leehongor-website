'use client';

import { motion } from 'framer-motion';
import { getLearningStatus, getProficiencyStatus } from '@/data/progress-system';

interface DualProgressProps {
  learningRate: number;
  completedUnits: number;
  totalUnits: number;
  studyMinutes: number;
  streakDays: number;
  proficiency: number;
  level: string;
  quizCount: number;
  averageScore: number;
  weakAreas: string[];
  strongAreas: string[];
}

export function DualProgressDisplay({
  learningRate,
  completedUnits,
  totalUnits,
  studyMinutes,
  streakDays,
  proficiency,
  level,
  quizCount,
  averageScore,
  weakAreas,
  strongAreas,
}: DualProgressProps) {
  const learningStatus = getLearningStatus(learningRate);
  const proficiencyStatus = getProficiencyStatus(level);
  
  return (
    <div className="space-y-6">
      {/* 學習率卡片 */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8E8] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-2xl">📚</div>
            <div>
              <h3 className="text-lg font-bold text-[#4A4A4A]">學習率</h3>
              <p className="text-sm text-[#8C8C8C]">反映學習參與度和進度</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold" style={{ color: learningStatus.color }}>{learningRate}%</span>
            <p className="text-sm text-[#8C8C8C]">{learningStatus.icon} {learningStatus.label}</p>
          </div>
        </div>
        
        <div className="h-4 bg-[#F5F5F0] rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${learningRate}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ backgroundColor: learningStatus.color }}
          />
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-[#FAFAFA] rounded-lg">
            <p className="text-2xl font-bold text-[#4A4A4A]">{completedUnits}</p>
            <p className="text-xs text-[#8C8C8C]">已完成微單元</p>
          </div>
          <div className="text-center p-3 bg-[#FAFAFA] rounded-lg">
            <p className="text-2xl font-bold text-[#4A4A4A]">{totalUnits}</p>
            <p className="text-xs text-[#8C8C8C]">總微單元數</p>
          </div>
          <div className="text-center p-3 bg-[#FAFAFA] rounded-lg">
            <p className="text-2xl font-bold text-[#4A4A4A]">{studyMinutes}</p>
            <p className="text-xs text-[#8C8C8C]">學習分鐘</p>
          </div>
          <div className="text-center p-3 bg-[#FAFAFA] rounded-lg">
            <p className="text-2xl font-bold text-[#4A4A4A]">{streakDays}</p>
            <p className="text-xs text-[#8C8C8C]">連續天數</p>
          </div>
        </div>
      </div>

      {/* 熟練度卡片 */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8E8] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F3E5F5] flex items-center justify-center text-2xl">🎯</div>
            <div>
              <h3 className="text-lg font-bold text-[#4A4A4A]">熟練度</h3>
              <p className="text-sm text-[#8C8C8C]">反映實際掌握程度</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold" style={{ color: proficiencyStatus.color }}>{proficiency}%</span>
            <p className="text-sm text-[#8C8C8C]">{proficiencyStatus.label}</p>
          </div>
        </div>
        
        <div className="h-4 bg-[#F5F5F0] rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${proficiency}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="h-full rounded-full"
            style={{ backgroundColor: proficiencyStatus.color }}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-[#FAFAFA] rounded-lg">
            <p className="text-2xl font-bold text-[#4A4A4A]">{quizCount}</p>
            <p className="text-xs text-[#8C8C8C]">完成測驗</p>
          </div>
          <div className="text-center p-3 bg-[#FAFAFA] rounded-lg">
            <p className="text-2xl font-bold text-[#4A4A4A]">{averageScore}</p>
            <p className="text-xs text-[#8C8C8C]">平均分</p>
          </div>
          <div className="text-center p-3 bg-[#FAFAFA] rounded-lg">
            <p className="text-2xl font-bold text-[#4A4A4A]">{level.replace('N5-', '')}</p>
            <p className="text-xs text-[#8C8C8C]">等級</p>
          </div>
        </div>
        
        {(strongAreas.length > 0 || weakAreas.length > 0) && (
          <div className="space-y-2">
            {strongAreas.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-green-500">💪</span>
                <span className="text-sm text-[#4A4A4A]">強項：</span>
                <span className="text-sm text-green-600">{strongAreas.join('、')}</span>
              </div>
            )}
            {weakAreas.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-orange-500">📈</span>
                <span className="text-sm text-[#4A4A4A]">需加強：</span>
                <span className="text-sm text-orange-600">{weakAreas.join('、')}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 對比說明 */}
      <div className="bg-[#FFF8E1] rounded-xl p-4 border border-[#FFE082]">
        <h4 className="font-medium text-[#4A4A4A] mb-2">💡 兩個系統的分別</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-[#1976D2]">📚 學習率</p>
            <p className="text-[#8C8C8C]">反映學習參與度，完成微單元即可提升。鼓勵持續學習！</p>
          </div>
          <div>
            <p className="font-medium text-[#7B1FA2]">🎯 熟練度</p>
            <p className="text-[#8C8C8C]">反映實際掌握程度，需要通過測驗證明。反映真實能力！</p>
          </div>
        </div>
      </div>
    </div>
  );
}
