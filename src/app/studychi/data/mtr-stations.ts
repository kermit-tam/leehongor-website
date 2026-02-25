/**
 * 港鐵站名學習數據
 * 東鐵綫為第一條路線
 */

export interface MTRStation {
  id: string;
  name: string;
  nameEn: string;
  line: string;
  lineColor: string;
  lineColorCode: string;
  order: number;
  landmark: string;
  landmarkIcon: string;
  description: string;
}

export interface MTRLine {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  colorCode: string;
  stations: MTRStation[];
}

// 東鐵綫資料
export const eastRailLine: MTRLine = {
  id: "eal",
  name: "東鐵綫",
  nameEn: "East Rail Line",
  color: "淺藍色",
  colorCode: "#5EB3E6",
  stations: [
    {
      id: "eal-01",
      name: "金鐘",
      nameEn: "Admiralty",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 1,
      landmark: "政府總部",
      landmarkIcon: "🏛️",
      description: "香港政府總部所在地"
    },
    {
      id: "eal-02",
      name: "會展",
      nameEn: "Exhibition Centre",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 2,
      landmark: "會議展覽中心",
      landmarkIcon: "🏢",
      description: "大型會議和展覽場地"
    },
    {
      id: "eal-03",
      name: "紅磡",
      nameEn: "Hung Hom",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 3,
      landmark: "香港體育館",
      landmarkIcon: "🎪",
      description: "著名表演場地，睇演唱會"
    },
    {
      id: "eal-04",
      name: "旺角東",
      nameEn: "Mong Kok East",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 4,
      landmark: "新世紀廣場",
      landmarkIcon: "🏬",
      description: "購物商場，有好多舖頭"
    },
    {
      id: "eal-05",
      name: "九龍塘",
      nameEn: "Kowloon Tong",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 5,
      landmark: "又一城",
      landmarkIcon: "🛍️",
      description: "轉車站，可以去觀塘綫"
    },
    {
      id: "eal-06",
      name: "大圍",
      nameEn: "Tai Wai",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 6,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉屯馬綫去烏溪沙或屯門"
    },
    {
      id: "eal-07",
      name: "沙田",
      nameEn: "Sha Tin",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 7,
      landmark: "新城市廣場",
      landmarkIcon: "🏪",
      description: "沙田最大商場，有史諾比公園"
    },
    {
      id: "eal-08",
      name: "火炭",
      nameEn: "Fo Tan",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 8,
      landmark: "賽馬會體藝學院",
      landmarkIcon: "🏇",
      description: "培訓運動員的地方"
    },
    {
      id: "eal-09",
      name: "馬場",
      nameEn: "Racecourse",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 9,
      landmark: "沙田馬場",
      landmarkIcon: "🐎",
      description: "賽馬日先開，睇馬仔跑"
    },
    {
      id: "eal-10",
      name: "大學",
      nameEn: "University",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 10,
      landmark: "中文大學",
      landmarkIcon: "🎓",
      description: "香港中文大學所在地"
    },
    {
      id: "eal-11",
      name: "大埔墟",
      nameEn: "Tai Po Market",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 11,
      landmark: "大埔舊墟",
      landmarkIcon: "🏘️",
      description: "大埔市中心，好多舖頭"
    },
    {
      id: "eal-12",
      name: "太和",
      nameEn: "Tai Wo",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 12,
      landmark: "太和邨",
      landmarkIcon: "🏠",
      description: "公共屋邨"
    },
    {
      id: "eal-13",
      name: "粉嶺",
      nameEn: "Fanling",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 13,
      landmark: "聯和墟",
      landmarkIcon: "🏪",
      description: "粉嶺市中心"
    },
    {
      id: "eal-14",
      name: "上水",
      nameEn: "Sheung Shui",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 14,
      landmark: "石湖墟",
      landmarkIcon: "🛒",
      description: "上水市中心，好多商店"
    },
    {
      id: "eal-15",
      name: "羅湖",
      nameEn: "Lo Wu",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 15,
      landmark: "深圳邊境",
      landmarkIcon: "🛂",
      description: "去深圳羅湖口岸，過關"
    },
    {
      id: "eal-16",
      name: "落馬洲",
      nameEn: "Lok Ma Chau",
      line: "東鐵綫",
      lineColor: "淺藍色",
      lineColorCode: "#5EB3E6",
      order: 16,
      landmark: "福田口岸",
      landmarkIcon: "🌉",
      description: "去深圳福田口岸，另一個過關站"
    }
  ]
};

// 所有路線列表
export const mtrLines: MTRLine[] = [eastRailLine];

// 獲取站資料
export function getStationById(id: string): MTRStation | undefined {
  return eastRailLine.stations.find(s => s.id === id);
}

// 獲取所有站
export function getAllStations(): MTRStation[] {
  return eastRailLine.stations;
}
