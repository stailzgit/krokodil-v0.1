import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "../../models/IPlayer";
import { v4 as uuidv4 } from "uuid";

export type TypeStylePlayers = "Teams" | "Players";

type PlayerState = {
  stylePlayers: TypeStylePlayers;
  players: IPlayer[];
  activePlayerIndex: number;
};

const initialState: PlayerState = {
  stylePlayers: "Players",
  players: [
    { id: "0", name: "Игрок 1", score: 0 },
    { id: "1", name: "Игрок 2", score: 0 },
    { id: "2", name: "Игрок 3", score: 0 },
  ],
  activePlayerIndex: 0,
};

export const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    resetPlayerSlice: () => initialState,
    createPlayer(state, action: PayloadAction<string>) {
      const newPlayer = { id: uuidv4(), name: action.payload, score: 0 };
      state.players.push(newPlayer);
    },
    deletePlayer(state, action: PayloadAction<string>) {
      state.players = state.players.filter(
        (player) => player.id !== action.payload
      );
    },
    changeStylePlayers(state, action: PayloadAction<TypeStylePlayers>) {
      state.stylePlayers = action.payload;
    },
    addScoreToTeam(state, action: PayloadAction<number>) {
      const scorePerWord = action.payload;
      state.players[state.activePlayerIndex].score = scorePerWord;
    },
    addScoreToPlayers(
      state,
      action: PayloadAction<{ idPlayer: string; score: number }>
    ) {
      state.players[state.activePlayerIndex].score += action.payload.score;
      const guessingPlayer = state.players.find(
        (player) => player.id === action.payload.idPlayer
      );
      if (guessingPlayer) {
        guessingPlayer.score = action.payload.score;
      }
    },
    addScore(
      state,
      action: PayloadAction<{ idPlayer?: string; score: number }>
    ) {
      const addScore = action.payload.score;
      if (state.stylePlayers === "Players") {
        //добавление очков показывающему игроку
        state.players[state.activePlayerIndex].score += addScore;
        const guessingPlayer = state.players.find(
          (player) => player.id === action.payload.idPlayer
        );
        if (guessingPlayer) {
          //добавление очков угадавшему игроку
          guessingPlayer.score += action.payload.score;
        }
      }
      if (state.stylePlayers === "Teams") {
        //добавление очков команде
        state.players[state.activePlayerIndex].score += addScore;
      }
      //Ход следующего игрока (если ходил последний, то ходит первый)
      if (state.activePlayerIndex !== state.players.length - 1) {
        state.activePlayerIndex += 1;
      } else {
        state.activePlayerIndex = 0; //если игрок последний в списке, то теперь ходит первый
      }
    },
  },
});

export const {
  createPlayer,
  deletePlayer,
  changeStylePlayers,
  resetPlayerSlice,
  addScoreToTeam,
  addScoreToPlayers,
  addScore,
} = playerSlice.actions;

export const selectorPlayers = (state: PlayerState) => state.players;

export default playerSlice.reducer;
