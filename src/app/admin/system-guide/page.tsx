'use client';

import Link from 'next/link';

export default function SystemGuidePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8] mb-6">
          <Link href="/admin" className="text-[#8C8C8C] text-sm hover:text-[#4A4A4A]">
            ← 返回後台
          </Link>
          <h1 className="text-2xl font-bold text-[#4A4A4A] mt-4">🎓 系統說明書</h1>
          <p className="text-[#8C8C8C] mt-2">日文學習網站 - 系統架構與計分模式說明</p>
          <div className="mt-4 text-xs text-[#C4B9AC] bg-[#F5F5F0] px-3 py-2 rounded-lg inline-block">
            最後更新：2026年2月16日
          </div>
        </div>

        {/* 目錄 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8] mb-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">📑 目錄</h2>
          <div className="grid grid-cols-2 gap-2">
            <a href="#architecture" className="text-sm text-[#1976D2] hover:underline">1. 系統架構</a>
            <a href="#progress" className="text-sm text-[#1976D2] hover:underline">2. 雙軌進度系統</a>
            <a href="#scoring" className="text-sm text-[#1976D2] hover:underline">3. 計分模式</a>
            <a href="#exp" className="text-sm text-[#1976D2] hover:underline">4. EXP 系統</a>
            <a href="#lessons" className="text-sm text-[#1976D2] hover:underline">5. 課程結構</a>
            <a href="#quiz" className="text-sm text-[#1976D2] hover:underline">6. 測驗機制</a>
            <a href="#listening" className="text-sm text-[#1976D2] hover:underline">7. 聽力測驗</a>
            <a href="#storage" className="text-sm text-[#1976D2] hover:underline">8. 數據存儲</a>
            <a href="#features" className="text-sm text-[#1976D2] hover:underline">9. 功能特色</a>
            <a href="#course-status" className="text-sm text-[#1976D2] hover:underline">10. 課程資料狀態</a>
          </div>
        </div>

        {/* 系統架構 */}
        <section id="architecture" className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8] mb-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">🏗️ 1. 系統架構</h2>
          
          <div className="space-y-4 text-sm text-[#4A4A4A]">
            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">技術堆疊</h3>
              <ul className="list-disc pl-5 space-y-1 text-[#8C8C8C]">
                <li><strong>前端：</strong>Next.js 16.1.6 + TypeScript + Tailwind CSS + Framer Motion</li>
                <li><strong>認證：</strong>Firebase Authentication</li>
                <li><strong>數據庫：</strong>Cloud Firestore</li>
                <li><strong>圖片存儲：</strong>Cloudinary</li>
                <li><strong>部署：</strong>Vercel (leehongor.com)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">主要模組</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#F5F5F0] p-3 rounded-lg">
                  <div className="font-medium">📝 文章系統</div>
                  <div className="text-xs text-[#8C8C8C]">文章管理、詞彙、測驗</div>
                </div>
                <div className="bg-[#F5F5F0] p-3 rounded-lg">
                  <div className="font-medium">🎓 N5課程</div>
                  <div className="text-xs text-[#8C8C8C]">25課微單元學習</div>
                </div>
                <div className="bg-[#F5F5F0] p-3 rounded-lg">
                  <div className="font-medium">💬 留言系統</div>
                  <div className="text-xs text-[#8C8C8C]">文章、課程留言</div>
                </div>
                <div className="bg-[#F5F5F0] p-3 rounded-lg">
                  <div className="font-medium">🏆 排行榜</div>
                  <div className="text-xs text-[#8C8C8C]">EXP 排名</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 雙軌進度系統 */}
        <section id="progress" className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8] mb-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">📊 2. 雙軌進度系統</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#E3F2FD] p-4 rounded-lg border border-[#BBDEFB]">
                <div className="text-[#1976D2] font-bold mb-2">📚 學習參與度</div>
                <div className="text-xs text-[#4A4A4A] space-y-1">
                  <p><strong>Learning Rate</strong></p>
                  <ul className="list-disc pl-4 text-[#8C8C8C]">
                    <li>單元完成率</li>
                    <li>連續學習天數</li>
                    <li>學習時數累計</li>
                  </ul>
                </div>
              </div>
              <div className="bg-[#E8F5E9] p-4 rounded-lg border border-[#A5D6A7]">
                <div className="text-[#388E3C] font-bold mb-2">🎯 能力評估</div>
                <div className="text-xs text-[#4A4A4A] space-y-1">
                  <p><strong>Proficiency</strong></p>
                  <ul className="list-disc pl-4 text-[#8C8C8C]">
                    <li>測驗分數</li>
                    <li>平均分數</li>
                    <li>強弱項目分析</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-sm text-[#4A4A4A] bg-[#FFF3E0] p-4 rounded-lg border border-[#FFE0B2]">
              <strong>💡 設計理念：</strong>
              <p className="text-[#8C8C8C] mt-1">
                參與度反映學習習慣（勤奮度），能力評估反映實際掌握程度。兩者分開追蹤，避免「只刷題不學習」或「只瀏覽不測驗」的偏差。
              </p>
            </div>
          </div>
        </section>

        {/* 計分模式 */}
        <section id="scoring" className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8] mb-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">🎯 3. 計分模式</h2>
          
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">參與分（Participation EXP）</h3>
              <div className="bg-[#F5F5F0] rounded-lg p-3">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-[#8C8C8C]">
                      <th className="text-left py-1">行為</th>
                      <th className="text-left py-1">基礎分</th>
                      <th className="text-left py-1">額外加成</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#4A4A4A]">
                    <tr>
                      <td className="py-1">進入單元學習</td>
                      <td>+5</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td className="py-1">單元含詞彙</td>
                      <td>-</td>
                      <td>+2</td>
                    </tr>
                    <tr>
                      <td className="py-1">單元含文法</td>
                      <td>-</td>
                      <td>+3</td>
                    </tr>
                    <tr>
                      <td className="py-1">單元含對話</td>
                      <td>-</td>
                      <td>+2</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-[#8C8C8C] mt-2">
                  💡 每個單元只計一次，重複進入不會重複加分
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-[#388E3C] mb-2">考核分（Assessment EXP）</h3>
              <div className="bg-[#F5F5F0] rounded-lg p-3">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-[#8C8C8C]">
                      <th className="text-left py-1">成績</th>
                      <th className="text-left py-1">條件</th>
                      <th className="text-left py-1">EXP</th>
                      <th className="text-left py-1">稱號</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#4A4A4A]">
                    <tr>
                      <td className="py-1">⭐⭐⭐ 完美</td>
                      <td>100%</td>
                      <td>+25</td>
                      <td>完美！</td>
                    </tr>
                    <tr>
                      <td className="py-1">⭐⭐⭐ 優秀</td>
                      <td>90-99%</td>
                      <td>+20</td>
                      <td>優秀！</td>
                    </tr>
                    <tr>
                      <td className="py-1">⭐⭐ 良好</td>
                      <td>80-89%</td>
                      <td>+15</td>
                      <td>非常好！</td>
                    </tr>
                    <tr>
                      <td className="py-1">⭐ 及格</td>
                      <td>60-79%</td>
                      <td>+5</td>
                      <td>及格！</td>
                    </tr>
                    <tr>
                      <td className="py-1">❌ 不及格</td>
                      <td>&lt;60%</td>
                      <td>+0</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* EXP 系統 */}
        <section id="exp" className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8] mb-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">⚡ 4. EXP 系統</h2>
          
          <div className="space-y-4 text-sm text-[#4A4A4A]">
            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">EXP 來源</h3>
              <ul className="list-disc pl-5 space-y-1 text-[#8C8C8C]">
                <li><strong>Participation EXP：</strong>學習行為獎勵</li>
                <li><strong>Assessment EXP：</strong>測驗成績獎勵</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">EXP 存儲</h3>
              <div className="bg-[#F5F5F0] p-3 rounded-lg">
                <ul className="list-disc pl-4 text-[#8C8C8C] space-y-1">
                  <li><strong>登入用戶：</strong>同步到 Firestore，跨裝置可用</li>
                  <li><strong>未登入用戶：</strong>存儲於 localStorage</li>
                  <li><strong>登入後：</strong>localStorage 資料會同步到 Firestore</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">EXP 歷史記錄</h3>
              <p className="text-[#8C8C8C]">
                每筆 EXP 獲得都會記錄來源、時間、相關課程，存於 localStorage 的 <code className="bg-[#F5F5F0] px-1 rounded">n5-exp-history</code>
              </p>
            </div>
          </div>
        </section>

        {/* 課程結構 */}
        <section id="lessons" className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8] mb-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">📚 5. 課程結構</h2>
          
          <div className="space-y-4 text-sm text-[#4A4A4A]">
            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">課程設計</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#F5F5F0] p-2 rounded">
                  <strong>每課</strong>
                  <ul className="text-[#8C8C8C] mt-1">
                    <li>4個微單元</li>
                    <li>約40個詞彙</li>
                    <li>預計20分鐘</li>
                  </ul>
                </div>
                <div className="bg-[#F5F5F0] p-2 rounded">
                  <strong>每單元</strong>
                  <ul className="text-[#8C8C8C] mt-1">
                    <li>8-12個詞彙</li>
                    <li>預計5分鐘</li>
                    <li>獨立完成</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">內容模組</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">詞彙 Vocab</span>
                <span className="px-2 py-1 bg-[#F3E5F5] text-[#7B1FA2] rounded text-xs">文法 Grammar</span>
                <span className="px-2 py-1 bg-[#E8F5E9] text-[#388E3C] rounded text-xs">聽力 Listening</span>
                <span className="px-2 py-1 bg-[#FFF3E0] text-[#F57C00] rounded text-xs">對話 Dialogue</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">學習流程</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1 bg-white border border-[#E5E5E5] rounded">1. 選單</span>
                <span>→</span>
                <span className="px-3 py-1 bg-[#E3F2FD] rounded">2. 學習模式</span>
                <span>→</span>
                <span className="px-3 py-1 bg-[#E8F5E9] rounded">3. 測驗模式</span>
                <span>→</span>
                <span className="px-3 py-1 bg-[#FFF3E0] rounded">4. 結果</span>
              </div>
            </div>
          </div>
        </section>

        {/* 測驗機制 */}
        <section id="quiz" className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8] mb-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">✅ 6. 測驗機制</h2>
          
          <div className="space-y-4 text-sm text-[#4A4A4A]">
            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">測驗規則</h3>
              <ul className="list-disc pl-5 space-y-1 text-[#8C8C8C]">
                <li>從當前單元詞彙中隨機出題</li>
                <li>每題4個選項（1正確 + 3錯誤）</li>
                <li>選項位置每次隨機排列</li>
                <li>答題後播放正確讀音</li>
                <li>即時顯示正確/錯誤反饋</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">視覺反饋</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#E8F5E9] p-2 rounded border border-[#4CAF50]">
                  <div className="text-[#4CAF50] text-xs">✓ 正確答案</div>
                  <div className="text-[#8C8C8C] text-xs">綠色邊框 + 綠色背景</div>
                </div>
                <div className="bg-[#FFEBEE] p-2 rounded border border-[#F44336]">
                  <div className="text-[#F44336] text-xs">✗ 錯誤選擇</div>
                  <div className="text-[#8C8C8C] text-xs">紅色邊框 + 紅色背景</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">即時統計</h3>
              <p className="text-[#8C8C8C]">
                測驗過程中顯示：<span className="text-[#4A4A4A]">當前題數</span>、<span className="text-green-600">正確數</span>、<span className="text-red-500">錯誤數</span>
              </p>
            </div>
          </div>
        </section>

        {/* 聽力測驗 */}
        <section id="listening" className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8] mb-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">🎧 7. 聽力測驗</h2>
          
          <div className="space-y-4 text-sm text-[#4A4A4A]">
            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">模式說明</h3>
              <ul className="list-disc pl-5 space-y-1 text-[#8C8C8C]">
                <li>從<b>整課</b>所有詞彙中隨機抽取15題</li>
                <li>使用 Web Speech API 播放日語</li>
                <li>可重複播放音頻</li>
                <li>選項為中文意思</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">技術細節</h3>
              <div className="bg-[#F5F5F0] p-3 rounded-lg text-xs">
                <ul className="list-disc pl-4 text-[#8C8C8C] space-y-1">
                  <li><strong>語音引擎：</strong>Web Speech Synthesis API</li>
                  <li><strong>語言設定：</strong>ja-JP</li>
                  <li><strong>語速：</strong>0.7x（聽力用慢速）</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 數據存儲 */}
        <section id="storage" className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8] mb-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">💾 8. 數據存儲</h2>
          
          <div className="space-y-4 text-sm text-[#4A4A4A]">
            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">localStorage Keys</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-[#8C8C8C]">
                      <th className="text-left py-1">Key</th>
                      <th className="text-left py-1">內容</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#4A4A4A]">
                    <tr>
                      <td className="py-1 font-mono">n5-unit-completed</td>
                      <td>已完成單元ID列表</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-mono">n5-participation-claimed</td>
                      <td>已領取參與分記錄</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-mono">n5-exp-history</td>
                      <td>EXP獲得歷史</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-mono">n5-learning-progress</td>
                      <td>學習進度數據</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-mono">n5-proficiency</td>
                      <td>能力評估數據</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-mono">n5-unit-scores</td>
                      <td>單元測驗分數</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-[#1976D2] mb-2">Firestore 結構</h3>
              <div className="bg-[#F5F5F0] p-3 rounded-lg text-xs font-mono">
                <div className="text-[#4A4A4A]">users/{'{uid}'}</div>
                <div className="text-[#8C8C8C] pl-4">├── displayName: string</div>
                <div className="text-[#8C8C8C] pl-4">├── email: string</div>
                <div className="text-[#8C8C8C] pl-4">├── avatar: string (Cloudinary URL)</div>
                <div className="text-[#8C8C8C] pl-4">├── achievementExp: number</div>
                <div className="text-[#8C8C8C] pl-4">├── isAdmin: boolean</div>
                <div className="text-[#8C8C8C] pl-4">├── createdAt: timestamp</div>
                <div className="text-[#8C8C8C] pl-4">└── lastActive: timestamp</div>
              </div>
            </div>
          </div>
        </section>

        {/* 功能特色 */}
        <section id="features" className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8] mb-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">✨ 9. 功能特色</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F5F5F0] p-3 rounded-lg">
              <div className="font-medium text-sm mb-1">🇭🇰 廣東話諧音</div>
              <div className="text-xs text-[#8C8C8C]">每個詞彙都附有廣東話諧音輔助記憶，可自由開關</div>
            </div>
            <div className="bg-[#F5F5F0] p-3 rounded-lg">
              <div className="font-medium text-sm mb-1">🔊 語音播放</div>
              <div className="text-xs text-[#8C8C8C]">Web Speech API 播放日語發音</div>
            </div>
            <div className="bg-[#F5F5F0] p-3 rounded-lg">
              <div className="font-medium text-sm mb-1">🔄 進度重置</div>
              <div className="text-xs text-[#8C8C8C]">帶確認對話框的進度清除功能</div>
            </div>
            <div className="bg-[#F5F5F0] p-3 rounded-lg">
              <div className="font-medium text-sm mb-1">📱 響應式設計</div>
              <div className="text-xs text-[#8C8C8C]">MUJI 風格，支援手機/平板/桌面</div>
            </div>
            <div className="bg-[#F5F5F0] p-3 rounded-lg">
              <div className="font-medium text-sm mb-1">🎯 雙軌進度</div>
              <div className="text-xs text-[#8C8C8C]">參與度與能力評估分開追蹤</div>
            </div>
            <div className="bg-[#F5F5F0] p-3 rounded-lg">
              <div className="font-medium text-sm mb-1">🏆 排行榜</div>
              <div className="text-xs text-[#8C8C8C]">根據 EXP 進行用戶排名</div>
            </div>
          </div>
        </section>

        {/* 課程資料狀態 */}
        <section id="course-status" className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8] mb-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">📖 10. 課程資料狀態</h2>
          
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#8C8C8C] border-b border-[#E5E5E5]">
                    <th className="text-left py-2">課程</th>
                    <th className="text-left py-2">標題</th>
                    <th className="text-left py-2">狀態</th>
                    <th className="text-left py-2">詞彙數</th>
                  </tr>
                </thead>
                <tbody className="text-[#4A4A4A]">
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第1課</td>
                    <td className="py-2">初次見面</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E8F5E9] text-[#4CAF50] rounded text-xs">✓ 已完成</span></td>
                    <td className="py-2">41</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第2課</td>
                    <td className="py-2">這是什麼</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E8F5E9] text-[#4CAF50] rounded text-xs">✓ 已完成</span></td>
                    <td className="py-2">40</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第3課</td>
                    <td className="py-2">這裡是哪裡</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E8F5E9] text-[#4CAF50] rounded text-xs">✓ 已完成</span></td>
                    <td className="py-2">40</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第4課</td>
                    <td className="py-2">現在幾點</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E8F5E9] text-[#4CAF50] rounded text-xs">✓ 已完成</span></td>
                    <td className="py-2">40</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第5課</td>
                    <td className="py-2">交通與移動</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">ℹ️ Beta</span></td>
                    <td className="py-2">40</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第6課</td>
                    <td className="py-2">食物與喜好</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">ℹ️ Beta</span></td>
                    <td className="py-2">40</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第7課</td>
                    <td className="py-2">購物</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">ℹ️ Beta</span></td>
                    <td className="py-2">40</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第8課</td>
                    <td className="py-2">位置與存在句</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">ℹ️ Beta</span></td>
                    <td className="py-2">40</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第9課</td>
                    <td className="py-2">行程與邀請</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">ℹ️ Beta</span></td>
                    <td className="py-2">40</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第10課</td>
                    <td className="py-2">給予與接收</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">ℹ️ Beta</span></td>
                    <td className="py-2">40</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第11課</td>
                    <td className="py-2">時間與頻率</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">ℹ️ Beta</span></td>
                    <td className="py-2">40</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第12課</td>
                    <td className="py-2">形容詞比較</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">ℹ️ Beta</span></td>
                    <td className="py-2">40</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第13課</td>
                    <td className="py-2">能力與願望</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">ℹ️ Beta</span></td>
                    <td className="py-2">40</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第14課</td>
                    <td className="py-2">過去經驗</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">ℹ️ Beta</span></td>
                    <td className="py-2">40</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第15課</td>
                    <td className="py-2">N5總複習</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">ℹ️ Beta</span></td>
                    <td className="py-2">40</td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-2">第16-25課</td>
                    <td className="py-2">N5 應用／N4 基礎</td>
                    <td className="py-2"><span className="px-2 py-0.5 bg-[#FFEBEE] text-[#F44336] rounded text-xs">✗ 未建立</span></td>
                    <td className="py-2">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-sm">
              <p className="text-blue-800">
                <strong>ℹ️ Beta 標記說明：</strong>第5-15課是根據《大家的日本語》建立的初稿，
                詞彙和廣東話諧音可能需要校對。如有發現錯誤請通知管理員修正。
              </p>
            </div>

            <div className="bg-[#FFF3E0] p-4 rounded-lg border border-[#FFE0B2]">
              <h3 className="font-medium text-[#F57C00] mb-2">📋 需要的資料格式</h3>
              <p className="text-sm text-[#4A4A4A] mb-2">
                每個單元需要以下資料：
              </p>
              <div className="text-xs text-[#8C8C8C] font-mono bg-[#F5F5F0] p-2 rounded">
{`{
  id: 單元編號 (1-4),
  title: '單元標題',
  subtitle: '副標題',
  vocab: [
    { hiragana: '日語假名', kanji: '漢字', meaning: '中文意思', cantonese: '廣東話諧音', note: '備註' }
  ],
  grammar: [
    { pattern: '句型', meaning: '意思', example: '例句', exampleMeaning: '例句翻譯' }
  ],
  dialogue: [
    { speaker: 'A', japanese: '日語', cantonese: '諧音', meaning: '翻譯' }
  ]
}`}
              </div>
              <p className="text-xs text-[#8C8C8C] mt-2">
                💡 建議提供 Excel 或 CSV 格式，我可以協助轉換
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-xs text-[#8C8C8C] py-8">
          <p>LeeHongor 日文學習網站 · 系統說明書 v1.0</p>
          <p className="mt-1">如有問題請聯繫管理員</p>
        </div>
      </div>
    </div>
  );
}
