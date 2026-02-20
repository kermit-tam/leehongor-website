/**
 * N5 廣東話諧音管理後台
 * Admin: N5 Cantonese Phonetics Editor
 */

'use client';

import { useState, useEffect } from 'react';
import { useRequireAdmin } from '@/lib/auth-context';
import { lesson1Data, N5Vocab, n5LessonsList } from '@/data/n5-lessons';

interface EditableVocab extends N5Vocab {
  lessonId: string;
  lessonNum: number;
  unitId: number;
  vocabIndex: number;
}

export default function N5PhoneticsAdminPage() {
  const { isLoading, isAdmin } = useRequireAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<string>('all');
  const [editingVocab, setEditingVocab] = useState<EditableVocab | null>(null);
  const [editedCantonese, setEditedCantonese] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [localChanges, setLocalChanges] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem('n5-phonetics-custom');
    if (saved) {
      setLocalChanges(JSON.parse(saved));
    }
  }, []);

  const allVocab: EditableVocab[] = n5LessonsList.flatMap(lesson =>
    lesson.units.flatMap(unit =>
      unit.vocab.map((vocab, index) => ({
        ...vocab,
        lessonId: lesson.id,
        lessonNum: lesson.lessonNum,
        unitId: unit.id,
        vocabIndex: index,
      }))
    )
  );

  const filteredVocab = allVocab.filter(vocab => {
    const matchesSearch = 
      vocab.hiragana.includes(searchTerm) ||
      vocab.kanji.includes(searchTerm) ||
      vocab.meaning.includes(searchTerm) ||
      (vocab.cantonese?.includes(searchTerm) ?? false);
    
    const matchesLesson = selectedLesson === 'all' || vocab.lessonId === selectedLesson;
    
    return matchesSearch && matchesLesson;
  });

  const getDisplayCantonese = (vocab: EditableVocab): string => {
    const key = `${vocab.lessonId}-unit${vocab.unitId}-vocab${vocab.vocabIndex}`;
    return localChanges[key] || vocab.cantonese || '';
  };

  const startEdit = (vocab: EditableVocab) => {
    setEditingVocab(vocab);
    setEditedCantonese(getDisplayCantonese(vocab));
    setSaveMessage('');
  };

  const saveEdit = () => {
    if (!editingVocab) return;
    
    const key = `${editingVocab.lessonId}-unit${editingVocab.unitId}-vocab${editingVocab.vocabIndex}`;
    const newChanges = { ...localChanges, [key]: editedCantonese };
    
    setLocalChanges(newChanges);
    localStorage.setItem('n5-phonetics-custom', JSON.stringify(newChanges));
    
    setSaveMessage('✓ 已保存（僅存於本地，需手動更新代碼）');
    setTimeout(() => setEditingVocab(null), 500);
  };

  const resetEdit = (vocab: EditableVocab) => {
    const key = `${vocab.lessonId}-unit${vocab.unitId}-vocab${vocab.vocabIndex}`;
    const newChanges = { ...localChanges };
    delete newChanges[key];
    
    setLocalChanges(newChanges);
    localStorage.setItem('n5-phonetics-custom', JSON.stringify(newChanges));
  };

  const exportChanges = () => {
    const changes = Object.entries(localChanges).map(([key, cantonese]) => {
      const [lessonId, unitStr, vocabStr] = key.split('-');
      const unitId = parseInt(unitStr.replace('unit', ''));
      const vocabIndex = parseInt(vocabStr.replace('vocab', ''));
      
      const lesson = n5LessonsList.find(l => l.id === lessonId);
      const unit = lesson?.units.find(u => u.id === unitId);
      const vocab = unit?.vocab[vocabIndex];
      
      return {
        lessonId,
        unitId,
        vocabIndex,
        hiragana: vocab?.hiragana,
        kanji: vocab?.kanji,
        newCantonese: cantonese,
      };
    });
    
    const dataStr = JSON.stringify(changes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'n5-phonetics-changes.json';
    link.click();
  };

  const copyUpdatedCode = () => {
    let code = `// 更新後的 n5-lessons.ts 詞彙數據\n\n`;
    
    n5LessonsList.forEach(lesson => {
      code += `// 第${lesson.lessonNum}課\n`;
      lesson.units.forEach(unit => {
        code += `// 單元 ${unit.id}: ${unit.title}\n`;
        code += `vocab: [\n`;
        
        unit.vocab.forEach((vocab, index) => {
          const key = `${lesson.id}-unit${unit.id}-vocab${index}`;
          const customCantonese = localChanges[key];
          const cantoneseValue = customCantonese !== undefined ? customCantonese : (vocab.cantonese || '');
          
          code += `  { `;
          code += `hiragana: "${vocab.hiragana}", `;
          code += `kanji: "${vocab.kanji}", `;
          code += `meaning: "${vocab.meaning}", `;
          if (cantoneseValue) {
            code += `cantonese: "${cantoneseValue}", `;
          }
          if (vocab.note) {
            code += `note: "${vocab.note}" `;
          }
          code += `},\n`;
        });
        
        code += `],\n\n`;
      });
    });
    
    navigator.clipboard.writeText(code);
    setSaveMessage('✓ 已複製到剪貼板！請貼到 n5-lessons.ts');
  };

  if (isLoading) {
    return <div className="p-8 text-center">載入中...</div>;
  }

  if (!isAdmin) {
    return <div className="p-8 text-center text-red-500">無權限訪問</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#4A4A4A] mb-2">🎌 N5 廣東話諧音管理</h1>
        <p className="text-[#8C8C8C]">編輯所有課程的廣東話諧音</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8] p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="搜尋日文、漢字或意思..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 border border-[#E0E0E0] rounded-lg focus:border-[#C4B9AC] focus:outline-none"
          />
          
          <select
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
            className="px-4 py-2 border border-[#E0E0E0] rounded-lg focus:border-[#C4B9AC] focus:outline-none"
          >
            <option value="all">所有課程</option>
            {n5LessonsList.map(lesson => (
              <option key={lesson.id} value={lesson.id}>第{lesson.lessonNum}課</option>
            ))}
          </select>

          <button
            onClick={exportChanges}
            className="px-4 py-2 bg-[#8C8C8C] text-white rounded-lg hover:bg-[#6B6B6B]"
          >
            導出 JSON
          </button>
          
          <button
            onClick={copyUpdatedCode}
            className="px-4 py-2 bg-[#C4B9AC] text-white rounded-lg hover:bg-[#B5A99D]"
          >
            複製 TS 代碼
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-[#E8E8E8] flex gap-6 text-sm text-[#8C8C8C]">
          <span>總詞彙數：{allVocab.length}</span>
          <span>已修改：{Object.keys(localChanges).length}</span>
          <span>顯示中：{filteredVocab.length}</span>
        </div>
      </div>

      {saveMessage && (
        <div className="mb-4 p-4 bg-[#E8F5E9] text-[#2E7D32] rounded-lg">
          {saveMessage}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8] overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-[#FAFAFA] border-b border-[#E8E8E8] text-sm font-medium text-[#8C8C8C]">
          <div className="col-span-1">課程</div>
          <div className="col-span-1">單元</div>
          <div className="col-span-2">日文</div>
          <div className="col-span-2">漢字</div>
          <div className="col-span-2">意思</div>
          <div className="col-span-3">廣東話諧音</div>
          <div className="col-span-1">操作</div>
        </div>

        <div className="divide-y divide-[#E8E8E8]">
          {filteredVocab.map((vocab) => {
            const displayCantonese = getDisplayCantonese(vocab);
            const hasCustom = localChanges[`${vocab.lessonId}-unit${vocab.unitId}-vocab${vocab.vocabIndex}`] !== undefined;
            
            return (
              <div 
                key={`${vocab.lessonId}-${vocab.unitId}-${vocab.vocabIndex}`}
                className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#FAFAFA] ${hasCustom ? 'bg-[#FFF8E1]' : ''}`}
              >
                <div className="col-span-1 text-sm text-[#8C8C8C]">{vocab.lessonNum}</div>
                <div className="col-span-1 text-sm text-[#8C8C8C]">{vocab.unitId}</div>
                <div className="col-span-2 text-[#4A4A4A] font-medium">{vocab.hiragana}</div>
                <div className="col-span-2 text-[#4A4A4A]">{vocab.kanji}</div>
                <div className="col-span-2 text-sm text-[#8C8C8C]">{vocab.meaning}</div>
                <div className={`col-span-3 text-sm ${hasCustom ? 'text-[#C4B9AC] font-medium' : 'text-[#4A4A4A]'}`}>
                  {displayCantonese || '-'}
                  {hasCustom && <span className="ml-2 text-xs text-[#C4B9AC]">(已修改)</span>}
                </div>
                <div className="col-span-1 flex gap-2">
                  <button
                    onClick={() => startEdit(vocab)}
                    className="text-sm text-[#C4B9AC] hover:text-[#8C8C8C]"
                  >
                    編輯
                  </button>
                  {hasCustom && (
                    <button
                      onClick={() => resetEdit(vocab)}
                      className="text-sm text-red-400 hover:text-red-600"
                    >
                      重置
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {editingVocab && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-[#4A4A4A] mb-4">編輯廣東話諧音</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-[#8C8C8C]">日文：</span>
                <span className="text-[#4A4A4A] font-medium">{editingVocab.hiragana}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8C8C]">漢字：</span>
                <span className="text-[#4A4A4A]">{editingVocab.kanji}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8C8C]">意思：</span>
                <span className="text-[#4A4A4A]">{editingVocab.meaning}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8C8C]">原諧音：</span>
                <span className="text-[#8C8C8C]">{editingVocab.cantonese || '-'}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-[#8C8C8C] mb-2">新廣東話諧音：</label>
              <input
                type="text"
                value={editedCantonese}
                onChange={(e) => setEditedCantonese(e.target.value)}
                placeholder="例如：哇他西"
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:border-[#C4B9AC] focus:outline-none text-lg"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditingVocab(null)}
                className="flex-1 py-3 border border-[#E0E0E0] text-[#8C8C8C] rounded-lg hover:bg-[#F5F5F0]"
              >
                取消
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 py-3 bg-[#C4B9AC] text-white rounded-lg hover:bg-[#B5A99D]"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
