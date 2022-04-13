export interface IThemeCards {
  themeId: string;
  title: string;
  levels: ILevel[];
}

export interface ILevel {
  levelId: string;
  levelNumber: number;
  checked: boolean;
  words: string[];
}

export interface IWord {
  word: string;
  score: number;
}
