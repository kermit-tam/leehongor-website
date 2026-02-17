/**
 * Firestore 數據操作服務
 * Firestore Data Service
 * 
 * 包含所有與 Firestore 交互的函數
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp,
  arrayUnion,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { db, COLLECTIONS } from './firebase';
import type {
  User,
  Post,
  Lesson,
  PracticeRecord,
  Badge,
  PostCategory,
  QuizScores,
  NewBestRecord,
  QuizDimension,
} from '@/types';

// ==================== 輔助函數 ====================

/**
 * 將 Firestore Timestamp 轉換為 Date
 */
function timestampToDate(timestamp: Timestamp | Date | undefined): Date {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  return timestamp || new Date();
}

/**
 * 轉換用戶數據
 */
function convertUserData(docData: DocumentData): User {
  return {
    ...docData,
    lastLogin: timestampToDate(docData.lastLogin),
    createdAt: docData.createdAt ? timestampToDate(docData.createdAt) : undefined,
  } as User;
}

/**
 * 轉換文章數據
 */
function convertPostData(docData: DocumentData, id: string): Post {
  return {
    ...docData,
    id,
    vocabularies: docData.vocabularies || [],
    quizzes: docData.quizzes || [],
    createdAt: timestampToDate(docData.createdAt),
    updatedAt: docData.updatedAt ? timestampToDate(docData.updatedAt) : undefined,
  } as Post;
}

/**
 * 轉換課程數據
 */
function convertLessonData(docData: DocumentData, id: string): Lesson {
  return {
    ...docData,
    id,
    createdAt: docData.createdAt ? timestampToDate(docData.createdAt) : undefined,
    updatedAt: docData.updatedAt ? timestampToDate(docData.updatedAt) : undefined,
  } as Lesson;
}

/**
 * 轉換練習記錄
 */
function convertPracticeRecord(docData: DocumentData, id: string): PracticeRecord {
  return {
    ...docData,
    id,
    completedAt: timestampToDate(docData.completedAt),
  } as PracticeRecord;
}

// ==================== 用戶服務 ====================

export const UserService = {
  /**
   * 獲取用戶資料
   */
  async getUser(uid: string): Promise<User | null> {
    const docRef = doc(db, COLLECTIONS.USERS, uid);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    return convertUserData(docSnap.data());
  },

  /**
   * 創建新用戶
   */
  async createUser(userData: Partial<User>): Promise<void> {
    const { uid, ...data } = userData;
    if (!uid) throw new Error('User ID is required');
    
    const defaultUser: User = {
      uid,
      email: data.email || '',
      name: data.name || '',
      avatar: data.avatar || '',
      role: 'user',
      achievementExp: 0,
      level: 1,
      streakDays: 0,
      badges: [],
      abilityScores: {
        pronunciation: { best: 0, attempts: 0 },
        kanji: { best: 0, attempts: 0 },
        vocabulary: { best: 0, attempts: 0 },
        grammar: { best: 0, attempts: 0 },
        listening: { best: 0, attempts: 0 },
        application: { best: 0, attempts: 0 },
      },
      unlockedLessons: ['lesson-0'], // 預設解鎖第0課
      completedLessons: [],
      lastLogin: new Date(),
      createdAt: new Date(),
    };
    
    await setDoc(doc(db, COLLECTIONS.USERS, uid), defaultUser);
  },

  /**
   * 更新用戶資料
   */
  async updateUser(uid: string, data: Partial<User>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.USERS, uid);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  },

  /**
   * 設置用戶為管理員
   */
  async setAdmin(uid: string): Promise<void> {
    await this.updateUser(uid, { role: 'admin' });
  },

  /**
   * 更新最後登入時間
   */
  async updateLastLogin(uid: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.USERS, uid);
    await updateDoc(docRef, {
      lastLogin: new Date(),
    });
  },

  /**
   * 計算等級
   */
  calculateLevel(exp: number): number {
    // 簡單的等級計算：每 500 exp 升一級
    return Math.floor(exp / 500) + 1;
  },

  /**
   * 獲取下一級所需經驗
   */
  getNextLevelExp(level: number): number {
    return level * 500;
  },
};

// ==================== 文章服務 ====================

