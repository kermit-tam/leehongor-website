/**
 * N5 課程能力分數服務
 * N5 Course Ability Score Service
 * 
 * 處理 N5 課程測驗完成後的能力分數更新
 */

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { AbilityScores, QuizDimension } from '@/types';

// 單元類型映射
const UNIT_DIMENSION_MAP: Record<number, QuizDimension> = {
  // 第1課 - 人稱、國家（詞彙為主）
  1: 'vocabulary',
  2: 'vocabulary',
  3: 'application', // 對話
  4: 'vocabulary',
  
  // 第2課 - 物品名稱
  5: 'vocabulary',
  6: 'vocabulary',
  7: 'vocabulary',
  8: 'vocabulary',
  9: 'vocabulary',
  
  // 第3課 - 場所
  10: 'vocabulary',
  11: 'vocabulary',
  12: 'vocabulary',
  13: 'vocabulary',
  14: 'vocabulary',
  15: 'application', // 購物對話
  16: 'vocabulary',
  
  // 第4課 - 時間
  17: 'grammar',    // 動詞
  18: 'vocabulary', // 場所
  19: 'grammar',    // 時間表達
  20: 'grammar',
  21: 'grammar',
  22: 'vocabulary', // 活動
  23: 'grammar',    // 頻率
  24: 'vocabulary', // 星期
  25: 'grammar',    // 助詞
  26: 'application', // 對話
  27: 'vocabulary', // 城市
  
  // 第5課 - 交通
  28: 'grammar',    // 交通方式
  29: 'vocabulary', // 人物
  30: 'grammar',    // 時間
  31: 'application', // 日期對話
  
  // 第6課 - 食物
  32: 'grammar',    // 動詞（吃、喝等）
  33: 'vocabulary', // 食物
  34: 'vocabulary', // 飲料
  35: 'application', // 對話
  36: 'vocabulary', // 國家
  
  // 第7課 - 給予與接受
  37: 'grammar',    // 動詞
  38: 'vocabulary', // 工具
  39: 'vocabulary', // 文具
  40: 'vocabulary', // 家庭
  41: 'application', // 對話
};

/**
 * 獲取單元對應的能力維度
 */
export function getDimensionForUnit(lessonNum: number, unitId: number): QuizDimension {
  // 計算全局單元 ID
  const globalUnitId = calculateGlobalUnitId(lessonNum, unitId);
  return UNIT_DIMENSION_MAP[globalUnitId] || 'application';
}

/**
 * 計算全局單元 ID
 */
function calculateGlobalUnitId(lessonNum: number, unitId: number): number {
  const lessonUnitCounts = [0, 4, 5, 7, 11, 4, 5, 5]; // 每課的單元數
  let offset = 0;
  for (let i = 1; i < lessonNum; i++) {
    offset += lessonUnitCounts[i] || 0;
  }
  return offset + unitId;
}

/**
 * 計算測驗分數對應的能力值（0-100）
 */
export function calculateAbilityScore(quizScore: number): number {
  // 將測驗分數（通常是 0-100+）轉換為能力值（0-100）
  // 使用平方根函數使低分更容易提升，高分更難提升
  const normalizedScore = Math.min(quizScore, 100);
  return Math.round(Math.sqrt(normalizedScore) * 10);
}

/**
 * 更新用戶能力分數
 */
