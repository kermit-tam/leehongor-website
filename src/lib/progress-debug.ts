/**
 * 進度系統診斷工具
 * Progress System Debug Tool
 */

import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export interface ProgressDiagnosticResult {
  userId: string;
  userExists: boolean;
  hasAbilityScores: boolean;
  hasCompletedLessons: boolean;
  abilityScoresDetails: {
    pronunciation: number;
    kanji: number;
    vocabulary: number;
    grammar: number;
    listening: number;
    application: number;
  };
  completedLessonsCount: number;
  unlockedLessonsCount: number;
  localStorageData: {
    lesson5Progress: boolean;
    lesson5Sentences: number;
    lesson5Exp: number;
  };
  issues: string[];
  recommendations: string[];
}

/**
 * 診斷用戶進度系統
 */
export async function diagnoseUserProgress(userId: string): Promise<ProgressDiagnosticResult> {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // 1. 檢查 Firestore 用戶數據
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    issues.push('❌ 用戶數據不存在於 Firestore');
    recommendations.push('請重新登入以創建用戶數據');
    
    return {
      userId,
      userExists: false,
      hasAbilityScores: false,
      hasCompletedLessons: false,
      abilityScoresDetails: { pronunciation: 0, kanji: 0, vocabulary: 0, grammar: 0, listening: 0, application: 0 },
      completedLessonsCount: 0,
      unlockedLessonsCount: 0,
      localStorageData: { lesson5Progress: false, lesson5Sentences: 0, lesson5Exp: 0 },
      issues,
      recommendations,
    };
  }

  const userData = userSnap.data();

  // 2. 檢查 abilityScores
  const abilityScores = userData.abilityScores || {};
  const abilityScoresDetails = {
    pronunciation: abilityScores.pronunciation?.best || 0,
    kanji: abilityScores.kanji?.best || 0,
    vocabulary: abilityScores.vocabulary?.best || 0,
    grammar: abilityScores.grammar?.best || 0,
    listening: abilityScores.listening?.best || 0,
    application: abilityScores.application?.best || 0,
  };

  const hasAbilityScores = Object.values(abilityScoresDetails).some(score => score > 0);
  
  if (!hasAbilityScores) {
    issues.push('⚠️ abilityScores 全為 0');
    recommendations.push('需要完成測驗來獲取能力分數');
  }

  // 3. 檢查 completedLessons
  const completedLessons = userData.completedLessons || [];
  const unlockedLessons = userData.unlockedLessons || [];

  if (completedLessons.length === 0) {
    issues.push('⚠️ 未完成任何課程');
    recommendations.push('請完成測驗並達到及格分數 (60分)');
  }

  // 4. 檢查 LocalStorage
  let localStorageData = { lesson5Progress: false, lesson5Sentences: 0, lesson5Exp: 0 };
  
  if (typeof window !== 'undefined') {
    const lesson5Progress = localStorage.getItem('lesson5-progress');
    const lesson5Sentences = localStorage.getItem('lesson5-sentences');
    const lesson5Exp = localStorage.getItem('lesson5-exp');
    
    localStorageData = {
      lesson5Progress: !!lesson5Progress,
      lesson5Sentences: lesson5Sentences ? JSON.parse(lesson5Sentences).length : 0,
      lesson5Exp: lesson5Exp ? parseInt(lesson5Exp) : 0,
    };

    if (localStorageData.lesson5Exp > 0 && userData.achievementExp === 0) {
      issues.push('⚠️ LocalStorage 有進度但 Firestore 無記錄');
      recommendations.push('第5課進度未同步到 Firestore，建議登入後重新測驗');
    }
  }

  // 5. 檢查測驗記錄
  const quizRecordsQuery = query(
    collection(db, 'quiz_results'),
    where('userId', '==', userId)
  );
  const quizRecords = await getDocs(quizRecordsQuery);
  
  if (quizRecords.empty) {
    issues.push('⚠️ 無測驗記錄');
    recommendations.push('請完成課程測驗以更新進度');
  }

  return {
    userId,
    userExists: true,
    hasAbilityScores,
    hasCompletedLessons: completedLessons.length > 0,
    abilityScoresDetails,
    completedLessonsCount: completedLessons.length,
    unlockedLessonsCount: unlockedLessons.length,
    localStorageData,
    issues,
    recommendations,
  };
}

/**
 * 修復進度同步問題
 */
export async function syncProgressToFirestore(userId: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    // 獲取 LocalStorage 數據
    const lesson5Exp = localStorage.getItem('lesson5-exp');
    
    if (lesson5Exp && parseInt(lesson5Exp) > 0) {
      const userRef = doc(db, 'users', userId);
      
      // 合併 EXP
      await updateDoc(userRef, {
        achievementExp: increment(parseInt(lesson5Exp)),
      });

      // 標記為已同步
      localStorage.setItem('lesson5-exp-synced', 'true');
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('同步失敗:', error);
    return false;
  }
}

// 導入缺失的函數
import { updateDoc, increment } from 'firebase/firestore';

/**
 * 生成診斷報告文字
 */
export function generateDiagnosticReport(result: ProgressDiagnosticResult): string {
  const lines = [
    '📊 進度系統診斷報告',
    `用戶 ID: ${result.userId}`,
    '',
    '📝 檢查結果:',
    `- 用戶數據: ${result.userExists ? '✅ 存在' : '❌ 不存在'}`,
    `- 能力分數: ${result.hasAbilityScores ? '✅ 有記錄' : '⚠️ 全為零'}`,
    `- 完成課程: ${result.completedLessonsCount} 課`,
    `- 解鎖課程: ${result.unlockedLessonsCount} 課`,
    '',
    '📊 能力分數詳情:',
    `  發音: ${result.abilityScoresDetails.pronunciation}`,
    `  漢字: ${result.abilityScoresDetails.kanji}`,
    `  詞彙: ${result.abilityScoresDetails.vocabulary}`,
    `  文法: ${result.abilityScoresDetails.grammar}`,
    `  聽力: ${result.abilityScoresDetails.listening}`,
    `  應用: ${result.abilityScoresDetails.application}`,
    '',
    '💾 LocalStorage 數據:',
    `  第5課進度: ${result.localStorageData.lesson5Progress ? '✅ 有' : '❌ 無'}`,
    `  保存句子: ${result.localStorageData.lesson5Sentences} 句`,
    `  第5課 EXP: ${result.localStorageData.lesson5Exp}`,
    '',
    result.issues.length > 0 ? '⚠️ 發現問題:' : '✅ 沒有發現問題',
    ...result.issues.map(i => `  - ${i}`),
    '',
    result.recommendations.length > 0 ? '💡 建議:' : '',
    ...result.recommendations.map(r => `  - ${r}`),
  ];

  return lines.join('\n');
}
