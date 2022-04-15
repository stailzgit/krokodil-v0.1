import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import "./App.css";
import Settings from "./pages/Main/Settings/Settings";
import CreatePlayers from "./pages/CreatePlayers/CreatePlayersPage";
import { ROUTES } from "./hooks/routes";
import CardSelectionPage from "./pages/CardSelection/CardSelectionPage";
import Stats from "./pages/Stats/Stats";
import ChoiceWord from "./pages/ChoiceWord/ChoiceWord";
import Guessing from "./pages/Guessing/Guessing";
import WinningPlayer from "./pages/Guessing/WinningPlayer/WinningPlayer";
import GameResults from "./pages/GameResults/GameResults";
import { useAppSelector } from "./hooks/redux";
import About from "./pages/Main/About/About";
import Rules from "./pages/Main/Rules/Rules";
import GameSpecifics from "./pages/Main/GameSpecifics/GameSpecifics";

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
          <Route path={ROUTES.GAME_SPECIFICS} element={<GameSpecifics />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.RULES} element={<Rules />} />
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
          <Route path={ROUTES.GAME_SPECIFICS} element={<GameSpecifics />} />
          <Route path={ROUTES.RULES} element={<Rules />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={"*"} element={<Main />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
