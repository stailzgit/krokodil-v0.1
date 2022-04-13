import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import "./App.css";
import Settings from "./pages/Settings/Settings";
import Game from "./pages/Game/Game";
import CreatePlayers from "./pages/CreatePlayers/CreatePlayersPage";
import { ROUTES } from "./hooks/routes";
import CardSelectionPage from "./pages/CardSelection/CardSelectionPage";
import Stats from "./pages/Stats/Stats";
import ChoiceWord from "./pages/ChoiceWord/ChoiceWord";
import Guessing from "./pages/Guessing/Guessing";
import WinningPlayer from "./pages/Guessing/WinningPlayer/WinningPlayer";
import GameResults from "./pages/GameResults/GameResults";
import { useAppSelector } from "./hooks/redux";

const App = () => {
  const { isGameProcess } = useAppSelector((state) => state.settingsSlice);
  return (
    <div className="app container">
      {isGameProcess ? (
        <Routes>
          <Route path={ROUTES.MAIN} element={<Main />} />
          <Route path={ROUTES.CREATE_PLAYERS} element={<Main />} />
          <Route path={ROUTES.CARD_SELECTION} element={<Main />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
          <Route path={ROUTES.STATS} element={<Stats />} />
          <Route path={ROUTES.CHOICE_WORD} element={<ChoiceWord />} />
          <Route path={ROUTES.GUESSING} element={<Guessing />} />
          <Route path={ROUTES.WINNING_PLAYER} element={<WinningPlayer />} />
          <Route path={ROUTES.GAME_RESULTS} element={<GameResults />} />
          <Route path={"*"} element={<Main />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={ROUTES.MAIN} element={<Main />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
          <Route path={ROUTES.CREATE_PLAYERS} element={<CreatePlayers />} />
          <Route path={ROUTES.CARD_SELECTION} element={<CardSelectionPage />} />
          <Route path={ROUTES.STATS} element={<Stats />} />
          <Route path={ROUTES.CHOICE_WORD} element={<ChoiceWord />} />
          <Route path={ROUTES.GUESSING} element={<Guessing />} />
          <Route path={ROUTES.WINNING_PLAYER} element={<WinningPlayer />} />
          <Route path={ROUTES.GAME_RESULTS} element={<GameResults />} />
          <Route path={"*"} element={<Main />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
