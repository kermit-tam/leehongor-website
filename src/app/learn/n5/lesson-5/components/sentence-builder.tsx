/**
 * 積木造句機組件 - 帶語法驗證
 * Sentence Builder Component with Grammar Validation
 */

'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { SentenceBlock, SentenceTemplate, sentenceBlocks, sentenceTemplates, getBlocksByUnit } from '../game-data';

// 通用積木接口
interface BlockItem {
  id: string;
  text: string;
  type: string;
  meaning: string;
  unitId: number;
}

interface SentenceBuilderProps {
  maxUnitId: number;
  savedSentences: SavedSentence[];
  onSaveSentence: (sentence: SavedSentence) => void;
  // 可選：外部傳入積木數據
  lessonBlocks?: BlockItem[];
}

export interface SavedSentence {
  id: string;
  blocks: string[];
  fullText: string;
  meaning: string;
  createdAt: Date;
}

// 日語語法規則驗證
type GrammarRule = {
  id: string;
  description: string;
  validate: (blocks: BlockItem[]) => { isValid: boolean; error?: string };
};

// 定義語法規則
const grammarRules: GrammarRule[] = [
  {
    id: 'particle-after-noun',
    description: '助詞必須跟在名詞後面',
    validate: (blocks: BlockItem[]) => {
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].type === 'particle' && i > 0) {
          const prev = blocks[i - 1];
          if (prev.type === 'particle') {
            return { isValid: false, error: '「' + blocks[i].text + '」不能接在助詞後面' };
          }
        }
      }
      return { isValid: true };
    },
  },
  {
    id: 'verb-at-end',
    description: '動詞通常在句尾',
    validate: (blocks) => {
      const lastBlock = blocks[blocks.length - 1];
      if (lastBlock && lastBlock.type !== 'verb' && blocks.some(b => b.type === 'verb')) {
        // 這只是警告，不是錯誤
        // return { isValid: false, error: '句子建議以動詞結尾' };
      }
      return { isValid: true };
    },
  },
  {
    id: 'topic-first',
    description: '主題通常在句首',
    validate: (blocks) => {
      if (blocks.length > 1 && blocks[0].type === 'particle') {
        return { isValid: false, error: '句子不應以助詞開頭' };
      }
      return { isValid: true };
    },
  },
];

// 定義積木類型的正確順序權重（越小越靠前）
const typeOrderWeight: Record<string, number> = {
  topic: 1,
  time: 2,
  person: 3,
  transport: 4,
  place: 5,
  particle: 6,
  verb: 7,
};

// 檢查積木順序是否合理的函數
function checkBlockOrder(blocks: BlockItem[]): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];
  
  // 檢查語法規則
  for (const rule of grammarRules) {
    const result = rule.validate(blocks);
    if (!result.isValid) {
      return { isValid: false, warnings: [result.error || '語法錯誤'] };
    }
  }

  // 檢查順序提示
  for (let i = 1; i < blocks.length; i++) {
    const current = blocks[i];
    const prev = blocks[i - 1];
    
    const currentWeight = typeOrderWeight[current.type] || 99;
    const prevWeight = typeOrderWeight[prev.type] || 99;
    
    // 如果當前類型應該在前面，給出警告
    if (currentWeight < prevWeight) {
      warnings.push(`${current.meaning}通常放在${prev.meaning}前面`);
    }
  }

  return { isValid: true, warnings };
}

