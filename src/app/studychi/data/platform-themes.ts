/**
 * 港鐵站月台顏色主題 - 官方真實顏色
 * 資料來源：維基百科港鐵車站顏色模板
 * https://zh.wikipedia.org/wiki/Template:%E6%B8%AF%E9%90%B5%E8%BB%8A%E7%AB%99%E9%A1%8F%E8%89%B2
 */

export interface PlatformTheme {
  stationId: string;
  stationName: string;
  // 牆身顏色（馬賽克瓷磚色）
  wallColor: string;
  // 柱子顏色
  pillarColor: string;
  // 站名顏色（寫喺柱上面）
  nameColor: string;
  // 地板顏色
  floorColor: string;
  // 文字顏色（黑或白）
  textColor: string;
}

// ===== 東鐵綫 =====
const eastRailThemes: PlatformTheme[] = [
  { stationId: 'eal-01', stationName: '金鐘', wallColor: '#3A86D4', pillarColor: '#3A86D4', nameColor: '#FFFFFF', floorColor: '#2A5A8A', textColor: '#FFFFFF' },
  { stationId: 'eal-02', stationName: '會展', wallColor: '#94A8B0', pillarColor: '#94A8B0', nameColor: '#FFFFFF', floorColor: '#5A6A70', textColor: '#FFFFFF' },
  { stationId: 'eal-03', stationName: '紅磡', wallColor: '#F08080', pillarColor: '#F08080', nameColor: '#000000', floorColor: '#A05050', textColor: '#000000' },
  { stationId: 'eal-04', stationName: '旺角東', wallColor: '#006400', pillarColor: '#006400', nameColor: '#FFFFFF', floorColor: '#004000', textColor: '#FFFFFF' },
  { stationId: 'eal-05', stationName: '九龍塘', wallColor: '#007FFF', pillarColor: '#007FFF', nameColor: '#FFFFFF', floorColor: '#0055AA', textColor: '#FFFFFF' },
  { stationId: 'eal-06', stationName: '大圍', wallColor: '#05117E', pillarColor: '#05117E', nameColor: '#FFFFFF', floorColor: '#030A50', textColor: '#FFFFFF' },
  { stationId: 'eal-07', stationName: '沙田', wallColor: '#BB7796', pillarColor: '#BB7796', nameColor: '#FFFFFF', floorColor: '#8A5068', textColor: '#FFFFFF' },
  { stationId: 'eal-08', stationName: '火炭', wallColor: '#FFA500', pillarColor: '#FFA500', nameColor: '#000000', floorColor: '#CC8400', textColor: '#000000' },
  { stationId: 'eal-09', stationName: '馬場', wallColor: '#15AE69', pillarColor: '#15AE69', nameColor: '#FFFFFF', floorColor: '#0E804D', textColor: '#FFFFFF' },
  { stationId: 'eal-10', stationName: '大學', wallColor: '#A2D7DD', pillarColor: '#A2D7DD', nameColor: '#000000', floorColor: '#6AA0A6', textColor: '#000000' },
  { stationId: 'eal-11', stationName: '大埔墟', wallColor: '#976E9A', pillarColor: '#976E9A', nameColor: '#FFFFFF', floorColor: '#654A68', textColor: '#FFFFFF' },
  { stationId: 'eal-12', stationName: '太和', wallColor: '#C89F05', pillarColor: '#C89F05', nameColor: '#FFFFFF', floorColor: '#967000', textColor: '#FFFFFF' },
  { stationId: 'eal-13', stationName: '粉嶺', wallColor: '#9ACD32', pillarColor: '#9ACD32', nameColor: '#000000', floorColor: '#6A9D00', textColor: '#000000' },
  { stationId: 'eal-14', stationName: '上水', wallColor: '#F6A600', pillarColor: '#F6A600', nameColor: '#000000', floorColor: '#C48000', textColor: '#000000' },
  { stationId: 'eal-15', stationName: '羅湖', wallColor: '#8DC476', pillarColor: '#8DC476', nameColor: '#000000', floorColor: '#5A9446', textColor: '#000000' },
  { stationId: 'eal-16', stationName: '落馬洲', wallColor: '#009E9B', pillarColor: '#009E9B', nameColor: '#FFFFFF', floorColor: '#006A68', textColor: '#FFFFFF' },
];

