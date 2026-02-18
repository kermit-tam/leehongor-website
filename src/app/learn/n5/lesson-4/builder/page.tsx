import { GenericSentenceBuilder } from '@/components/sentence-builder/generic-builder';

// 第4課積木數據 - 現在幾點
const lesson4Blocks = {
  subject: [
    { id: 's1', category: 'subject' as const, text: 'いま', hiragana: 'いま', meaning: '現在', cantonese: '衣嘛' },
    { id: 's2', category: 'subject' as const, text: 'きょう', hiragana: 'きょう', meaning: '今天', cantonese: '鏡' },
    { id: 's3', category: 'subject' as const, text: 'あした', hiragana: 'あした', meaning: '明天', cantonese: '阿士他' },
    { id: 's4', category: 'subject' as const, text: 'きのう', hiragana: 'きのう', meaning: '昨天', cantonese: 'ki喲' },
  ],
  object: [
    { id: 'o1', category: 'object' as const, text: 'なんじ', hiragana: 'なんじ', meaning: '幾點', cantonese: '難芝' },
    { id: 'o2', category: 'object' as const, text: 'いちじ', hiragana: 'いちじ', meaning: '1點', cantonese: '衣芝' },
    { id: 'o3', category: 'object' as const, text: 'にじ', hiragana: 'にじ', meaning: '2點', cantonese: '你芝' },
    { id: 'o4', category: 'object' as const, text: 'さんじ', hiragana: 'さんじ', meaning: '3點', cantonese: '散芝' },
    { id: 'o5', category: 'object' as const, text: 'ごじ', hiragana: 'ごじ', meaning: '5點', cantonese: '哥芝' },
    { id: 'o6', category: 'object' as const, text: 'ろくじ', hiragana: 'ろくじ', meaning: '6點', cantonese: '囉古芝' },
    { id: 'o7', category: 'object' as const, text: 'しちじ', hiragana: 'しちじ', meaning: '7點', cantonese: '西芝芝' },
    { id: 'o8', category: 'object' as const, text: 'くじ', hiragana: 'くじ', meaning: '9點', cantonese: '古芝' },
  ],
  particle: [],
  verb: [
    { id: 'v1', category: 'verb' as const, text: 'ですか', hiragana: 'ですか', meaning: '是嗎？', cantonese: '爹司卡' },
    { id: 'v2', category: 'verb' as const, text: 'です', hiragana: 'です', meaning: '是', cantonese: '爹司' },
    { id: 'v3', category: 'verb' as const, text: 'におきます', hiragana: 'におきます', meaning: '起床', cantonese: '你哦ki嘛司' },
    { id: 'v4', category: 'verb' as const, text: 'にねます', hiragana: 'にねます', meaning: '睡覺', cantonese: '你捏嘛司' },
    { id: 'v5', category: 'verb' as const, text: 'にかえります', hiragana: 'にかえります', meaning: '回家', cantonese: '你卡也利嘛司' },
  ],
  time: [
    { id: 't1', category: 'time' as const, text: 'あさ', hiragana: 'あさ', meaning: '早上', cantonese: '阿撒' },
    { id: 't2', category: 'time' as const, text: 'ひる', hiragana: 'ひる', meaning: '中午', cantonese: '希路' },
    { id: 't3', category: 'time' as const, text: 'ばん', hiragana: 'ばん', meaning: '晚上', cantonese: '崩' },
    { id: 't4', category: 'time' as const, text: 'ごぜん', hiragana: 'ごぜん', meaning: '上午', cantonese: '哥前' },
    { id: 't5', category: 'time' as const, text: 'ごご', hiragana: 'ごご', meaning: '下午', cantonese: '哥哥' },
  ],
  place: [],
};

const categoryOrder: ('subject' | 'time' | 'object' | 'verb')[] = ['subject', 'time', 'object', 'verb'];

const categoryNames = {
  subject: { title: '📅 時間詞', subtitle: '現在／今天／明天', color: 'bg-[#E3F2FD]' },
  object: { title: '🕐 時間點', subtitle: '幾點、1點、2點等', color: 'bg-[#E8F5E9]' },
  verb: { title: '⏰ 動作', subtitle: '是、起床、睡覺', color: 'bg-[#FFF3E0]' },
  particle: { title: '🔗 助詞', subtitle: '', color: 'bg-[#F5F5F0]' },
  place: { title: '📍 地點', subtitle: '', color: 'bg-[#F5F5F0]' },
  time: { title: '🌅 時段', subtitle: '早上、中午、晚上', color: 'bg-[#F3E5F5]' },
};

export default function Lesson4Builder() {
  return (
    <GenericSentenceBuilder
      lessonNum={4}
      lessonTitle="現在幾點"
      blocks={lesson4Blocks}
      categoryOrder={categoryOrder}
      categoryNames={categoryNames}
    />
  );
}
