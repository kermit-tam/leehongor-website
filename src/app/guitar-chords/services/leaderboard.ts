/**
 * 結他和弦排行榜服務
 * Guitar Chords Leaderboard Service
 */

import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  addDoc, 
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db, COLLECTIONS } from '@/lib/firebase';
import type { Difficulty } from '../page';

export interface LeaderboardEntry {
  id?: string;
  playerName: string;
  score: number;
  totalQuestions: number;
  difficulty: Difficulty;
  difficultyName: string;
  timeElapsed: number;
  accuracy: number;
  timestamp: any;
  rank?: number;
}

const COLLECTION_NAME = COLLECTIONS.GUITAR_CHORDS_LEADERBOARD;

/**
 * 提交分數到排行榜
 */
export async function submitScore(
  playerName: string,
  score: number,
  totalQuestions: number,
  difficulty: Difficulty,
  difficultyName: string,
  timeElapsed: number
): Promise<string | null> {
  try {
    const accuracy = Math.round((score / totalQuestions) * 100);
    
    const entry: Omit<LeaderboardEntry, 'id'> = {
      playerName: playerName.trim() || '匿名玩家',
      score,
      totalQuestions,
      difficulty,
      difficultyName,
      timeElapsed,
      accuracy,
      timestamp: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), entry);
    return docRef.id;
  } catch (error) {
    console.error('提交分數失敗:', error);
    return null;
  }
}

/**
 * 獲取排行榜
 */
export async function getLeaderboard(
  difficulty?: Difficulty,
  maxResults: number = 50
): Promise<LeaderboardEntry[]> {
  try {
    let q;
    
    if (difficulty) {
      q = query(
        collection(db, COLLECTION_NAME),
        where('difficulty', '==', difficulty),
        orderBy('score', 'desc'),
        orderBy('timeElapsed', 'asc'),
        limit(maxResults)
      );
    } else {
      q = query(
        collection(db, COLLECTION_NAME),
        orderBy('score', 'desc'),
        orderBy('timeElapsed', 'asc'),
        limit(maxResults)
      );
    }
    
    const snapshot = await getDocs(q);
    const entries: LeaderboardEntry[] = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data() as LeaderboardEntry;
      entries.push({
        ...data,
        id: doc.id,
      });
    });
    
    // 添加排名
    return entries.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
  } catch (error) {
    console.error('獲取排行榜失敗:', error);
    return [];
  }
}

/**
 * 獲取排行榜統計
 */
export async function getLeaderboardStats(): Promise<{
  totalPlayers: number;
  totalGames: number;
  avgScore: number;
}> {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    let totalScore = 0;
    const uniquePlayers = new Set<string>();
    
    snapshot.forEach((doc) => {
      const data = doc.data() as LeaderboardEntry;
      totalScore += data.score;
      uniquePlayers.add(data.playerName);
    });
    
    return {
      totalPlayers: uniquePlayers.size,
      totalGames: snapshot.size,
      avgScore: snapshot.size > 0 ? Math.round(totalScore / snapshot.size) : 0,
    };
  } catch (error) {
    console.error('獲取統計失敗:', error);
    return {
      totalPlayers: 0,
      totalGames: 0,
      avgScore: 0,
    };
  }
}
