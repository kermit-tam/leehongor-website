# 第5課：交通與移動 - 遊戲化試點

## 🎮 功能特色

### 1. 多題型測驗引擎 (Question Roulette)
每單元包含6-8題，隨機混合以下題型：

- **⚡ 閃電配對 (Speed Match)** - 限時10秒，配對平假名與中文意思
- **🔊 聽音選擇 (Audio Select)** - 聽日語選擇正確意思
- **🧩 句子重組 (Sentence Puzzle)** - 砌句子積木
- **🖼️ 圖片選擇 (Visual Quiz)** - 睇emoji選平假名
- **⚡ 真假快打 (True/False)** - 限時5秒判斷句子正確性
- **✏️ 填空選擇 (Cloze)** - 選擇正確助詞

### 2. 🧱 積木造句機 (Sentence Builder)
- 閘門系統：只顯示已學單元語塊
- 語塊分類：時間/人物/交通工具/地點/助詞/動詞
- 功能：朗讀、保存句子、生成IG分享圖片

### 3. 🎯 遊戲化反饋
- **連擊系統 (Combo)**：連續答對分數遞增
- **Confetti 爆炸**：答對時的視覺反饋
- **生命系統**：5條命，答錯扣命
- **音效**：正確「叮」聲，錯誤「咚」聲

### 4. 📊 雙軌EXP系統
- **參與分**：進入單元 +5，完成學習 +5，完成測驗 +10
- **考核分**：測驗分數轉換 + 時間獎勵

### 5. 📱 PWA 離線支援
- Service Worker 快取
- 離線學習模式
- 添加到主屏幕支援

## 📁 檔案結構

```
lesson-5/
├── page.tsx                    # 主頁面
├── game-data.ts                # 詞彙數據和類型定義
├── question-generator.ts       # 題目生成器
├── components/
│   ├── index.ts               # 組件導出
│   ├── quiz-engine.tsx        # 測驗引擎主組件
│   ├── vocab-flashcard.tsx    # 詞彙閃卡
│   ├── sentence-builder.tsx   # 積木造句機
│   ├── game-feedback.tsx      # 遊戲反饋系統
│   ├── speed-match-game.tsx   # 閃電配對
│   ├── audio-select-game.tsx  # 聽音選擇
│   ├── sentence-puzzle-game.tsx # 句子重組
│   ├── visual-quiz-game.tsx   # 圖片選擇
│   ├── true-false-game.tsx    # 真假快打
│   └── cloze-game.tsx         # 填空選擇
├── hooks/
│   ├── index.ts
│   └── use-pwa.ts             # PWA註冊Hook
└── README.md
```

## 🎨 設計規範

- **配色**：無印良品風格，米白 #F5F5F0，淺棕 #C4B9AC
- **字體**：Noto Sans JP（日文）+ 系統繁體中文字體
- **動畫**：Framer Motion，卡片翻轉、頁面切換
- **響應式**：手機優先（Mobile First）

## 🔌 使用的技術

- **Next.js 16** + TypeScript
- **Tailwind CSS** - 樣式
- **Framer Motion** - 動畫
- **canvas-confetti** - Confetti效果
- **html2canvas** - IG圖片生成
- **Web Speech API** - 語音播放
- **Web Audio API** - 音效

## 📊 數據結構

### 單元資料
```typescript
interface GameUnit {
  id: number;
  title: string;
  subtitle: string;
  vocabIds: string[];
  estimatedTime: number;
}
```

### 詞彙資料
```typescript
interface GameVocab {
  id: string;
  hiragana: string;
  kanji: string;
  meaning: string;
  cantonese: string;
  emoji?: string;
  category: 'transport' | 'person' | 'place' | 'time' | 'date' | 'phrase';
}
```

## 🚀 未來擴展

- [ ] 添加更多題型
- [ ] 實現真正的後台同步
- [ ] 添加學習統計圖表
- [ ] 支援更多分享平台
- [ ] 添加每日挑戰模式

## 📝 注意事項

1. **零打字原則**：所有互動通過點擊完成
2. **閘門系統**：測驗只使用當前單元詞彙
3. **離線優先**：數據先存LocalStorage，登入後同步
