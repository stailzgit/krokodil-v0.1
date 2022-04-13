export type CardsType = {
  one_word: SectionType;
  phrases: SectionType;
  thematic?: SectionType;
};
export type SectionType = {
  title: string;
  levels: LevelsType;
};
export type LevelsType = {
  easy?: CardDeckType;
  normal?: CardDeckType;
  hard?: CardDeckType;
  impossible?: CardDeckType;
  suicide?: CardDeckType;
};
export type CardDeckType = {
  id: string;
  title: string;
  preview: string;
  items: [
    {
      word: string;
      score: string;
    }
  ];
};

export type LevelsTypeString = {
  easy: string;
  normal: string;
  hard: string;
  impossible: string;
  suicide: string;
};