// ===== 屯馬綫 =====
const tuenMaThemes: PlatformTheme[] = [
  { stationId: 'tml-01', stationName: '屯門', wallColor: '#035F94', pillarColor: '#035F94', nameColor: '#FFFFFF', floorColor: '#024060', textColor: '#FFFFFF' },
  { stationId: 'tml-02', stationName: '兆康', wallColor: '#7FFFD4', pillarColor: '#7FFFD4', nameColor: '#000000', floorColor: '#4ACCA8', textColor: '#000000' },
  { stationId: 'tml-03', stationName: '天水圍', wallColor: '#FC8A17', pillarColor: '#FC8A17', nameColor: '#000000', floorColor: '#CC6A00', textColor: '#000000' },
  { stationId: 'tml-04', stationName: '朗屏', wallColor: '#FFB3BF', pillarColor: '#FFB3BF', nameColor: '#000000', floorColor: '#CC808C', textColor: '#000000' },
  { stationId: 'tml-05', stationName: '元朗', wallColor: '#40F5F5', pillarColor: '#40F5F5', nameColor: '#000000', floorColor: '#00C5C5', textColor: '#000000' },
  { stationId: 'tml-06', stationName: '錦上路', wallColor: '#CC5500', pillarColor: '#CC5500', nameColor: '#FFFFFF', floorColor: '#994000', textColor: '#FFFFFF' },
  { stationId: 'tml-07', stationName: '荃灣西', wallColor: '#A81C07', pillarColor: '#A81C07', nameColor: '#FFFFFF', floorColor: '#781000', textColor: '#FFFFFF' },
  { stationId: 'tml-08', stationName: '美孚', wallColor: '#1E90FF', pillarColor: '#1E90FF', nameColor: '#FFFFFF', floorColor: '#0066CC', textColor: '#FFFFFF' },
  { stationId: 'tml-09', stationName: '南昌', wallColor: '#F0EE86', pillarColor: '#F0EE86', nameColor: '#000000', floorColor: '#C0BE56', textColor: '#000000' },
  { stationId: 'tml-10', stationName: '柯士甸', wallColor: '#B45529', pillarColor: '#B45529', nameColor: '#FFFFFF', floorColor: '#843310', textColor: '#FFFFFF' },
  { stationId: 'tml-11', stationName: '尖東', wallColor: '#FFFF00', pillarColor: '#FFFF00', nameColor: '#000000', floorColor: '#CCCC00', textColor: '#000000' },
  { stationId: 'tml-12', stationName: '紅磡', wallColor: '#F08080', pillarColor: '#F08080', nameColor: '#000000', floorColor: '#A05050', textColor: '#000000' },
  { stationId: 'tml-13', stationName: '何文田', wallColor: '#A2CF5A', pillarColor: '#A2CF5A', nameColor: '#000000', floorColor: '#729F2A', textColor: '#000000' },
  { stationId: 'tml-14', stationName: '土瓜灣', wallColor: '#A9E2F3', pillarColor: '#A9E2F3', nameColor: '#000000', floorColor: '#79B2C3', textColor: '#000000' },
  { stationId: 'tml-15', stationName: '宋皇臺', wallColor: '#D08A00', pillarColor: '#D08A00', nameColor: '#000000', floorColor: '#A06000', textColor: '#000000' },
  { stationId: 'tml-16', stationName: '啟德', wallColor: '#FF8C00', pillarColor: '#FF8C00', nameColor: '#000000', floorColor: '#CC6A00', textColor: '#000000' },
  { stationId: 'tml-17', stationName: '鑽石山', wallColor: '#000000', pillarColor: '#000000', nameColor: '#FFFFFF', floorColor: '#333333', textColor: '#FFFFFF' },
  { stationId: 'tml-18', stationName: '顯徑', wallColor: '#8FBE6C', pillarColor: '#8FBE6C', nameColor: '#182F4F', floorColor: '#5F8E3C', textColor: '#182F4F' },
  { stationId: 'tml-19', stationName: '大圍', wallColor: '#05117E', pillarColor: '#05117E', nameColor: '#FFFFFF', floorColor: '#030A50', textColor: '#FFFFFF' },
  { stationId: 'tml-20', stationName: '車公廟', wallColor: '#FFD280', pillarColor: '#FFD280', nameColor: '#000000', floorColor: '#CCA250', textColor: '#000000' },
  { stationId: 'tml-21', stationName: '沙田圍', wallColor: '#FFC0CB', pillarColor: '#FFC0CB', nameColor: '#000000', floorColor: '#CC9098', textColor: '#000000' },
  { stationId: 'tml-22', stationName: '第一城', wallColor: '#FFBF00', pillarColor: '#FFBF00', nameColor: '#000000', floorColor: '#CC9900', textColor: '#000000' },
  { stationId: 'tml-23', stationName: '石門', wallColor: '#FBEC5D', pillarColor: '#FBEC5D', nameColor: '#000000', floorColor: '#CBB92D', textColor: '#000000' },
  { stationId: 'tml-24', stationName: '大水坑', wallColor: '#48D1CC', pillarColor: '#48D1CC', nameColor: '#000000', floorColor: '#28919C', textColor: '#000000' },
  { stationId: 'tml-25', stationName: '恆安', wallColor: '#87CEFA', pillarColor: '#87CEFA', nameColor: '#000000', floorColor: '#579ECA', textColor: '#000000' },
  { stationId: 'tml-26', stationName: '馬鞍山', wallColor: '#E0B0FF', pillarColor: '#E0B0FF', nameColor: '#000000', floorColor: '#B080CF', textColor: '#000000' },
  { stationId: 'tml-27', stationName: '烏溪沙', wallColor: '#954535', pillarColor: '#954535', nameColor: '#FFFFFF', floorColor: '#652505', textColor: '#FFFFFF' },
];

