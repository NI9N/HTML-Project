export type Lang = "en" | "zh" | "ja";
export type Loc = Record<Lang, string>;

export type FeaturedItem = {
  image: string;
  name: Loc;
  desc: Loc;
  price: string;
  tag?: "popular" | "new";
};

export type MenuRow = {
  name: Loc;
  note?: Loc;
  price?: string;
};

export type MenuSectionData = {
  title: Loc;
  rows: MenuRow[];
};
