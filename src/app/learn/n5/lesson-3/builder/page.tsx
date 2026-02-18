import { GenericSentenceBuilder } from '@/components/sentence-builder/generic-builder';

// 第3課積木數據 - 這裡是哪裡
const lesson3Blocks = {
  subject: [
    { id: 's1', category: 'subject' as const, text: 'ここは', hiragana: 'ここは', meaning: '這裡是', cantonese: '哥哥哇' },
    { id: 's2', category: 'subject' as const, text: 'そこは', hiragana: 'そこは', meaning: '那裡是', cantonese: '梳哥哇' },
    { id: 's3', category: 'subject' as const, text: 'あそこは', hiragana: 'あそこは', meaning: '那邊是', cantonese: '阿梳哥哇' },
    { id: 's4', category: 'subject' as const, text: 'こちらは', hiragana: 'こちらは', meaning: '這邊是（禮貌）', cantonese: '哥芝啦哇' },
  ],
  object: [
    { id: 'o1', category: 'object' as const, text: 'きょうしつ', hiragana: 'きょうしつ', meaning: '教室', cantonese: '鏡西刺' },
    { id: 'o2', category: 'object' as const, text: 'しょくどう', hiragana: 'しょくどう', meaning: '餐廳', cantonese: '梳古多' },
    { id: 'o3', category: 'object' as const, text: 'じむしょ', hiragana: 'じむしょ', meaning: '辦公室', cantonese: '芝謨梳' },
    { id: 'o4', category: 'object' as const, text: 'かいぎしつ', hiragana: 'かいぎしつ', meaning: '會議室', cantonese: '卡一gi西刺' },
    { id: 'o5', category: 'object' as const, text: 'うけつけ', hiragana: 'うけつけ', meaning: '櫃檯', cantonese: '烏kei' },
    { id: 'o6', category: 'object' as const, text: 'へや', hiragana: 'へや', meaning: '房間', cantonese: '吓也' },
    { id: 'o7', category: 'object' as const, text: 'トイレ', hiragana: 'といれ', meaning: '廁所', cantonese: '多衣咧' },
    { id: 'o8', category: 'object' as const, text: 'かいだん', hiragana: 'かいだん', meaning: '樓梯', cantonese: '卡衣單' },
    { id: 'o9', category: 'object' as const, text: 'エレベーター', hiragana: 'えれべーたー', meaning: '電梯', cantonese: '也咧啤多' },
  ],
  particle: [],
  verb: [
    { id: 'v1', category: 'verb' as const, text: 'です', hiragana: 'です', meaning: '是', cantonese: '爹司' },
    { id: 'v2', category: 'verb' as const, text: 'ですか', hiragana: 'ですか', meaning: '是嗎？', cantonese: '爹司卡' },
    { id: 'v3', category: 'verb' as const, text: 'はどこですか', hiragana: 'はどこですか', meaning: '在哪裡？', cantonese: '哇多哥爹司卡' },
  ],
  time: [],
  place: [],
};

const categoryOrder: ('subject' | 'object' | 'verb')[] = ['subject', 'object', 'verb'];

const categoryNames = {
  subject: { title: '📍 場所指示', subtitle: '這裡／那裡', color: 'bg-[#E3F2FD]' },
  object: { title: '🏢 地點', subtitle: '教室、餐廳、廁所等', color: 'bg-[#E8F5E9]' },
  verb: { title: '🔚 句尾', subtitle: 'です、在哪裡', color: 'bg-[#FFF3E0]' },
  particle: { title: '🔗 助詞', subtitle: '', color: 'bg-[#F5F5F0]' },
  place: { title: '📍 地點', subtitle: '', color: 'bg-[#F5F5F0]' },
  time: { title: '🕐 時間', subtitle: '', color: 'bg-[#F5F5F0]' },
};

export default function Lesson3Builder() {
  return (
    <GenericSentenceBuilder
      lessonNum={3}
      lessonTitle="這裡是哪裡"
      blocks={lesson3Blocks}
      categoryOrder={categoryOrder}
      categoryNames={categoryNames}
    />
  );
}
