/**
 * 認證上下文
 * Authentication Context
 * 
 * 提供全局認證狀態和功能
 */

'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { UserService } from './firestore';
import { performCheckin, CheckinResult } from './daily-checkin';
import type { User } from '@/types';

// ==================== Admin 用戶配置 ====================
// 這些郵箱會自動設為管理員
const ADMIN_EMAILS = ['Kermit.tam@gmail.com', 'kermit.tam@gmail.com'];

// ==================== Context 類型定義 ====================

interface AuthContextType {
  // 用戶狀態
  firebaseUser: FirebaseUser | null;
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  
  // 認證操作
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  
  // 輔助函數
  refreshUser: () => Promise<void>;
  
  // 簽到功能
  checkin: () => Promise<CheckinResult | null>;
  checkinResult: CheckinResult | null;
  clearCheckinResult: () => void;
}

// ==================== 創建 Context ====================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ==================== Provider 組件 ====================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [checkinResult, setCheckinResult] = useState<CheckinResult | null>(null);

  // 監聽認證狀態變化
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        // 獲取用戶資料
        const userData = await UserService.getUser(firebaseUser.uid);
        
        if (userData) {
          // 更新最後登入時間
          await UserService.updateLastLogin(firebaseUser.uid);
          
          // 檢查是否為 Admin 郵箱但未設為 admin
          if (firebaseUser.email && 
              ADMIN_EMAILS.includes(firebaseUser.email) && 
              userData.role !== 'admin') {
            await UserService.setAdmin(firebaseUser.uid);
            // 重新獲取用戶資料
            const updatedUser = await UserService.getUser(firebaseUser.uid);
            setUser(updatedUser);
          } else {
            setUser(userData);
          }
        } else {
          // 新用戶，創建資料
          const isAdmin = firebaseUser.email && ADMIN_EMAILS.includes(firebaseUser.email);
          
          await UserService.createUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || '',
            avatar: firebaseUser.photoURL || '',
            role: isAdmin ? 'admin' : 'user',
          });
          
          const newUser = await UserService.getUser(firebaseUser.uid);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Google 登入
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      // 檢查是否為新用戶
      const existingUser = await UserService.getUser(firebaseUser.uid);
      
      if (!existingUser) {
        // 創建新用戶，檢查是否為 Admin
        const isAdmin = firebaseUser.email && ADMIN_EMAILS.includes(firebaseUser.email);
        
        await UserService.createUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
          avatar: firebaseUser.photoURL || '',
          role: isAdmin ? 'admin' : 'user',
        });
      } else {
        // 檢查現有用戶是否應該為 Admin
        if (firebaseUser.email && 
            ADMIN_EMAILS.includes(firebaseUser.email) && 
            existingUser.role !== 'admin') {
          await UserService.setAdmin(firebaseUser.uid);
        }
      }
      
      // 刷新用戶資料
      await refreshUser();
      
      // 執行每日簽到
      try {
        const result = await performCheckin(firebaseUser.uid);
        setCheckinResult(result);
        // 刷新用戶資料以獲取更新後的 EXP
        if (result.expEarned > 0) {
          await refreshUser();
        }
      } catch (checkinError) {
        console.error('Checkin error:', checkinError);
        // 簽到失敗不影響登入流程
      }
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  // 登出
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // 刷新用戶資料
  const refreshUser = async () => {
    if (firebaseUser) {
      const userData = await UserService.getUser(firebaseUser.uid);
      setUser(userData);
    }
  };

  // 手動觸發簽到（用於已登入用戶）
  const checkin = async (): Promise<CheckinResult | null> => {
    if (!firebaseUser) return null;
    try {
      const result = await performCheckin(firebaseUser.uid);
      setCheckinResult(result);
      if (result.expEarned > 0) {
        await refreshUser();
      }
      return result;
    } catch (error) {
      console.error('Checkin error:', error);
      return null;
    }
  };
  
  // 清除簽到結果
  const clearCheckinResult = () => {
    setCheckinResult(null);
  };
  
  const value: AuthContextType = {
    firebaseUser,
    user,
    isLoading,
    isAdmin: user?.role === 'admin',
    loginWithGoogle,
    logout,
    refreshUser,
    checkin,
    checkinResult,
    clearCheckinResult,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ==================== 自定義 Hook ====================

// 重新導出 GoogleLoginButton 組件
export { GoogleLoginButton } from '@/components/ui/button';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// ==================== 受保護路由 Hook ====================

import { useRouter } from 'next/navigation';

/**
 * 檢查是否已登入，否則重定向
 */
export function useRequireAuth(redirectTo: string = '/') {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  return { user, isLoading };
}

/**
 * 檢查是否為管理員，否則重定向
 */
export function useRequireAdmin(redirectTo: string = '/') {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/');
      } else if (!isAdmin) {
        router.push('/');
      }
    }
  }, [user, isLoading, isAdmin, router, redirectTo]);

  return { user, isLoading, isAdmin };
}
