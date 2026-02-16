/**
 * 六角雷達圖組件
 * Hexagonal Radar Chart Component
 * 
 * 顯示用戶在六個維度的實力分數
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

// 維度顏色映射
const DIMENSION_COLORS: Record<QuizDimension, string> = {
  pronunciation: '#8b5cf6', // violet-500
  kanji: '#ec4899',         // pink-500
  vocabulary: '#f59e0b',    // amber-500
  grammar: '#10b981',       // emerald-500
  listening: '#3b82f6',     // blue-500
  application: '#ef4444',   // red-500
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
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#9ca3af', fontSize: 10 }}
            tickCount={6}
          />
          <Radar
            name="實力分數"
            dataKey="score"
            stroke="#667eea"
            strokeWidth={2}
            fill="#667eea"
            fillOpacity={0.3}
            isAnimationActive={animate}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                    <p className="font-semibold text-gray-900">{data.dimension}</p>
                    <p className="text-indigo-600 font-bold text-lg">{data.score} 分</p>
                    <p className="text-gray-500 text-sm">嘗試次數: {data.attempts}</p>
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

// ==================== 簡化版雷達圖（用於小空間） ====================

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
          <PolarGrid stroke="#e5e7eb" strokeWidth={0.5} />
          <PolarAngleAxis tick={false} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            dataKey="score"
            stroke="#667eea"
            strokeWidth={1.5}
            fill="#667eea"
            fillOpacity={0.25}
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
      className={`relative p-4 rounded-xl border-2 transition-all ${
        isNewBest
          ? 'border-yellow-400 bg-yellow-50 shadow-lg scale-105'
          : 'border-gray-100 bg-white hover:border-gray-200'
      }`}
    >
      {isNewBest && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white text-lg animate-bounce">
          🏆
        </div>
      )}
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      
      <div className="flex items-baseline space-x-1">
        <span
          className="text-3xl font-bold"
          style={{ color: score > 0 ? color : '#9ca3af' }}
        >
          {score}
        </span>
        <span className="text-sm text-gray-400">/100</span>
      </div>
      
      <div className="mt-2 text-xs text-gray-400">
        嘗試 {attempts} 次
      </div>
      
      {/* 進度條 */}
      <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
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
