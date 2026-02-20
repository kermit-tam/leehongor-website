/**
 * 大家的日本語 N5 第15課數據
 * Minna no Nihongo N5 Lesson 15
 * 
 * 課程：N5總複習
 * 來源：大家的日本語 初級 I (第2版)
 */

import { N5Lesson } from './types';

export const lesson15Data: N5Lesson = {
  id: 'n5-lesson-15',
  lessonNum: 15,
  title: 'N5總複習',
  description: 'N5文法總複習與敬語入門。分4個微單元。',
  totalVocab: 40,
  totalTime: 20,
  units: [
    {
      id: 1,
      title: 'N5 總複習',
      subtitle: '核心詞彙',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'うそ', kanji: '嘘', meaning: '謊言', cantonese: '大話', note: '' },
        { hiragana: 'ほんとう', kanji: '本当', meaning: '真的', cantonese: '真係', note: '' },
        { hiragana: 'おそく', kanji: '遅く', meaning: '遲到', cantonese: '遲到', note: '' },
        { hiragana: 'はやく', kanji: '早く', meaning: '早點', cantonese: '早啲', note: '' },
        { hiragana: 'よやく', kanji: '予約', meaning: '預約', cantonese: '預約', note: '' },
        { hiragana: 'キャンセル', kanji: 'Cancel', meaning: '取消', cantonese: '取消', note: '' },
        { hiragana: 'へんこう', kanji: '変更', meaning: '變更', cantonese: '更改', note: '' },
        { hiragana: 'さいしゅう', kanji: '最終', meaning: '最後', cantonese: '最後', note: '' },
        { hiragana: 'げんざい', kanji: '現在', meaning: '現在', cantonese: '而家', note: '' },
        { hiragana: 'もうすこし', kanji: 'もう少し', meaning: '再一點', cantonese: '再多少少', note: '' },
      ],
    },
    {
      id: 2,
      title: '複合句型',
      subtitle: '綜合運用',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'そうだん', kanji: '相談', meaning: '商量', cantonese: '傾', note: '' },
        { hiragana: 'けっか', kanji: '結果', meaning: '結果', cantonese: '結果', note: '' },
        { hiragana: 'だい', kanji: '第', meaning: '第', cantonese: '第', note: '' },
        { hiragana: 'かち', kanji: '勝ち', meaning: '勝利', cantonese: '贏', note: '' },
        { hiragana: 'まけ', kanji: '負け', meaning: '失敗', cantonese: '輸', note: '' },
        { hiragana: 'ひこう', kanji: '飛行', meaning: '飛行', cantonese: '飛行', note: '' },
        { hiragana: 'よてい', kanji: '予定', meaning: '預定', cantonese: '預定', note: '' },
        { hiragana: 'じこ', kanji: '事故', meaning: '事故', cantonese: '意外', note: '' },
        { hiragana: 'こうつう', kanji: '交通', meaning: '交通', cantonese: '交通', note: '' },
        { hiragana: 'じゅんび', kanji: '準備', meaning: '準備', cantonese: '準備', note: '' },
      ],
    },
    {
      id: 3,
      title: '禮貌用語',
      subtitle: '敬語表達',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'おります', kanji: 'おります', meaning: '在（謙讓語）', cantonese: '喺度', note: 'います的謙讓語' },
        { hiragana: 'ございます', kanji: '', meaning: '有（禮貌）', cantonese: '有', note: 'あります的禮貌語' },
        { hiragana: 'でございます', kanji: '', meaning: '是（禮貌）', cantonese: '係', note: 'です的禮貌語' },
        { hiragana: 'まいります', kanji: '参ります', meaning: '去／來（謙讓）', cantonese: '去／嚟', note: '行きます／来ます的謙讓語' },
        { hiragana: 'いたします', kanji: '', meaning: '做（謙讓）', cantonese: '做', note: 'します的謙讓語' },
        { hiragana: 'いただきます', kanji: '頂きます', meaning: '收到（謙讓）', cantonese: '收', note: 'もらいます的謙讓語' },
        { hiragana: 'なさい', kanji: '', meaning: '請～', cantonese: '請', note: '命令的禮貌形' },
        { hiragana: 'ごらんください', kanji: 'ご覧ください', meaning: '請看', cantonese: '請睇', note: '' },
        { hiragana: 'おねがいします', kanji: 'お願いします', meaning: '拜託', cantonese: '麻煩晒', note: '' },
        { hiragana: 'おまたせしました', kanji: 'お待たせしました', meaning: '讓您久等了', cantonese: '等耐咗', note: '' },
      ],
    },
    {
      id: 4,
      title: '總複習測驗',
      subtitle: '情境對話',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'べんきょう', kanji: '勉強', meaning: '學習', cantonese: '溫書', note: '' },
        { hiragana: 'しけん', kanji: '試験', meaning: '考試', cantonese: '考試', note: '' },
        { hiragana: 'うける', kanji: '受ける', meaning: '接受（考試）', cantonese: '考', note: '' },
        { hiragana: 'ごうかく', kanji: '合格', meaning: '合格', cantonese: '合格', note: '' },
        { hiragana: 'ふごうかく', kanji: '不合格', meaning: '不及格', cantonese: '唔合格', note: '' },
        { hiragana: 'せいせき', kanji: '成績', meaning: '成績', cantonese: '成績', note: '' },
        { hiragana: 'がんばります', kanji: '頑張ります', meaning: '加油', cantonese: '努力', note: '' },
        { hiragana: 'おつかれさま', kanji: 'お疲れ様', meaning: '辛苦了', cantonese: '辛苦晒', note: '' },
        { hiragana: 'めでとう', kanji: '目出度う', meaning: '恭喜', cantonese: '恭喜', note: '' },
        { hiragana: 'おめでとうございます', kanji: '', meaning: '恭喜（正式）', cantonese: '恭喜', note: '' },
      ],
      dialogue: [
        { speaker: 'A', japanese: 'しけんはどうでしたか。', cantonese: '考試點呀？', meaning: '考試怎麼樣？' },
        { speaker: 'B', japanese: 'ぜんぜんよくありませんでした。', cantonese: '完全唔得。', meaning: '完全不行。' },
        { speaker: 'A', japanese: 'ざんねんでしたね。でも、またがんばりましょう。', cantonese: '可惜。不過，下次再努力啦。', meaning: '可惜了。但是，下次再加油。' },
        { speaker: 'B', japanese: 'はい、ありがとうございます。', cantonese: '好，多謝。', meaning: '好的，謝謝。' },
      ],
    },
  ],
};
