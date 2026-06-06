import type { FeaturedItem, MenuSectionData } from "./menu-items.types";

import ninjaBombRollImg from "@assets/ninja-bomb-roll.png";
import ninjaCaliRollImg from "@assets/ninja-cali-roll.png";
import ninjaStarRollImg from "@assets/ninja-star-roll.png";

export const FEATURED: FeaturedItem[] = [
  {
    image: ninjaBombRollImg,
    price: "$17",
    tag: "popular",
    name: {
      en: "Ninja Bomb Roll",
      zh: "忍者炸弹卷",
      ja: "ニンジャボムロール",
    },
    desc: {
      en: "Cucumber, avocado, shrimp tempura roll topped with fresh salmon sashimi.",
      zh: "黄瓜、牛油果、炸虾天妇罗卷， topped with 新鲜三文鱼刺身。",
      ja: "胡瓜、アボカド、海老天のロールにフレッシュサーモン刺身をトッピング。",
    },
  },
  {
    image: ninjaCaliRollImg,
    price: "$17",
    tag: "popular",
    name: {
      en: "Ninja Cali Roll",
      zh: "忍者加州卷",
      ja: "ニンジャカリロール",
    },
    desc: {
      en: "Cucumber, maguro, crab roll topped with fresh maguro sashimi.",
      zh: "黄瓜、金枪鱼、蟹肉卷， topped with 新鲜金枪鱼刺身。",
      ja: "胡瓜、マグロ、カニのロールにフレッシュマグロ刺身をトッピング。",
    },
  },
  {
    image: ninjaStarRollImg,
    price: "$17",
    tag: "new",
    name: {
      en: "Ninja Star Roll",
      zh: "忍者之星卷",
      ja: "ニンジャスターロール",
    },
    desc: {
      en: "Cucumber, cream cheese, shrimp tempura roll topped with smoked salmon.",
      zh: "黄瓜、奶油芝士、炸虾天妇罗卷， topped with 烟熏三文鱼。",
      ja: "胡瓜、クリームチーズ、海老天のロールにスモークサーモンをトッピング。",
    },
  },
];

