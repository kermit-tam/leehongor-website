'use client';

import { motion } from 'framer-motion';
import { Chord } from '../data/chords';

interface ChordDiagramProps {
  chord: Chord;
  showAnswer?: boolean;
}

export function ChordDiagram({ chord, showAnswer = false }: ChordDiagramProps) {
  // 解析弦位數據
  const stringPositions = chord.strings.split(' ').map(s => s === 'X' ? -1 : parseInt(s));
  const fingers = chord.fingering.split(' ').map(f => f === 'X' ? 0 : parseInt(f));
  
  // 找出最高品位
  const maxFret = Math.max(...stringPositions.filter(f => f > 0));
  const minFret = Math.min(...stringPositions.filter(f => f > 0));
  const startFret = maxFret > 4 ? minFret : 1;
  const displayFrets = 4;
  
  const strings = [6, 5, 4, 3, 2, 1]; // 從第6弦到第1弦
  const frets = Array.from({ length: displayFrets }, (_, i) => startFret + i);
  
  return (
    <div className="flex flex-col items-center">
      {/* 和弦名稱 */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-4xl font-black text-amber-800 mb-4"
      >
        {showAnswer ? chord.name : '?'}
      </motion.div>
      
      {/* 和弦圖 */}
      <div className="relative bg-amber-50 rounded-xl p-6 shadow-inner">
        <svg width="200" height="240" viewBox="0 0 200 240">
          {/* 品絲數字（左側） */}
          {frets.map((fret, idx) => (
            <text
              key={`fret-num-${fret}`}
              x="10"
              y={45 + idx * 40}
              fontSize="14"
              fill="#92400e"
              fontWeight="bold"
            >
              {fret}
            </text>
          ))}
          
          {/* 水平線（品絲） */}
          {frets.map((_, idx) => (
            <line
              key={`fret-${idx}`}
              x1="30"
              y1={40 + idx * 40}
              x2="190"
              y2={40 + idx * 40}
              stroke="#92400e"
              strokeWidth={idx === 0 && startFret === 1 ? "4" : "2"}
            />
          ))}
          
          {/* 垂直線（弦） */}
          {strings.map((stringNum, idx) => (
            <line
              key={`string-${stringNum}`}
              x1={40 + idx * 30}
              y1="40"
              x2={40 + idx * 30}
              y2="200"
              stroke="#92400e"
              strokeWidth={stringNum <= 2 ? "2" : "1.5"} // 低音弦較粗
            />
          ))}
          
          {/* 弦號（下方） */}
          {strings.map((stringNum, idx) => (
            <text
              key={`string-label-${stringNum}`}
              x={40 + idx * 30}
              y="225"
              fontSize="14"
              fill="#92400e"
              fontWeight="bold"
              textAnchor="middle"
            >
              {stringNum}
            </text>
          ))}
          
          {/* 按弦位置 */}
          {stringPositions.map((pos, stringIdx) => {
            if (pos === -1) {
              // X - 不彈這條弦
              return (
                <text
                  key={`mute-${stringIdx}`}
                  x={40 + stringIdx * 30}
                  y="25"
                  fontSize="16"
                  fill="#dc2626"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  X
                </text>
              );
            }
            
            if (pos === 0) {
              // 0 - 空弦
              return (
                <circle
                  key={`open-${stringIdx}`}
                  cx={40 + stringIdx * 30}
                  cy="25"
                  r="8"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2"
                />
              );
            }
            
            // 計算圓圈位置
            const fretIndex = pos - startFret;
            const y = 20 + (fretIndex + 1) * 40;
            
            return (
              <g key={`finger-${stringIdx}`}>
                {/* 按弦圓圈 */}
                <circle
                  cx={40 + stringIdx * 30}
                  cy={y}
                  r="14"
                  fill="#dc2626"
                  stroke="#991b1b"
                  strokeWidth="2"
                />
                {/* 指法數字 */}
                {fingers[stringIdx] > 0 && (
                  <text
                    x={40 + stringIdx * 30}
                    y={y + 5}
                    fontSize="14"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {fingers[stringIdx]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      
      {/* 提示文字 */}
      <p className="text-sm text-amber-700 mt-3">
        {showAnswer ? chord.name : '猜猜這是什麼和弦？'}
      </p>
    </div>
  );
}
