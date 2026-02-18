/**
 * 雙軌進度系統：學習率 + 熟練度
 * Dual Progress System: Learning Rate + Proficiency
 */

// ==================== 學習率 (Learning Rate) ====================
// 反映學習參與度和進度，唔考核能力

export interface LearningProgress {
  // 完成狀態
  completedUnits: string[];  // 已完成的單元ID列表
  totalTimeSpent: number;    // 總學習時間（分鐘）
  
  // 每日學習
  dailyLogins: string[];     // 登入日期列表 (YYYY-MM-DD)
  streakDays: number;        // 連續學習天數
  
  // 學習行為統計
  cardsFlipped: number;      // 翻卡次數
  audioPlayed: number;       // 播放語音次數
  grammarViewed: number;     // 查看文法次數
  dialogueRead: number;      // 閱讀對話次數
}

// 學習率計算
export function calculateLearningRate(progress: LearningProgress, totalUnits: number): {
  rate: number;           // 0-100%
  completedCount: number;
  totalCount: number;
  status: 'beginner' | 'active' | 'dedicated' | 'master';
} {
  const completedCount = progress.completedUnits.length;
  const rate = totalUnits > 0 ? Math.round((completedCount / totalUnits) * 100) : 0;
  
  let status: 'beginner' | 'active' | 'dedicated' | 'master' = 'beginner';
  if (rate >= 100) status = 'master';
  else if (rate >= 75) status = 'dedicated';
  else if (rate >= 50) status = 'active';
  
  return { rate, completedCount, totalCount: totalUnits, status };
}

// ==================== 熟練度 (Proficiency) ====================
// 反映實際掌握程度，通過測驗評估

export interface ProficiencyData {
  // 測驗記錄
  quizResults: {
    unitId: string;
    score: number;        // 0-100
    date: string;         // ISO date
    attempts: number;     // 嘗試次數
  }[];
  
  // 各項能力評分
  vocabularyScore: number;   // 詞彙 0-100
  grammarScore: number;      // 文法 0-100
  listeningScore: number;    // 聽力 0-100
  speakingScore: number;     // 口語 0-100 (未來擴展)
  
  // 綜合熟練度
  overallLevel: 'N5-Beginner' | 'N5-Elementary' | 'N5-Intermediate' | 'N5-Advanced' | 'N5-Master';
}

// 熟練度計算
export function calculateProficiency(data: ProficiencyData): {
  overall: number;        // 0-100
  vocabulary: number;
  grammar: number;
  listening: number;
  level: string;
  weakAreas: string[];
  strongAreas: string[];
} {
  // 計算平均分
  const quizAvg = data.quizResults.length > 0
    ? data.quizResults.reduce((sum, r) => sum + r.score, 0) / data.quizResults.length
    : 0;
  
  // 各項能力（測驗佔70%，專項評估佔30%）
  const vocabulary = Math.round(quizAvg * 0.7 + data.vocabularyScore * 0.3);
  const grammar = Math.round(quizAvg * 0.7 + data.grammarScore * 0.3);
  const listening = Math.round(quizAvg * 0.7 + data.listeningScore * 0.3);
  
  // 綜合熟練度
  const overall = Math.round((vocabulary + grammar + listening) / 3);
  
  // 評估強弱項
  const areas = [
    { name: '詞彙', score: vocabulary },
    { name: '文法', score: grammar },
    { name: '聽力', score: listening },
  ];
  
  const weakAreas = areas.filter(a => a.score < 60).map(a => a.name);
  const strongAreas = areas.filter(a => a.score >= 80).map(a => a.name);
  
  // 等級評定
  let level = 'N5-Beginner';
  if (overall >= 95) level = 'N5-Master';
  else if (overall >= 85) level = 'N5-Advanced';
  else if (overall >= 70) level = 'N5-Intermediate';
  else if (overall >= 50) level = 'N5-Elementary';
  
  return { overall, vocabulary, grammar, listening, level, weakAreas, strongAreas };
}

// ==================== 本地存儲管理 ====================

const STORAGE_KEYS = {
  learning: 'n5-learning-progress',
  proficiency: 'n5-proficiency-data',
  expHistory: 'n5-exp-history',
};

