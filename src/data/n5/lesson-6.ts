/**
 * 大家的日本語 N5 第6課數據
 * Minna no Nihongo N5 Lesson 6
 * 
 * 課本：大家的日本語 初級 I (第2版)
 * 主題：食物與日常活動
 */

import { N5Lesson } from './types';

export const lesson6Data: N5Lesson = {
  id: 'n5-lesson-6',
  lessonNum: 6,
  title: '食物與日常活動',
  description: '學習日常動詞（吃、喝、看、聽等）、食物、飲料和常用對話。分5個微單元，共55個詞彙。',
  totalVocab: 55,
  totalTime: 25,
  units: [
    {
      id: 1,
      title: '日常動詞①',
      subtitle: '吃、喝、看、聽、讀、寫',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'たべます', kanji: '食べます', meaning: '吃', cantonese: '食', note: '' },
        { hiragana: 'のみます', kanji: '飲みます', meaning: '喝', cantonese: '飲', note: '' },
        { hiragana: 'すいます', kanji: '吸います', meaning: '吸、抽[煙]', cantonese: '吸', note: '' },
        { hiragana: 'みます', kanji: '見ます', meaning: '看', cantonese: '睇', note: '' },
        { hiragana: 'ききます', kanji: '聞きます', meaning: '聽', cantonese: '聽', note: '' },
        { hiragana: 'よみます', kanji: '読みます', meaning: '讀', cantonese: '讀', note: '' },
        { hiragana: 'かきます', kanji: '書きます', meaning: '寫', cantonese: '寫', note: '' },
        { hiragana: 'かいます', kanji: '買います', meaning: '買', cantonese: '買', note: '' },
        { hiragana: 'とります', kanji: '撮ります', meaning: '照[相]', cantonese: '影', note: '' },
        { hiragana: 'します', kanji: '', meaning: '做、幹', cantonese: '做', note: '' },
        { hiragana: 'あいます', kanji: '会います', meaning: '[跟朋友]見面', cantonese: '見', note: '' },
      ],
      grammar: [
        {
          pattern: '～を～ます',
          meaning: '做～（他動詞）',
          example: 'ごはんを食べます。',
          exampleMeaning: '吃飯。',
        },
      ],
    },
    {
      id: 2,
      title: '食物',
      subtitle: '米飯、麵包、肉、蔬菜',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'ごはん', kanji: '', meaning: '米飯、飯', cantonese: '飯', note: '' },
        { hiragana: 'あさごはん', kanji: '朝ごはん', meaning: '早飯', cantonese: '早餐', note: '' },
        { hiragana: 'ひるごはん', kanji: '昼ごはん', meaning: '午飯', cantonese: '午餐', note: '' },
        { hiragana: 'ばんごはん', kanji: '晩ごはん', meaning: '晚飯', cantonese: '晚餐', note: '' },
        { hiragana: 'パン', kanji: '', meaning: '麵包', cantonese: '麵包', note: '外來語' },
        { hiragana: 'たまご', kanji: '卵', meaning: '雞蛋', cantonese: '蛋', note: '' },
        { hiragana: 'にく', kanji: '肉', meaning: '肉', cantonese: '肉', note: '' },
        { hiragana: 'さかな', kanji: '魚', meaning: '魚', cantonese: '魚', note: '' },
        { hiragana: 'やさい', kanji: '野菜', meaning: '蔬菜', cantonese: '菜', note: '' },
        { hiragana: 'くだもの', kanji: '果物', meaning: '水果', cantonese: '生果', note: '' },
      ],
    },
    {
      id: 3,
      title: '飲料與其他',
      subtitle: '茶、咖啡、啤酒、香煙',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'みず', kanji: '水', meaning: '水', cantonese: '水', note: '' },
        { hiragana: 'おちゃ', kanji: 'お茶', meaning: '茶、日本茶', cantonese: '茶', note: '' },
        { hiragana: 'こうちゃ', kanji: '紅茶', meaning: '紅茶', cantonese: '紅茶', note: '' },
        { hiragana: 'ぎゅうにゅう', kanji: '牛乳', meaning: '牛奶', cantonese: '牛奶', note: 'ミルク' },
        { hiragana: 'ジュース', kanji: '', meaning: '果汁', cantonese: '果汁', note: '外來語' },
        { hiragana: 'ビール', kanji: '', meaning: '啤酒', cantonese: '啤酒', note: '外來語' },
        { hiragana: 'おさけ', kanji: 'お酒', meaning: '酒、日本酒', cantonese: '酒', note: '' },
        { hiragana: 'たばこ', kanji: '', meaning: '香煙', cantonese: '煙', note: '' },
        { hiragana: 'てがみ', kanji: '手紙', meaning: '信', cantonese: '信', note: '' },
        { hiragana: 'レポート', kanji: '', meaning: '報告、小論文', cantonese: '報告', note: '外來語' },
        { hiragana: 'しゃしん', kanji: '写真', meaning: '照片', cantonese: '相', note: '' },
        { hiragana: 'ビデオ', kanji: '', meaning: '錄像帶、錄像機', cantonese: '錄影', note: '外來語' },
      ],
    },
    {
      id: 4,
      title: '地點與常用語',
      subtitle: '店、庭院、作業、運動',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'みせ', kanji: '店', meaning: '店', cantonese: '舖頭', note: '' },
        { hiragana: 'にわ', kanji: '庭', meaning: '庭院、院子', cantonese: '花園', note: '' },
        { hiragana: 'しゅくだい', kanji: '宿題', meaning: '作業', cantonese: '功課', note: '' },
        { hiragana: 'テニス', kanji: '', meaning: '網球', cantonese: '網球', note: '外來語' },
        { hiragana: 'サッカー', kanji: '', meaning: '足球', cantonese: '足球', note: '外來語' },
        { hiragana: 'おはなみ', kanji: 'お花見', meaning: '看花、賞花', cantonese: '賞花', note: '' },
        { hiragana: 'なに', kanji: '何', meaning: '什麼', cantonese: '乜嘢', note: '' },
        { hiragana: 'いっしょに', kanji: '', meaning: '一起', cantonese: '一齊', note: '' },
        { hiragana: 'ちょっと', kanji: '', meaning: '一會兒、一點兒', cantonese: '一陣', note: '' },
        { hiragana: 'いつも', kanji: '', meaning: '經常、總是', cantonese: '成日', note: '' },
        { hiragana: 'ときどき', kanji: '時々', meaning: '有時', cantonese: '有時', note: '' },
        { hiragana: 'それから', kanji: '', meaning: '然後', cantonese: '跟住', note: '' },
      ],
    },
    {
      id: 5,
      title: '會話與國家',
      subtitle: '常用對話與墨西哥',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'ええ', kanji: '', meaning: '欸、是', cantonese: '係', note: '' },
        { hiragana: 'いいですね', kanji: '', meaning: '好啊。', cantonese: '好喎', note: '' },
        { hiragana: 'わかりました', kanji: '', meaning: '明白了。', cantonese: '明白', note: '' },
        { hiragana: 'なんですか', kanji: '何ですか', meaning: '什麼？', cantonese: '乜嘢？', note: '' },
        { hiragana: 'じゃ、また', kanji: '', meaning: '那再見。', cantonese: '咁再見', note: 'あした=明天' },
        { hiragana: 'メキシコ', kanji: '', meaning: '墨西哥', cantonese: '墨西哥', note: '國家' },
        { hiragana: 'おおさかデパート', kanji: '大阪デパート', meaning: '大阪百貨', cantonese: '大阪百貨', note: '虛構商店' },
        { hiragana: 'つるや', kanji: '', meaning: '鶴屋', cantonese: '鶴屋', note: '虛構餐廳' },
        { hiragana: 'フランスや', kanji: 'フランス屋', meaning: '法國屋', cantonese: '法國屋', note: '虛構超市' },
        { hiragana: 'まいにちや', kanji: '毎日屋', meaning: '每日屋', cantonese: '每日屋', note: '虛構超市' },
      ],
      dialogue: [
        { speaker: 'A', japanese: 'いっしょにビールを飲みませんか。', cantonese: '一齊飲啤酒好唔好？', meaning: '一起喝啤酒好嗎？' },
        { speaker: 'B', japanese: 'いいですね。', cantonese: '好呀。', meaning: '好啊。' },
      ],
    },
  ],
};
