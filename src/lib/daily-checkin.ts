/**
 * 每日簽到系統
 * Daily Check-in System
 */

import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

const CHECKIN_COLLECTION = 'daily_checkins';
const STREAK_REWARDS = [10, 15, 20, 25, 30, 50]; // 連續簽到獎勵 EXP

export interface CheckinData {
  userId: string;
  lastCheckin: Date;
  streak: number;           // 連續簽到天數
  totalCheckins: number;    // 總簽到次數
  monthlyCheckins: number;  // 本月簽到次數
}

export interface CheckinResult {
  success: boolean;
  isNewDay: boolean;
  streak: number;
  expEarned: number;
  isStreakContinued: boolean;
  message: string;
}

/**
 * 檢查今日是否已簽到
 */
export async function hasCheckedInToday(userId: string): Promise<boolean> {
  const docRef = doc(db, CHECKIN_COLLECTION, userId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return false;
  
  const data = docSnap.data();
  // 正確處理 Firestore Timestamp
  const lastCheckinRaw = data.lastCheckin;
  const lastCheckin = lastCheckinRaw instanceof Timestamp 
    ? lastCheckinRaw.toDate() 
    : lastCheckinRaw instanceof Date 
      ? lastCheckinRaw 
      : new Date(lastCheckinRaw);
  const now = new Date();
  
  // 檢查是否為同一天（以香港時間計算）
  const lastCheckinHK = new Date(lastCheckin.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' }));
  const nowHK = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' }));
  
  return (
    lastCheckinHK.getFullYear() === nowHK.getFullYear() &&
    lastCheckinHK.getMonth() === nowHK.getMonth() &&
    lastCheckinHK.getDate() === nowHK.getDate()
  );
}

/**
 * 執行每日簽到
 */
export async function performCheckin(userId: string): Promise<CheckinResult> {
  const docRef = doc(db, CHECKIN_COLLECTION, userId);
  const docSnap = await getDoc(docRef);
  
  const now = new Date();
  const nowHK = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' }));
  
  if (!docSnap.exists()) {
    // 首次簽到
    await setDoc(docRef, {
      userId,
      lastCheckin: serverTimestamp(),
      streak: 1,
      totalCheckins: 1,
      monthlyCheckins: 1,
    });
    
    return {
      success: true,
      isNewDay: true,
      streak: 1,
      expEarned: STREAK_REWARDS[0],
      isStreakContinued: false,
      message: '🎉 首次簽到成功！獲得 10 EXP',
    };
  }
  
  const data = docSnap.data();
  // 正確處理 Firestore Timestamp
  const lastCheckinRaw = data.lastCheckin;
  const lastCheckin = lastCheckinRaw instanceof Timestamp 
    ? lastCheckinRaw.toDate() 
    : lastCheckinRaw instanceof Date 
      ? lastCheckinRaw 
      : new Date(lastCheckinRaw);
  const lastCheckinHK = new Date(lastCheckin.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' }));
  
  // 檢查今日是否已簽到
  if (
    lastCheckinHK.getFullYear() === nowHK.getFullYear() &&
    lastCheckinHK.getMonth() === nowHK.getMonth() &&
    lastCheckinHK.getDate() === nowHK.getDate()
  ) {
    return {
      success: false,
      isNewDay: false,
      streak: data.streak,
      expEarned: 0,
      isStreakContinued: true,
      message: '今日已簽到，明天再來吧！',
    };
  }
  
  // 檢查是否連續簽到
  const yesterday = new Date(nowHK);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const isStreakContinued =
    lastCheckinHK.getFullYear() === yesterday.getFullYear() &&
    lastCheckinHK.getMonth() === yesterday.getMonth() &&
    lastCheckinHK.getDate() === yesterday.getDate();
  
  const newStreak = isStreakContinued ? data.streak + 1 : 1;
  const rewardIndex = Math.min(newStreak - 1, STREAK_REWARDS.length - 1);
  const expEarned = STREAK_REWARDS[rewardIndex];
  
  // 檢查是否為新月
  const isNewMonth = lastCheckinHK.getMonth() !== nowHK.getMonth();
  
  // 更新資料
  await updateDoc(docRef, {
    lastCheckin: serverTimestamp(),
    streak: newStreak,
    totalCheckins: increment(1),
    monthlyCheckins: isNewMonth ? 1 : increment(1),
  });
  
  // 更新用戶 EXP
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    achievementExp: increment(expEarned),
  });
  
  let message = `🎉 簽到成功！獲得 ${expEarned} EXP\n`;
  if (isStreakContinued) {
    message += `🔥 連續簽到 ${newStreak} 天`;
  } else {
    message += `💪 新的開始！連續簽到 1 天`;
  }
  
  return {
    success: true,
    isNewDay: true,
    streak: newStreak,
    expEarned,
    isStreakContinued,
    message,
  };
}

/**
 * 獲取簽到統計
 */
export async function getCheckinStats(userId: string): Promise<Partial<CheckinData> | null> {
  const docRef = doc(db, CHECKIN_COLLECTION, userId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return null;
  
  return docSnap.data() as CheckinData;
}

/**
 * 獲取本月簽到日曆
 */
export async function getMonthlyCalendar(userId: string, year: number, month: number): Promise<boolean[]> {
  // 這需要額外的集合來存儲每日簽到記錄
  // 簡化版本：返回示例數據
  const daysInMonth = new Date(year, month, 0).getDate();
  return new Array(daysInMonth).fill(false);
}
