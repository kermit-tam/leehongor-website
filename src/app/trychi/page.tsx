/**
 * TryChi 中文挑戰入口
 * 選擇港鐵站長或基礎漢字挑戰
 */

import Link from 'next/link';

export default function TryChiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* 返回按鈕 */}
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 mt-4">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回主頁
        </Link>

        {/* 標題 */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🇭🇰</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">TryChi 中文挑戰</h1>
          <p className="text-gray-600">選擇你想挑戰的項目</p>
        </div>

        {/* 兩個挑戰選項 */}
        <div className="space-y-4">
          {/* 港鐵小站長 */}
          <Link href="/studychi">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 border-2 border-transparent hover:border-blue-300">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">
                  🚇
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">港鐵小站長</h2>
                  <p className="text-gray-500 text-sm">認識98個港鐵站名</p>
                </div>
                <span className="text-2xl">→</span>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">7條路線</span>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">98個站</span>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">顏色測試</span>
              </div>
              
              <p className="mt-3 text-sm text-gray-400">
                東鐵綫、屯馬綫、觀塘綫、港島綫、荃灣綫、將軍澳綫、東涌綫
              </p>
            </div>
          </Link>

          {/* 基礎漢字挑戰 */}
          <Link href="/studychinese">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 border-2 border-transparent hover:border-red-300">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-3xl">
                  ✍️
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">基礎漢字挑戰</h2>
                  <p className="text-gray-500 text-sm">仔仔溫書 - 二年級中文</p>
                </div>
                <span className="text-2xl">→</span>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full">中文生字</span>
                <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full">英文詞彙</span>
                <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full">閃卡溫書</span>
              </div>
              
              <p className="mt-3 text-sm text-gray-400">
                閃卡溫書、聆聽測驗、讀句子、圖畫配對
              </p>
            </div>
          </Link>
        </div>

        {/* 說明 */}
        <div className="mt-8 bg-white/50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">
            💡 兩個挑戰都唔需要登入，直接就可以玩！
          </p>
        </div>
      </div>
    </div>
  );
}