export const PostService = {
  /**
   * 獲取所有文章
   */
  async getPosts(options?: {
    category?: PostCategory;
    tag?: string;
    limit?: number;
    lastDoc?: QueryDocumentSnapshot<DocumentData>;
  }): Promise<{ posts: Post[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null }> {
    let q = query(
      collection(db, COLLECTIONS.POSTS),
      orderBy('createdAt', 'desc')
    );

    if (options?.category) {
      q = query(q, where('category', '==', options.category));
    }

    if (options?.tag) {
      q = query(q, where('tags', 'array-contains', options.tag));
    }

    if (options?.limit) {
      q = query(q, limit(options.limit));
    }

    if (options?.lastDoc) {
      q = query(q, startAfter(options.lastDoc));
    }

    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => convertPostData(doc.data(), doc.id));
    const lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    return { posts, lastDoc };
  },

  /**
   * 獲取單篇文章
   */
  async getPost(id: string): Promise<Post | null> {
    const docRef = doc(db, COLLECTIONS.POSTS, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    return convertPostData(docSnap.data(), docSnap.id);
  },

  /**
   * 創建文章
   */
  async createPost(post: Omit<Post, 'id' | 'createdAt'>): Promise<string> {
    const docRef = doc(collection(db, COLLECTIONS.POSTS));
    const newPost: Post = {
      ...post,
      id: docRef.id,
      createdAt: new Date(),
    };
    
    await setDoc(docRef, newPost);
    return docRef.id;
  },

  /**
   * 更新文章
   */
  async updatePost(id: string, data: Partial<Post>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.POSTS, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  },

  /**
   * 刪除文章
   */
  async deletePost(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.POSTS, id));
  },

  /**
   * 獲取所有分類
   */
  async getCategories(): Promise<string[]> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.POSTS));
    const categories = new Set<string>();
    snapshot.docs.forEach(doc => {
      categories.add(doc.data().category);
    });
    return Array.from(categories);
  },
};

// ==================== 課程服務 ====================

