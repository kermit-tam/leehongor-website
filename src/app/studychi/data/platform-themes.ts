/**
 * 港鐵站月台顏色主題 - 官方真實顏色
 * 資料來源：維基百科港鐵車站顏色模板 + 實地拍攝
 * https://zh.wikipedia.org/wiki/Template:%E6%B8%AF%E9%90%B5%E8%BB%8A%E7%AB%99%E9%A1%8F%E8%89%B2
 */

export interface PlatformTheme {
  stationId: string;
  stationName: string;
  // 牆身顏色（馬賽克瓷磚色）- 用於 fallback
  wallColor: string;
  // 柱子顏色
  pillarColor: string;
  // 站名顏色（寫喺柱上面）
  nameColor: string;
  // 地板顏色
  floorColor: string;
  // 文字顏色（黑或白）
  textColor: string;
  // CSS 牆身樣式（用於特殊設計：彩虹、格子、條紋等）
  wallStyle?: string;
  // 牆身類型描述
  wallType?: 'solid' | 'rainbow' | 'grid' | 'striped' | 'bordered';
}

// ===== 東鐵綫 =====
const eastRailThemes: PlatformTheme[] = [
  { stationId: 'eal-01', stationName: '金鐘', wallColor: '#3A86D4', pillarColor: '#3A86D4', nameColor: '#FFFFFF', floorColor: '#2A5A8A', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'eal-02', stationName: '會展', wallColor: '#94A8B0', pillarColor: '#94A8B0', nameColor: '#FFFFFF', floorColor: '#5A6A70', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'eal-03', stationName: '紅磡', wallColor: '#F08080', pillarColor: '#F08080', nameColor: '#000000', floorColor: '#A05050', textColor: '#000000', wallType: 'solid' },
  { stationId: 'eal-04', stationName: '旺角東', wallColor: '#006400', pillarColor: '#006400', nameColor: '#FFFFFF', floorColor: '#004000', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'eal-05', stationName: '九龍塘', wallColor: '#5FB7E4', pillarColor: '#5FB7E4', nameColor: '#FFFFFF', floorColor: '#3A87B4', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'eal-06', stationName: '大圍', wallColor: '#05117E', pillarColor: '#05117E', nameColor: '#FFFFFF', floorColor: '#030A50', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'eal-07', stationName: '沙田', wallColor: '#BB7796', pillarColor: '#BB7796', nameColor: '#FFFFFF', floorColor: '#8A5068', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'eal-08', stationName: '火炭', wallColor: '#FFA500', pillarColor: '#FFA500', nameColor: '#000000', floorColor: '#CC8400', textColor: '#000000', wallType: 'solid' },
  { stationId: 'eal-09', stationName: '馬場', wallColor: '#15AE69', pillarColor: '#15AE69', nameColor: '#FFFFFF', floorColor: '#0E804D', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'eal-10', stationName: '大學', wallColor: '#A2D7DD', pillarColor: '#A2D7DD', nameColor: '#000000', floorColor: '#6AA0A6', textColor: '#000000', wallType: 'solid' },
  { stationId: 'eal-11', stationName: '大埔墟', wallColor: '#976E9A', pillarColor: '#976E9A', nameColor: '#FFFFFF', floorColor: '#654A68', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'eal-12', stationName: '太和', wallColor: '#C89F05', pillarColor: '#C89F05', nameColor: '#FFFFFF', floorColor: '#967000', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'eal-13', stationName: '粉嶺', wallColor: '#9ACD32', pillarColor: '#9ACD32', nameColor: '#000000', floorColor: '#6A9D00', textColor: '#000000', wallType: 'solid' },
  { stationId: 'eal-14', stationName: '上水', wallColor: '#F6A600', pillarColor: '#F6A600', nameColor: '#000000', floorColor: '#C48000', textColor: '#000000', wallType: 'solid' },
  { stationId: 'eal-15', stationName: '羅湖', wallColor: '#8DC476', pillarColor: '#8DC476', nameColor: '#000000', floorColor: '#5A9446', textColor: '#000000', wallType: 'solid' },
  { stationId: 'eal-16', stationName: '落馬洲', wallColor: '#009E9B', pillarColor: '#009E9B', nameColor: '#FFFFFF', floorColor: '#006A68', textColor: '#FFFFFF', wallType: 'solid' },
];

