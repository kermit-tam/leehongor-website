/**
 * 港鐵站名學習數據
 * 所有港鐵重型鐵路路線
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

// ===== 東鐵綫 =====
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

// ===== 屯馬綫 =====
export const tuenMaLine: MTRLine = {
  id: "tml",
  name: "屯馬綫",
  nameEn: "Tuen Ma Line",
  color: "啡色",
  colorCode: "#9D8B6B",
  stations: [
    {
      id: "tml-01",
      name: "屯門",
      nameEn: "Tuen Mun",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 1,
      landmark: "屯門市中心",
      landmarkIcon: "🏘️",
      description: "新界西，屯門新市鎮"
    },
    {
      id: "tml-02",
      name: "兆康",
      nameEn: "Siu Hong",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 2,
      landmark: "輕鐵總站",
      landmarkIcon: "🚊",
      description: "轉輕鐵"
    },
    {
      id: "tml-03",
      name: "天水圍",
      nameEn: "Tin Shui Wai",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 3,
      landmark: "天水圍新市鎮",
      landmarkIcon: "🏠",
      description: "新界西，天水圍"
    },
    {
      id: "tml-04",
      name: "朗屏",
      nameEn: "Long Ping",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 4,
      landmark: "朗屏邨",
      landmarkIcon: "🏘️",
      description: "元朗區"
    },
    {
      id: "tml-05",
      name: "元朗",
      nameEn: "Yuen Long",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 5,
      landmark: "元朗市中心",
      landmarkIcon: "🏪",
      description: "元朗新市鎮中心"
    },
    {
      id: "tml-06",
      name: "錦上路",
      nameEn: "Kam Sheung Road",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 6,
      landmark: "錦田",
      landmarkIcon: "🏘️",
      description: "錦田區"
    },
    {
      id: "tml-07",
      name: "荃灣西",
      nameEn: "Tsuen Wan West",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 7,
      landmark: "荃灣西",
      landmarkIcon: "🌊",
      description: "荃灣區"
    },
    {
      id: "tml-08",
      name: "美孚",
      nameEn: "Mei Foo",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 8,
      landmark: "美孚新邨",
      landmarkIcon: "🏘️",
      description: "轉荃灣綫"
    },
    {
      id: "tml-09",
      name: "南昌",
      nameEn: "Nam Cheong",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 9,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉東涌綫"
    },
    {
      id: "tml-10",
      name: "柯士甸",
      nameEn: "Austin",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 10,
      landmark: "西九龍站",
      landmarkIcon: "🚄",
      description: "高鐵西九龍站"
    },
    {
      id: "tml-11",
      name: "尖東",
      nameEn: "East Tsim Sha Tsui",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 11,
      landmark: "尖沙咀東部",
      landmarkIcon: "🌃",
      description: "近星光大道"
    },
    {
      id: "tml-12",
      name: "紅磡",
      nameEn: "Hung Hom",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 12,
      landmark: "香港體育館",
      landmarkIcon: "🎪",
      description: "轉東鐵綫"
    },
    {
      id: "tml-13",
      name: "何文田",
      nameEn: "Ho Man Tin",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 13,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉觀塘綫"
    },
    {
      id: "tml-14",
      name: "土瓜灣",
      nameEn: "To Kwa Wan",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 14,
      landmark: "土瓜灣",
      landmarkIcon: "🏘️",
      description: "九龍城區"
    },
    {
      id: "tml-15",
      name: "宋皇臺",
      nameEn: "Sung Wong Toi",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 15,
      landmark: "宋王臺公園",
      landmarkIcon: "🏛️",
      description: "歷史古蹟"
    },
    {
      id: "tml-16",
      name: "啟德",
      nameEn: "Kai Tak",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 16,
      landmark: "啟德體育園",
      landmarkIcon: "🏟️",
      description: "新地標，大型演唱會"
    },
    {
      id: "tml-17",
      name: "鑽石山",
      nameEn: "Diamond Hill",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 17,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉觀塘綫"
    },
    {
      id: "tml-18",
      name: "顯徑",
      nameEn: "Hin Keng",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 18,
      landmark: "顯徑邨",
      landmarkIcon: "🏘️",
      description: "沙田區"
    },
    {
      id: "tml-19",
      name: "大圍",
      nameEn: "Tai Wai",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 19,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉東鐵綫"
    },
    {
      id: "tml-20",
      name: "車公廟",
      nameEn: "Che Kung Temple",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 20,
      landmark: "車公廟",
      landmarkIcon: "⛩️",
      description: "著名廟宇"
    },
    {
      id: "tml-21",
      name: "沙田圍",
      nameEn: "Sha Tin Wai",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 21,
      landmark: "沙田圍",
      landmarkIcon: "🏘️",
      description: "沙田區"
    },
    {
      id: "tml-22",
      name: "第一城",
      nameEn: "City One",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 22,
      landmark: "置富第一城",
      landmarkIcon: "🏪",
      description: "大型屋苑商場"
    },
    {
      id: "tml-23",
      name: "石門",
      nameEn: "Shek Mun",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 23,
      landmark: "香港浸會大學",
      landmarkIcon: "🎓",
      description: "沙田石門"
    },
    {
      id: "tml-24",
      name: "大水坑",
      nameEn: "Tai Shui Hang",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 24,
      landmark: "大水坑",
      landmarkIcon: "🏘️",
      description: "馬鞍山區"
    },
    {
      id: "tml-25",
      name: "恆安",
      nameEn: "Heng On",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 25,
      landmark: "恆安邨",
      landmarkIcon: "🏘️",
      description: "馬鞍山區"
    },
    {
      id: "tml-26",
      name: "馬鞍山",
      nameEn: "Ma On Shan",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 26,
      landmark: "馬鞍山新市鎮",
      landmarkIcon: "⛰️",
      description: "新市鎮中心"
    },
    {
      id: "tml-27",
      name: "烏溪沙",
      nameEn: "Wu Kai Sha",
      line: "屯馬綫",
      lineColor: "啡色",
      lineColorCode: "#9D8B6B",
      order: 27,
      landmark: "烏溪沙海濱",
      landmarkIcon: "🌊",
      description: "馬鞍山海傍"
    }
  ]
};

// ===== 觀塘綫 =====
export const kwunTongLine: MTRLine = {
  id: "ktl",
  name: "觀塘綫",
  nameEn: "Kwun Tong Line",
  color: "綠色",
  colorCode: "#00B200",
  stations: [
    {
      id: "ktl-01",
      name: "黃埔",
      nameEn: "Whampoa",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 1,
      landmark: "黃埔花園",
      landmarkIcon: "🏘️",
      description: "紅磡黃埔"
    },
    {
      id: "ktl-02",
      name: "何文田",
      nameEn: "Ho Man Tin",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 2,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉屯馬綫"
    },
    {
      id: "ktl-03",
      name: "油麻地",
      nameEn: "Yau Ma Tei",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 3,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉荃灣綫"
    },
    {
      id: "ktl-04",
      name: "旺角",
      nameEn: "Mong Kok",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 4,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉荃灣綫，購物熱點"
    },
    {
      id: "ktl-05",
      name: "太子",
      nameEn: "Prince Edward",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 5,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉荃灣綫"
    },
    {
      id: "ktl-06",
      name: "石硤尾",
      nameEn: "Shek Kip Mei",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 6,
      landmark: "石硤尾邨",
      landmarkIcon: "🏘️",
      description: "深水埗區"
    },
    {
      id: "ktl-07",
      name: "九龍塘",
      nameEn: "Kowloon Tong",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 7,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉東鐵綫"
    },
    {
      id: "ktl-08",
      name: "樂富",
      nameEn: "Lok Fu",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 8,
      landmark: "樂富廣場",
      landmarkIcon: "🏪",
      description: "黃大仙區"
    },
    {
      id: "ktl-09",
      name: "黃大仙",
      nameEn: "Wong Tai Sin",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 9,
      landmark: "黃大仙祠",
      landmarkIcon: "⛩️",
      description: "著名廟宇，好多遊客"
    },
    {
      id: "ktl-10",
      name: "鑽石山",
      nameEn: "Diamond Hill",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 10,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉屯馬綫"
    },
    {
      id: "ktl-11",
      name: "彩虹",
      nameEn: "Choi Hung",
      line: "觀塘綫",
      lineColor: "彩虹色",
      lineColorCode: "rainbow",
      order: 11,
      landmark: "彩虹邨",
      landmarkIcon: "🌈",
      description: "彩虹色樓，打卡熱點"
    },
    {
      id: "ktl-12",
      name: "九龍灣",
      nameEn: "Kowloon Bay",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 12,
      landmark: "德福廣場",
      landmarkIcon: "🏪",
      description: "九龍灣商貿區"
    },
    {
      id: "ktl-13",
      name: "牛頭角",
      nameEn: "Ngau Tau Kok",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 13,
      landmark: "牛頭角市政大廈",
      landmarkIcon: "🏛️",
      description: "觀塘區"
    },
    {
      id: "ktl-14",
      name: "觀塘",
      nameEn: "Kwun Tong",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 14,
      landmark: "觀塘市中心",
      landmarkIcon: "🏙️",
      description: "觀塘區中心，裕民坊"
    },
    {
      id: "ktl-15",
      name: "藍田",
      nameEn: "Lam Tin",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 15,
      landmark: "匯景花園",
      landmarkIcon: "🏘️",
      description: "藍田區"
    },
    {
      id: "ktl-16",
      name: "油塘",
      nameEn: "Yau Tong",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 16,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉將軍澳綫"
    },
    {
      id: "ktl-17",
      name: "調景嶺",
      nameEn: "Tiu Keng Leng",
      line: "觀塘綫",
      lineColor: "綠色",
      lineColorCode: "#00B200",
      order: 17,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉將軍澳綫"
    }
  ]
};

// ===== 港島綫 =====
export const islandLine: MTRLine = {
  id: "isl",
  name: "港島綫",
  nameEn: "Island Line",
  color: "深藍色",
  colorCode: "#0066CC",
  stations: [
    {
      id: "isl-01",
      name: "堅尼地城",
      nameEn: "Kennedy Town",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 1,
      landmark: "堅尼地城海傍",
      landmarkIcon: "🌊",
      description: "港島最西"
    },
    {
      id: "isl-02",
      name: "香港大學",
      nameEn: "HKU",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 2,
      landmark: "香港大學",
      landmarkIcon: "🎓",
      description: "香港大學本部"
    },
    {
      id: "isl-03",
      name: "西營盤",
      nameEn: "Sai Ying Pun",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 3,
      landmark: "西營盤街市",
      landmarkIcon: "🏪",
      description: "西區社區中心"
    },
    {
      id: "isl-04",
      name: "上環",
      nameEn: "Sheung Wan",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 4,
      landmark: "上環街市",
      landmarkIcon: "🏪",
      description: "海味街，文武廟"
    },
    {
      id: "isl-05",
      name: "中環",
      nameEn: "Central",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 5,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉荃灣綫，香港金融中心"
    },
    {
      id: "isl-06",
      name: "金鐘",
      nameEn: "Admiralty",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 6,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉東鐵綫，太古廣場"
    },
    {
      id: "isl-07",
      name: "灣仔",
      nameEn: "Wan Chai",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 7,
      landmark: "灣仔電腦城",
      landmarkIcon: "💻",
      description: "灣仔商業區"
    },
    {
      id: "isl-08",
      name: "銅鑼灣",
      nameEn: "Causeway Bay",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 8,
      landmark: "時代廣場",
      landmarkIcon: "🏬",
      description: "購物天堂，崇光百貨"
    },
    {
      id: "isl-09",
      name: "天后",
      nameEn: "Tin Hau",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 9,
      landmark: "維多利亞公園",
      landmarkIcon: "🌳",
      description: "銅鑼灣地區"
    },
    {
      id: "isl-10",
      name: "炮台山",
      nameEn: "Fortress Hill",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 10,
      landmark: "炮台山商場",
      landmarkIcon: "🏪",
      description: "北角區"
    },
    {
      id: "isl-11",
      name: "北角",
      nameEn: "North Point",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 11,
      landmark: "新光戲院",
      landmarkIcon: "🎭",
      description: "北角中心"
    },
    {
      id: "isl-12",
      name: "鰂魚涌",
      nameEn: "Quarry Bay",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 12,
      landmark: "太古城中心",
      landmarkIcon: "🏪",
      description: "大型商場，住宅區"
    },
    {
      id: "isl-13",
      name: "太古",
      nameEn: "Tai Koo",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 13,
      landmark: "康怡廣場",
      landmarkIcon: "🏪",
      description: "太古城"
    },
    {
      id: "isl-14",
      name: "西灣河",
      nameEn: "Sai Wan Ho",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 14,
      landmark: "西灣河街市",
      landmarkIcon: "🏪",
      description: "西灣河區"
    },
    {
      id: "isl-15",
      name: "筲箕灣",
      nameEn: "Shau Kei Wan",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 15,
      landmark: "筲箕灣東大街",
      landmarkIcon: "🍜",
      description: "地道美食街"
    },
    {
      id: "isl-16",
      name: "杏花邨",
      nameEn: "Heng Fa Chuen",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 16,
      landmark: "杏花邨商場",
      landmarkIcon: "🏪",
      description: "大型屋苑"
    },
    {
      id: "isl-17",
      name: "柴灣",
      nameEn: "Chai Wan",
      line: "港島綫",
      lineColor: "深藍色",
      lineColorCode: "#0066CC",
      order: 17,
      landmark: "柴灣公園",
      landmarkIcon: "🌳",
      description: "港島最東，柴灣區"
    }
  ]
};

// ===== 荃灣綫 =====
export const tsuenWanLine: MTRLine = {
  id: "twl",
  name: "荃灣綫",
  nameEn: "Tsuen Wan Line",
  color: "紅色",
  colorCode: "#FF0000",
  stations: [
    {
      id: "twl-01",
      name: "荃灣",
      nameEn: "Tsuen Wan",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 1,
      landmark: "荃灣廣場",
      landmarkIcon: "🏪",
      description: "荃灣新市鎮中心"
    },
    {
      id: "twl-02",
      name: "大窩口",
      nameEn: "Tai Wo Hau",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 2,
      landmark: "大窩口邨",
      landmarkIcon: "🏘️",
      description: "荃灣區"
    },
    {
      id: "twl-03",
      name: "葵興",
      nameEn: "Kwai Hing",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 3,
      landmark: "葵興廣場",
      landmarkIcon: "🏪",
      description: "葵青區"
    },
    {
      id: "twl-04",
      name: "葵芳",
      nameEn: "Kwai Fong",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 4,
      landmark: "新都會廣場",
      landmarkIcon: "🏪",
      description: "葵青區中心"
    },
    {
      id: "twl-05",
      name: "荔景",
      nameEn: "Lai King",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 5,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉東涌綫"
    },
    {
      id: "twl-06",
      name: "美孚",
      nameEn: "Mei Foo",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 6,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉屯馬綫"
    },
    {
      id: "twl-07",
      name: "荔枝角",
      nameEn: "Lai Chi Kok",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 7,
      landmark: "長沙灣廣場",
      landmarkIcon: "🏪",
      description: "深水埗區"
    },
    {
      id: "twl-08",
      name: "長沙灣",
      nameEn: "Cheung Sha Wan",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 8,
      landmark: "長沙灣工廠區",
      landmarkIcon: "🏭",
      description: "成衣批發"
    },
    {
      id: "twl-09",
      name: "深水埗",
      nameEn: "Sham Shui Po",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 9,
      landmark: "電腦商場",
      landmarkIcon: "💻",
      description: "電腦產品集中地"
    },
    {
      id: "twl-10",
      name: "太子",
      nameEn: "Prince Edward",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 10,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉觀塘綫"
    },
    {
      id: "twl-11",
      name: "旺角",
      nameEn: "Mong Kok",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 11,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉觀塘綫，購物熱點"
    },
    {
      id: "twl-12",
      name: "油麻地",
      nameEn: "Yau Ma Tei",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 12,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉觀塘綫"
    },
    {
      id: "twl-13",
      name: "佐敦",
      nameEn: "Jordan",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 13,
      landmark: "廟街夜市",
      landmarkIcon: "🌃",
      description: "油尖旺區"
    },
    {
      id: "twl-14",
      name: "尖沙咀",
      nameEn: "Tsim Sha Tsui",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 14,
      landmark: "海港城",
      landmarkIcon: "🛳️",
      description: "旅客購物熱點"
    },
    {
      id: "twl-15",
      name: "金鐘",
      nameEn: "Admiralty",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 15,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉港島綫、東鐵綫"
    },
    {
      id: "twl-16",
      name: "中環",
      nameEn: "Central",
      line: "荃灣綫",
      lineColor: "紅色",
      lineColorCode: "#FF0000",
      order: 16,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉港島綫，香港站"
    }
  ]
};

// ===== 將軍澳綫 =====
export const tseungKwanOLine: MTRLine = {
  id: "tko",
  name: "將軍澳綫",
  nameEn: "Tseung Kwan O Line",
  color: "紫色",
  colorCode: "#8B00FF",
  stations: [
    {
      id: "tko-01",
      name: "北角",
      nameEn: "North Point",
      line: "將軍澳綫",
      lineColor: "紫色",
      lineColorCode: "#8B00FF",
      order: 1,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉港島綫"
    },
    {
      id: "tko-02",
      name: "鰂魚涌",
      nameEn: "Quarry Bay",
      line: "將軍澳綫",
      lineColor: "紫色",
      lineColorCode: "#8B00FF",
      order: 2,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉港島綫"
    },
    {
      id: "tko-03",
      name: "油塘",
      nameEn: "Yau Tong",
      line: "將軍澳綫",
      lineColor: "紫色",
      lineColorCode: "#8B00FF",
      order: 3,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉觀塘綫"
    },
    {
      id: "tko-04",
      name: "調景嶺",
      nameEn: "Tiu Keng Leng",
      line: "將軍澳綫",
      lineColor: "紫色",
      lineColorCode: "#8B00FF",
      order: 4,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉觀塘綫"
    },
    {
      id: "tko-05",
      name: "將軍澳",
      nameEn: "Tseung Kwan O",
      line: "將軍澳綫",
      lineColor: "紫色",
      lineColorCode: "#8B00FF",
      order: 5,
      landmark: "將軍澳中心",
      landmarkIcon: "🏪",
      description: "將軍澳市中心"
    },
    {
      id: "tko-06",
      name: "坑口",
      nameEn: "Hang Hau",
      line: "將軍澳綫",
      lineColor: "紫色",
      lineColorCode: "#8B00FF",
      order: 6,
      landmark: "坑口站",
      landmarkIcon: "🏘️",
      description: "坑口區"
    },
    {
      id: "tko-07",
      name: "寶琳",
      nameEn: "Po Lam",
      line: "將軍澳綫",
      lineColor: "紫色",
      lineColorCode: "#8B00FF",
      order: 7,
      landmark: "寶琳商場",
      landmarkIcon: "🏪",
      description: "將軍澳北"
    },
    {
      id: "tko-08",
      name: "康城",
      nameEn: "LOHAS Park",
      line: "將軍澳綫",
      lineColor: "紫色",
      lineColorCode: "#8B00FF",
      order: 8,
      landmark: "日出康城",
      landmarkIcon: "🏘️",
      description: "大型私人屋苑"
    }
  ]
};

// ===== 東涌綫 =====
export const tungChungLine: MTRLine = {
  id: "tcl",
  name: "東涌綫",
  nameEn: "Tung Chung Line",
  color: "橙色",
  colorCode: "#FF8C00",
  stations: [
    {
      id: "tcl-01",
      name: "東涌",
      nameEn: "Tung Chung",
      line: "東涌綫",
      lineColor: "橙色",
      lineColorCode: "#FF8C00",
      order: 1,
      landmark: "東薈城",
      landmarkIcon: "🏪",
      description: "大嶼山，outlet購物"
    },
    {
      id: "tcl-02",
      name: "欣澳",
      nameEn: "Sunny Bay",
      line: "東涌綫",
      lineColor: "橙色",
      lineColorCode: "#FF8C00",
      order: 2,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉迪士尼綫"
    },
    {
      id: "tcl-03",
      name: "青衣",
      nameEn: "Tsing Yi",
      line: "東涌綫",
      lineColor: "橙色",
      lineColorCode: "#FF8C00",
      order: 3,
      landmark: "青衣城",
      landmarkIcon: "🏪",
      description: "青衣島"
    },
    {
      id: "tcl-04",
      name: "荔景",
      nameEn: "Lai King",
      line: "東涌綫",
      lineColor: "橙色",
      lineColorCode: "#FF8C00",
      order: 4,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉荃灣綫"
    },
    {
      id: "tcl-05",
      name: "南昌",
      nameEn: "Nam Cheong",
      line: "東涌綫",
      lineColor: "橙色",
      lineColorCode: "#FF8C00",
      order: 5,
      landmark: "轉車站",
      landmarkIcon: "🔄",
      description: "轉屯馬綫"
    },
    {
      id: "tcl-06",
      name: "奧運",
      nameEn: "Olympic",
      line: "東涌綫",
      lineColor: "橙色",
      lineColorCode: "#FF8C00",
      order: 6,
      landmark: "奧海城",
      landmarkIcon: "🏪",
      description: "大角咀"
    },
    {
      id: "tcl-07",
      name: "九龍",
      nameEn: "Kowloon",
      line: "東涌綫",
      lineColor: "橙色",
      lineColorCode: "#FF8C00",
      order: 7,
      landmark: "圓方商場",
      landmarkIcon: "🏪",
      description: "Elements購物中心"
    },
    {
      id: "tcl-08",
      name: "香港",
      nameEn: "Hong Kong",
      line: "東涌綫",
      lineColor: "橙色",
      lineColorCode: "#FF8C00",
      order: 8,
      landmark: "國際金融中心",
      landmarkIcon: "🏢",
      description: "IFC，香港站"
    }
  ]
};

// 所有路線列表
export const mtrLines: MTRLine[] = [
  eastRailLine,
  tuenMaLine,
  kwunTongLine,
  islandLine,
  tsuenWanLine,
  tseungKwanOLine,
  tungChungLine
];

// 獲取路線 by ID
export function getLineById(id: string): MTRLine | undefined {
  return mtrLines.find(l => l.id === id);
}

// 獲取站 by ID
export function getStationById(id: string): MTRStation | undefined {
  for (const line of mtrLines) {
    const station = line.stations.find(s => s.id === id);
    if (station) return station;
  }
  return undefined;
}

// 獲取所有站
export function getAllStations(): MTRStation[] {
  return mtrLines.flatMap(l => l.stations);
}
