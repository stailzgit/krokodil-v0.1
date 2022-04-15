import ONE_WORD from "./Themes/one_word.json";
import ONE_WORD2 from "./Themes/one_word2.json";
import ONE_WORD3 from "./Themes/one_word3.json";
import ONE_WORD4 from "./Themes/one_word4.json";
import PHRASES from "./Themes/phrases.json";

const myParseJSON = (json: any) => JSON.parse(JSON.stringify(json));

export const ThemesOwn = [
  myParseJSON(ONE_WORD),
  myParseJSON(ONE_WORD2),
  // myParseJSON(ONE_WORD3),
  // myParseJSON(ONE_WORD4),
  myParseJSON(PHRASES),
];