// ===== 屯馬綫 =====
const tuenMaThemes: PlatformTheme[] = [
  { stationId: 'tml-01', stationName: '屯門', wallColor: '#035F94', pillarColor: '#035F94', nameColor: '#FFFFFF', floorColor: '#024060', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'tml-02', stationName: '兆康', wallColor: '#7FFFD4', pillarColor: '#7FFFD4', nameColor: '#000000', floorColor: '#4ACCA8', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-03', stationName: '天水圍', wallColor: '#FC8A17', pillarColor: '#FC8A17', nameColor: '#000000', floorColor: '#CC6A00', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-04', stationName: '朗屏', wallColor: '#FFB3BF', pillarColor: '#FFB3BF', nameColor: '#000000', floorColor: '#CC808C', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-05', stationName: '元朗', wallColor: '#40F5F5', pillarColor: '#40F5F5', nameColor: '#000000', floorColor: '#00C5C5', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-06', stationName: '錦上路', wallColor: '#CC5500', pillarColor: '#CC5500', nameColor: '#FFFFFF', floorColor: '#994000', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'tml-07', stationName: '荃灣西', wallColor: '#A81C07', pillarColor: '#A81C07', nameColor: '#FFFFFF', floorColor: '#781000', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'tml-08', stationName: '美孚', wallColor: '#5FB7E4', pillarColor: '#5FB7E4', nameColor: '#FFFFFF', floorColor: '#3A87B4', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'tml-09', stationName: '南昌', wallColor: '#F0EE86', pillarColor: '#F0EE86', nameColor: '#000000', floorColor: '#C0BE56', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-10', stationName: '柯士甸', wallColor: '#B45529', pillarColor: '#B45529', nameColor: '#FFFFFF', floorColor: '#843310', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'tml-11', stationName: '尖東', wallColor: '#FFFF00', pillarColor: '#FFFF00', nameColor: '#000000', floorColor: '#CCCC00', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-12', stationName: '紅磡', wallColor: '#F08080', pillarColor: '#F08080', nameColor: '#000000', floorColor: '#A05050', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-13', stationName: '何文田', wallColor: '#A2CF5A', pillarColor: '#A2CF5A', nameColor: '#000000', floorColor: '#729F2A', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-14', stationName: '土瓜灣', wallColor: '#A9E2F3', pillarColor: '#A9E2F3', nameColor: '#000000', floorColor: '#79B2C3', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-15', stationName: '宋皇臺', wallColor: '#D08A00', pillarColor: '#D08A00', nameColor: '#000000', floorColor: '#A06000', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-16', stationName: '啟德', wallColor: '#FF8C00', pillarColor: '#FF8C00', nameColor: '#000000', floorColor: '#CC6A00', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-17', stationName: '鑽石山', wallColor: '#000000', pillarColor: '#000000', nameColor: '#FFFFFF', floorColor: '#333333', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'tml-18', stationName: '顯徑', wallColor: '#8FBE6C', pillarColor: '#8FBE6C', nameColor: '#182F4F', floorColor: '#5F8E3C', textColor: '#182F4F', wallType: 'solid' },
  { stationId: 'tml-19', stationName: '大圍', wallColor: '#05117E', pillarColor: '#05117E', nameColor: '#FFFFFF', floorColor: '#030A50', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'tml-20', stationName: '車公廟', wallColor: '#FFD280', pillarColor: '#FFD280', nameColor: '#000000', floorColor: '#CCA250', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-21', stationName: '沙田圍', wallColor: '#FFC0CB', pillarColor: '#FFC0CB', nameColor: '#000000', floorColor: '#CC9098', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-22', stationName: '第一城', wallColor: '#FFBF00', pillarColor: '#FFBF00', nameColor: '#000000', floorColor: '#CC9900', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-23', stationName: '石門', wallColor: '#FBEC5D', pillarColor: '#FBEC5D', nameColor: '#000000', floorColor: '#CBB92D', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-24', stationName: '大水坑', wallColor: '#48D1CC', pillarColor: '#48D1CC', nameColor: '#000000', floorColor: '#28919C', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-25', stationName: '恆安', wallColor: '#87CEFA', pillarColor: '#87CEFA', nameColor: '#000000', floorColor: '#579ECA', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-26', stationName: '馬鞍山', wallColor: '#E0B0FF', pillarColor: '#E0B0FF', nameColor: '#000000', floorColor: '#B080CF', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tml-27', stationName: '烏溪沙', wallColor: '#954535', pillarColor: '#954535', nameColor: '#FFFFFF', floorColor: '#652505', textColor: '#FFFFFF', wallType: 'solid' },
];

// ===== 觀塘綫 =====
const kwunTongThemes: PlatformTheme[] = [
  { stationId: 'ktl-01', stationName: '黃埔', wallColor: '#AECFF0', pillarColor: '#AECFF0', nameColor: '#000000', floorColor: '#7E9FC0', textColor: '#000000', wallType: 'solid' },
  { stationId: 'ktl-02', stationName: '何文田', wallColor: '#A2CF5A', pillarColor: '#A2CF5A', nameColor: '#000000', floorColor: '#729F2A', textColor: '#000000', wallType: 'solid' },
  { stationId: 'ktl-03', stationName: '油麻地', wallColor: '#CCCCCC', pillarColor: '#CCCCCC', nameColor: '#000000', floorColor: '#999999', textColor: '#000000', wallType: 'solid' },
  { stationId: 'ktl-04', stationName: '旺角', wallColor: '#BE2700', pillarColor: '#BE2700', nameColor: '#FFFFFF', floorColor: '#8E1700', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'ktl-05', stationName: '太子', wallColor: '#8674A1', pillarColor: '#8674A1', nameColor: '#FFFFFF', floorColor: '#564471', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'ktl-06', stationName: '石硤尾', wallColor: '#6B8E23', pillarColor: '#6B8E23', nameColor: '#FFFFFF', floorColor: '#4A6E13', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'ktl-07', stationName: '九龍塘', wallColor: '#5FB7E4', pillarColor: '#5FB7E4', nameColor: '#FFFFFF', floorColor: '#3A87B4', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'ktl-08', stationName: '樂富', wallColor: '#6B8E23', pillarColor: '#6B8E23', nameColor: '#000000', floorColor: '#4A6E13', textColor: '#000000', 
    wallStyle: 'linear-gradient(to bottom, #C8102E 0%, #C8102E 15%, #6B8E23 15%, #6B8E23 100%)',
    wallType: 'bordered' },
  { stationId: 'ktl-09', stationName: '黃大仙', wallColor: '#FFFF00', pillarColor: '#FFFF00', nameColor: '#000000', floorColor: '#CCCC00', textColor: '#000000', wallType: 'solid' },
  { stationId: 'ktl-10', stationName: '鑽石山', wallColor: '#000000', pillarColor: '#000000', nameColor: '#FFFFFF', floorColor: '#333333', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'ktl-11', stationName: '彩虹', wallColor: '#27408B', pillarColor: '#27408B', nameColor: '#FFFFFF', floorColor: '#17205B', textColor: '#FFFFFF',
    wallStyle: 'linear-gradient(to bottom, #FF0000 0%, #FF7F00 14%, #FFFF00 28%, #00FF00 42%, #0000FF 56%, #4B0082 70%, #9400D3 84%, #FF0000 100%)',
    wallType: 'rainbow' },
  { stationId: 'ktl-12', stationName: '九龍灣', wallColor: '#C80815', pillarColor: '#C80815', nameColor: '#FFFFFF', floorColor: '#980805', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'ktl-13', stationName: '牛頭角', wallColor: '#92B6A3', pillarColor: '#92B6A3', nameColor: '#FFFFFF', floorColor: '#628673', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'ktl-14', stationName: '觀塘', wallColor: '#FFFFFF', pillarColor: '#FFFFFF', nameColor: '#000000', floorColor: '#CCCCCC', textColor: '#000000', wallType: 'solid' },
  { stationId: 'ktl-15', stationName: '藍田', wallColor: '#0083BE', pillarColor: '#0083BE', nameColor: '#000000', floorColor: '#00538E', textColor: '#000000', wallType: 'solid' },
  { stationId: 'ktl-16', stationName: '油塘', wallColor: '#D4C441', pillarColor: '#D4C441', nameColor: '#000000', floorColor: '#A49421', textColor: '#000000', wallType: 'solid' },
  { stationId: 'ktl-17', stationName: '調景嶺', wallColor: '#DCD144', pillarColor: '#DCD144', nameColor: '#000000', floorColor: '#ACA114', textColor: '#000000', wallType: 'solid' },
];

// ===== 港島綫 =====
const islandThemes: PlatformTheme[] = [
  { stationId: 'isl-01', stationName: '堅尼地城', wallColor: '#7ECDBB', pillarColor: '#7ECDBB', nameColor: '#000000', floorColor: '#4E9D8B', textColor: '#000000', wallType: 'solid' },
  { stationId: 'isl-02', stationName: '香港大學', wallColor: '#B8DA89', pillarColor: '#B8DA89', nameColor: '#000000', floorColor: '#88AA59', textColor: '#000000',
    wallStyle: 'repeating-linear-gradient(to bottom, #B8DA89 0px, #B8DA89 30px, #1A1A1A 30px, #1A1A1A 34px, #B8DA89 34px, #B8DA89 64px, #1A1A1A 64px, #1A1A1A 68px, #B8DA89 68px, #B8DA89 100%)',
    wallType: 'striped' },
  { stationId: 'isl-03', stationName: '西營盤', wallColor: '#8B7BA0', pillarColor: '#8B7BA0', nameColor: '#000000', floorColor: '#5B4B70', textColor: '#000000', wallType: 'solid' },
  { stationId: 'isl-04', stationName: '上環', wallColor: '#F5E6C4', pillarColor: '#F5E6C4', nameColor: '#6B4513', floorColor: '#C5B694', textColor: '#6B4513', wallType: 'solid' },
  { stationId: 'isl-05', stationName: '中環', wallColor: '#8B0000', pillarColor: '#8B0000', nameColor: '#FFFFFF', floorColor: '#5B0000', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'isl-06', stationName: '金鐘', wallColor: '#3A86D4', pillarColor: '#3A86D4', nameColor: '#FFFFFF', floorColor: '#2A5A8A', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'isl-07', stationName: '灣仔', wallColor: '#E1EB2B', pillarColor: '#E1EB2B', nameColor: '#000000', floorColor: '#B1BB00', textColor: '#000000', wallType: 'solid' },
  { stationId: 'isl-08', stationName: '銅鑼灣', wallColor: '#D8A8D8', pillarColor: '#D8A8D8', nameColor: '#000000', floorColor: '#A878A8', textColor: '#000000', wallType: 'solid' },
  { stationId: 'isl-09', stationName: '天后', wallColor: '#FF7D00', pillarColor: '#FF7D00', nameColor: '#000000', floorColor: '#CC5D00', textColor: '#000000', wallType: 'solid' },
  { stationId: 'isl-10', stationName: '炮台山', wallColor: '#228B22', pillarColor: '#228B22', nameColor: '#FFFFFF', floorColor: '#126B12', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'isl-11', stationName: '北角', wallColor: '#E86220', pillarColor: '#E86220', nameColor: '#000000', floorColor: '#B84000', textColor: '#000000', wallType: 'solid' },
  { stationId: 'isl-12', stationName: '鰂魚涌', wallColor: '#00918C', pillarColor: '#00918C', nameColor: '#FFFFFF', floorColor: '#00615C', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'isl-13', stationName: '太古', wallColor: '#C8102E', pillarColor: '#C8102E', nameColor: '#FFFFFF', floorColor: '#98081E', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'isl-14', stationName: '西灣河', wallColor: '#FFCC00', pillarColor: '#FFCC00', nameColor: '#000000', floorColor: '#CC9900', textColor: '#000000', wallType: 'solid' },
  { stationId: 'isl-15', stationName: '筲箕灣', wallColor: '#191970', pillarColor: '#191970', nameColor: '#FFFFFF', floorColor: '#0D0D40', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'isl-16', stationName: '杏花邨', wallColor: '#C8102E', pillarColor: '#C8102E', nameColor: '#FFFFFF', floorColor: '#90081E', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'isl-17', stationName: '柴灣', wallColor: '#2D5016', pillarColor: '#2D5016', nameColor: '#FFFFFF', floorColor: '#1A3009', textColor: '#FFFFFF',
    wallStyle: 'repeating-conic-gradient(#2D5016 0% 25%, #3D6026 0% 50%) 50% / 20px 20px',
    wallType: 'grid' },
];

// ===== 荃灣綫 =====
const tsuenWanThemes: PlatformTheme[] = [
  { stationId: 'twl-01', stationName: '荃灣', wallColor: '#C8102E', pillarColor: '#C8102E', nameColor: '#FFFFFF', floorColor: '#98081E', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'twl-02', stationName: '大窩口', wallColor: '#A2B741', pillarColor: '#A2B741', nameColor: '#FFFFFF', floorColor: '#728711', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'twl-03', stationName: '葵興', wallColor: '#F1CC00', pillarColor: '#F1CC00', nameColor: '#000000', floorColor: '#C19C00', textColor: '#000000', wallType: 'solid' },
  { stationId: 'twl-04', stationName: '葵芳', wallColor: '#233D3A', pillarColor: '#233D3A', nameColor: '#FFFFFF', floorColor: '#132D2A', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'twl-05', stationName: '荔景', wallColor: '#C8102E', pillarColor: '#C8102E', nameColor: '#FFFFFF', floorColor: '#98081E', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'twl-06', stationName: '美孚', wallColor: '#5FB7E4', pillarColor: '#5FB7E4', nameColor: '#FFFFFF', floorColor: '#3A87B4', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'twl-07', stationName: '荔枝角', wallColor: '#E04300', pillarColor: '#E04300', nameColor: '#FFFFFF', floorColor: '#B03000', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'twl-08', stationName: '長沙灣', wallColor: '#B5A265', pillarColor: '#B5A265', nameColor: '#000000', floorColor: '#857235', textColor: '#000000', wallType: 'solid' },
  { stationId: 'twl-09', stationName: '深水埗', wallColor: '#016258', pillarColor: '#016258', nameColor: '#FFFFFF', floorColor: '#004238', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'twl-10', stationName: '太子', wallColor: '#8674A1', pillarColor: '#8674A1', nameColor: '#FFFFFF', floorColor: '#564471', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'twl-11', stationName: '旺角', wallColor: '#C8102E', pillarColor: '#C8102E', nameColor: '#FFFFFF', floorColor: '#98081E', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'twl-12', stationName: '油麻地', wallColor: '#A9A9A9', pillarColor: '#A9A9A9', nameColor: '#000000', floorColor: '#797979', textColor: '#000000', wallType: 'solid' },
  { stationId: 'twl-13', stationName: '佐敦', wallColor: '#4A9B2C', pillarColor: '#4A9B2C', nameColor: '#FFFFFF', floorColor: '#2A6B1C', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'twl-14', stationName: '尖沙咀', wallColor: '#FFCC00', pillarColor: '#FFCC00', nameColor: '#000000', floorColor: '#CC9900', textColor: '#000000', wallType: 'solid' },
  { stationId: 'twl-15', stationName: '金鐘', wallColor: '#3A86D4', pillarColor: '#3A86D4', nameColor: '#FFFFFF', floorColor: '#2A5A8A', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'twl-16', stationName: '中環', wallColor: '#8B0000', pillarColor: '#8B0000', nameColor: '#FFFFFF', floorColor: '#5B0000', textColor: '#FFFFFF', wallType: 'solid' },
];

// ===== 將軍澳綫 =====
const tseungKwanOThemes: PlatformTheme[] = [
  { stationId: 'tko-01', stationName: '北角', wallColor: '#E86220', pillarColor: '#E86220', nameColor: '#000000', floorColor: '#B84000', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tko-02', stationName: '鰂魚涌', wallColor: '#00918C', pillarColor: '#00918C', nameColor: '#FFFFFF', floorColor: '#00615C', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'tko-03', stationName: '油塘', wallColor: '#D4C441', pillarColor: '#D4C441', nameColor: '#000000', floorColor: '#A49421', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tko-04', stationName: '調景嶺', wallColor: '#DCD144', pillarColor: '#DCD144', nameColor: '#000000', floorColor: '#ACA114', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tko-05', stationName: '將軍澳', wallColor: '#E60012', pillarColor: '#E60012', nameColor: '#FFFFFF', floorColor: '#B60002', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'tko-06', stationName: '坑口', wallColor: '#2EA9DF', pillarColor: '#2EA9DF', nameColor: '#000000', floorColor: '#1E79AF', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tko-07', stationName: '寶琳', wallColor: '#F28500', pillarColor: '#F28500', nameColor: '#000000', floorColor: '#C26500', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tko-08', stationName: '康城', wallColor: '#826F79', pillarColor: '#826F79', nameColor: '#FFFFFF', floorColor: '#524F49', textColor: '#FFFFFF', wallType: 'solid' },
];

// ===== 東涌綫 =====
const tungChungThemes: PlatformTheme[] = [
  { stationId: 'tcl-01', stationName: '東涌', wallColor: '#6A5ACD', pillarColor: '#6A5ACD', nameColor: '#000000', floorColor: '#4A3AAD', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tcl-02', stationName: '欣澳', wallColor: '#808080', pillarColor: '#808080', nameColor: '#C0C0C0', floorColor: '#505050', textColor: '#C0C0C0', wallType: 'solid' },
  { stationId: 'tcl-03', stationName: '青衣', wallColor: '#A1C6CA', pillarColor: '#A1C6CA', nameColor: '#000000', floorColor: '#71969A', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tcl-04', stationName: '荔景', wallColor: '#C8102E', pillarColor: '#C8102E', nameColor: '#FFFFFF', floorColor: '#98081E', textColor: '#FFFFFF', wallType: 'solid' },
  { stationId: 'tcl-05', stationName: '南昌', wallColor: '#F0EE86', pillarColor: '#F0EE86', nameColor: '#000000', floorColor: '#C0BE56', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tcl-06', stationName: '奧運', wallColor: '#5FB7E4', pillarColor: '#5FB7E4', nameColor: '#000000', floorColor: '#3A87B4', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tcl-07', stationName: '九龍', wallColor: '#ACA28A', pillarColor: '#ACA28A', nameColor: '#000000', floorColor: '#7C725A', textColor: '#000000', wallType: 'solid' },
  { stationId: 'tcl-08', stationName: '香港', wallColor: '#F0F0F0', pillarColor: '#F0F0F0', nameColor: '#000000', floorColor: '#C0C0C0', textColor: '#000000', wallType: 'solid' },
];

// 所有月台主題
export const allPlatformThemes: PlatformTheme[] = [
  ...eastRailThemes,
  ...tuenMaThemes,
  ...kwunTongThemes,
  ...islandThemes,
  ...tsuenWanThemes,
  ...tseungKwanOThemes,
  ...tungChungThemes,
];

// 獲取月台主題 by 站ID
export function getPlatformTheme(stationId: string): PlatformTheme | undefined {
  return allPlatformThemes.find(t => t.stationId === stationId);
}

// 獲取月台主題 by 站名
export function getPlatformThemeByName(stationName: string): PlatformTheme | undefined {
  return allPlatformThemes.find(t => t.stationName === stationName);
}

// 獲取牆身 CSS 樣式
export function getWallStyle(theme: PlatformTheme): string {
  if (theme.wallStyle) {
    return theme.wallStyle;
  }
  return theme.wallColor;
}
