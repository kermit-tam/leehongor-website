'use client';

import { motion } from 'framer-motion';
import { ExamSection, ExamYear } from '@/data/jlpt-n5-exam';

interface ExamFiltersProps {
  selectedYears: number[];
  selectedSections: ExamSection[];
  shuffleMode: boolean;
  questionCount: number | null;
  onYearsChange: (years: number[]) => void;
  onSectionsChange: (sections: ExamSection[]) => void;
  onShuffleChange: (shuffle: boolean) => void;
  onQuestionCountChange: (count: number | null) => void;
  availableYears: ExamYear[];
  sectionTitles: Record<ExamSection, { title: string; titleJp: string; icon: string }>;
}

export function ExamFilters({
  selectedYears,
  selectedSections,
  shuffleMode,
  questionCount,
  onYearsChange,
  onSectionsChange,
  onShuffleChange,
  onQuestionCountChange,
  availableYears,
  sectionTitles,
}: ExamFiltersProps) {
  const toggleYear = (year: number) => {
    if (selectedYears.includes(year)) {
      onYearsChange(selectedYears.filter(y => y !== year));
    } else {
      onYearsChange([...selectedYears, year]);
    }
  };

  const toggleSection = (section: ExamSection) => {
    if (selectedSections.includes(section)) {
      onSectionsChange(selectedSections.filter(s => s !== section));
    } else {
      onSectionsChange([...selectedSections, section]);
    }
  };

  const selectAllYears = () => {
    const allYears = [...new Set(availableYears.map(y => y.year))];
    onYearsChange(allYears);
  };

  const clearAllYears = () => {
    onYearsChange([]);
  };

  const selectAllSections = () => {
    const allSections: ExamSection[] = ['vocabulary', 'grammar', 'reading', 'listening'];
    onSectionsChange(allSections);
  };

  const clearAllSections = () => {
    onSectionsChange([]);
  };

  // 按年份分組
  const yearGroups = availableYears.reduce((acc, y) => {
    if (!acc[y.year]) acc[y.year] = [];
    acc[y.year].push(y);
    return acc;
  }, {} as Record<number, ExamYear[]>);

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] space-y-6">
      {/* 年份選擇 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-[#4A4A4A]">📅 選擇年份</h3>
          <div className="flex gap-2">
            <button
              onClick={selectAllYears}
              className="text-xs px-3 py-1 bg-[#F5F5F0] text-[#8C8C8C] rounded-full hover:bg-[#E0D5C7] transition-colors"
            >
              全選
            </button>
            <button
              onClick={clearAllYears}
              className="text-xs px-3 py-1 bg-[#F5F5F0] text-[#8C8C8C] rounded-full hover:bg-[#E0D5C7] transition-colors"
            >
              清除
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(yearGroups)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, months]) => {
              const isSelected = selectedYears.includes(Number(year));
              return (
                <motion.button
                  key={year}
                  onClick={() => toggleYear(Number(year))}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isSelected
                      ? 'bg-[#A8B5A0] text-white'
                      : 'bg-[#F5F5F0] text-[#4A4A4A] hover:bg-[#E0D5C7]'
                    }`}
                >
                  {year}年
                  <span className="ml-1 text-xs opacity-75">
                    ({months.length}次)
                  </span>
                </motion.button>
              );
            })}
        </div>
      </div>

      {/* 部份選擇 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-[#4A4A4A]">📚 選擇部份</h3>
          <div className="flex gap-2">
            <button
              onClick={selectAllSections}
              className="text-xs px-3 py-1 bg-[#F5F5F0] text-[#8C8C8C] rounded-full hover:bg-[#E0D5C7] transition-colors"
            >
              全選
            </button>
            <button
              onClick={clearAllSections}
              className="text-xs px-3 py-1 bg-[#F5F5F0] text-[#8C8C8C] rounded-full hover:bg-[#E0D5C7] transition-colors"
            >
              清除
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(Object.entries(sectionTitles) as [ExamSection, typeof sectionTitles[ExamSection]][])
            .filter(([section]) => section !== 'listening') // 暫時隱藏聆聽理解
            .map(
              ([section, info]) => {
                const isSelected = selectedSections.includes(section);
                return (
                  <motion.button
                    key={section}
                    onClick={() => toggleSection(section)}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl border-2 transition-colors text-left
                      ${isSelected
                        ? 'border-[#A8B5A0] bg-[#A8B5A0]/10'
                        : 'border-[#E5E5E5] hover:border-[#C4B9AC]'
                      }`}
                  >
                    <div className="text-2xl mb-1">{info.icon}</div>
                    <div className="font-medium text-[#4A4A4A]">{info.title}</div>
                    <div className="text-xs text-[#8C8C8C]">{info.titleJp}</div>
                  </motion.button>
                );
              }
            )}
        </div>
      </div>

      {/* 進階選項 */}
      <div className="border-t border-[#E5E5E5] pt-6">
        <h3 className="text-lg font-medium text-[#4A4A4A] mb-3">⚙️ 進階選項</h3>
        <div className="space-y-4">
          {/* 亂序模式 */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={shuffleMode}
              onChange={(e) => onShuffleChange(e.target.checked)}
              className="w-5 h-5 text-[#A8B5A0] rounded border-[#C4B9AC] focus:ring-[#A8B5A0]"
            />
            <span className="text-[#4A4A4A]">
              🔀 亂序出題
              <span className="text-sm text-[#8C8C8C] ml-2">同一部份的題目會隨機排序</span>
            </span>
          </label>

          {/* 題數限制 */}
          <div className="flex items-center gap-4">
            <span className="text-[#4A4A4A]">題目數量：</span>
            <div className="flex gap-2">
              <button
                onClick={() => onQuestionCountChange(null)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors
                  ${questionCount === null
                    ? 'bg-[#A8B5A0] text-white'
                    : 'bg-[#F5F5F0] text-[#4A4A4A] hover:bg-[#E0D5C7]'
                  }`}
              >
                全部
              </button>
              {[10, 20, 30, 50].map((count) => (
                <button
                  key={count}
                  onClick={() => onQuestionCountChange(count)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors
                    ${questionCount === count
                      ? 'bg-[#A8B5A0] text-white'
                      : 'bg-[#F5F5F0] text-[#4A4A4A] hover:bg-[#E0D5C7]'
                    }`}
                >
                  {count}題
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
