/**
 * 大家的日本語 N5 第14課：過去經驗
 * Minna no Nihongo N5 Lesson 14
 * 
 * 來源：大家的日本語 初級 I (第2版)
 */

import { N5Lesson } from './types';

export const lesson14Data: N5Lesson = {
  id: 'n5-lesson-14',
  lessonNum: 14,
  title: '過去經驗',
  description: '學習「～たことがあります」表達經驗。分4個微單元。',
  totalVocab: 40,
  totalTime: 20,
  units: [
    {
      id: 1,
      title: '經驗句型',
      subtitle: '～たことがあります',
      estimatedTime: 5,
      vocab: [
        { hiragana: '～たことがあります', kanji: '', meaning: '曾經～過', cantonese: '試過', note: '' },
        { hiragana: 'あります', kanji: '', meaning: '有（經驗）', cantonese: '有', note: '' },
        { hiragana: 'いちど', kanji: '一度', meaning: '一次', cantonese: '一次', note: '' },
        { hiragana: 'にど', kanji: '二度', meaning: '兩次', cantonese: '兩次', note: '' },
        { hiragana: 'さんど', kanji: '三度', meaning: '三次', cantonese: '三次', note: '' },
        { hiragana: 'なんど', kanji: '何度', meaning: '幾次', cantonese: '幾次', note: '' },
        { hiragana: 'ぜんぜん', kanji: '全然', meaning: '完全（沒有）', cantonese: '完全冇', note: '' },
        { hiragana: 'たいてい', kanji: '', meaning: '通常', cantonese: '通常', note: '' },
        { hiragana: 'たぶん', kanji: '多分', meaning: '大概', cantonese: '大概', note: '' },
        { hiragana: 'ほんとうは', kanji: '本当は', meaning: '其實', cantonese: '其實', note: '' },
      ],
      grammar: [
        {
          pattern: '～たことがあります',
          meaning: '曾經～過',
          example: 'にほんへ行ったことがあります。',
          exampleMeaning: '曾經去過日本。',
        },
        {
          pattern: '～たことがありません',
          meaning: '從未～過',
          example: 'さかなをつくったことがありません。',
          exampleMeaning: '從未煮過魚。',
        },
      ],
    },
    {
      id: 2,
      title: '日本體驗',
      subtitle: '旅行與文化',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'おんせん', kanji: '温泉', meaning: '溫泉', cantonese: '溫泉', note: '' },
        { hiragana: 'ふろ', kanji: '風呂', meaning: '浴缸／澡堂', cantonese: '浴', note: '' },
        { hiragana: 'さとうきび', kanji: '砂糖黍', meaning: '甘蔗', cantonese: '蔗', note: '' },
        { hiragana: 'さんか', kanji: '参加', meaning: '參加', cantonese: '參加', note: '' },
        { hiragana: 'かいぎ', kanji: '会議', meaning: '會議', cantonese: '會議', note: '' },
        { hiragana: 'パーティー', kanji: 'Party', meaning: '派對', cantonese: '派對', note: '' },
        { hiragana: 'しあい', kanji: '試合', meaning: '比賽', cantonese: '比賽', note: '' },
        { hiragana: 'イベント', kanji: 'Event', meaning: '活動', cantonese: '活動', note: '' },
        { hiragana: '～かい', kanji: '～回', meaning: '～次', cantonese: '次', note: '' },
        { hiragana: 'せんたく', kanji: '洗濯', meaning: '洗衣', cantonese: '洗衣', note: '' },
      ],
    },
    {
      id: 3,
      title: '經驗表達',
      subtitle: '分享經歷',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'おもいで', kanji: '思い出', meaning: '回憶', cantonese: '回憶', note: '' },
        { hiragana: 'たのしかった', kanji: '楽しかった', meaning: '很開心（過去）', cantonese: '好開心', note: '' },
        { hiragana: 'おもしろかった', kanji: '面白かった', meaning: '很有趣（過去）', cantonese: '幾有趣', note: '' },
        { hiragana: 'つまらなかった', kanji: '', meaning: '很無聊（過去）', cantonese: '好悶', note: '' },
        { hiragana: 'かなしかった', kanji: '悲しかった', meaning: '很傷心（過去）', cantonese: '好傷心', note: '' },
        { hiragana: 'さびしかった', kanji: '寂しかった', meaning: '很寂寞（過去）', cantonese: '好寂寞', note: '' },
        { hiragana: 'こわかった', kanji: '怖かった', meaning: '很害怕（過去）', cantonese: '好驚', note: '' },
        { hiragana: 'うれしかった', kanji: '嬉しかった', meaning: '很開心（過去）', cantonese: '好開心', note: '' },
        { hiragana: 'おどろきました', kanji: '驚きました', meaning: '嚇了一跳', cantonese: '嚇親', note: '' },
        { hiragana: 'がっかりしました', kanji: '', meaning: '失望', cantonese: '失望', note: '' },
      ],
    },
    {
      id: 4,
      title: '經驗對話',
      subtitle: '聊過去經歷',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'さいきん', kanji: '最近', meaning: '最近', cantonese: '最近', note: '' },
        { hiragana: 'まえに', kanji: '前に', meaning: '之前', cantonese: '之前', note: '' },
        { hiragana: 'ころ', kanji: '頃', meaning: '左右的時候', cantonese: '嗰陣', note: '' },
        { hiragana: 'とき', kanji: '時', meaning: '時候', cantonese: '時候', note: '' },
        { hiragana: 'まだ', kanji: '', meaning: '還（未）', cantonese: '仲未', note: '' },
        { hiragana: 'もう', kanji: '', meaning: '已經', cantonese: '已經', note: '' },
        { hiragana: 'ぜんぜん', kanji: '全然', meaning: '完全（不）', cantonese: '完全唔', note: '' },
        { hiragana: 'よく', kanji: '', meaning: '經常', cantonese: '成日', note: '' },
        { hiragana: 'たいへんでした', kanji: '大変でした', meaning: '很辛苦', cantonese: '好辛苦', note: '' },
        { hiragana: 'たのしみです', kanji: '楽しみです', meaning: '很期待', cantonese: '好期待', note: '' },
      ],
      dialogue: [
        { speaker: 'A', japanese: 'にほんへ行ったことがありますか。', cantonese: '去過日本未呀？', meaning: '去過日本嗎？' },
        { speaker: 'B', japanese: 'はい、あります。いちねんまえに行きました。', cantonese: '有呀，一年前去過。', meaning: '有的，一年前去過。' },
        { speaker: 'A', japanese: 'どこへ行きましたか。', cantonese: '去過邊度呀？', meaning: '去了哪裡？' },
        { speaker: 'B', japanese: 'とうきょうとおおさかへ行きました。', cantonese: '去過東京同大阪。', meaning: '去了東京和大阪。' },
      ],
    },
  ],
};
