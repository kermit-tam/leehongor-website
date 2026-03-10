/**
 * 結他和弦數據
 * Guitar Chord Data
 */

export type ChordQuality = 'major' | 'minor' | '7' | 'maj7' | 'min7';

export interface Chord {
  name: string;
  root: string;
  quality: ChordQuality;
  strings: string;    // 如 "X 3 2 0 1 0" (從第6弦到第1弦)
  fingering: string;  // 如 "X 3 2 X 1 X"
}

// 常用和弦數據庫
export const CHORD_DATABASE: Chord[] = [
  // C family
  { name: 'C', root: 'C', quality: 'major', strings: 'X 3 2 0 1 0', fingering: 'X 3 2 X 1 X' },
  { name: 'Cm', root: 'C', quality: 'minor', strings: 'X 3 5 5 4 3', fingering: 'X 1 3 4 2 1' },
  { name: 'C7', root: 'C', quality: '7', strings: 'X 3 2 3 1 X', fingering: 'X 3 2 4 1 X' },
  { name: 'Cmaj7', root: 'C', quality: 'maj7', strings: 'X 3 2 0 0 0', fingering: 'X 3 2 X X X' },
  { name: 'Cm7', root: 'C', quality: 'min7', strings: 'X 3 5 3 4 3', fingering: 'X 1 3 1 4 1' },
  
  // D family
  { name: 'D', root: 'D', quality: 'major', strings: 'X X 0 2 3 2', fingering: 'X X X 1 3 2' },
  { name: 'Dm', root: 'D', quality: 'minor', strings: 'X X 0 2 3 1', fingering: 'X X X 2 3 1' },
  { name: 'D7', root: 'D', quality: '7', strings: 'X X 0 2 1 2', fingering: 'X X X 2 1 3' },
  { name: 'Dmaj7', root: 'D', quality: 'maj7', strings: 'X X 0 2 2 2', fingering: 'X X X 1 2 3' },
  { name: 'Dm7', root: 'D', quality: 'min7', strings: 'X X 0 2 1 1', fingering: 'X X X 2 1 1' },
  
  // E family
  { name: 'E', root: 'E', quality: 'major', strings: '0 2 2 1 0 0', fingering: 'X 2 3 1 X X' },
  { name: 'Em', root: 'E', quality: 'minor', strings: '0 2 2 0 0 0', fingering: 'X 2 3 X X X' },
  { name: 'E7', root: 'E', quality: '7', strings: '0 2 0 1 0 0', fingering: 'X 2 X 1 X X' },
  { name: 'Emaj7', root: 'E', quality: 'maj7', strings: '0 2 1 1 0 0', fingering: 'X 3 1 2 X X' },
  { name: 'Em7', root: 'E', quality: 'min7', strings: '0 2 0 0 0 0', fingering: 'X 2 X X X X' },
  
  // F family (barre chords)
  { name: 'F', root: 'F', quality: 'major', strings: '1 3 3 2 1 1', fingering: '1 3 4 2 1 1' },
  { name: 'Fm', root: 'F', quality: 'minor', strings: '1 3 3 1 1 1', fingering: '1 3 4 1 1 1' },
  { name: 'F7', root: 'F', quality: '7', strings: '1 3 1 2 1 1', fingering: '1 3 1 2 1 1' },
  { name: 'Fmaj7', root: 'F', quality: 'maj7', strings: '1 3 2 2 1 X', fingering: '1 3 2 4 1 X' },
  { name: 'Fm7', root: 'F', quality: 'min7', strings: '1 3 3 1 4 1', fingering: '1 3 4 1 2 1' },
  
  // G family
  { name: 'G', root: 'G', quality: 'major', strings: '3 2 0 0 0 3', fingering: '2 1 X X X 3' },
  { name: 'Gm', root: 'G', quality: 'minor', strings: '3 5 5 3 3 3', fingering: '1 3 4 1 1 1' },
  { name: 'G7', root: 'G', quality: '7', strings: '3 2 0 0 0 1', fingering: '3 2 X X X 1' },
  { name: 'Gmaj7', root: 'G', quality: 'maj7', strings: '3 2 0 0 0 2', fingering: '3 2 X X X 1' },
  { name: 'Gm7', root: 'G', quality: 'min7', strings: '3 5 3 3 3 3', fingering: '1 3 1 1 1 1' },
  
  // A family
  { name: 'A', root: 'A', quality: 'major', strings: 'X 0 2 2 2 0', fingering: 'X X 1 2 3 X' },
  { name: 'Am', root: 'A', quality: 'minor', strings: 'X 0 2 2 1 0', fingering: 'X X 2 3 1 X' },
  { name: 'A7', root: 'A', quality: '7', strings: 'X 0 2 0 2 0', fingering: 'X X 2 X 3 X' },
  { name: 'Amaj7', root: 'A', quality: 'maj7', strings: 'X 0 2 1 2 0', fingering: 'X X 2 1 3 X' },
  { name: 'Am7', root: 'A', quality: 'min7', strings: 'X 0 2 0 1 0', fingering: 'X X 2 X 1 X' },
  
  // B family (barre chords)
  { name: 'B', root: 'B', quality: 'major', strings: 'X 2 4 4 4 2', fingering: 'X 1 2 3 4 1' },
  { name: 'Bm', root: 'B', quality: 'minor', strings: 'X 2 4 4 3 2', fingering: 'X 1 3 4 2 1' },
  { name: 'B7', root: 'B', quality: '7', strings: 'X 2 1 2 0 2', fingering: 'X 2 1 3 X 4' },
  { name: 'Bmaj7', root: 'B', quality: 'maj7', strings: 'X 2 4 3 4 X', fingering: 'X 1 3 2 4 X' },
  { name: 'Bm7', root: 'B', quality: 'min7', strings: 'X 2 0 2 0 2', fingering: 'X 2 X 3 X 4' },
];

export const ROOTS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export const QUALITIES: { id: ChordQuality; name: string; symbol: string }[] = [
  { id: 'major', name: 'Major', symbol: '' },
  { id: 'minor', name: 'Minor', symbol: 'm' },
  { id: '7', name: 'Dominant 7', symbol: '7' },
  { id: 'maj7', name: 'Major 7', symbol: 'maj7' },
  { id: 'min7', name: 'Minor 7', symbol: 'm7' },
];

export function getChords(root?: string, quality?: ChordQuality): Chord[] {
  return CHORD_DATABASE.filter(chord => {
    if (root && chord.root !== root) return false;
    if (quality && chord.quality !== quality) return false;
    return true;
  });
}

export function getRandomChords(count: number, root?: string, quality?: ChordQuality): Chord[] {
  const filtered = getChords(root, quality);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, filtered.length));
}

export function getChordDisplayName(chord: Chord): string {
  const quality = QUALITIES.find(q => q.id === chord.quality);
  return chord.root + (quality?.symbol || '');
}
