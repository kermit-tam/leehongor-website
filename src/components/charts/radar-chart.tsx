/**
 * 無印風格六角雷達圖
 * MUJI Style Hexagonal Radar Chart
 * 
 * 大地色系：柔和、自然
 */

'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { AbilityScores, QuizDimension } from '@/types';

// 維度標籤映射（中文）
const DIMENSION_LABELS: Record<QuizDimension, string> = {
  pronunciation: '發音',
  kanji: '漢字',
  vocabulary: '詞彙',
  grammar: '文法',
  listening: '聽力',
  application: '應用',
};

// 大地色系 - 無印風格
const DIMENSION_COLORS: Record<QuizDimension, string> = {
  pronunciation: '#C4B9AC', // 暖灰褐
  kanji: '#A8B5A0',         // 鼠尾草綠
  vocabulary: '#D4C5B9',    // 淺駝色
  grammar: '#B8B8B8',       // 中性灰
  listening: '#D1C7B7',     // 米駝色
  application: '#C9BCAD',   // 暖沙色
};

interface RadarChartProps {
  abilityScores: AbilityScores;
  size?: number;
  showLabels?: boolean;
  animate?: boolean;
}

export function AbilityRadarChart({
  abilityScores,
  size = 300,
  showLabels = true,
  animate = true,
}: RadarChartProps) {
  // 轉換數據格式給 recharts
  const data = Object.entries(abilityScores).map(([dimension, scores]) => ({
    dimension: DIMENSION_LABELS[dimension as QuizDimension],
    score: scores.best || 0,
    fullMark: 100,
    attempts: scores.attempts || 0,
  }));

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#E5E5E5" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#8C8C8C', fontSize: 12, fontWeight: 400 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#B5B5B5', fontSize: 10 }}
            tickCount={6}
            axisLine={false}
          />
          <Radar
            name="實力分數"
            dataKey="score"
            stroke="#8C8C8C"
            strokeWidth={1.5}
            fill="#C4B9AC"
            fillOpacity={0.4}
            isAnimationActive={animate}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-[#FAF9F7] p-3 border-t border-[#E5E5E5] shadow-sm">
                    <p className="text-[#4A4A4A] font-normal">{data.dimension}</p>
                    <p className="text-[#6B6B6B] text-lg">{data.score} 分</p>
                    <p className="text-[#8C8C8C] text-xs">嘗試 {data.attempts} 次</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ==================== 簡化版雷達圖 ====================

export function MiniRadarChart({
  abilityScores,
  size = 120,
}: {
  abilityScores: AbilityScores;
  size?: number;
}) {
  const data = Object.entries(abilityScores).map(([dimension, scores]) => ({
    dimension: DIMENSION_LABELS[dimension as QuizDimension],
    score: scores.best || 0,
  }));

  return (
    <div style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#E5E5E5" strokeWidth={0.5} />
          <PolarAngleAxis tick={false} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            dataKey="score"
            stroke="#8C8C8C"
            strokeWidth={1}
            fill="#C4B9AC"
            fillOpacity={0.3}
            isAnimationActive={false}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ==================== 能力分數卡片 ====================

interface AbilityScoreCardProps {
  dimension: QuizDimension;
  score: number;
  attempts: number;
  isNewBest?: boolean;
}

export function AbilityScoreCard({
  dimension,
  score,
  attempts,
  isNewBest = false,
}: AbilityScoreCardProps) {
  const label = DIMENSION_LABELS[dimension];
  const color = DIMENSION_COLORS[dimension];

  return (
    <div
      className={`relative p-5 bg-[#FAF9F7] border-t border-[#E5E5E5] transition-all ${
        isNewBest
          ? 'bg-[#E0D5C7]/30'
          : ''
      }`}
    >
      {isNewBest && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#D4C5B9] flex items-center justify-center text-white text-sm">
          ★
        </div>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-[#8C8C8C] tracking-wide">{label}</span>
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      
      <div className="flex items-baseline space-x-1">
        <span
          className="text-3xl font-light text-[#4A4A4A]"
        >
          {score}
        </span>
        <span className="text-sm text-[#B5B5B5]">/100</span>
      </div>
      
      <div className="mt-2 text-xs text-[#B5B5B5]">
        嘗試 {attempts} 次
      </div>
      
      {/* 進度條 */}
      <div className="mt-4 h-[2px] bg-[#E5E5E5]">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${score}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

// ==================== 能力分數網格 ====================

export function AbilityScoresGrid({
  abilityScores,
  newBests,
}: {
  abilityScores: AbilityScores;
  newBests?: Record<string, boolean>;
}) {
  const dimensions: QuizDimension[] = [
    'pronunciation',
    'kanji',
    'vocabulary',
    'grammar',
    'listening',
    'application',
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {dimensions.map((dimension) => (
        <AbilityScoreCard
          key={dimension}
          dimension={dimension}
          score={abilityScores[dimension]?.best || 0}
          attempts={abilityScores[dimension]?.attempts || 0}
          isNewBest={newBests?.[dimension]}
        />
      ))}
    </div>
  );
}

export { DIMENSION_LABELS, DIMENSION_COLORS };
