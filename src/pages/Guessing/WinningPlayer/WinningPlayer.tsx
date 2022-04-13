import React from "react";
import "./WinningPlayer.css";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import {
  addScore,
  addScoreToPlayers,
} from "../../../store/reducers/PlayerSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../hooks/routes";

type Props = {};

const WinningPlayer = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activePlayerIndex, players } = useAppSelector(
    (state) => state.playersReducer
  );
  const { currentWord } = useAppSelector((state) => state.cardsReducer);
  const winnerPlayers = players.filter(
    (_player, index) => index !== activePlayerIndex
  );

  const onWinnerClick = (playerId: string) => {
    dispatch(addScore({ idPlayer: playerId, score: currentWord.score }));
    navigate(ROUTES.STATS);
  };

  return (
    <div className="winner-wrap">
      <div className="winner__title">Кто угадал?</div>
      <div className="winner__list">
        {winnerPlayers.map((player) => (
          <div
            className="winner__list-item"
            onClick={() => onWinnerClick(player.id)}
            key={player.id}
          >
            {player.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinningPlayer;
