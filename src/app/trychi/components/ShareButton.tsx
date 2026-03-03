'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonProps {
  lessonId: string;
  lessonName: string;
}

export default function ShareButton({ lessonId, lessonName }: ShareButtonProps) {
  const [showCopied, setShowCopied] = useState(false);
  
  const shareUrl = `https://www.leehongor.com/trychi?lesson=${lessonId}`;
  
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${lessonName} - ${shareUrl}`);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      // 備用方案
      const textArea = document.createElement('textarea');
      textArea.value = `${lessonName} - ${shareUrl}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        分享給朋友
      </motion.button>
      
      <AnimatePresence>
        {showCopied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
          >
            ✓ 已複製連結！
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