// 學習進度存取
export function saveLearningProgress(progress: LearningProgress) {
  localStorage.setItem(STORAGE_KEYS.learning, JSON.stringify(progress));
}

export function loadLearningProgress(): LearningProgress {
  const saved = localStorage.getItem(STORAGE_KEYS.learning);
  if (saved) return JSON.parse(saved);
  
  return {
    completedUnits: [],
    totalTimeSpent: 0,
    dailyLogins: [],
    streakDays: 0,
    cardsFlipped: 0,
    audioPlayed: 0,
    grammarViewed: 0,
    dialogueRead: 0,
  };
}

// 熟練度數據存取
export function saveProficiencyData(data: ProficiencyData) {
  localStorage.setItem(STORAGE_KEYS.proficiency, JSON.stringify(data));
}

export function loadProficiencyData(): ProficiencyData {
  const saved = localStorage.getItem(STORAGE_KEYS.proficiency);
  if (saved) return JSON.parse(saved);
  
  return {
    quizResults: [],
    vocabularyScore: 0,
    grammarScore: 0,
    listeningScore: 0,
    speakingScore: 0,
    overallLevel: 'N5-Beginner',
  };
}

// ==================== 進度更新函數 ====================

export function recordUnitComplete(unitId: string) {
  const progress = loadLearningProgress();
  if (!progress.completedUnits.includes(unitId)) {
    progress.completedUnits.push(unitId);
    saveLearningProgress(progress);
  }
  return progress;
}

export function recordQuizResult(unitId: string, score: number) {
  const data = loadProficiencyData();
  
  const existing = data.quizResults.find(r => r.unitId === unitId);
  if (existing) {
    existing.score = Math.max(existing.score, score); // 保留最高分
    existing.attempts += 1;
    existing.date = new Date().toISOString();
  } else {
    data.quizResults.push({
      unitId,
      score,
      date: new Date().toISOString(),
      attempts: 1,
    });
  }
  
  saveProficiencyData(data);
  return data;
}

export function recordLearningActivity(type: 'flip' | 'audio' | 'grammar' | 'dialogue') {
  const progress = loadLearningProgress();
  
  switch (type) {
    case 'flip':
      progress.cardsFlipped += 1;
      break;
    case 'audio':
      progress.audioPlayed += 1;
      break;
    case 'grammar':
      progress.grammarViewed += 1;
      break;
    case 'dialogue':
      progress.dialogueRead += 1;
      break;
  }
  
  saveLearningProgress(progress);
  return progress;
}

// ==================== 進度顯示組件 ====================

export interface ProgressDisplayProps {
  learningRate: number;
  proficiency: number;
  completedUnits: number;
  totalUnits: number;
  quizCount: number;
  averageScore: number;
}

// 獲取進度狀態描述
export function getLearningStatus(rate: number): { label: string; color: string; icon: string } {
  if (rate >= 100) return { label: '學習達人', color: '#4CAF50', icon: '🏆' };
  if (rate >= 75) return { label: '勤奮學員', color: '#8BC34A', icon: '📚' };
  if (rate >= 50) return { label: '積極學習', color: '#FFC107', icon: '✏️' };
  if (rate >= 25) return { label: '初學者', color: '#FF9800', icon: '🌱' };
  return { label: '開始學習', color: '#9E9E9E', icon: '👋' };
}

export function getProficiencyStatus(level: string): { label: string; color: string; description: string } {
  const levels: Record<string, { label: string; color: string; description: string }> = {
    'N5-Master': { label: 'N5 達人', color: '#4CAF50', description: '完全掌握N5內容' },
    'N5-Advanced': { label: 'N5 進階', color: '#8BC34A', description: '良好掌握N5內容' },
    'N5-Intermediate': { label: 'N5 中級', color: '#FFC107', description: '基本掌握N5內容' },
    'N5-Elementary': { label: 'N5 初級', color: '#FF9800', description: '初步了解N5內容' },
    'N5-Beginner': { label: 'N5 入門', color: '#9E9E9E', description: '剛開始學習N5' },
  };
  return levels[level] || levels['N5-Beginner'];
}
