'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// 小學生圖標 - 更成熟啲
const ChineseIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="50" r="45" fill="#E74C3C" />
    <circle cx="50" cy="50" r="35" fill="#C0392B" />
    <rect x="35" y="30" width="8" height="40" rx="4" fill="white" />
    <rect x="25" y="42" width="50" height="8" rx="4" fill="white" />
    <rect x="30" y="56" width="40" height="6" rx="3" fill="white" />
  </svg>
);

const EnglishIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="50" r="45" fill="#3498DB" />
    <circle cx="50" cy="50" r="35" fill="#2980B9" />
    <text x="50" y="62" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="Arial">ABC</text>
  </svg>
);

const MathIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="50" r="45" fill="#9B59B6" />
    <circle cx="50" cy="50" r="35" fill="#8E44AD" />
    <text x="50" y="65" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold">123</text>
  </svg>
);

const GPIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="50" r="45" fill="#14B8A6" />
    <circle cx="50" cy="50" r="35" fill="#0D9488" />
    <circle cx="35" cy="40" r="8" fill="white" />
    <circle cx="65" cy="40" r="8" fill="white" />
    <circle cx="35" cy="40" r="4" fill="#0D9488" />
    <circle cx="65" cy="40" r="4" fill="#0D9488" />
    <path d="M30 60 Q50 75 70 60" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#F1C40F">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
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
      className={`${bgColor} rounded-3xl p-6 shadow-[0_8px_0_${shadowColor}] hover:shadow-[0_4px_0_${shadowColor}] transition-all cursor-pointer`}
    >
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
          {icon}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-white mb-1">{title}</h2>
          <p className="text-white/90 font-medium text-sm">{subtitle}</p>
          <p className="text-white/80 text-xs mt-2 leading-relaxed">{description}</p>
        </div>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  </Link>
);

export default function StudyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <StarIcon />
            </div>
            <h1 className="text-xl font-bold text-gray-800">小學生學習天地</h1>
          </div>
          <div className="text-sm text-gray-500">P1-P6</div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
              <svg viewBox="0 0 24 24" className="w-12 h-12" fill="white">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
              </svg>
            </div>
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-3">
            中英數常練習
          </h1>
          <p className="text-gray-600 text-lg">
            小學生專用，打好基礎！
          </p>
        </div>

        {/* Subject Cards */}
        <div className="space-y-5">
          <SubjectCard
            icon={<ChineseIcon />}
            title="中文練習"
            subtitle="守株待兔、亡羊補牢"
            description="成語填充練習，20題選擇題，另有溫習模式含詞語解釋同例句。"
            bgColor="bg-red-500"
            shadowColor="#C0392B"
            href="/trychi"
          />

          <SubjectCard
            icon={<EnglishIcon />}
            title="英文練習"
            subtitle="CVC拼音、串字王"
            description="二年班英文單字，Unit 4同Unit 5，三個難度選擇。"
            bgColor="bg-blue-500"
            shadowColor="#2980B9"
            href="/tryeng"
          />

          <SubjectCard
            icon={<MathIcon />}
            title="數學練習"
            subtitle="加法挑戰、數生果"
            description="閃電加法王適合小學生，另有數生果適合幼稚園。"
            bgColor="bg-purple-500"
            shadowColor="#8E44AD"
            href="/trymath"
          />

          <SubjectCard
            icon={<GPIcon />}
            title="常識練習"
            subtitle="二年級下學期"
            description="力學、科學探究、中國歷史、國旗國徽、玩具安全等32題。"
            bgColor="bg-teal-500"
            shadowColor="#0D9488"
            href="/trygp"
          />
        </div>

        {/* Features */}
        <div className="mt-10 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">學習特色</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">無需登入</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">課本對應</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">即時反饋</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>study.leehongor.com - 小學生專用</p>
        </div>
      </main>
    </div>
  );
}
