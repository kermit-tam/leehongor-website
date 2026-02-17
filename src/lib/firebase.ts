/**
 * Firebase 配置和初始化
 * Firebase Configuration and Initialization
 * 
 * 使用說明：
 * 1. 在 Firebase Console 創建新項目: https://console.firebase.google.com/
 * 2. 啟用 Authentication（Google 登入）
 * 3. 創建 Firestore 資料庫
 * 4. （可選）升級到 Blaze 方案啟用 Storage
 * 5. 將配置填入下方 firebaseConfig 對象
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// ==================== Firebase 配置 ====================
// 你的 Firebase 項目配置
const firebaseConfig = {
  apiKey: "AIzaSyDXELnjUMZuV3X1bXHnzznDOD1ojvvDARw",
  authDomain: "leehongor-japanese.firebaseapp.com",
  projectId: "leehongor-japanese",
  storageBucket: "leehongor-japanese.firebasestorage.app",
  messagingSenderId: "358010923888",
  appId: "1:358010923888:web:81eeb47b543879ad4cfdb5"
};

// ==================== 初始化 Firebase ====================
// 避免重複初始化（Next.js SSR 環境）
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 初始化服務
export const auth = getAuth(app);
export const db = getFirestore(app);

// Storage 是可選的（免費方案不支援）
// 如果需要上傳圖片，請升級到 Blaze 方案
let storageInstance: FirebaseStorage | null = null;
try {
  storageInstance = getStorage(app);
} catch (error) {
  console.warn('Storage not available. Please upgrade to Blaze plan to use image upload features.');
}
export const storage = storageInstance;

// Google 登入提供者
export const googleProvider = new GoogleAuthProvider();

// 設置 Google 登入範圍（可選）
googleProvider.addScope('email');
googleProvider.addScope('profile');

// 導出 app 實例
export { app };

// ==================== Firestore 集合名稱 ====================
export const COLLECTIONS = {
  USERS: 'users',
  POSTS: 'posts',
  LESSONS: 'lessons',
  PRACTICE_RECORDS: 'practice_records',
  BADGES: 'badges',
  COMMENTS: 'comments',
} as const;

// ==================== 環境檢查 ====================
/**
 * 檢查 Firebase 是否正確配置
 */
export function isFirebaseConfigured(): boolean {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== 'your-api-key' &&
    firebaseConfig.projectId &&
    firebaseConfig.projectId !== 'your-project-id'
  );
}

/**
 * 獲取配置警告訊息
 */
export function getFirebaseConfigWarning(): string | null {
  if (!isFirebaseConfigured()) {
    return '⚠️ Firebase 尚未配置。請在 src/lib/firebase.ts 中填入你的 Firebase 配置。';
  }
  return null;
}

/**
 * 檢查 Storage 是否可用
 */
export function isStorageAvailable(): boolean {
  return storageInstance !== null;
}
