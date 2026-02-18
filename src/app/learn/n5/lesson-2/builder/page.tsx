import { GenericSentenceBuilder } from '@/components/sentence-builder/generic-builder';

// 第2課積木數據 - 這是什麼
const lesson2Blocks = {
  subject: [
    { id: 's1', category: 'subject' as const, text: 'これは', hiragana: 'これは', meaning: '這是', cantonese: '哥咧哇' },
    { id: 's2', category: 'subject' as const, text: 'それは', hiragana: 'それは', meaning: '那是（近對方）', cantonese: '梳咧哇' },
    { id: 's3', category: 'subject' as const, text: 'あれは', hiragana: 'あれは', meaning: '那是（遠處）', cantonese: '阿咧哇' },
    { id: 's4', category: 'subject' as const, text: 'この', hiragana: 'この', meaning: '這個～', cantonese: '哥囉' },
    { id: 's5', category: 'subject' as const, text: 'その', hiragana: 'その', meaning: '那個～（近對方）', cantonese: '梳囉' },
    { id: 's6', category: 'subject' as const, text: 'あの', hiragana: 'あの', meaning: '那個～（遠處）', cantonese: '阿囉' },
  ],
  object: [
    { id: 'o1', category: 'object' as const, text: 'ほん', hiragana: 'ほん', meaning: '書', cantonese: '虹' },
    { id: 'o2', category: 'object' as const, text: 'じしょ', hiragana: 'じしょ', meaning: '字典', cantonese: '芝梳' },
    { id: 'o3', category: 'object' as const, text: 'ざっし', hiragana: 'ざっし', meaning: '雑誌', cantonese: '咋士' },
    { id: 'o4', category: 'object' as const, text: 'しんぶん', hiragana: 'しんぶん', meaning: '報紙', cantonese: '心崩' },
    { id: 'o5', category: 'object' as const, text: 'ノート', hiragana: 'のーと', meaning: '筆記本', cantonese: '囉多' },
    { id: 'o6', category: 'object' as const, text: 'めいし', hiragana: 'めいし', meaning: '名片', cantonese: '咩西' },
    { id: 'o7', category: 'object' as const, text: 'かぎ', hiragana: 'かぎ', meaning: '鑰匙', cantonese: '卡gi' },
    { id: 'o8', category: 'object' as const, text: 'かさ', hiragana: 'かさ', meaning: '雨傘', cantonese: '卡撒' },
    { id: 'o9', category: 'object' as const, text: 'テレビ', hiragana: 'てれび', meaning: '電視', cantonese: '堤碑' },
    { id: 'o10', category: 'object' as const, text: 'パソコン', hiragana: 'ぱそこん', meaning: '電腦', cantonese: '趴梳魂' },
  ],
  particle: [],
  verb: [
    { id: 'v1', category: 'verb' as const, text: 'です', hiragana: 'です', meaning: '是', cantonese: '爹司' },
    { id: 'v2', category: 'verb' as const, text: 'ですか', hiragana: 'ですか', meaning: '是嗎？', cantonese: '爹司卡' },
    { id: 'v3', category: 'verb' as const, text: 'じゃありません', hiragana: 'じゃありません', meaning: '不是', cantonese: '架阿里嘛森' },
  ],
  time: [],
  place: [],
};

const categoryOrder: ('subject' | 'object' | 'verb')[] = ['subject', 'object', 'verb'];

const categoryNames = {
  subject: { title: '👆 指示詞', subtitle: '這是／那是', color: 'bg-[#E3F2FD]' },
  object: { title: '📦 物品', subtitle: '書、字典、雨傘等', color: 'bg-[#E8F5E9]' },
  verb: { title: '🔚 句尾', subtitle: 'です、ですか', color: 'bg-[#FFF3E0]' },
  particle: { title: '🔗 助詞', subtitle: '', color: 'bg-[#F5F5F0]' },
  place: { title: '📍 地點', subtitle: '', color: 'bg-[#F5F5F0]' },
  time: { title: '🕐 時間', subtitle: '', color: 'bg-[#F5F5F0]' },
};

export default function Lesson2Builder() {
  return (
    <GenericSentenceBuilder
      lessonNum={2}
      lessonTitle="這是什麼"
      blocks={lesson2Blocks}
      categoryOrder={categoryOrder}
      categoryNames={categoryNames}
    />
  );
}
