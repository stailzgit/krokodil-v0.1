import React from "react";
import { useAppSelector } from "../../hooks/redux";

type Props = {};

const GameResults = (props: Props) => {
  const { reasonEndGame } = useAppSelector((state) => state.settingsSlice);
  const { players } = useAppSelector((state) => state.playersReducer);
  debugger;
  const finalResults = [...players];
  finalResults.sort((player1, player2) => player2.score - player1.score);
  return (
    <div>
      <div>{reasonEndGame}</div>
      <div>
        <h5>Счет игроков:</h5>
        <div>
          {finalResults.map((player, index) => (
            <div key={index}>
              {player.name} - {player.score}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameResults;
