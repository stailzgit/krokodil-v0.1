import React, { useEffect } from "react";
import Card from "./LevelCards/LevelCards";
import Cards from "../../store/Cards.json";
import { CardsType } from "./TypesCards";
import ThemeCards from "./ThemeCards/ThemeCards";
import "./CardSelectionPage.css";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../hooks/routes";
import { IThemeCards } from "../../models/ICards";
import { cardsToGame } from "../../store/reducers/CardSlice";
import { setGameProcess } from "../../store/reducers/SettingsSlice";
import { krocodilSound } from "../../hooks/sounds";

const CardSelectionPage = () => {
  const dispatch = useAppDispatch();
  const { totalCards, themesCards } = useAppSelector(
    (state) => state.cardsReducer
  );
  const { isGameProcess } = useAppSelector((state) => state.settingsSlice);

  const { isSound } = useAppSelector((state) => state.settingsSlice);
  const navigate = useNavigate();

  const onStartGameClick = () => {
    if (totalCards > 0) {
      navigate(ROUTES.STATS);
      dispatch(cardsToGame());
      dispatch(setGameProcess(true));
      isSound && krocodilSound.startGame();
    }
  };

  return (
    <div className="cards-page">
      <h2 className="cards-page__title">
        Выбор карт ({totalCards > 999 ? "999+" : totalCards})
      </h2>
      <button
        className="btn btn-primary cards-page__start-game"
        onClick={onStartGameClick}
      >
        Начать игру
      </button>
      <div className="cards-page__sections-list">
        {themesCards.map((theme: IThemeCards) => (
          <ThemeCards {...theme} key={theme.themeId} />
        ))}
      </div>
    </div>
  );
};

export default CardSelectionPage;
