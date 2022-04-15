import ONE_WORD from "./Themes/one_word.json";
import ONE_WORD2 from "./Themes/one_word2.json";
import PHRASES from "./Themes/phrases.json";

const myParseJSON = (json: any) => JSON.parse(JSON.stringify(json));

export const ThemesOwn = [
  myParseJSON(ONE_WORD),
  myParseJSON(ONE_WORD2),
  myParseJSON(PHRASES),
];
