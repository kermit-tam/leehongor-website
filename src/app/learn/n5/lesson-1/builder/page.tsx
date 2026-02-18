import { GenericSentenceBuilder } from '@/components/sentence-builder/generic-builder';

// 第1課積木數據
const lesson1Blocks = {
  subject: [
    { id: 's1', category: 'subject' as const, text: 'わたしは', hiragana: 'わたしは', meaning: '我是', cantonese: '哇他西哇' },
    { id: 's2', category: 'subject' as const, text: 'たなかさんは', hiragana: 'たなかさんは', meaning: '田中先生是', cantonese: '他那卡散哇' },
    { id: 's3', category: 'subject' as const, text: 'あなたは', hiragana: 'あなたは', meaning: '你是', cantonese: '阿那他哇' },
    { id: 's4', category: 'subject' as const, text: 'かれは', hiragana: 'かれは', meaning: '他是', cantonese: '卡咧哇' },
    { id: 's5', category: 'subject' as const, text: 'かのじょは', hiragana: 'かのじょは', meaning: '她是', cantonese: '卡喲哇' },
  ],
  object: [
    { id: 'o1', category: 'object' as const, text: 'がくせい', hiragana: 'がくせい', meaning: '學生', cantonese: '學些' },
    { id: 'o2', category: 'object' as const, text: 'せんせい', hiragana: 'せんせい', meaning: '老師', cantonese: '森些' },
    { id: 'o3', category: 'object' as const, text: 'かいしゃいん', hiragana: 'かいしゃいん', meaning: '公司職員', cantonese: '卡一蝦銀' },
    { id: 'o4', category: 'object' as const, text: 'いしゃ', hiragana: 'いしゃ', meaning: '醫生', cantonese: '一蝦' },
    { id: 'o5', category: 'object' as const, text: 'にほんじん', hiragana: 'にほんじん', meaning: '日本人', cantonese: '你虹人' },
    { id: 'o6', category: 'object' as const, text: 'ちゅうごくじん', hiragana: 'ちゅうごくじん', meaning: '中國人', cantonese: '丘谷人' },
    { id: 'o7', category: 'object' as const, text: 'アメリカじん', hiragana: 'あめりかじん', meaning: '美國人', cantonese: '阿咩利卡人' },
    { id: 'o8', category: 'object' as const, text: 'かんこくじん', hiragana: 'かんこくじん', meaning: '韓國人', cantonese: '干谷人' },
  ],
  particle: [
    { id: 'p1', category: 'particle' as const, text: '', hiragana: '', meaning: '', cantonese: '' },
  ],
  verb: [
    { id: 'v1', category: 'verb' as const, text: 'です', hiragana: 'です', meaning: '是', cantonese: '爹司' },
    { id: 'v2', category: 'verb' as const, text: 'ですか', hiragana: 'ですか', meaning: '是嗎？', cantonese: '爹司卡' },
    { id: 'v3', category: 'verb' as const, text: 'じゃありません', hiragana: 'じゃありません', meaning: '不是', cantonese: '架阿里嘛森' },
  ],
  time: [],
  place: [
    { id: 'pl1', category: 'place' as const, text: 'にほんからきました', hiragana: 'にほんからきました', meaning: '從日本來', cantonese: '你虹卡拉 ki嘛西他' },
    { id: 'pl2', category: 'place' as const, text: 'ちゅうごくからきました', hiragana: 'ちゅうごくからきました', meaning: '從中國來', cantonese: '丘谷卡拉 ki嘛西他' },
    { id: 'pl3', category: 'place' as const, text: 'アメリカからきました', hiragana: 'あめりかからきました', meaning: '從美國來', cantonese: '阿咩利卡卡拉 ki嘛西他' },
  ],
};

const categoryOrder: ('subject' | 'object' | 'verb' | 'place')[] = ['subject', 'object', 'verb', 'place'];

const categoryNames = {
  subject: { title: '👤 人稱', subtitle: '我是／你是／他是', color: 'bg-[#E3F2FD]' },
  object: { title: '💼 身份／國籍', subtitle: '學生、老師、日本人等', color: 'bg-[#E8F5E9]' },
  verb: { title: '🔚 句尾', subtitle: 'です、ですか', color: 'bg-[#FFF3E0]' },
  particle: { title: '🔗 助詞', subtitle: '', color: 'bg-[#F5F5F0]' },
  place: { title: '🌏 來自哪裡', subtitle: '從日本來、從中國來', color: 'bg-[#F3E5F5]' },
  time: { title: '🕐 時間', subtitle: '', color: 'bg-[#F5F5F0]' },
};

export default function Lesson1Builder() {
  return (
    <GenericSentenceBuilder
      lessonNum={1}
      lessonTitle="初次見面"
      blocks={lesson1Blocks}
      categoryOrder={categoryOrder}
      categoryNames={categoryNames}
    />
  );
}
