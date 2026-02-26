'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface PhonicsGuideProps {
  onBack: () => void;
}

// 輔音 C
const consonants = [
  { letter: 'b', sound: '/b/', example: 'bat', emoji: '🦇' },
  { letter: 'c', sound: '/k/', example: 'cat', emoji: '🐱' },
  { letter: 'd', sound: '/d/', example: 'dog', emoji: '🐕' },
  { letter: 'f', sound: '/f/', example: 'fan', emoji: '🌀' },
  { letter: 'h', sound: '/h/', example: 'hat', emoji: '🎩' },
  { letter: 'm', sound: '/m/', example: 'mat', emoji: '🧹' },
  { letter: 'p', sound: '/p/', example: 'pig', emoji: '🐷' },
  { letter: 'r', sound: '/r/', example: 'rat', emoji: '🐭' },
  { letter: 's', sound: '/s/', example: 'sun', emoji: '☀️' },
  { letter: 't', sound: '/t/', example: 'tap', emoji: '🚰' },
  { letter: 'v', sound: '/v/', example: 'van', emoji: '🚐' },
  { letter: 'w', sound: '/w/', example: 'wet', emoji: '💧' },
];

// 元音 V
const vowels = [
  { letter: 'a', sound: '/æ/', example: 'cat', emoji: '🐱', color: 'from-red-400 to-pink-500' },
  { letter: 'e', sound: '/e/', example: 'bed', emoji: '🛏️', color: 'from-green-400 to-emerald-500' },
  { letter: 'i', sound: '/ɪ/', example: 'pig', emoji: '🐷', color: 'from-purple-400 to-violet-500' },
  { letter: 'o', sound: '/ɒ/', example: 'dog', emoji: '🐕', color: 'from-orange-400 to-amber-500' },
  { letter: 'u', sound: '/ʌ/', example: 'bug', emoji: '🐛', color: 'from-blue-400 to-cyan-500' },
];

export default function PhonicsGuide({ onBack }: PhonicsGuideProps) {
  const [activeTab, setActiveTab] = useState<'consonant' | 'vowel'>('consonant');
  const [speaking, setSpeaking] = useState<string | null>(null);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    
    setSpeaking(text);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.6;
    utterance.pitch = 1;
    
    utterance.onend = () => setSpeaking(null);
    window.speechSynthesis.speak(utterance);
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 頂部 */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          ← 返回
        </button>
        <h2 className="text-xl font-bold text-gray-800">📚 拼音教學</h2>
        <div className="w-8"></div>
      </div>

      {/* 說明 */}
      <div className="bg-blue-50 rounded-2xl p-4 mb-6">
        <p className="text-sm text-blue-700">
          <strong>CVC</strong> = <strong>C</strong>onsonant（輔音）+ <strong>V</strong>owel（元音）+ <strong>C</strong>onsonant（輔音）
        </p>
      </div>

      {/* 切換 Tab */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('consonant')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'consonant'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          🔤 輔音 C
        </button>
        <button
          onClick={() => setActiveTab('vowel')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'vowel'
              ? 'bg-pink-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          🅰️ 元音 V
        </button>
      </div>

      {/* 輔音列表 */}
      {activeTab === 'consonant' && (
        <div className="grid grid-cols-3 gap-3">
          {consonants.map((item) => (
            <motion.button
              key={item.letter}
              whileTap={{ scale: 0.95 }}
              onClick={() => speak(item.letter)}
              className={`bg-white rounded-2xl p-4 shadow-md transition-all ${
                speaking === item.letter ? 'ring-4 ring-blue-300' : ''
              }`}
            >
              <span className="text-3xl font-black text-blue-600">{item.letter}</span>
              <p className="text-sm text-gray-400 mt-1">{item.sound}</p>
              <p className="text-xs text-gray-400 mt-1">{item.example}</p>
            </motion.button>
          ))}
        </div>
      )}

      {/* 元音列表 */}
      {activeTab === 'vowel' && (
        <div className="space-y-4">
          {vowels.map((item) => (
            <motion.button
              key={item.letter}
              whileTap={{ scale: 0.98 }}
              onClick={() => speak(item.letter)}
              className={`w-full bg-gradient-to-r ${item.color} rounded-2xl p-5 shadow-lg text-white flex items-center gap-4 ${
                speaking === item.letter ? 'ring-4 ring-white/50' : ''
              }`}
            >
              <span className="text-5xl font-black">{item.letter}</span>
              <div className="text-left">
                <p className="text-2xl font-bold">{item.sound}</p>
                <p className="text-white/80 text-sm">
                  例: {item.example} {item.emoji}
                </p>
              </div>
              <span className="ml-auto text-2xl">🔊</span>
            </motion.button>
          ))}
        </div>
      )}

      {/* 練習提示 */}
      <div className="mt-8 bg-yellow-50 rounded-2xl p-4">
        <p className="text-sm text-yellow-700 text-center">
          💡 點擊字母聽發音，多聽多練習！
        </p>
      </div>
    </div>
  );
}
