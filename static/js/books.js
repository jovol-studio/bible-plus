/*
Bible Plus (Bible+) by JovoL Studio. Copyright (c) 2026 JovoL Studio (its contributions).
AGPL-3.0-only with Section 7(b) attribution term; see NOTICE.md and LICENSE.
Original source: https://github.com/jovol-studio/bible-plus
*/
const books = [
  {
    "id": "bible-0",
    "index": 0,
    "name": "創世記",
    "short": "創",
    "category": "摩西五經",
    "english": "Genesis"
  },
  {
    "id": "bible-1",
    "index": 1,
    "name": "出埃及記",
    "short": "出",
    "category": "摩西五經",
    "english": "Exodus"
  },
  {
    "id": "bible-2",
    "index": 2,
    "name": "利未記",
    "short": "利",
    "category": "摩西五經",
    "english": "Leviticus"
  },
  {
    "id": "bible-3",
    "index": 3,
    "name": "民數記",
    "short": "民",
    "category": "摩西五經",
    "english": "Numbers"
  },
  {
    "id": "bible-4",
    "index": 4,
    "name": "申命記",
    "short": "申",
    "category": "摩西五經",
    "english": "Deuteronomy"
  },
  {
    "id": "bible-5",
    "index": 5,
    "name": "約書亞記",
    "short": "書",
    "category": "歷史書",
    "english": "Joshua"
  },
  {
    "id": "bible-6",
    "index": 6,
    "name": "士師記",
    "short": "士",
    "category": "歷史書",
    "english": "Judges"
  },
  {
    "id": "bible-7",
    "index": 7,
    "name": "路得記",
    "short": "得",
    "category": "歷史書",
    "english": "Ruth"
  },
  {
    "id": "bible-8",
    "index": 8,
    "name": "撒母耳記上",
    "short": "撒上",
    "category": "歷史書",
    "english": "1 Samuel"
  },
  {
    "id": "bible-9",
    "index": 9,
    "name": "撒母耳記下",
    "short": "撒下",
    "category": "歷史書",
    "english": "2 Samuel"
  },
  {
    "id": "bible-10",
    "index": 10,
    "name": "列王紀上",
    "short": "王上",
    "category": "歷史書",
    "english": "1 Kings"
  },
  {
    "id": "bible-11",
    "index": 11,
    "name": "列王紀下",
    "short": "王下",
    "category": "歷史書",
    "english": "2 Kings"
  },
  {
    "id": "bible-12",
    "index": 12,
    "name": "歷代志上",
    "short": "代上",
    "category": "歷史書",
    "english": "1 Chronicles"
  },
  {
    "id": "bible-13",
    "index": 13,
    "name": "歷代志下",
    "short": "代下",
    "category": "歷史書",
    "english": "2 Chronicles"
  },
  {
    "id": "bible-14",
    "index": 14,
    "name": "以斯拉記",
    "short": "拉",
    "category": "歷史書",
    "english": "Ezra"
  },
  {
    "id": "bible-15",
    "index": 15,
    "name": "尼希米記",
    "short": "尼",
    "category": "歷史書",
    "english": "Nehemiah"
  },
  {
    "id": "bible-16",
    "index": 16,
    "name": "以斯帖記",
    "short": "斯",
    "category": "歷史書",
    "english": "Esther"
  },
  {
    "id": "bible-17",
    "index": 17,
    "name": "約伯記",
    "short": "伯",
    "category": "詩歌智慧書",
    "english": "Job"
  },
  {
    "id": "bible-18",
    "index": 18,
    "name": "詩篇",
    "short": "詩",
    "category": "詩歌智慧書",
    "english": "Psalms"
  },
  {
    "id": "bible-19",
    "index": 19,
    "name": "箴言",
    "short": "箴",
    "category": "詩歌智慧書",
    "english": "Proverbs"
  },
  {
    "id": "bible-20",
    "index": 20,
    "name": "傳道書",
    "short": "傳",
    "category": "詩歌智慧書",
    "english": "Ecclesiastes"
  },
  {
    "id": "bible-21",
    "index": 21,
    "name": "雅歌",
    "short": "歌",
    "category": "詩歌智慧書",
    "english": "Song of Songs"
  },
  {
    "id": "bible-22",
    "index": 22,
    "name": "以賽亞書",
    "short": "賽",
    "category": "大先知書",
    "english": "Isaiah"
  },
  {
    "id": "bible-23",
    "index": 23,
    "name": "耶利米書",
    "short": "耶",
    "category": "大先知書",
    "english": "Jeremiah"
  },
  {
    "id": "bible-24",
    "index": 24,
    "name": "耶利米哀歌",
    "short": "哀",
    "category": "大先知書",
    "english": "Lamentations"
  },
  {
    "id": "bible-25",
    "index": 25,
    "name": "以西結書",
    "short": "結",
    "category": "大先知書",
    "english": "Ezekiel"
  },
  {
    "id": "bible-26",
    "index": 26,
    "name": "但以理書",
    "short": "但",
    "category": "大先知書",
    "english": "Daniel"
  },
  {
    "id": "bible-27",
    "index": 27,
    "name": "何西阿書",
    "short": "何",
    "category": "小先知書",
    "english": "Hosea"
  },
  {
    "id": "bible-28",
    "index": 28,
    "name": "約珥書",
    "short": "珥",
    "category": "小先知書",
    "english": "Joel"
  },
  {
    "id": "bible-29",
    "index": 29,
    "name": "阿摩司書",
    "short": "摩",
    "category": "小先知書",
    "english": "Amos"
  },
  {
    "id": "bible-30",
    "index": 30,
    "name": "俄巴底亞書",
    "short": "俄",
    "category": "小先知書",
    "english": "Obadiah"
  },
  {
    "id": "bible-31",
    "index": 31,
    "name": "約拿書",
    "short": "拿",
    "category": "小先知書",
    "english": "Jonah"
  },
  {
    "id": "bible-32",
    "index": 32,
    "name": "彌迦書",
    "short": "彌",
    "category": "小先知書",
    "english": "Micah"
  },
  {
    "id": "bible-33",
    "index": 33,
    "name": "那鴻書",
    "short": "鴻",
    "category": "小先知書",
    "english": "Nahum"
  },
  {
    "id": "bible-34",
    "index": 34,
    "name": "哈巴谷書",
    "short": "哈",
    "category": "小先知書",
    "english": "Habakkuk"
  },
  {
    "id": "bible-35",
    "index": 35,
    "name": "西番雅書",
    "short": "番",
    "category": "小先知書",
    "english": "Zephaniah"
  },
  {
    "id": "bible-36",
    "index": 36,
    "name": "哈該書",
    "short": "該",
    "category": "小先知書",
    "english": "Haggai"
  },
  {
    "id": "bible-37",
    "index": 37,
    "name": "撒迦利亞書",
    "short": "亞",
    "category": "小先知書",
    "english": "Zechariah"
  },
  {
    "id": "bible-38",
    "index": 38,
    "name": "瑪拉基書",
    "short": "瑪",
    "category": "小先知書",
    "english": "Malachi"
  },
  {
    "id": "bible-39",
    "index": 39,
    "name": "馬太福音",
    "short": "太",
    "category": "福音書",
    "english": "Matthew"
  },
  {
    "id": "bible-40",
    "index": 40,
    "name": "馬可福音",
    "short": "可",
    "category": "福音書",
    "english": "Mark"
  },
  {
    "id": "bible-41",
    "index": 41,
    "name": "路加福音",
    "short": "路",
    "category": "福音書",
    "english": "Luke"
  },
  {
    "id": "bible-42",
    "index": 42,
    "name": "約翰福音",
    "short": "約",
    "category": "福音書",
    "english": "John"
  },
  {
    "id": "bible-43",
    "index": 43,
    "name": "使徒行傳",
    "short": "徒",
    "category": "新約歷史書",
    "english": "Acts"
  },
  {
    "id": "bible-44",
    "index": 44,
    "name": "羅馬書",
    "short": "羅",
    "category": "保羅書信",
    "english": "Romans"
  },
  {
    "id": "bible-45",
    "index": 45,
    "name": "哥林多前書",
    "short": "林前",
    "category": "保羅書信",
    "english": "1 Corinthians"
  },
  {
    "id": "bible-46",
    "index": 46,
    "name": "哥林多後書",
    "short": "林後",
    "category": "保羅書信",
    "english": "2 Corinthians"
  },
  {
    "id": "bible-47",
    "index": 47,
    "name": "加拉太書",
    "short": "加",
    "category": "保羅書信",
    "english": "Galatians"
  },
  {
    "id": "bible-48",
    "index": 48,
    "name": "以弗所書",
    "short": "弗",
    "category": "保羅書信",
    "english": "Ephesians"
  },
  {
    "id": "bible-49",
    "index": 49,
    "name": "腓立比書",
    "short": "腓",
    "category": "保羅書信",
    "english": "Philippians"
  },
  {
    "id": "bible-50",
    "index": 50,
    "name": "歌羅西書",
    "short": "西",
    "category": "保羅書信",
    "english": "Colossians"
  },
  {
    "id": "bible-51",
    "index": 51,
    "name": "帖撒羅尼迦前書",
    "short": "帖前",
    "category": "保羅書信",
    "english": "1 Thessalonians"
  },
  {
    "id": "bible-52",
    "index": 52,
    "name": "帖撒羅尼迦後書",
    "short": "帖後",
    "category": "保羅書信",
    "english": "2 Thessalonians"
  },
  {
    "id": "bible-53",
    "index": 53,
    "name": "提摩太前書",
    "short": "提前",
    "category": "保羅書信",
    "english": "1 Timothy"
  },
  {
    "id": "bible-54",
    "index": 54,
    "name": "提摩太後書",
    "short": "提後",
    "category": "保羅書信",
    "english": "2 Timothy"
  },
  {
    "id": "bible-55",
    "index": 55,
    "name": "提多書",
    "short": "多",
    "category": "保羅書信",
    "english": "Titus"
  },
  {
    "id": "bible-56",
    "index": 56,
    "name": "腓利門書",
    "short": "門",
    "category": "保羅書信",
    "english": "Philemon"
  },
  {
    "id": "bible-57",
    "index": 57,
    "name": "希伯來書",
    "short": "來",
    "category": "普通書信",
    "english": "Hebrews"
  },
  {
    "id": "bible-58",
    "index": 58,
    "name": "雅各書",
    "short": "雅",
    "category": "普通書信",
    "english": "James"
  },
  {
    "id": "bible-59",
    "index": 59,
    "name": "彼得前書",
    "short": "彼前",
    "category": "普通書信",
    "english": "1 Peter"
  },
  {
    "id": "bible-60",
    "index": 60,
    "name": "彼得後書",
    "short": "彼後",
    "category": "普通書信",
    "english": "2 Peter"
  },
  {
    "id": "bible-61",
    "index": 61,
    "name": "約翰一書",
    "short": "約一",
    "category": "普通書信",
    "english": "1 John"
  },
  {
    "id": "bible-62",
    "index": 62,
    "name": "約翰二書",
    "short": "約二",
    "category": "普通書信",
    "english": "2 John"
  },
  {
    "id": "bible-63",
    "index": 63,
    "name": "約翰三書",
    "short": "約三",
    "category": "普通書信",
    "english": "3 John"
  },
  {
    "id": "bible-64",
    "index": 64,
    "name": "猶大書",
    "short": "猶",
    "category": "普通書信",
    "english": "Jude"
  },
  {
    "id": "bible-65",
    "index": 65,
    "name": "啟示錄",
    "short": "啟",
    "category": "普通書信",
    "english": "Revelation"
  },
  {
    "id": "jubilees",
    "name": "禧年書",
    "english": "Book of Jubilees",
    "category": "典外書卷"
  },
  {
    "id": "1-enoch",
    "name": "以諾一書",
    "english": "1 Enoch",
    "category": "典外書卷"
  },
  {
    "id": "2-enoch",
    "name": "以諾二書",
    "english": "2 Enoch",
    "category": "典外書卷"
  },
  {
    "id": "3-enoch",
    "name": "以諾三書",
    "english": "3 Enoch",
    "category": "典外書卷"
  },
  {
    "id": "apocalypse-of-abraham",
    "name": "亞伯拉罕啟示錄",
    "english": "Apocalypse of Abraham",
    "category": "典外書卷"
  },
  {
    "id": "life-of-adam-and-eve",
    "name": "亞當和夏娃生平",
    "english": "Life of Adam and Eve",
    "category": "典外書卷"
  },
  {
    "id": "testaments-of-the-twelve-patriarchs",
    "name": "十二族長遺訓",
    "english": "Testaments of the Twelve Patriarchs",
    "category": "典外書卷"
  },
  {
    "id": "1-esdras",
    "name": "以斯拉一書",
    "english": "1 Esdras",
    "category": "典外書卷"
  },
  {
    "id": "2-esdras",
    "name": "以斯拉二書",
    "english": "2 Esdras",
    "category": "典外書卷"
  },
  {
    "id": "2-baruch",
    "name": "巴錄二書",
    "english": "2 Baruch",
    "category": "典外書卷"
  }
];
