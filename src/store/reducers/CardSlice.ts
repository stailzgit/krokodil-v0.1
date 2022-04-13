import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IPlayer } from "../../models/IPlayer";
import { v4 as uuidv4 } from "uuid";
import Cards from "../../store/Cards.json";
import { IThemeCards, ILevel, IWord } from "../../models/ICards";
import { FaLevelUpAlt } from "react-icons/fa";
import { clearStorage } from "../../utils/local-storage";

type CardStateType = {
  typeGame: string;
  themesCards: IThemeCards[];
  cardsInGame: Array<Array<string>>;
  usedWords: string[];
  fiveWords: IWord[];
  totalCards: number;
  currentWord: IWord;
  unusedCardsCount: number;
};

const initialCards = () => {
  const themes: IThemeCards[] = JSON.parse(JSON.stringify(Cards)).data;
  themes.forEach((theme) => {
    theme.levels.forEach((level) => {
      level.checked = false;
    });
  });
  return themes;
};

const initialState: CardStateType = {
  typeGame: "five_cards",
  themesCards: initialCards(),
  cardsInGame: [[], [], [], [], [], []],
  usedWords: [],
  fiveWords: [],
  totalCards: 0,
  currentWord: { word: "", score: 0 },
  unusedCardsCount: Infinity,
};

// const getAllLevelCards = (state:CardState) => {
//     const allLevels:ILevel[] = []
//     state.themesCards.forEach((theme) => {theme.levels.forEach((level) => allLevels.push(level))})
//     return allLevels
// }

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    resetCardSlice: () => initialState,
    toggleSelectCard(state, action: PayloadAction<string>) {
      const levelId = action.payload;
      state.themesCards.forEach((theme) => {
        theme.levels.forEach((level) => {
          if (levelId === level.levelId) {
            //Если уровень был выбран, то отнимаем количество и меняем checked
            if (level.checked) state.totalCards -= level.words.length;
            else state.totalCards += level.words.length;
            level.checked = !level.checked;
            return;
          }
        });
      });
    },
    //Ввод выбранных карт в игру
    cardsToGame(state) {
      state.unusedCardsCount = 0;
      state.cardsInGame = [[], [], [], [], [], []];
      state.themesCards.forEach((theme) =>
        theme.levels.forEach((level) => {
          if (level.checked) {
            state.cardsInGame[level.levelNumber].push(...level.words);
            state.unusedCardsCount += level.words.length;
          }
        })
      );
    },
    //Назначить текущее слово и его исключение из списка
    setCurrentWord(state, action: PayloadAction<IWord>) {
      const guessedWord: IWord = action.payload;
      state.usedWords.push(guessedWord.word);
      // state.unusedCardsCount -= 1
      state.currentWord = guessedWord;

      //удаление угадываемого слова из списка слов в игре
      state.cardsInGame.forEach((level) => {
        level.forEach((word, index, levelInner) => {
          if (word === guessedWord.word) {
            levelInner.splice(index, 1);
            state.unusedCardsCount -= 1;
            return;
          }
        });
      });
    },
    getFiveWords(state) {
      state.fiveWords = [];

      const getRandomWord = (level: string[], fiveWords: IWord[]) => {
        let newWord = "";
        do {
          newWord = level[Math.floor(Math.random() * level.length)];
        } while (fiveWords.some((word) => word.word === newWord));
        return newWord;
      };

      //нужно набрать 5 слов (если меньше 5, то из доступных)
      const availableWords: number =
        state.unusedCardsCount >= 5 ? 5 : state.unusedCardsCount;
      while (state.fiveWords.length < availableWords) {
        for (let [index, level] of state.cardsInGame.entries()) {
          //уровень может быть пустым
          if (level.length) {
            //если слов больше 5, то подбор рандомных(без повторов)
            if (availableWords === 5) {
              let newWord = getRandomWord(level, state.fiveWords);
              // const removedWord = level.splice(newWordIndex, 1)[0]
              state.fiveWords.push({ word: newWord, score: index });
            } else {
              //если слов меньше 5, то просто выводим все
              level.forEach((word) =>
                state.fiveWords.push({ word: word, score: index })
              );
            }
          }
          if (state.fiveWords.length >= availableWords) break;
        }
      }

      //пересчет количества оставшихся карт
      state.unusedCardsCount = state.cardsInGame.reduce(
        (count, level) => count + level.length,
        0
      );
      //Слова по возратанию очков
      state.fiveWords = state.fiveWords.sort(
        (word1, word2) => word1.score - word2.score
      );
    },
  },
});

// const selectSelf = (state: CardStateType) => state

// const unusedCardsCount = createSelector(selectSelf, (state) => {
//     const cardsInGameCount = state.cardsInGame.reduce((count, level) => count + level.length , 0 )
//     return cardsInGameCount - state.usedWords.length
// })

export const {
  toggleSelectCard,
  cardsToGame,
  getFiveWords,
  resetCardSlice,
  setCurrentWord,
} = cardSlice.actions;

export default cardSlice.reducer;
