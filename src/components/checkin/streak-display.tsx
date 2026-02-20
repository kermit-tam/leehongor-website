/**
 * 連續登入天數顯示
 * Streak Display Component
 */

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getCheckinStats } from '@/lib/daily-checkin';

interface StreakDisplayProps {
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StreakDisplay({ showLabel = true, size = 'md' }: StreakDisplayProps) {
  const { user, firebaseUser } = useAuth();
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadStreak() {
      if (!firebaseUser) {
        setLoading(false);
        return;
      }
      
      try {
        const stats = await getCheckinStats(firebaseUser.uid);
        if (stats) {
          setStreak(stats.streak || 0);
        }
      } catch (error) {
        console.error('Failed to load streak:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadStreak();
  }, [firebaseUser]);
  
  if (!user || loading) return null;
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };
  
  const iconSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  return (
    <div 
      className={`inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full font-medium ${sizeClasses[size]}`}
      title={`連續登入 ${streak} 天`}
    >
      <span className={iconSizes[size]}>🔥</span>
      {showLabel && <span>連續</span>}
      <span className="font-bold text-amber-800">{streak}</span>
      {showLabel && <span>天</span>}
    </div>
  );
}
