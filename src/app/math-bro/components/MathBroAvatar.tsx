'use client';

import { motion } from 'framer-motion';

interface MathBroAvatarProps {
  isSpeaking?: boolean;
  emotion?: 'normal' | 'happy' | 'thinking' | 'encouraging';
  size?: 'sm' | 'md' | 'lg';
}

export function MathBroAvatar({ 
  isSpeaking = false, 
  emotion = 'normal',
  size = 'md' 
}: MathBroAvatarProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const getExpression = () => {
    switch (emotion) {
      case 'happy':
        return (
          <>
            {/* 笑眼 */}
            <path d="M28 45 Q35 40 42 45" stroke="white" strokeWidth="3" fill="none" />
            <path d="M58 45 Q65 40 72 45" stroke="white" strokeWidth="3" fill="none" />
            {/* 大笑嘴 */}
            <path d="M40 65 Q50 75 60 65" fill="white" />
          </>
        );
      case 'thinking':
        return (
          <>
            {/* 思考眼 */}
            <circle cx="35" cy="48" r="3" fill="white" />
            <circle cx="65" cy="48" r="3" fill="white" />
            {/* 問號 */}
            <text x="75" y="35" fontSize="20" fill="#FFD700">?</text>
          </>
        );
      case 'encouraging':
        return (
          <>
            {/* 閃亮眼 */}
            <circle cx="35" cy="48" r="4" fill="white" />
            <circle cx="65" cy="48" r="4" fill="white" />
            <text x="70" y="40" fontSize="16" fill="#FFD700">✨</text>
          </>
        );
      default:
        return (
          <>
            {/* 正常眼 */}
            <circle cx="35" cy="48" r="4" fill="white" />
            <circle cx="65" cy="48" r="4" fill="white" />
            {/* 正常嘴 */}
            <path d="M42 68 Q50 72 58 68" stroke="white" strokeWidth="3" fill="none" />
          </>
        );
    }
  };

  return (
    <motion.div 
      className={`${sizeClasses[size]} relative`}
      animate={isSpeaking ? {
        scale: [1, 1.05, 1],
        rotate: [-2, 2, -2, 0],
      } : {}}
      transition={isSpeaking ? {
        duration: 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      } : {}}
    >
      {/* 背景光環 */}
      {isSpeaking && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-50"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
      
      {/* BRO 頭像 SVG */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* 頭部 */}
        <circle cx="50" cy="50" r="45" fill="url(#broGradient)" />
        
        {/* 漸變定義 */}
        <defs>
          <linearGradient id="broGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        
        {/* 表情 */}
        {getExpression()}
        
        {/* 耳機 */}
        <rect x="5" y="35" width="8" height="30" rx="4" fill="#374151" />
        <rect x="87" y="35" width="8" height="30" rx="4" fill="#374151" />
        <path d="M13 40 Q50 15 87 40" stroke="#374151" strokeWidth="4" fill="none" />
        
        {/* BRO 字 */}
        <text x="50" y="92" fontSize="10" textAnchor="middle" fill="white" fontWeight="bold">
          BRO
        </text>
      </svg>
      
      {/* 說話指示器 */}
      {isSpeaking && (
        <div className="absolute -bottom-1 -right-1 flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 0.5, 
                repeat: Infinity,
                delay: i * 0.15 
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