// ===== 觀塘綫 =====
const kwunTongThemes: PlatformTheme[] = [
  { stationId: 'ktl-01', stationName: '黃埔', wallColor: '#AECFF0', pillarColor: '#AECFF0', nameColor: '#000000', floorColor: '#7E9FC0', textColor: '#000000' },
  { stationId: 'ktl-02', stationName: '何文田', wallColor: '#A2CF5A', pillarColor: '#A2CF5A', nameColor: '#000000', floorColor: '#729F2A', textColor: '#000000' },
  { stationId: 'ktl-03', stationName: '油麻地', wallColor: '#CCCCCC', pillarColor: '#CCCCCC', nameColor: '#000000', floorColor: '#999999', textColor: '#000000' },
  { stationId: 'ktl-04', stationName: '旺角', wallColor: '#BE2700', pillarColor: '#BE2700', nameColor: '#FFFFFF', floorColor: '#8E1700', textColor: '#FFFFFF' },
  { stationId: 'ktl-05', stationName: '太子', wallColor: '#8674A1', pillarColor: '#8674A1', nameColor: '#FFFFFF', floorColor: '#564471', textColor: '#FFFFFF' },
  { stationId: 'ktl-06', stationName: '石硤尾', wallColor: '#669933', pillarColor: '#669933', nameColor: '#FFFFFF', floorColor: '#466913', textColor: '#FFFFFF' },
  { stationId: 'ktl-07', stationName: '九龍塘', wallColor: '#007FFF', pillarColor: '#007FFF', nameColor: '#FFFFFF', floorColor: '#0055AA', textColor: '#FFFFFF' },
  { stationId: 'ktl-08', stationName: '樂富', wallColor: '#579E2F', pillarColor: '#579E2F', nameColor: '#000000', floorColor: '#376E0F', textColor: '#000000' },
  { stationId: 'ktl-09', stationName: '黃大仙', wallColor: '#FFFF00', pillarColor: '#FFFF00', nameColor: '#000000', floorColor: '#CCCC00', textColor: '#000000' },
  { stationId: 'ktl-10', stationName: '鑽石山', wallColor: '#000000', pillarColor: '#000000', nameColor: '#FFFFFF', floorColor: '#333333', textColor: '#FFFFFF' },
  { stationId: 'ktl-11', stationName: '彩虹', wallColor: '#27408B', pillarColor: '#27408B', nameColor: '#FFFFFF', floorColor: '#17205B', textColor: '#FFFFFF' },
  { stationId: 'ktl-12', stationName: '九龍灣', wallColor: '#C80815', pillarColor: '#C80815', nameColor: '#FFFFFF', floorColor: '#980805', textColor: '#FFFFFF' },
  { stationId: 'ktl-13', stationName: '牛頭角', wallColor: '#92B6A3', pillarColor: '#92B6A3', nameColor: '#FFFFFF', floorColor: '#628673', textColor: '#FFFFFF' },
  { stationId: 'ktl-14', stationName: '觀塘', wallColor: '#FFFFFF', pillarColor: '#FFFFFF', nameColor: '#000000', floorColor: '#CCCCCC', textColor: '#000000' },
  { stationId: 'ktl-15', stationName: '藍田', wallColor: '#0083BE', pillarColor: '#0083BE', nameColor: '#000000', floorColor: '#00538E', textColor: '#000000' },
  { stationId: 'ktl-16', stationName: '油塘', wallColor: '#FFEF00', pillarColor: '#FFEF00', nameColor: '#000000', floorColor: '#CCBC00', textColor: '#000000' },
  { stationId: 'ktl-17', stationName: '調景嶺', wallColor: '#DCD144', pillarColor: '#DCD144', nameColor: '#000000', floorColor: '#ACA114', textColor: '#000000' },
];

