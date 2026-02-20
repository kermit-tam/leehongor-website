/**
 * 大家的日本語 N5 完整課程數據（含廣東話諧音）
 * Minna no Nihongo N5 with Cantonese Phonetics
 * 
 * 數據文件已拆分為每課獨立文件，位於 n5/ 目錄
 */

// ==================== 類型定義 ====================
// 從新結構重新導出類型
export type {
  N5Vocab,
  GrammarPoint,
  ListeningItem,
  DialogueItem,
  N5Unit,
  N5Lesson,
} from './n5/types';

// ==================== 課程數據 ====================
// 從新結構導入所有課程
export {
  lesson1Data,
  lesson2Data,
  lesson3Data,
  lesson4Data,
  lesson5Data,
  lesson6Data,
  lesson7Data,
  lesson8Data,
  lesson9Data,
  lesson10Data,
  lesson11Data,
  lesson12Data,
  lesson13Data,
  lesson14Data,
  lesson15Data,
  n5LessonsList,
} from './n5';

// ==================== 所有N5課程列表 ====================
// 主列表從 n5/index.ts 導入

// ==================== 雙軌計分系統 ====================
// 參與分：鼓勵學習行為（唔考核能力）
// 考核分：測驗得分（反映實際能力）

export const scoringConfig = {
  // ===== 參與分 (Participation Points) =====
  // 完成單元學習（睇完卡片即算）
  participation: {
    unitComplete: {           // 完成單元學習
      base: 5,                // 基礎參與分
      vocabBonus: 2,          // 有詞彙部分
      grammarBonus: 3,        // 有文法部分
      dialogueBonus: 2,       // 有對話部分
    },
    dailyLogin: 3,            // 每日登入
    streakBonus: {            // 連續學習獎勵
      weekly: 10,             // 連續7天
      monthly: 50,            // 連續30天
    },
  },
  
  // ===== 考核分 (Assessment Points) =====
  // 測驗得分（反映實際掌握程度）
  assessment: {
    quiz: {
      perfect: { min: 100, exp: 25, label: '完美！', stars: 3 },      // 100%
      excellent: { min: 90, exp: 20, label: '優秀！', stars: 3 },     // 90-99%
      veryGood: { min: 80, exp: 15, label: '非常好！', stars: 2 },    // 80-89%
      good: { min: 70, exp: 10, label: '良好！', stars: 2 },          // 70-79%
      pass: { min: 60, exp: 5, label: '及格！', stars: 1 },           // 60-69%
      fail: { min: 0, exp: 0, label: '再試一次', stars: 0 },          // <60%
    },
    // 完成所有單元測驗獎勵
    completeAllUnits: 30,     // 完成一課所有單元測驗
    perfectAllUnits: 50,      // 所有單元都100分
  },
  
  // ===== 等級計算 =====
  levelCalculation: {
    baseExp: 100,             // 第1級所需經驗
    multiplier: 1.15,         // 每級增長15%
  },
};

// ==================== 輔助函數 ====================

import type { N5Unit, N5Lesson } from './n5/types';
import { n5LessonsList } from './n5';

// 計算測驗考核分
export function getQuizReward(percentage: number) {
  const { quiz } = scoringConfig.assessment;
  if (percentage >= quiz.perfect.min) return quiz.perfect;
  if (percentage >= quiz.excellent.min) return quiz.excellent;
  if (percentage >= quiz.veryGood.min) return quiz.veryGood;
  if (percentage >= quiz.good.min) return quiz.good;
  if (percentage >= quiz.pass.min) return quiz.pass;
  return quiz.fail;
}

// 計算參與分
export function calculateParticipationExp(unit: N5Unit): number {
  const { unitComplete } = scoringConfig.participation;
  let exp = unitComplete.base;
  
  if (unit.vocab.length > 0) exp += unitComplete.vocabBonus;
  if (unit.grammar && unit.grammar.length > 0) exp += unitComplete.grammarBonus;
  if (unit.dialogue && unit.dialogue.length > 0) exp += unitComplete.dialogueBonus;
  
  return exp;
}

// EXP 來源類型
export interface ExpSource {
  type: 'participation' | 'assessment';
  action: string;
  exp: number;
  timestamp: Date;
  lessonId?: string;
  unitId?: number;
}

// 保存 EXP 記錄到 localStorage
export function saveExpHistory(source: ExpSource) {
  const history = JSON.parse(localStorage.getItem('n5-exp-history') || '[]');
  history.push(source);
  localStorage.setItem('n5-exp-history', JSON.stringify(history));
}

export function calculateLevel(exp: number) {
  const { baseExp, multiplier } = scoringConfig.levelCalculation;
  let level = 1;
  let currentLevelBase = 0;
  let nextLevelExp = baseExp;
  
  while (exp >= nextLevelExp) {
    level++;
    currentLevelBase = nextLevelExp;
    nextLevelExp = Math.floor(nextLevelExp * multiplier);
  }
  
  const currentExp = exp - currentLevelBase;
  const levelNeeded = nextLevelExp - currentLevelBase;
  const progress = Math.floor((currentExp / levelNeeded) * 100);
  
  return { level, currentExp, nextLevelExp, progress };
}

export function getLessonById(id: string): N5Lesson | undefined {
  return n5LessonsList.find(lesson => lesson.id === id);
}

export function getUnitProgressKey(lessonId: string, unitId: number): string {
  return `${lessonId}-unit-${unitId}`;
}

// 計算課程總進度
export function calculateLessonProgress(lesson: N5Lesson, completedUnits: Set<string>): number {
  const completed = lesson.units.filter(unit => 
    completedUnits.has(getUnitProgressKey(lesson.id, unit.id))
  ).length;
  return Math.round((completed / lesson.units.length) * 100);
}
