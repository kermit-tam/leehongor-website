/**
 * 每日簽到獎勵彈窗
 * Daily Check-in Reward Modal
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';

export function CheckinModal() {
  const { checkinResult, clearCheckinResult, user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (checkinResult?.success) {
      setIsVisible(true);
    }
  }, [checkinResult]);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      clearCheckinResult();
    }, 300);
  };
  
  if (!checkinResult?.success) return null;
  
  const isFirstCheckin = checkinResult.streak === 1 && !checkinResult.isStreakContinued;
  
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />
          
          {/* 彈窗內容 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl pointer-events-auto text-center">
              {/* 標題 */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-6xl mb-4"
              >
                {isFirstCheckin ? '🎉' : '🔥'}
              </motion.div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isFirstCheckin ? '首次簽到成功！' : '簽到成功！'}
              </h2>
              
              {/* 獲得 EXP */}
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 mb-6">
                <div className="text-5xl font-bold text-amber-600 mb-2">
                  +{checkinResult.expEarned}
                </div>
                <div className="text-amber-700 font-medium">EXP</div>
              </div>
              
              {/* 連續登入 */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-3xl">🔥</span>
                <div>
                  <div className="text-3xl font-bold text-gray-800">
                    {checkinResult.streak}
                  </div>
                  <div className="text-sm text-gray-500">連續登入天數</div>
                </div>
              </div>
              
              {/* 鼓勵文字 */}
              <p className="text-gray-600 mb-6">
                {checkinResult.streak >= 7 
                  ? '太棒了！你已經養成了良好的學習習慣！' 
                  : checkinResult.streak >= 3 
                    ? '繼續保持！連續登入獎勵會越來越多！'
                    : '明天記得再來簽到，繼續累積連續天數！'}
              </p>
              
              {/* 獎勵說明 */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600">
                <div className="flex justify-between mb-2">
                  <span>連續 1 天</span>
                  <span className="font-medium">10 EXP</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>連續 2 天</span>
                  <span className="font-medium">15 EXP</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>連續 3 天</span>
                  <span className="font-medium">20 EXP</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>連續 4-5 天</span>
                  <span className="font-medium">25-30 EXP</span>
                </div>
                <div className="flex justify-between text-amber-600">
                  <span>連續 6 天+</span>
                  <span className="font-bold">50 EXP</span>
                </div>
              </div>
              
              {/* 關閉按鈕 */}
              <button
                onClick={handleClose}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                繼續學習
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