// ===== 港島綫 =====
const islandThemes: PlatformTheme[] = [
  { stationId: 'isl-01', stationName: '堅尼地城', wallColor: '#95D0D0', pillarColor: '#95D0D0', nameColor: '#000000', floorColor: '#65A0A0', textColor: '#000000' },
  { stationId: 'isl-02', stationName: '香港大學', wallColor: '#B8DA89', pillarColor: '#B8DA89', nameColor: '#000000', floorColor: '#88AA59', textColor: '#000000' },
  { stationId: 'isl-03', stationName: '西營盤', wallColor: '#8B7BA0', pillarColor: '#8B7BA0', nameColor: '#000000', floorColor: '#5B4B70', textColor: '#000000' },
  { stationId: 'isl-04', stationName: '上環', wallColor: '#FFD280', pillarColor: '#FFD280', nameColor: '#6B4513', floorColor: '#CCA250', textColor: '#6B4513' },
  { stationId: 'isl-05', stationName: '中環', wallColor: '#AA0000', pillarColor: '#AA0000', nameColor: '#FFFFFF', floorColor: '#770000', textColor: '#FFFFFF' },
  { stationId: 'isl-06', stationName: '金鐘', wallColor: '#3A86D4', pillarColor: '#3A86D4', nameColor: '#FFFFFF', floorColor: '#2A5A8A', textColor: '#FFFFFF' },
  { stationId: 'isl-07', stationName: '灣仔', wallColor: '#E1EB2B', pillarColor: '#E1EB2B', nameColor: '#000000', floorColor: '#B1BB00', textColor: '#000000' },
  { stationId: 'isl-08', stationName: '銅鑼灣', wallColor: '#C8A2C8', pillarColor: '#C8A2C8', nameColor: '#000000', floorColor: '#987298', textColor: '#000000' },
  { stationId: 'isl-09', stationName: '天后', wallColor: '#FF7D00', pillarColor: '#FF7D00', nameColor: '#000000', floorColor: '#CC5D00', textColor: '#000000' },
  { stationId: 'isl-10', stationName: '炮台山', wallColor: '#4B8842', pillarColor: '#4B8842', nameColor: '#FFFFFF', floorColor: '#2B5822', textColor: '#FFFFFF' },
  { stationId: 'isl-11', stationName: '北角', wallColor: '#E86220', pillarColor: '#E86220', nameColor: '#000000', floorColor: '#B84000', textColor: '#000000' },
  { stationId: 'isl-12', stationName: '鰂魚涌', wallColor: '#00918C', pillarColor: '#00918C', nameColor: '#FFFFFF', floorColor: '#00615C', textColor: '#FFFFFF' },
  { stationId: 'isl-13', stationName: '太古', wallColor: '#BB2200', pillarColor: '#BB2200', nameColor: '#FFFFFF', floorColor: '#881800', textColor: '#FFFFFF' },
  { stationId: 'isl-14', stationName: '西灣河', wallColor: '#FFCC00', pillarColor: '#FFCC00', nameColor: '#000000', floorColor: '#CC9900', textColor: '#000000' },
  { stationId: 'isl-15', stationName: '筲箕灣', wallColor: '#191970', pillarColor: '#191970', nameColor: '#FFFFFF', floorColor: '#0D0D40', textColor: '#FFFFFF' },
  { stationId: 'isl-16', stationName: '杏花邨', wallColor: '#C01204', pillarColor: '#C01204', nameColor: '#FFFFFF', floorColor: '#900800', textColor: '#FFFFFF' },
  { stationId: 'isl-17', stationName: '柴灣', wallColor: '#38510E', pillarColor: '#38510E', nameColor: '#FFFFFF', floorColor: '#182900', textColor: '#FFFFFF' },
];

