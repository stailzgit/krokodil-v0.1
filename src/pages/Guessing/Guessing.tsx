import React, { useEffect, useState } from "react";
import "./Guessing.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addScore, addScoreToTeam } from "../../store/reducers/PlayerSlice";
import App from "./../../App";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../hooks/routes";
import { Howl, Howler } from "howler";
import StartGuessingSound from "../../assets/sound/start_guessing.mp3";
import EndGuessingSound from "../../assets/sound/end_guessing.mp3";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { HiOutlineCheck } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
type Props = {};

const StartGuessingPlay = new Howl({
  src: [StartGuessingSound, "play_guessing"],
});

const EndGuessingPlay = new Howl({
  src: [EndGuessingSound, "play_guessing"],
  volume: 0.5,
});

const RenderTime = (
  remainingTime: number,
  isSound: boolean,
  roundTime: number
) => {
  const [stopSound, setStopSound] = useState(false);
  //Ререндер 2 раза и нужно предотвратить повтор звука - stopSound и setTimeout
  if (isSound && !stopSound) {
    if (remainingTime === roundTime || remainingTime === 10) {
      StartGuessingPlay.play();
      setStopSound(true);
      setTimeout(() => {
        setStopSound(false);
      }, 1000);
    }
    if (remainingTime === 1) {
      EndGuessingPlay.play();
    }
  }
  if (remainingTime === 0) {
    return <div className="guessing__timer-stop">Время вышло</div>;
  }
  return <div className="guessing__timer-value">{remainingTime}</div>;
};

const Guessing = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentWord } = useAppSelector((state) => state.cardsReducer);
  const { isSound, roundTime, isNeedRoundTime } = useAppSelector(
    (state) => state.settingsSlice
  );
  const { stylePlayers, players, activePlayerIndex } = useAppSelector(
    (state) => state.playersReducer
  );

  const [showWord, setShowWord] = useState(false);

  const onButtonClick = (isGuessed: boolean) => {
    if (isGuessed) {
      //Если угадал
      if (stylePlayers === "Teams") {
        dispatch(addScore({ score: currentWord.score }));
        navigate(ROUTES.STATS);
      } else if (stylePlayers === "Players") {
        navigate(ROUTES.WINNING_PLAYER);
      }
    } else {
      //Если не угадал
      dispatch(addScore({ score: 0 }));
      navigate(ROUTES.STATS);
    }
  };

  return (
    <div className="guessing">
      <div className="guessing__timer-wrap">
        {isNeedRoundTime && (
          <CountdownCircleTimer
            isPlaying
            updateInterval={1}
            duration={roundTime}
            colors={["#2fad2e", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[roundTime, roundTime / 2, roundTime / 4, 0]}
            onComplete={() => ({ shouldRepeat: false, delay: 1 })}
            strokeWidth={20}
          >
            {({ remainingTime }) =>
              RenderTime(remainingTime, isSound, roundTime)
            }
          </CountdownCircleTimer>
        )}
      </div>

      <div className="guessing__word">
        {players[activePlayerIndex].name} показывает
      </div>

      <div
        className="guessing__word"
        onClick={() => setShowWord((prev) => !prev)}
      >
        {showWord ? currentWord.word : "***************"}
      </div>

      <div
        className="guessing__word"
        onClick={() => setShowWord((prev) => !prev)}
      >
        +{currentWord.score}
      </div>

      <div className="guessing__buttons">
        <button
          className=" guessing__btn guessing__btn-yes"
          onClick={() => onButtonClick(true)}
        >
          <HiOutlineCheck
            className="guessing__icon"
            style={{ marginLeft: "3px", color: "white" }}
          />
        </button>
        <button
          className="guessing__btn guessing__btn-no"
          onClick={() => onButtonClick(false)}
        >
          <IoMdClose className="guessing__icon" style={{ color: "white" }} />
        </button>
      </div>
    </div>
  );
};

export default Guessing;
