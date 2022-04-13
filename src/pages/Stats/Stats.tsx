import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import "./Stats.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../hooks/routes";
import { useDispatch } from "react-redux";
import { checkEndGame } from "../../store/reducers/SettingsSlice";
import { IPlayer } from "../../models/IPlayer";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
type Props = {};

const Stats = (props: Props) => {
  const dispatch = useAppDispatch();
  const { isEndGame } = useAppSelector((state) => state.settingsSlice);
  const { players, activePlayerIndex } = useAppSelector(
    (state) => state.playersReducer
  );
  const { unusedCardsCount, usedWords } = useAppSelector(
    (state) => state.cardsReducer
  );
  const { cardsInGame } = useAppSelector((state) => state.cardsReducer);
  const navigate = useNavigate();

  const onClickButton = () => {
    navigate(ROUTES.CHOICE_WORD);
  };

  const onBackClick = () => {
    navigate(ROUTES.MAIN);
  };

  useEffect(() => {
    dispatch(checkEndGame({ players, activePlayerIndex, unusedCardsCount }));
    if (isEndGame) {
      navigate(ROUTES.GAME_RESULTS);
    }
  });

  return (
    <div className="stats-wrap">
      <h2 className="stats__title">Статистика</h2>

      <div className="stats__list">
        {players.map((player: IPlayer, index: number) => (
          <div
            className={
              "stats__list-item " +
              (activePlayerIndex === index ? "stats__list-item-active" : "")
            }
            key={player.id}
          >
            <div className="stats__item-name">{player.name}</div>
            <div className="stats__item-score">{player.score}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="stats__card-rest">
          Карт осталось: {unusedCardsCount}
        </div>
        <div className="stats__card-rest">
          Карт использовано: {usedWords.length}
        </div>
      </div>

      <button className="btn btn-primary stats__button" onClick={onClickButton}>
        Стартуем
      </button>

      <div className="stats__back" onClick={onBackClick}>
        <BsFillArrowLeftCircleFill className="stats__back-icon" />
        Меню
      </div>
    </div>
  );
};

export default Stats;