// ===== 荃灣綫 =====
const tsuenWanThemes: PlatformTheme[] = [
  { stationId: 'twl-01', stationName: '荃灣', wallColor: '#BB2200', pillarColor: '#BB2200', nameColor: '#FFFFFF', floorColor: '#881800', textColor: '#FFFFFF' },
  { stationId: 'twl-02', stationName: '大窩口', wallColor: '#A2B741', pillarColor: '#A2B741', nameColor: '#FFFFFF', floorColor: '#728711', textColor: '#FFFFFF' },
  { stationId: 'twl-03', stationName: '葵興', wallColor: '#F1CC00', pillarColor: '#F1CC00', nameColor: '#000000', floorColor: '#C19C00', textColor: '#000000' },
  { stationId: 'twl-04', stationName: '葵芳', wallColor: '#233D3A', pillarColor: '#233D3A', nameColor: '#FFFFFF', floorColor: '#132D2A', textColor: '#FFFFFF' },
  { stationId: 'twl-05', stationName: '荔景', wallColor: '#BB2200', pillarColor: '#BB2200', nameColor: '#FFFFFF', floorColor: '#881800', textColor: '#FFFFFF' },
  { stationId: 'twl-06', stationName: '美孚', wallColor: '#1E90FF', pillarColor: '#1E90FF', nameColor: '#FFFFFF', floorColor: '#0066CC', textColor: '#FFFFFF' },
  { stationId: 'twl-07', stationName: '荔枝角', wallColor: '#E04300', pillarColor: '#E04300', nameColor: '#FFFFFF', floorColor: '#B03000', textColor: '#FFFFFF' },
  { stationId: 'twl-08', stationName: '長沙灣', wallColor: '#B5A265', pillarColor: '#B5A265', nameColor: '#000000', floorColor: '#857235', textColor: '#000000' },
  { stationId: 'twl-09', stationName: '深水埗', wallColor: '#016258', pillarColor: '#016258', nameColor: '#FFFFFF', floorColor: '#004238', textColor: '#FFFFFF' },
  { stationId: 'twl-10', stationName: '太子', wallColor: '#8674A1', pillarColor: '#8674A1', nameColor: '#FFFFFF', floorColor: '#564471', textColor: '#FFFFFF' },
  { stationId: 'twl-11', stationName: '旺角', wallColor: '#BE2700', pillarColor: '#BE2700', nameColor: '#FFFFFF', floorColor: '#8E1700', textColor: '#FFFFFF' },
  { stationId: 'twl-12', stationName: '油麻地', wallColor: '#CCCCCC', pillarColor: '#CCCCCC', nameColor: '#000000', floorColor: '#999999', textColor: '#000000' },
  { stationId: 'twl-13', stationName: '佐敦', wallColor: '#69B72B', pillarColor: '#69B72B', nameColor: '#FFFFFF', floorColor: '#49870B', textColor: '#FFFFFF' },
  { stationId: 'twl-14', stationName: '尖沙咀', wallColor: '#FFEF00', pillarColor: '#FFEF00', nameColor: '#000000', floorColor: '#CCBC00', textColor: '#000000' },
  { stationId: 'twl-15', stationName: '金鐘', wallColor: '#3A86D4', pillarColor: '#3A86D4', nameColor: '#FFFFFF', floorColor: '#2A5A8A', textColor: '#FFFFFF' },
  { stationId: 'twl-16', stationName: '中環', wallColor: '#AA0000', pillarColor: '#AA0000', nameColor: '#FFFFFF', floorColor: '#770000', textColor: '#FFFFFF' },
];

