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
import type { User } from '@/types';

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
          setUser(userData);
        } else {
          // 新用戶，創建資料
          await UserService.createUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || '',
            avatar: firebaseUser.photoURL || '',
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
        // 創建新用戶
        await UserService.createUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
          avatar: firebaseUser.photoURL || '',
        });
      }
      
      // 刷新用戶資料
      await refreshUser();
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

  const value: AuthContextType = {
    firebaseUser,
    user,
    isLoading,
    isAdmin: user?.role === 'admin',
    loginWithGoogle,
    logout,
    refreshUser,
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