export function SentenceBuilder({ maxUnitId, savedSentences, onSaveSentence, lessonBlocks }: SentenceBuilderProps) {
  const [availableBlocks, setAvailableBlocks] = useState<BlockItem[]>([]);
  const [selectedBlocks, setSelectedBlocks] = useState<BlockItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [orderHints, setOrderHints] = useState<string[]>([]);
  const shareRef = useRef<HTMLDivElement>(null);

  // 獲取積木數據（優先使用外部傳入）
  const getBlocks = useCallback(() => {
    if (lessonBlocks) {
      return lessonBlocks.filter(b => b.unitId <= maxUnitId);
    }
    return getBlocksByUnit(maxUnitId);
  }, [lessonBlocks, maxUnitId]);

  // 初始化可用語塊（閘門系統）
  useEffect(() => {
    const blocks = getBlocks();
    // 按類型順序排序語塊
    const sortedBlocks = [...blocks].sort((a, b) => {
      return (typeOrderWeight[a.type] || 99) - (typeOrderWeight[b.type] || 99);
    });
    setAvailableBlocks(sortedBlocks);
  }, [maxUnitId, getBlocks]);

  // 計算推薦的下一個類型
  const recommendedNextType = useMemo(() => {
    if (selectedBlocks.length === 0) return ['topic', 'time', 'clothing', 'food'];
    
    const lastType = selectedBlocks[selectedBlocks.length - 1].type;
    const typeFlow: Record<string, string[]> = {
      topic: ['time', 'person', 'transport', 'place', 'clothing', 'food'],
      time: ['person', 'transport', 'place', 'particle', 'clothing'],
      person: ['transport', 'place', 'particle', 'clothing'],
      transport: ['place', 'particle'],
      place: ['particle', 'verb'],
      particle: ['verb', 'place', 'clothing', 'food'],
      verb: [],
      clothing: ['color', 'particle'],
      food: ['particle', 'taste'],
      taste: [],
    };
    
    return typeFlow[lastType] || [];
  }, [selectedBlocks]);

  const categories = [
    { id: 'all', label: '全部', color: 'bg-[#8C8C8C]' },
    { id: 'time', label: '時間', color: 'bg-[#E0DDD5]' },
    { id: 'person', label: '人物', color: 'bg-[#D5E0D7]' },
    { id: 'transport', label: '交通', color: 'bg-[#D5D7E0]' },
    { id: 'place', label: '地點', color: 'bg-[#E0D5D5]' },
    { id: 'verb', label: '動詞', color: 'bg-[#D5D5E0]' },
    { id: 'particle', label: '助詞', color: 'bg-[#E0D5C7]' },
    { id: 'topic', label: '主題', color: 'bg-[#D5E0E0]' },
  ];

  const filteredBlocks = activeCategory === 'all' 
    ? availableBlocks 
    : availableBlocks.filter(b => b.type === activeCategory);

  const handleBlockClick = useCallback((block: BlockItem) => {
    // 檢查是否可以添加這個積木
    const newBlocks = [...selectedBlocks, block];
    const validation = checkBlockOrder(newBlocks);
    
    if (!validation.isValid) {
      // 顯示錯誤但不阻止添加，讓用戶自己調整
      setValidationError(validation.warnings[0]);
      setTimeout(() => setValidationError(null), 3000);
    } else if (validation.warnings.length > 0) {
      setOrderHints(validation.warnings);
      setTimeout(() => setOrderHints([]), 5000);
    }

    setSelectedBlocks(newBlocks);
    setAvailableBlocks(prev => prev.filter(b => b.id !== block.id));
  }, [selectedBlocks]);

  const handleRemoveBlock = useCallback((index: number) => {
    const block = selectedBlocks[index];
    setSelectedBlocks(prev => prev.filter((_, i) => i !== index));
    
    // 將移除的積木放回正確位置（保持排序）
    setAvailableBlocks(prev => {
      const newBlocks = [...prev, block];
      return newBlocks.sort((a, b) => {
        return (typeOrderWeight[a.type] || 99) - (typeOrderWeight[b.type] || 99);
      });
    });
    
    setValidationError(null);
  }, [selectedBlocks]);

  const handleClear = useCallback(() => {
    setAvailableBlocks(prev => {
      const newBlocks = [...prev, ...selectedBlocks];
      return newBlocks.sort((a, b) => {
        return (typeOrderWeight[a.type] || 99) - (typeOrderWeight[b.type] || 99);
      });
    });
    setSelectedBlocks([]);
    setValidationError(null);
    setOrderHints([]);
  }, [selectedBlocks]);

  // 智能排序：根據日語語法自動排列當前選中的積木
  const handleAutoSort = useCallback(() => {
    if (selectedBlocks.length < 2) return;
    
    const sorted = [...selectedBlocks].sort((a, b) => {
      const weightA = typeOrderWeight[a.type] || 99;
      const weightB = typeOrderWeight[b.type] || 99;
      return weightA - weightB;
    });
    
    setSelectedBlocks(sorted);
  }, [selectedBlocks]);

  const playSentence = useCallback(() => {
    if (selectedBlocks.length === 0 || !('speechSynthesis' in window)) return;

    const fullText = selectedBlocks.map(b => b.text).join('');
    setIsPlaying(true);

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    utterance.pitch = 1;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  }, [selectedBlocks]);

  const generateMeaning = useCallback((blocks: BlockItem[]): string => {
    const meanings = blocks.map(b => b.meaning);
    return meanings.join('');
  }, []);

  const handleSave = useCallback(() => {
    if (selectedBlocks.length === 0) return;

    // 檢查語法
    const validation = checkBlockOrder(selectedBlocks);
    if (!validation.isValid) {
      setValidationError('句子有語法錯誤，請調整後再保存');
      return;
    }

    const sentence: SavedSentence = {
      id: Date.now().toString(),
      blocks: selectedBlocks.map(b => b.text),
      fullText: selectedBlocks.map(b => b.text).join(''),
      meaning: generateMeaning(selectedBlocks),
      createdAt: new Date(),
    };

    onSaveSentence(sentence);
    
    // 清空
    handleClear();
  }, [selectedBlocks, generateMeaning, onSaveSentence, handleClear]);

  const generateShareImage = useCallback(async () => {
    if (!shareRef.current) return;

    try {
      const canvas = await html2canvas(shareRef.current, {
        backgroundColor: '#8B7EC8',
        scale: 2,
        width: 1080,
        height: 1920,
      });

      const link = document.createElement('a');
      link.download = `leehongor-sentence-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('生成圖片失敗:', err);
      alert('生成圖片失敗，請重試');
    }
  }, []);

  const getBlockColor = (type: string, isRecommended: boolean = false) => {
    const colors: Record<string, string> = {
      time: isRecommended ? 'bg-[#E0DDD5] border-[#A8B5A0] ring-2 ring-[#A8B5A0]' : 'bg-[#E0DDD5] border-[#C4B9AC]',
      person: isRecommended ? 'bg-[#D5E0D7] border-[#A8B5A0] ring-2 ring-[#A8B5A0]' : 'bg-[#D5E0D7] border-[#A8B5A0]',
      transport: isRecommended ? 'bg-[#D5D7E0] border-[#A8B5A0] ring-2 ring-[#A8B5A0]' : 'bg-[#D5D7E0] border-[#A8A8B5]',
      place: isRecommended ? 'bg-[#E0D5D5] border-[#A8B5A0] ring-2 ring-[#A8B5A0]' : 'bg-[#E0D5D5] border-[#C4A8A8]',
      verb: isRecommended ? 'bg-[#D5D5E0] border-[#A8B5A0] ring-2 ring-[#A8B5A0]' : 'bg-[#D5D5E0] border-[#A8A8B5]',
      particle: isRecommended ? 'bg-[#E0D5C7] border-[#A8B5A0] ring-2 ring-[#A8B5A0]' : 'bg-[#E0D5C7] border-[#C4B9AC]',
      topic: isRecommended ? 'bg-[#D5E0E0] border-[#A8B5A0] ring-2 ring-[#A8B5A0]' : 'bg-[#D5E0E0] border-[#A8B5B5]',
    };
    return colors[type] || 'bg-white border-[#E5E5E5]';
  };

  const fullSentence = selectedBlocks.map(b => b.text).join('');
  const sentenceMeaning = generateMeaning(selectedBlocks);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* 語法錯誤提示 */}
      <AnimatePresence>
        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 p-3 bg-[#B8A8A0]/20 border border-[#B8A8A0] rounded-lg text-[#4A4A4A] text-sm flex items-center gap-2"
          >
            <span>⚠️</span>
            {validationError}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 順序提示 */}
      <AnimatePresence>
        {orderHints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 p-3 bg-[#E0D5C7] border border-[#C4B9AC] rounded-lg text-[#4A4A4A] text-sm"
          >
            <div className="font-medium mb-1">💡 語法建議：</div>
            {orderHints.map((hint, i) => (
              <div key={i} className="text-sm text-[#8C8C8C]">• {hint}</div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 分類標籤 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all
              ${activeCategory === cat.id 
                ? `${cat.color} text-[#4A4A4A] border-2 border-[#4A4A4A]` 
                : 'bg-white border border-[#E5E5E5] text-[#8C8C8C] hover:border-[#C4B9AC]'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 推薦提示 */}
      {selectedBlocks.length > 0 && recommendedNextType.length > 0 && (
        <div className="mb-3 text-sm text-[#8C8C8C]">
          💡 推薦下一個：{recommendedNextType.map(t => {
            const cat = categories.find(c => c.id === t);
            return cat?.label;
          }).filter(Boolean).join(' 或 ')}
        </div>
      )}

      {/* 語塊選擇區 */}
      <div className="bg-[#F5F5F0] rounded-xl p-4 mb-4 min-h-[120px]">
        <div className="text-sm text-[#8C8C8C] mb-2">
          點擊語塊造句（已學 {maxUnitId} 個單元）
        </div>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {filteredBlocks.map((block) => {
              const isRecommended = recommendedNextType.includes(block.type);
              return (
                <motion.button
                  key={block.id}
                  layout
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => handleBlockClick(block)}
                  whileTap={{ scale: 0.9 }}
                  className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all
                    ${getBlockColor(block.type, isRecommended)}
                    hover:shadow-md
                    ${isRecommended ? 'animate-pulse-glow' : ''}
                  `}
                >
                  <span className="text-[#4A4A4A]">{block.text}</span>
                  <span className="text-xs text-[#8C8C8C] ml-1">{block.meaning}</span>
                  {isRecommended && <span className="ml-1 text-[#A8B5A0]">✨</span>}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* 句子組合區 */}
      <div className="bg-white border-2 border-[#C4B9AC] rounded-xl p-4 mb-4 min-h-[100px]">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-[#8C8C8C]">你的句子</div>
          {selectedBlocks.length > 1 && (
            <button
              onClick={handleAutoSort}
              className="text-xs text-[#A8B5A0] hover:text-[#8FA088] flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              自動排序
            </button>
          )}
        </div>
        
        {selectedBlocks.length === 0 ? (
          <div className="text-center text-[#8C8C8C] py-4">點擊上方語塊開始造句</div>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            <AnimatePresence mode="popLayout">
              {selectedBlocks.map((block, index) => (
                <motion.button
                  key={`${block.id}-${index}`}
                  layout
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => handleRemoveBlock(index)}
                  className={`px-3 py-2 rounded-lg border-2 text-sm font-medium
                    ${getBlockColor(block.type)}
                    hover:opacity-70 cursor-pointer
                  `}
                >
                  {block.text}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
        
        {/* 完整句子顯示 */}
        {selectedBlocks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 pt-4 border-t border-[#E5E5E5] text-center"
          >
            <div className="text-xl font-medium text-[#4A4A4A]">{fullSentence}</div>
            <div className="text-sm text-[#8C8C8C] mt-1">{sentenceMeaning}</div>
          </motion.div>
        )}
      </div>

      {/* 功能按鈕 */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={playSentence}
          disabled={selectedBlocks.length === 0 || isPlaying}
          className="flex items-center gap-2 px-4 py-2 bg-[#A8B5A0] text-white rounded-lg hover:bg-[#8FA088] disabled:opacity-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          {isPlaying ? '播放中...' : '朗讀'}
        </button>
        
        <button
          onClick={handleSave}
          disabled={selectedBlocks.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-[#C4B9AC] text-white rounded-lg hover:bg-[#A09088] disabled:opacity-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          保存
        </button>
        
        <button
          onClick={() => setShowShareModal(true)}
          disabled={selectedBlocks.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-[#8B7EC8] text-white rounded-lg hover:bg-[#7A6DB7] disabled:opacity-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          分享IG
        </button>
        
        <button
          onClick={() => setShowSaved(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#8C8C8C] text-[#4A4A4A] rounded-lg hover:bg-[#F5F5F0] transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          我的句子簿 ({savedSentences.length})
        </button>
        
        <button
          onClick={handleClear}
          disabled={selectedBlocks.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#B8A8A0] text-[#B8A8A0] rounded-lg hover:bg-[#B8A8A0]/10 disabled:opacity-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          清除
        </button>
      </div>

      {/* 我的句子簿模態框 */}
      {showSaved && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-4 border-b border-[#E5E5E5] flex justify-between items-center">
              <h3 className="text-lg font-medium text-[#4A4A4A]">我的句子簿</h3>
              <button onClick={() => setShowSaved(false)} className="text-[#8C8C8C] hover:text-[#4A4A4A]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {savedSentences.length === 0 ? (
                <div className="text-center text-[#8C8C8C] py-8">暫無保存的句子</div>
              ) : (
                <div className="space-y-3">
                  {savedSentences.map((sentence) => (
                    <div key={sentence.id} className="bg-[#F5F5F0] p-3 rounded-lg">
                      <div className="font-medium text-[#4A4A4A]">{sentence.fullText}</div>
                      <div className="text-sm text-[#8C8C8C]">{sentence.meaning}</div>
                      <div className="text-xs text-[#8C8C8C] mt-1">
                        {new Date(sentence.createdAt).toLocaleDateString('zh-HK')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* 分享模態框 */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden"
          >
            <div className="p-4 border-b border-[#E5E5E5] flex justify-between items-center">
              <h3 className="text-lg font-medium text-[#4A4A4A]">生成IG分享圖</h3>
              <button onClick={() => setShowShareModal(false)} className="text-[#8C8C8C] hover:text-[#4A4A4A]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* 預覽區域 */}
            <div className="p-4 overflow-auto">
              <div 
                ref={shareRef}
                className="mx-auto"
                style={{ width: 1080, height: 1920, transform: 'scale(0.25)', transformOrigin: 'top center' }}
              >
                <div className="w-full h-full bg-gradient-to-br from-[#8B7EC8] to-[#6B5EA8] flex flex-col items-center justify-center p-20 text-white relative">
                  {/* Logo */}
                  <div className="absolute top-20 left-20 text-4xl font-bold opacity-80">
                    利康哥日文
                  </div>
                  
                  {/* 主內容 */}
                  <div className="text-center">
                    <div className="text-6xl mb-12 opacity-60">今日學嘅日文</div>
                    
                    {/* 句子 */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-16 mb-12">
                      <div className="text-8xl font-bold mb-8 leading-tight">{fullSentence}</div>
                      <div className="text-5xl opacity-80">{sentenceMeaning}</div>
                    </div>
                    
                    {/* 標籤 */}
                    <div className="text-4xl opacity-60">#大家的日本語 #第5課</div>
                  </div>
                  
                  {/* 底部 */}
                  <div className="absolute bottom-20 text-3xl opacity-60">
                    leehongor.com
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-[#E5E5E5] flex justify-center gap-3">
              <button
                onClick={generateShareImage}
                className="px-6 py-2 bg-[#8B7EC8] text-white rounded-lg hover:bg-[#7A6DB7] transition-colors"
              >
                下載圖片
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="px-6 py-2 bg-white border border-[#8C8C8C] text-[#4A4A4A] rounded-lg hover:bg-[#F5F5F0] transition-colors"
              >
                取消
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
