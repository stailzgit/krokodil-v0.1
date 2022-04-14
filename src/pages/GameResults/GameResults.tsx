import React from "react";
import { useAppSelector } from "../../hooks/redux";
import GoldImg from "../../assets/results/gold.png";
import "./GameResults.css";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../hooks/routes";
type Props = {};

const GameResults = (props: Props) => {
  const navigate = useNavigate();
  const { players, stylePlayers } = useAppSelector(
    (state) => state.playersReducer
  );
  const finalResults = [...players];
  finalResults.sort((player1, player2) => player2.score - player1.score);

  const onBackClick = () => {
    navigate(ROUTES.MAIN);
  };

  return (
    <div className="results-wrap">
      <div className="results__gold-wrap">
        <div className="results__gold-title">{finalResults[0].name}</div>
        <img
          src={GoldImg}
          alt="img_gold"
          style={{ minWidth: "200px", minHeight: "170px" }}
        />
      </div>

      <h3 className="results__list-title">
        Счет {stylePlayers === "Players" ? "игроков" : "команд"}:
      </h3>
      <div className="results__list">
        {finalResults.map((player, index) => (
          <div key={index} className="results__list-item">
            {player.name} - {player.score}
          </div>
        ))}
      </div>

      <div className="results__back" onClick={onBackClick}>
        <BsFillArrowLeftCircleFill className="stats__back-icon" />
        Меню
      </div>
    </div>
  );
};

export default GameResults;