export async function updateN5AbilityScores(
  userId: string,
  lessonNum: number,
  unitId: number,
  quizScore: number
): Promise<{
  updatedDimensions: string[];
  newScores: Partial<AbilityScores>;
}> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    throw new Error('User not found');
  }
  
  const userData = userSnap.data();
  const currentAbilityScores = (userData.abilityScores || {
    pronunciation: { best: 0, attempts: 0 },
    kanji: { best: 0, attempts: 0 },
    vocabulary: { best: 0, attempts: 0 },
    grammar: { best: 0, attempts: 0 },
    listening: { best: 0, attempts: 0 },
    application: { best: 0, attempts: 0 },
  }) as AbilityScores;
  
  // 確定主要維度
  const primaryDimension = getDimensionForUnit(lessonNum, unitId);
  
  // 計算新分數
  const newAbilityScore = calculateAbilityScore(quizScore);
  
  const updatedDimensions: string[] = [];
  const newScores: Partial<AbilityScores> = {};
  
  // 更新主要維度（權重較高）
  const currentPrimaryBest = currentAbilityScores[primaryDimension]?.best || 0;
  if (newAbilityScore > currentPrimaryBest) {
    newScores[primaryDimension] = {
      best: newAbilityScore,
      attempts: (currentAbilityScores[primaryDimension]?.attempts || 0) + 1,
    };
    updatedDimensions.push(primaryDimension);
  }
  
  // 次要維度也會有小幅提升（如果測驗分數夠高）
  const secondaryDimensions: QuizDimension[] = ['vocabulary', 'grammar', 'application'];
  for (const dim of secondaryDimensions) {
    if (dim !== primaryDimension && newAbilityScore > 60) {
      const currentBest = currentAbilityScores[dim]?.best || 0;
      const minorBoost = Math.round(newAbilityScore * 0.2); // 次要維度獲得 20% 分數
      
      if (minorBoost > currentBest && minorBoost <= 100) {
        // 次要維度不覆蓋主要維度，但會記錄嘗試次數
        newScores[dim] = {
          best: Math.max(currentBest, minorBoost),
          attempts: (currentAbilityScores[dim]?.attempts || 0) + 1,
        };
        if (!updatedDimensions.includes(dim)) {
          updatedDimensions.push(dim);
        }
      }
    }
  }
  
  // 如果有更新，寫入 Firestore
  if (updatedDimensions.length > 0) {
    const updatedAbilityScores = { ...currentAbilityScores };
    
    for (const [dim, score] of Object.entries(newScores)) {
      updatedAbilityScores[dim as QuizDimension] = score as { best: number; attempts: number };
    }
    
    await updateDoc(userRef, {
      abilityScores: updatedAbilityScores,
    });
  }
  
  return {
    updatedDimensions,
    newScores,
  };
}

/**
 * 獲取用戶 N5 課程能力分析
 */
export async function getN5AbilityAnalysis(userId: string): Promise<{
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    throw new Error('User not found');
  }
  
  const userData = userSnap.data();
  const abilityScores = (userData.abilityScores || {}) as AbilityScores;
  
  const dimensionScores = [
    { name: '發音', key: 'pronunciation', score: abilityScores.pronunciation?.best || 0 },
    { name: '漢字', key: 'kanji', score: abilityScores.kanji?.best || 0 },
    { name: '詞彙', key: 'vocabulary', score: abilityScores.vocabulary?.best || 0 },
    { name: '文法', key: 'grammar', score: abilityScores.grammar?.best || 0 },
    { name: '聽力', key: 'listening', score: abilityScores.listening?.best || 0 },
    { name: '應用', key: 'application', score: abilityScores.application?.best || 0 },
  ];
  
  // 排序找出強項和弱項
  const sorted = [...dimensionScores].sort((a, b) => b.score - a.score);
  
  const strengths = sorted.filter(d => d.score >= 70).map(d => d.name);
  const weaknesses = sorted.filter(d => d.score < 40 && d.score > 0).map(d => d.name);
  
  // 生成建議
  const recommendations: string[] = [];
  
  if (weaknesses.length > 0) {
    recommendations.push(`建議多加練習：${weaknesses.join('、')}`);
  }
  
  if (strengths.length > 0) {
    recommendations.push(`你的強項是：${strengths.join('、')}，繼續保持！`);
  }
  
  if (dimensionScores.every(d => d.score === 0)) {
    recommendations.push('完成更多測驗來解鎖你的能力分析！');
  }
  
  return {
    strengths,
    weaknesses,
    recommendations,
  };
}
