import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "../../models/IPlayer";
export type StyleGameType = "five_words" | "one_word";
export type StyleEndGameType = "max_score" | "no_cards";

type SettingsStateType = {
  isEndGame: boolean;
  isGameProcess: boolean;
  styleGame: StyleGameType;
  typeEndGame: StyleEndGameType;
  maxScore: number;
  isNeedRoundTime: boolean;
  roundTime: number;
  isSound: boolean;
  isRepeatCards: boolean;
};

export const initialState: SettingsStateType = {
  isEndGame: false,
  isGameProcess: false,
  styleGame: "five_words",
  typeEndGame: "max_score",
  maxScore: 200,
  isNeedRoundTime: true,
  roundTime: 60,
  isSound: true,
  isRepeatCards: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    newGame(state) {
      state.isEndGame = false;
      state.isGameProcess = false;
    },
    setGameProcess(state, action: PayloadAction<boolean>) {
      state.isGameProcess = action.payload;
    },
    checkEndGame(
      state,
      action: PayloadAction<{
        players: IPlayer[];
        activePlayerIndex: number;
        unusedCardsCount: number;
      }>
    ) {
      const players = action.payload.players;
      const activePlayerIndex = action.payload.activePlayerIndex;
      const unusedCardsCount = action.payload.unusedCardsCount;
      if (unusedCardsCount === 0) {
        state.isEndGame = true;
        return;
      }

      //поиск максимального счета
      let maxPlayerScore = 0;
      players.forEach((player, index) => {
        if (player.score > maxPlayerScore) {
          maxPlayerScore = player.score;
        }
      });
      //Если достигли max счета
      if (maxPlayerScore >= state.maxScore) {
        //количество игроков достигших одинакового мах счета
        let countWinner = players.reduce(
          (count: number, player) =>
            player.score === maxPlayerScore ? count + 1 : count,
          0
        );

        //это последний игрок за круг и нет равных максимальных счетов
        if (activePlayerIndex === players.length - 1 && countWinner === 1) {
          state.isEndGame = true;
        }
      }
    },
    // saveSettings(
    //   state,
    //   action: PayloadAction<{
    //     typeEndGame: StyleEndGameType;
    //     maxScore: number;
    //     isNeedRoundTime: boolean;
    //     roundTime: number;
    //     isSound: boolean;
    //   }>
    // ) {
    //   state.typeEndGame = action.payload.typeEndGame;
    //   state.maxScore = action.payload.maxScore;
    //   state.isNeedRoundTime = action.payload.isNeedRoundTime;
    //   state.roundTime = action.payload.roundTime;
    //   state.isSound = action.payload.isSound;
    // },
    saveSettings: (
      state,
      action: PayloadAction<{
        typeEndGame: StyleEndGameType;
        maxScore: number;
        isNeedRoundTime: boolean;
        roundTime: number;
        isSound: boolean;
      }>
    ) => ({ ...state, ...action.payload }),
  },
});

export const { checkEndGame, newGame, saveSettings, setGameProcess } =
  settingsSlice.actions;

export default settingsSlice.reducer;