export const LessonService = {
  /**
   * 獲取所有課程
   */
  async getLessons(): Promise<Lesson[]> {
    const q = query(
      collection(db, COLLECTIONS.LESSONS),
      orderBy('order', 'asc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => convertLessonData(doc.data(), doc.id));
  },

  /**
   * 獲取單個課程
   */
  async getLesson(id: string): Promise<Lesson | null> {
    const docRef = doc(db, COLLECTIONS.LESSONS, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    return convertLessonData(docSnap.data(), docSnap.id);
  },

  /**
   * 創建課程
   */
  async createLesson(lesson: Omit<Lesson, 'id' | 'createdAt'>): Promise<string> {
    const docRef = doc(collection(db, COLLECTIONS.LESSONS));
    const newLesson: Lesson = {
      ...lesson,
      id: docRef.id,
      createdAt: new Date(),
    };
    
    await setDoc(docRef, newLesson);
    return docRef.id;
  },

  /**
   * 更新課程
   */
  async updateLesson(id: string, data: Partial<Lesson>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.LESSONS, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  },

  /**
   * 刪除課程
   */
  async deleteLesson(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.LESSONS, id));
  },

  /**
   * 檢查課程是否已解鎖
   */
  isLessonUnlocked(lesson: Lesson, completedLessons: string[]): boolean {
    if (lesson.unlockRequirement === null) return true;
    return completedLessons.includes(lesson.unlockRequirement);
  },
};

// ==================== 測驗服務 ====================

export const QuizService = {
  /**
   * 計算測驗分數
   */
  calculateScores(
    questions: { dimension: QuizDimension; correct: number }[],
    answers: { questionId: string; selected: number }[]
  ): { scores: QuizScores; isNewBest: NewBestRecord } {
    const dimensionScores: Record<QuizDimension, { total: number; correct: number }> = {
      pronunciation: { total: 0, correct: 0 },
      kanji: { total: 0, correct: 0 },
      vocabulary: { total: 0, correct: 0 },
      grammar: { total: 0, correct: 0 },
      listening: { total: 0, correct: 0 },
      application: { total: 0, correct: 0 },
    };

    // 統計各維度答對數
    questions.forEach((q, index) => {
      const answer = answers[index];
      dimensionScores[q.dimension].total += 1;
      if (answer && answer.selected === q.correct) {
        dimensionScores[q.dimension].correct += 1;
      }
    });

    // 計算各維度得分（百分比）
    const scores: QuizScores = { overall: 0 };
    let totalScore = 0;
    let dimensionCount = 0;

    Object.entries(dimensionScores).forEach(([dim, data]) => {
      if (data.total > 0) {
        const score = Math.round((data.correct / data.total) * 100);
        scores[dim] = score;
        totalScore += score;
        dimensionCount += 1;
      }
    });

    // 總分
    scores.overall = dimensionCount > 0 ? Math.round(totalScore / dimensionCount) : 0;

    return { scores, isNewBest: {} };
  },

  /**
   * 提交測驗結果
   */
  async submitQuiz(
    userId: string,
    lessonId: string,
    scores: QuizScores,
    answers: { questionId: string; selected: number; correct: boolean }[]
  ): Promise<{
    isNewBest: NewBestRecord;
    achievementExpEarned: number;
    unlockedNextLesson: boolean;
  }> {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error('User not found');
    }

    const userData = convertUserData(userSnap.data());
    const batch = writeBatch(db);

    // 檢查是否破紀錄
    const isNewBest: NewBestRecord = {};
    const updatedAbilityScores = { ...userData.abilityScores };
    
    Object.entries(scores).forEach(([dimension, score]) => {
      if (dimension === 'overall') return;
      
      const currentBest = userData.abilityScores[dimension as QuizDimension]?.best || 0;
      if (score > currentBest) {
        isNewBest[dimension] = true;
        updatedAbilityScores[dimension as QuizDimension] = {
          best: score,
          attempts: (userData.abilityScores[dimension as QuizDimension]?.attempts || 0) + 1,
        };
      }
    });

    // 成就分數（每次都加）
    const expEarned = 50;
    const newExp = userData.achievementExp + expEarned;
    const newLevel = UserService.calculateLevel(newExp);

    // 檢查是否及格（60分）
    const passed = scores.overall >= 60;
    let unlockedNextLesson = false;

    // 更新用戶數據
    batch.update(userRef, {
      achievementExp: increment(expEarned),
      level: newLevel,
      abilityScores: updatedAbilityScores,
      ...(passed && !userData.completedLessons.includes(lessonId) && {
        completedLessons: arrayUnion(lessonId),
      }),
    });

    // 如果及格，解鎖下一課
    if (passed && !userData.completedLessons.includes(lessonId)) {
      const lessons = await LessonService.getLessons();
      const currentLesson = lessons.find(l => l.id === lessonId);
      const nextLesson = lessons.find(l => l.unlockRequirement === lessonId);
      
      if (nextLesson && !userData.unlockedLessons.includes(nextLesson.id)) {
        batch.update(userRef, {
          unlockedLessons: arrayUnion(nextLesson.id),
        });
        unlockedNextLesson = true;
      }
    }

    // 創建練習記錄
    const recordRef = doc(collection(db, COLLECTIONS.PRACTICE_RECORDS));
    const record: PracticeRecord = {
      userId,
      lessonId,
      scores,
      isNewBest,
      achievementExpEarned: expEarned,
      answers,
      completedAt: new Date(),
    };
    batch.set(recordRef, record);

    await batch.commit();

    return {
      isNewBest,
      achievementExpEarned: expEarned,
      unlockedNextLesson,
    };
  },
};

// ==================== 排行榜服務 ====================

export const LeaderboardService = {
  /**
   * 獲取排行榜（按成就分數排序）
   */
  async getLeaderboard(limitCount: number = 50): Promise<{
    rank: number;
    uid: string;
    name: string;
    avatar: string;
    achievementExp: number;
    level: number;
    streakDays: number;
    badgesCount: number;
  }[]> {
    const q = query(
      collection(db, COLLECTIONS.USERS),
      orderBy('achievementExp', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc, index) => {
      const data = doc.data();
      return {
        rank: index + 1,
        uid: doc.id,
        name: data.name || 'Unknown',
        avatar: data.avatar || '',
        achievementExp: data.achievementExp || 0,
        level: data.level || 1,
        streakDays: data.streakDays || 0,
        badgesCount: (data.badges || []).length,
      };
    });
  },

  /**
   * 獲取用戶排名
   */
  async getUserRank(userId: string): Promise<number> {
    const user = await UserService.getUser(userId);
    if (!user) return 0;

    const q = query(
      collection(db, COLLECTIONS.USERS),
      where('achievementExp', '>', user.achievementExp)
    );

    const snapshot = await getDocs(q);
    return snapshot.size + 1;
  },
};
