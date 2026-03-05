/**
 * 遊戲反饋系統
 * Game Feedback System - Confetti, Combo, Lives, etc.
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==================== Confetti Effect ====================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  size: number;
}

export function triggerConfetti(element?: HTMLElement | null) {
  // 使用 canvas-confetti 如果可用，否則使用簡易 CSS 版本
  if (typeof window !== 'undefined') {
    import('canvas-confetti').then((confetti) => {
      const rect = element?.getBoundingClientRect();
      const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
      const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;

      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ['#A8B5A0', '#C4B9AC', '#E0D5C7', '#D5E0D7', '#B8A8A0'],
      });
    }).catch(() => {
      // 後備方案：CSS confetti
      createCSSConfetti();
    });
  }
}

function createCSSConfetti() {
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
  `;
  document.body.appendChild(container);

  const colors = ['#A8B5A0', '#C4B9AC', '#E0D5C7', '#D5E0D7', '#B8A8A0'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    const size = Math.random() * 10 + 5;
    confetti.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: 50%;
      top: 50%;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
    `;
    container.appendChild(confetti);

    // 動畫
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 200 + 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 200;

    confetti.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${vx}px, ${vy + 400}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
      duration: 1500,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    }).onfinish = () => confetti.remove();
  }

  setTimeout(() => container.remove(), 1600);
}

// ==================== Screen Flash Effect ====================

export function triggerErrorFlash() {
  if (typeof window === 'undefined') return;

  const flash = document.createElement('div');
  flash.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(184, 168, 160, 0.3);
    pointer-events: none;
    z-index: 9998;
  `;
  document.body.appendChild(flash);

  flash.animate([
    { opacity: 1 },
    { opacity: 0 }
  ], {
    duration: 300,
    easing: 'ease-out',
  }).onfinish = () => flash.remove();
}

// ==================== Sound Effects ====================

export function playCorrectSound() {
  if (typeof window === 'undefined') return;
  
  try {
    const AudioContextClass = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
    oscillator.frequency.exponentialRampToValueAtTime(1760, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch {
    console.log('Audio not supported');
  }
}

export function playWrongSound() {
  if (typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch {
    console.log('Audio not supported');
  }
}

// ==================== Combo Display Component ====================

interface ComboDisplayProps {
  combo: number;
}

export function ComboDisplay({ combo }: ComboDisplayProps) {
  if (combo < 2) return null;

  const comboTexts: Record<number, string> = {
    2: 'Good!',
    3: 'Nice!',
    4: 'Great!',
    5: 'Excellent!',
    6: 'Amazing!',
    7: 'Fantastic!',
    8: 'Incredible!',
    9: 'Unstoppable!',
    10: 'LEGENDARY!',
  };

  const text = comboTexts[Math.min(combo, 10)] || 'LEGENDARY!';
  const color = combo >= 5 ? '#A8B5A0' : combo >= 3 ? '#C4B9AC' : '#8C8C8C';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={combo}
        initial={{ scale: 0, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0, y: -20, opacity: 0 }}
        className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      >
        <div 
          className="text-4xl font-bold text-center"
          style={{ color }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{ duration: 0.5 }}
          >
            {combo} COMBO!
          </motion.div>
          <motion.div 
            className="text-lg mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ==================== Lives Display Component ====================

interface LivesDisplayProps {
  lives: number;
  maxLives?: number;
}

export function LivesDisplay({ lives, maxLives = 5 }: LivesDisplayProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxLives }).map((_, i) => (
        <motion.div
          key={i}
          initial={i >= lives ? { scale: 1 } : false}
          animate={i >= lives ? { scale: [1, 0.5, 0], opacity: [1, 0.5, 0] } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <svg 
            className={`w-6 h-6 ${i < lives ? 'text-red-400' : 'text-gray-300'}`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
              clipRule="evenodd" 
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ==================== Score Popup Component ====================

interface ScorePopupProps {
  score: number;
  x: number;
  y: number;
  onComplete?: () => void;
}

export function ScorePopup({ score, x, y, onComplete }: ScorePopupProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete || (() => {}), 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: 0, y: -50, scale: 1.5 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="fixed z-50 pointer-events-none text-2xl font-bold"
      style={{ left: x, top: y }}
    >
      <span className={score > 0 ? 'text-[#A8B5A0]' : 'text-[#B8A8A0]'}>
        {score > 0 ? `+${score}` : score}
      </span>
    </motion.div>
  );
}

// ==================== Game HUD Component ====================

interface GameHUDProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  lives: number;
  combo: number;
  timeLeft?: number;
  maxTime?: number;
}

export function GameHUD({ 
  currentQuestion, 
  totalQuestions, 
  score, 
  lives, 
  combo, 
  timeLeft, 
  maxTime 
}: GameHUDProps) {
  return (
    <div className="bg-white border-b border-[#E5E5E5] p-4 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* 進度 */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-[#8C8C8C]">
            題目 {currentQuestion}/{totalQuestions}
          </div>
          <div className="w-32 h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#A8B5A0]"
              initial={{ width: 0 }}
              animate={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* 中間：生命和連擊 */}
        <div className="flex items-center gap-6">
          <LivesDisplay lives={lives} />
          {combo >= 2 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-[#A8B5A0] font-bold"
            >
              🔥 {combo}
            </motion.div>
          )}
        </div>

        {/* 右側：分數和時間 */}
        <div className="flex items-center gap-4">
          {timeLeft !== undefined && maxTime && (
            <div className={`text-sm font-medium ${timeLeft < 5 ? 'text-red-500' : 'text-[#4A4A4A]'}`}>
              {timeLeft}s
            </div>
          )}
          <div className="text-lg font-bold text-[#4A4A4A]">
            {score}
          </div>
        </div>
      </div>
    </div>
  );
}