// ===== 將軍澳綫 =====
const tseungKwanOThemes: PlatformTheme[] = [
  { stationId: 'tko-01', stationName: '北角', wallColor: '#E86220', pillarColor: '#E86220', nameColor: '#000000', floorColor: '#B84000', textColor: '#000000' },
  { stationId: 'tko-02', stationName: '鰂魚涌', wallColor: '#00918C', pillarColor: '#00918C', nameColor: '#FFFFFF', floorColor: '#00615C', textColor: '#FFFFFF' },
  { stationId: 'tko-03', stationName: '油塘', wallColor: '#FFEF00', pillarColor: '#FFEF00', nameColor: '#000000', floorColor: '#CCBC00', textColor: '#000000' },
  { stationId: 'tko-04', stationName: '調景嶺', wallColor: '#DCD144', pillarColor: '#DCD144', nameColor: '#000000', floorColor: '#ACA114', textColor: '#000000' },
  { stationId: 'tko-05', stationName: '將軍澳', wallColor: '#E60012', pillarColor: '#E60012', nameColor: '#FFFFFF', floorColor: '#B60002', textColor: '#FFFFFF' },
  { stationId: 'tko-06', stationName: '坑口', wallColor: '#2EA9DF', pillarColor: '#2EA9DF', nameColor: '#000000', floorColor: '#1E79AF', textColor: '#000000' },
  { stationId: 'tko-07', stationName: '寶琳', wallColor: '#F28500', pillarColor: '#F28500', nameColor: '#000000', floorColor: '#C26500', textColor: '#000000' },
  { stationId: 'tko-08', stationName: '康城', wallColor: '#826F79', pillarColor: '#826F79', nameColor: '#FFFFFF', floorColor: '#524F49', textColor: '#FFFFFF' },
];

// ===== 東涌綫 =====
const tungChungThemes: PlatformTheme[] = [
  { stationId: 'tcl-01', stationName: '東涌', wallColor: '#6A5ACD', pillarColor: '#6A5ACD', nameColor: '#000000', floorColor: '#4A3AAD', textColor: '#000000' },
  { stationId: 'tcl-02', stationName: '欣澳', wallColor: '#808080', pillarColor: '#808080', nameColor: '#C0C0C0', floorColor: '#505050', textColor: '#C0C0C0' },
  { stationId: 'tcl-03', stationName: '青衣', wallColor: '#A1C6CA', pillarColor: '#A1C6CA', nameColor: '#000000', floorColor: '#71969A', textColor: '#000000' },
  { stationId: 'tcl-04', stationName: '荔景', wallColor: '#BB2200', pillarColor: '#BB2200', nameColor: '#FFFFFF', floorColor: '#881800', textColor: '#FFFFFF' },
  { stationId: 'tcl-05', stationName: '南昌', wallColor: '#F0EE86', pillarColor: '#F0EE86', nameColor: '#000000', floorColor: '#C0BE56', textColor: '#000000' },
  { stationId: 'tcl-06', stationName: '奧運', wallColor: '#4584C4', pillarColor: '#4584C4', nameColor: '#000000', floorColor: '#255494', textColor: '#000000' },
  { stationId: 'tcl-07', stationName: '九龍', wallColor: '#ACA28A', pillarColor: '#ACA28A', nameColor: '#000000', floorColor: '#7C725A', textColor: '#000000' },
  { stationId: 'tcl-08', stationName: '香港', wallColor: '#FFFAFA', pillarColor: '#FFFAFA', nameColor: '#000000', floorColor: '#CFCACA', textColor: '#000000' },
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
