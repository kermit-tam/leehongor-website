/**
 * 學習計時器
 * Study Timer - 記錄實際學習時間
 */

const STUDY_TIME_KEY = 'n5-study-time-total';
const STUDY_SESSION_KEY = 'n5-study-session';

interface StudySession {
  lessonId: string;
  startTime: number;
  lastActiveTime: number;
}

/**
 * 開始學習計時
 */
export function startStudyTimer(lessonId: string): void {
  if (typeof window === 'undefined') return;
  
  const session: StudySession = {
    lessonId,
    startTime: Date.now(),
    lastActiveTime: Date.now(),
  };
  
  localStorage.setItem(STUDY_SESSION_KEY, JSON.stringify(session));
}

/**
 * 更新活躍時間（用戶操作時調用）
 */
export function updateActiveTime(): void {
  if (typeof window === 'undefined') return;
  
  const sessionStr = localStorage.getItem(STUDY_SESSION_KEY);
  if (!sessionStr) return;
  
  const session: StudySession = JSON.parse(sessionStr);
  const now = Date.now();
  const timeSinceLastActive = now - session.lastActiveTime;
  
  // 如果用戶超過 5 分鐘冇操作，唔計入學習時間（視為離開）
  if (timeSinceLastActive < 5 * 60 * 1000) {
    // 正常學習中，更新最後活躍時間
    session.lastActiveTime = now;
    localStorage.setItem(STUDY_SESSION_KEY, JSON.stringify(session));
  }
}

/**
 * 暫停學習計時並保存
 */
export function pauseStudyTimer(): number {
  if (typeof window === 'undefined') return 0;
  
  const sessionStr = localStorage.getItem(STUDY_SESSION_KEY);
  if (!sessionStr) return 0;
  
  const session: StudySession = JSON.parse(sessionStr);
  const now = Date.now();
  const duration = now - session.startTime;
  
  // 扣除離開時間（超過5分鐘冇操作嘅部分）
  const awayTime = Math.max(0, now - session.lastActiveTime - 5 * 60 * 1000);
  const actualDuration = Math.max(0, duration - awayTime);
  
  // 保存到總學習時間（分鐘）
  const currentTotal = parseInt(localStorage.getItem(STUDY_TIME_KEY) || '0');
  const newTotal = currentTotal + Math.round(actualDuration / 1000 / 60);
  localStorage.setItem(STUDY_TIME_KEY, newTotal.toString());
  
  // 清除當前會話
  localStorage.removeItem(STUDY_SESSION_KEY);
  
  return newTotal;
}

/**
 * 獲取總學習時間（分鐘）
 */
export function getTotalStudyTime(): number {
  if (typeof window === 'undefined') return 0;
  
  // 檢查是否有進行中的會話
  const sessionStr = localStorage.getItem(STUDY_SESSION_KEY);
  let currentSessionTime = 0;
  
  if (sessionStr) {
    const session: StudySession = JSON.parse(sessionStr);
    const now = Date.now();
    const duration = now - session.startTime;
    const awayTime = Math.max(0, now - session.lastActiveTime - 5 * 60 * 1000);
    currentSessionTime = Math.max(0, duration - awayTime);
  }
  
  const savedTotal = parseInt(localStorage.getItem(STUDY_TIME_KEY) || '0');
  return savedTotal + Math.round(currentSessionTime / 1000 / 60);
}

/**
 * 重置學習時間
 */
export function resetStudyTime(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STUDY_TIME_KEY);
  localStorage.removeItem(STUDY_SESSION_KEY);
}