export const SECTIONS: MenuSectionData[] = [
  {
    title: { en: "Appetizers", zh: "前菜", ja: "前菜" },
    rows: [
      { name: { en: "Soup of the Day", zh: "每日例汤", ja: "本日のスープ" }, note: { en: "Fresh daily", zh: "当天新鲜制作", ja: "日替わり" }, price: "$8" },
      { name: { en: "Miso Soup", zh: "味噌汤", ja: "味噌汁" }, price: "$6" },
      { name: { en: "Inari Sushi", zh: "稻荷寿司", ja: "稲荷寿司" }, note: { en: "4 pcs", zh: "4 件", ja: "4個" }, price: "$10" },
      { name: { en: "Seaweed Salad", zh: "海藻沙拉", ja: "海藻サラダ" }, price: "$8" },
      { name: { en: "Tofu Salad", zh: "豆腐沙拉", ja: "豆腐サラダ" }, note: { en: "Organic spring mix with Ninja sauce & Shiso", zh: "有机综合蔬菜配忍者酱汁与紫苏", ja: "オーガニックミックスと忍者ソース、紫蘇" }, price: "$10" },
      { name: { en: "Edamame", zh: "毛豆", ja: "枝豆" }, note: { en: "Boiled with Japanese sun-dried sea salt", zh: "日本海盐煮", ja: "天日塩茹で" }, price: "$8" },
      { name: { en: "Crab Salad", zh: "蟹肉沙拉", ja: "カニサラダ" }, note: { en: "Spring mix, cucumber, crab & Yuzu miso dressing", zh: "综合蔬菜、黄瓜、蟹肉配柚子味噌酱", ja: "ミックスリーフ、胡瓜、カニ、柚子味噌ドレッシング" }, price: "$10" },
      { name: { en: "Kaisen Salad", zh: "海鲜沙拉", ja: "海鮮サラダ" }, note: { en: "Spring mix, salmon, maguro & crab with Ninja sauce", zh: "综合蔬菜、三文鱼、金枪鱼、蟹肉配忍者酱汁", ja: "ミックスリーフ、サーモン、マグロ、カニ、忍者ソース" }, price: "$22" },
      { name: { en: "Tako Yaki", zh: "章鱼烧", ja: "たこ焼き" }, note: { en: "6 pcs — BBQ sauce & Karashi Mayo", zh: "6 个—烧烤酱与辣味蛋黄酱", ja: "6個—BBQソースと辛子マヨ" }, price: "$8" },
      { name: { en: "Tako Wasabi", zh: "芥末章鱼", ja: "たこわさび" }, note: { en: "Cooked octopus with wasabi & seaweed", zh: "熟章鱼配芥末与海苔", ja: "茹でだことわさび、海苔" }, price: "$6.5" },
      { name: { en: "Shrimp Tempura", zh: "炸虾天妇罗", ja: "海老天" }, note: { en: "2 pcs", zh: "2 只", ja: "2尾" }, price: "$5" },
      { name: { en: "Vegetable Tempura", zh: "蔬菜天妇罗", ja: "野菜天" }, note: { en: "4 pcs — onion, kale & carrot patty", zh: "4 件—洋葱、羽衣甘蓝、胡萝卜饼", ja: "4個—玉ねぎ、ケール、人参" }, price: "$7" },
      { name: { en: "Salmon Carpaccio", zh: "三文鱼薄切", ja: "サーモンカルパッチョ" }, note: { en: "Salmon sashimi, seaweed salad, ikura & baby leafs", zh: "三文鱼刺身、海藻沙拉、鱼籽与嫩叶", ja: "サーモン刺身、海藻サラダ、いくら、リーフ" }, price: "$18" },
      { name: { en: "Albacore Tuna Tataki", zh: "长鳍金枪鱼炙烤", ja: "ビンチョウマグロのタタキ" }, note: { en: "Seared with Japanese herbs & house vinaigrette", zh: "日式香草炙烤配自制醋汁", ja: "和風ハーブで炙り、自家製ビネグレット" }, price: "$18" },
      { name: { en: "Braised Mackerel with Sweet Miso", zh: "甜味噌炖鲭鱼", ja: "鯖の甘味噌煮" }, note: { en: "Wild caught, Koji-miso braised. Served with rice", zh: "野生鲭鱼、麹味噌炖煮。配米饭", ja: "天然鯖、麹味噌煮込み。ライス付き" }, price: "$15" },
    ],
  },
  {
    title: { en: "Sashimi", zh: "刺身", ja: "刺身" },
    rows: [
      { name: { en: "Salmon Sashimi", zh: "三文鱼刺身", ja: "サーモン刺身" }, note: { en: "7 pcs", zh: "7 片", ja: "7切れ" }, price: "$17" },
      { name: { en: "Salmon & Tuna", zh: "三文鱼金枪鱼拼", ja: "サーモン＆マグロ" }, note: { en: "4 pcs salmon, 3 pcs tuna", zh: "4 片三文鱼, 3 片金枪鱼", ja: "サーモン4切れ、マグロ3切れ" }, price: "$17" },
      { name: { en: "Yellowfin Tuna Sashimi", zh: "黄鳍金枪鱼刺身", ja: "キハダマグロ刺身" }, note: { en: "7 pcs", zh: "7 片", ja: "7切れ" }, price: "$17" },
      { name: { en: "Sashimi Moriawase", zh: "刺身拼盘", ja: "刺身盛り合わせ" }, note: { en: "Salmon, tuna & daily fresh cuts", zh: "三文鱼、金枪鱼与当日鲜切", ja: "サーモン、マグロ、日替わり鮮魚" }, price: "$37" },
    ],
  },
  {
    title: { en: "Sushi Bowls", zh: "寿司丼", ja: "寿司ボウル" },
    rows: [
      { name: { en: "Salmon Bowl", zh: "三文鱼碗", ja: "サーモンボウル" }, price: "$16" },
      { name: { en: "Tuna Bowl", zh: "金枪鱼碗", ja: "マグロボウル" }, price: "$16" },
      { name: { en: "Ninja Bomb Bowl", zh: "忍者爆弹碗", ja: "ニンジャボムボウル" }, note: { en: "Salmon & shrimp tempura", zh: "三文鱼与炸虾天妇罗", ja: "サーモン＆海老天" }, price: "$18" },
      { name: { en: "Ninja Cali Bowl", zh: "忍者加州碗", ja: "ニンジャカリボウル" }, note: { en: "Crab salad & tuna", zh: "蟹肉沙拉与金枪鱼", ja: "カニサラダ＆マグロ" }, price: "$18" },
      { name: { en: "Ninja Star Bowl", zh: "忍者之星碗", ja: "ニンジャスターボウル" }, note: { en: "Smoked salmon, cream cheese & shrimp tempura", zh: "烟熏三文鱼、奶油芝士与炸虾", ja: "スモークサーモン、クリームチーズ、海老天" }, price: "$18" },
      { name: { en: "Unagi Bowl", zh: "鳗鱼碗", ja: "うなぎボウル" }, note: { en: "BBQ eel", zh: "蒲烧鳗鱼", ja: "蒲焼うなぎ" }, price: "$16" },
      { name: { en: "Smoked Salmon & Cream Cheese Bowl", zh: "烟熏三文鱼奶油芝士碗", ja: "スモークサーモン＆クリームチーズボウル" }, price: "$16" },
      { name: { en: "Crab Salad Bowl", zh: "蟹肉沙拉碗", ja: "カニサラダボウル" }, price: "$16" },
      { name: { en: "Shrimp Tempura Bowl", zh: "炸虾天妇罗碗", ja: "海老天ボウル" }, price: "$16" },
      { name: { en: "Vegetable Tempura Bowl", zh: "蔬菜天妇罗碗", ja: "野菜天ボウル" }, price: "$16" },
      { name: { en: "Green Ninja Bowl", zh: "青忍者碗", ja: "グリーンニンジャボウル" }, note: { en: "Tofu & seaweed salad", zh: "豆腐与海藻沙拉", ja: "豆腐＆海藻サラダ" }, price: "$18" },
      { name: { en: "Chicken Karaage Bowl", zh: "日式炸鸡碗", ja: "唐揚げボウル" }, price: "$16" },
      { name: { en: "Tofu Bowl", zh: "豆腐碗", ja: "豆腐ボウル" }, price: "$16" },
    ],
  },
  {
    title: { en: "Speciality Bowls", zh: "招牌盛碗", ja: "スペシャルボウル" },
    rows: [
      { name: { en: "Chashu Don", zh: "叉烧丼", ja: "チャーシュー丼" }, note: { en: "House braised pork belly on rice", zh: "自制叉烧盖饭", ja: "自家製豚バラ煮込み丼" }, price: "$18" },
      { name: { en: "Tempura Donburi", zh: "天妇罗丼", ja: "天丼" }, note: { en: "3 pc shrimp, 3 pc veggie tempura on rice", zh: "3 只炸虾、3 件蔬菜天妇罗盖饭", ja: "海老3尾、野菜天3個の天丼" }, price: "$20" },
      { name: { en: "Kaisen Don", zh: "海鲜丼", ja: "海鮮丼" }, note: { en: "Salmon, yellowfin tuna, bluefin tuna & scallop", zh: "三文鱼、黄鳍金枪鱼、蓝鳍金枪鱼与扇贝", ja: "サーモン、キハダマグロ、本マグロ、帆立" }, price: "$32" },
      { name: { en: "Salmon, Maguro, Ikura Don", zh: "三文鱼金枪鱼鱼籽丼", ja: "サーモン・マグロ・いくら丼" }, price: "$26" },
      { name: { en: "Gyudon", zh: "牛丼", ja: "牛丼" }, note: { en: "Sliced beef & onion simmered in sweet soy", zh: "薄切牛肉与洋葱甜酱油煮", ja: "牛肉と玉ねぎを甘醤油で煮た一品" }, price: "$19" },
      { name: { en: "Salmon Lover Don", zh: "三文鱼爱好者丼", ja: "サーモンラバー丼" }, note: { en: "Salmon sashimi & ikura on sushi rice", zh: "三文鱼刺身与鱼籽盖饭", ja: "サーモン刺身といくらの丼" }, price: "$20" },
      { name: { en: "Bluefin Tuna Don", zh: "蓝鳍金枪鱼丼", ja: "本マグロ丼" }, note: { en: "Bluefin tuna akami & negitoro on rice", zh: "蓝鳍金枪鱼赤身与葱拖罗盖饭", ja: "本マグロ赤身とネギトロ丼" }, price: "$26" },
      { name: { en: "Negitoro Don", zh: "葱拖罗丼", ja: "ネギトロ丼" }, note: { en: "Nakaochi tuna with green onion", zh: "金枪鱼中落与葱花", ja: "マグロ中落ちと青ネギ" }, price: "$20" },
    ],
  },
  {
    title: { en: "Ramen Noodle", zh: "拉面", ja: "ラーメン" },
    rows: [
      { name: { en: "1 pc Chashu Ramen", zh: "单片叉烧拉面", ja: "チャーシューラーメン1枚" }, note: { en: "Tonkotsu, miso, spicy miso or black shoyu", zh: "豚骨／味噌／辣味噌／黑酱油", ja: "豚骨・味噌・辛味噌・黒醤油" }, price: "$16" },
      { name: { en: "4 pc Chashu Ramen", zh: "四片叉烧拉面", ja: "チャーシューラーメン4枚" }, note: { en: "Tonkotsu, miso, spicy miso or black shoyu", zh: "豚骨／味噌／辣味噌／黑酱油", ja: "豚骨・味噌・辛味噌・黒醤油" }, price: "$19" },
      { name: { en: "Veggie Ramen", zh: "蔬菜拉面", ja: "ベジラーメン" }, note: { en: "Black shoyu, miso or spicy miso", zh: "黑酱油／味噌／辣味噌", ja: "黒醤油・味噌・辛味噌" }, price: "$16" },
      { name: { en: "Classic Yakisoba", zh: "经典日式炒面", ja: "クラシック焼きそば" }, note: { en: "No broth, BBQ sauce with chicken", zh: "无汤、烧烤酱鸡肉炒面", ja: "汁なし、BBQソースで炒めた鶏肉入り" }, price: "$18" },
    ],
  },
  {
    title: { en: "Udon Noodle", zh: "乌冬面", ja: "うどん" },
    rows: [
      { name: { en: "Basic Udon", zh: "基本乌冬", ja: "基本うどん" }, note: { en: "Marinated tofu protein", zh: "配味付豆腐", ja: "味付け豆腐入り" }, price: "$13" },
      { name: { en: "Shrimp Tempura Udon", zh: "炸虾天妇罗乌冬", ja: "海老天うどん" }, price: "$16" },
      { name: { en: "Vegetable Tempura Udon", zh: "蔬菜天妇罗乌冬", ja: "野菜天うどん" }, price: "$16" },
      { name: { en: "Uni Carbonara Udon", zh: "海胆奶油乌冬", ja: "ウニカルボナーラうどん" }, note: { en: "Hokkaido uni, ikura & soft egg", zh: "北海道海胆、鱼籽与溏心蛋", ja: "北海道産ウニ、いくら、温泉卵" }, price: "$20" },
      { name: { en: "Beef Udon", zh: "牛肉乌冬", ja: "牛うどん" }, note: { en: "Thin sliced beef & onion", zh: "薄切牛肉与洋葱", ja: "薄切り牛肉と玉ねぎ" }, price: "$19" },
      { name: { en: "Chicken Curry Udon", zh: "鸡肉咖喱乌冬", ja: "チキンカレーうどん" }, note: { en: "Authentic Japanese curry on udon", zh: "正宗日式咖喱乌冬", ja: "本格和風カレーうどん" }, price: "$20" },
    ],
  },
  {
    title: { en: "Shinobi Rolls", zh: "忍卷", ja: "忍ロール" },
    rows: [
      { name: { en: "Cucumber & Shiso", zh: "黄瓜紫苏卷", ja: "胡瓜＆紫蘇" }, price: "$11" },
      { name: { en: "Marinated Tofu & Cucumber & Avocado", zh: "味付豆腐黄瓜牛油果卷", ja: "味付け豆腐・胡瓜・アボカド" }, price: "$12" },
      { name: { en: "Veggie Tempura & Avocado", zh: "蔬菜天妇罗牛油果卷", ja: "野菜天＆アボカド" }, price: "$13" },
      { name: { en: "Avocado Salmon", zh: "牛油果三文鱼卷", ja: "アボカドサーモン" }, price: "$12.5" },
      { name: { en: "Maguro & Shiso", zh: "金枪鱼紫苏卷", ja: "マグロ＆紫蘇" }, price: "$12.5" },
      { name: { en: "Karaage Chicken", zh: "日式炸鸡卷", ja: "唐揚げロール" }, price: "$12.5" },
      { name: { en: "Dynamite Roll", zh: "炸裂卷", ja: "ダイナマイトロール" }, note: { en: "Shrimp tempura, avocado, cucumber", zh: "炸虾天妇罗、牛油果、黄瓜", ja: "海老天、アボカド、胡瓜" }, price: "$12.5" },
      { name: { en: "California Roll", zh: "加州卷", ja: "カリフォルニアロール" }, note: { en: "Crab salad, avocado, cucumber, tobiko", zh: "蟹肉沙拉、牛油果、黄瓜、飞鱼籽", ja: "カニサラダ、アボカド、胡瓜、とびこ" }, price: "$12.5" },
      { name: { en: "Unagi Roll", zh: "鳗鱼卷", ja: "うなぎロール" }, price: "$12.5" },
      { name: { en: "Bluefin Tuna Toro Taku Roll", zh: "蓝鳍金枪鱼拖罗卷", ja: "本マグロトロタクロール" }, note: { en: "Bluefin toro & akami with takuan & shiso", zh: "蓝鳍金枪鱼大托罗与赤身配腌萝卜", ja: "本マグロトロ・赤身、沢庵、紫蘇" }, price: "$26" },
      { name: { en: "Rainbow Roll", zh: "彩虹卷", ja: "レインボーロール" }, note: { en: "Cucumber, shrimp tempura, crab topped with salmon & maguro", zh: "黄瓜、炸虾、蟹肉 topped 三文鱼金枪鱼", ja: "胡瓜、海老天、カニの上にサーモン・マグロ" }, price: "$17" },
      { name: { en: "Negitoro", zh: "葱拖罗", ja: "ネギトロ" }, note: { en: "Bluefin tuna toro & akami roll, 8 pcs", zh: "蓝鳍金枪鱼拖罗赤身卷，8件", ja: "本マグロトロ・赤身ロール、8個" }, price: "$16" },
    ],
  },
  {
    title: { en: "Premium Rolls", zh: "高级卷", ja: "プレミアムロール" },
    rows: [
      { name: { en: "Ninja Bomb Roll", zh: "忍者炸弹卷", ja: "ニンジャボムロール" }, note: { en: "Cucumber, avocado, shrimp tempura topped with salmon sashimi", zh: "黄瓜、牛油果、炸虾 topped 三文鱼刺身", ja: "胡瓜、アボカド、海老天にサーモン刺身" }, price: "$17" },
      { name: { en: "Ninja Cali Roll", zh: "忍者加州卷", ja: "ニンジャカリロール" }, note: { en: "Cucumber, maguro, crab topped with maguro sashimi", zh: "黄瓜、金枪鱼、蟹肉 topped 金枪鱼刺身", ja: "胡瓜、マグロ、カニにマグロ刺身" }, price: "$17" },
      { name: { en: "Ninja Star Roll", zh: "忍者之星卷", ja: "ニンジャスターロール" }, note: { en: "Cucumber, cream cheese, shrimp tempura topped with smoked salmon", zh: "黄瓜、奶油芝士、炸虾 topped 烟熏三文鱼", ja: "胡瓜、クリームチーズ、海老天にスモークサーモン" }, price: "$17" },
      { name: { en: "3 Kind Premium Roll Set", zh: "高级卷三种拼盘", ja: "プレミアムロール3種盛り" }, note: { en: "All 3 premium rolls at a discount", zh: "三种高级卷优惠组合", ja: "3種のプレミアムロールをお得に" }, price: "$48" },
    ],
  },
  {
    title: { en: "Shinobi Roll Tray", zh: "卷物拼盘", ja: "ロールトレイ" },
    rows: [
      { name: { en: "House Selected 24 pcs", zh: "主厨精选 24 件", ja: "オーナー厳選 24個" }, note: { en: "Cucumber & shiso, salmon, yuzu crab", zh: "黄瓜紫苏、三文鱼、柚子蟹", ja: "胡瓜紫蘇、サーモン、柚子カニ" }, price: "$30" },
      { name: { en: "House Selected 48 pcs", zh: "主厨精选 48 件", ja: "オーナー厳選 48個" }, note: { en: "Cucumber & shiso, salmon, maguro, shrimp tempura, yuzu crab, chicken", zh: "六种口味精选拼盘", ja: "6種類の厳選ロール" }, price: "$60" },
      { name: { en: "Veggie 24 pcs Tray", zh: "蔬菜拼盘 24 件", ja: "ベジトレイ 24個" }, note: { en: "Cucumber & shiso, marinated tofu, veggie tempura & avocado", zh: "三款素食卷拼盘", ja: "3種のベジタブルロール" }, price: "$33" },
      { name: { en: "Popular 24 pcs Tray", zh: "人气拼盘 24 件", ja: "人気トレイ 24個" }, note: { en: "Avocado salmon, dynamite, maguro & shiso", zh: "三款人气卷拼盘", ja: "人気3種ロール" }, price: "$35" },
      { name: { en: "Popular 48 pcs Tray", zh: "人气拼盘 48 件", ja: "人気トレイ 48個" }, note: { en: "Avocado salmon, dynamite, maguro & shiso, california, ninja bomb, chicken", zh: "六款人气卷拼盘", ja: "人気6種ロール" }, price: "$72" },
    ],
  },
  {
    title: { en: "Pressed Sushi", zh: "押寿司", ja: "押し寿司" },
    rows: [
      { name: { en: "Torched Salmon", zh: "炙烤三文鱼押寿司", ja: "炙りサーモン押し寿司" }, note: { en: "6 pcs", zh: "6 件", ja: "6貫" }, price: "$19.5" },
      { name: { en: "Torched Japanese Scallop", zh: "炙烤扇贝押寿司", ja: "炙り帆立押し寿司" }, note: { en: "6 pcs", zh: "6 件", ja: "6貫" }, price: "$20" },
      { name: { en: "Ebi with Yuzu Sauce", zh: "柚子酱鲜虾押寿司", ja: "柚子ソース海老押し寿司" }, note: { en: "6 pcs", zh: "6 件", ja: "6貫" }, price: "$19.5" },
      { name: { en: "Maguro Pressed Sushi", zh: "金枪鱼押寿司", ja: "マグロ押し寿司" }, note: { en: "6 pcs", zh: "6 件", ja: "6貫" }, price: "$19.5" },
      { name: { en: "Unagi & Sansho Pepper", zh: "鳗鱼花椒押寿司", ja: "うなぎ山椒押し寿司" }, note: { en: "6 pcs", zh: "6 件", ja: "6貫" }, price: "$20" },
    ],
  },
  {
    title: { en: "Party Platter", zh: "派对拼盘", ja: "パーティープラッター" },
    rows: [
      { name: { en: "Aburi Sushi Platter", zh: "炙寿司拼盘", ja: "炙り寿司プラッター" }, note: { en: "42 pcs — Wagyu, torched salmon, unagi & more. 3h notice", zh: "42 件—和牛、炙烤三文鱼、鳗鱼等。需3小时预订", ja: "42個—和牛、炙りサーモン、うなぎ等。3時間前予約" }, price: "$100" },
      { name: { en: "Variety Sushi Platter", zh: "综合寿司拼盘", ja: "バラエティ寿司プラッター" }, note: { en: "Nigiri, pressed sushi & rolls — 40+ pcs", zh: "握寿司、押寿司与卷物 40+ 件", ja: "握り、押し寿司、ロール 40個以上" }, price: "$100" },
      { name: { en: "Pressed Sushi Platter", zh: "押寿司拼盘", ja: "押し寿司プラッター" }, note: { en: "48 pcs — 6 kinds of pressed sushi", zh: "48 件—6 种押寿司", ja: "48個—6種の押し寿司" }, price: "$95" },
    ],
  },
];
