'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// 幼稚園圖標 - 更圓潤可愛
const ChineseIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="50" r="45" fill="#FF9F43" />
    <circle cx="50" cy="50" r="35" fill="#FF8C32" />
    <rect x="32" y="28" width="10" height="44" rx="5" fill="white" />
    <rect x="20" y="42" width="60" height="10" rx="5" fill="white" />
    <circle cx="28" cy="34" r="4" fill="#FFE66D" />
    <circle cx="72" cy="34" r="4" fill="#FFE66D" />
  </svg>
);

const EnglishIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="50" r="45" fill="#6C5CE7" />
    <circle cx="50" cy="50" r="35" fill="#5B4BC4" />
    <text x="50" y="64" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold" fontFamily="Arial">ABC</text>
    <circle cx="25" cy="30" r="5" fill="#FFE66D" />
    <circle cx="75" cy="30" r="5" fill="#FFE66D" />
  </svg>
);

const MathIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="50" r="45" fill="#26DE81" />
    <circle cx="50" cy="50" r="35" fill="#20BF6B" />
    <text x="50" y="68" textAnchor="middle" fill="white" fontSize="36" fontWeight="bold">123</text>
    <circle cx="28" cy="30" r="4" fill="#FFE66D" />
    <circle cx="72" cy="30" r="4" fill="#FFE66D" />
  </svg>
);

const GPIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="50" r="45" fill="#2DD4BF" />
    <circle cx="50" cy="50" r="35" fill="#14B8A6" />
    <circle cx="35" cy="38" r="6" fill="white" />
    <circle cx="65" cy="38" r="6" fill="white" />
    <circle cx="35" cy="38" r="3" fill="#14B8A6" />
    <circle cx="65" cy="38" r="3" fill="#14B8A6" />
    <path d="M35 60 Q50 70 65 60" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="25" cy="28" r="3" fill="#FFE66D" />
    <circle cx="75" cy="28" r="3" fill="#FFE66D" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FF6B6B">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

interface SubjectCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  bgColor: string;
  shadowColor: string;
  href: string;
}

const SubjectCard = ({ icon, title, subtitle, description, bgColor, shadowColor, href }: SubjectCardProps) => (
  <Link href={href}>
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`${bgColor} rounded-3xl p-5 shadow-[0_8px_0_${shadowColor}] hover:shadow-[0_4px_0_${shadowColor}] transition-all cursor-pointer`}
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
          {icon}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-extrabold text-white mb-1">{title}</h2>
          <p className="text-white/90 font-medium text-xs">{subtitle}</p>
          <p className="text-white/80 text-xs mt-1 leading-relaxed">{description}</p>
        </div>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  </Link>
);

export default function KidsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 className="text-lg font-bold text-gray-800">小朋友學習天地</h1>
          </div>
          <div className="flex items-center gap-1">
            <HeartIcon />
            <span className="text-xs text-gray-500">K1-K3</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="inline-block mb-3"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 flex items-center justify-center shadow-xl">
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
              </svg>
            </div>
          </motion.div>
          
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">
            中英數常挑戰
          </h1>
          <p className="text-gray-600">
            趣味練習，開心學習！
          </p>
        </div>

        {/* Subject Cards */}
        <div className="space-y-4">
          <SubjectCard
            icon={<ChineseIcon />}
            title="中文練習"
            subtitle="守株待兔、亡羊補牢"
            description="成語填充遊戲，20題選擇題，有溫習模式。"
            bgColor="bg-orange-400"
            shadowColor="#D97706"
            href="/trychi"
          />

          <SubjectCard
            icon={<EnglishIcon />}
            title="英文練習"
            subtitle="CVC拼音、串字練習"
            description="二年班英文，三個難度選擇。"
            bgColor="bg-purple-500"
            shadowColor="#6D28D9"
            href="/tryeng"
          />

          <SubjectCard
            icon={<MathIcon />}
            title="數學練習"
            subtitle="加法挑戰、數生果"
            description="閃電加法王、數生果、Kuromi加法王。"
            bgColor="bg-green-400"
            shadowColor="#059669"
            href="/trymath"
          />

          <SubjectCard
            icon={<GPIcon />}
            title="常識練習"
            subtitle="二年級下學期"
            description="力學、科學探究、中國歷史、國旗國徽、玩具安全等。"
            bgColor="bg-teal-400"
            shadowColor="#0D9488"
            href="/trygp"
          />
        </div>

        {/* Features */}
        <div className="mt-8 bg-white rounded-2xl p-5 shadow-lg">
          <h3 className="text-base font-bold text-gray-800 mb-3 text-center">為什麼選擇我們？</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-xs text-gray-600">無需登入</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs text-gray-600">隨時溫習</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs text-gray-600">好玩有趣</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            kids.leehongor.com - 幼稚園及學前兒童專用
          </p>
        </div>
      </main>
    </div>
  );
}
