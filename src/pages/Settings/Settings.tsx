import React, { useState, useEffect } from "react";
import "./Settings.css";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import {
  resetSettingsSlice,
  saveSettings,
  StyleEndGameType,
} from "../../store/reducers/SettingsSlice";
import { shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../hooks/routes";
type Props = {};

const Settings = (props: Props) => {
  console.log("rerender Settings");

  const { typeEndGame, maxScore, isSound, roundTime, isNeedRoundTime } =
    useAppSelector((state) => state.settingsSlice, shallowEqual);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isNeedTime, setIsNeedTime] = useState(isNeedRoundTime);
  const [time, setTime] = useState(roundTime);
  const [score, setScore] = useState(maxScore);
  const [localTypeEndGame, setLocalTypeEndGame] = useState(typeEndGame);
  const [localIssound, setlocalIsSound] = useState(isSound);

  const onNeedTimeChange = () => {
    setIsNeedTime((prev) => !prev);
  };

  const onSoundChange = () => {
    setlocalIsSound((prev) => !prev);
  };

  const onTimeChange = (value: number) => {
    const tmpTime = time + value;
    if (tmpTime >= 30 && tmpTime <= 300) {
      setTime(tmpTime);
    }
  };

  const onSaveSettings = () => {
    dispatch(
      saveSettings({
        typeEndGame: localTypeEndGame,
        maxScore: score,
        isNeedRoundTime: isNeedTime,
        roundTime: time,
        isSound: localIssound,
      })
    );
    navigate(ROUTES.MAIN);
  };

  const onDefaultClick = () => {
    dispatch(resetSettingsSlice());
  };

  const updateSettings = () => {
    setIsNeedTime(isNeedRoundTime);
    setTime(roundTime);
    setScore(maxScore);
    setLocalTypeEndGame(typeEndGame);
  };

  useEffect(() => {
    updateSettings();
  }, [typeEndGame, maxScore, isSound, roundTime, isNeedRoundTime]);

  const onCancelClick = () => navigate(ROUTES.MAIN);

  return (
    <div className="settings unselectable">
      <h2 className="settings__title">Настройки игры</h2>

      <div className="settings__props-title">Закончить игру когда:</div>
      <div className="settings__props-wrap">
        <label className="settings__radio-label">
          <input
            type="radio"
            name="reason_end-game"
            checked={localTypeEndGame === "no_cards"}
            onChange={() => setLocalTypeEndGame("no_cards")}
          />
          <span>закончатся карты</span>
        </label>

        <label className="settings__radio-label">
          <input
            type="radio"
            name="reason_end-game"
            checked={localTypeEndGame === "max_score"}
            onChange={() => setLocalTypeEndGame("max_score")}
          />
          <span>наберут очков</span>
          <input
            className="settings__max-score"
            type="text"
            value={score}
            maxLength={4}
            onChange={(e) => setScore(+e.currentTarget.value)}
          />
        </label>
      </div>

      <div className="settings__props-title">Время на ход:</div>
      <div className="settings__props-wrap">
        <label className="settings__check-label">
          <span>без времени</span>
          <input
            type="checkbox"
            checked={!isNeedTime}
            onChange={onNeedTimeChange}
            className="settings__check"
          />
        </label>
        {isNeedTime && (
          <div className="settings__time">
            <AiFillMinusCircle
              className="settings__time-icon"
              onClick={() => onTimeChange(-10)}
            />
            <AiFillPlusCircle
              className="settings__time-icon"
              onClick={() => onTimeChange(10)}
            />
            <div className="settings__time-value">{time}</div>
          </div>
        )}
      </div>

      <div className="settings__props-title">Звуки:</div>
      <div className="settings__props-wrap">
        <label className="settings__check-label">
          <span>Звуковое сопровождение</span>
          <input
            type="checkbox"
            checked={localIssound}
            onChange={onSoundChange}
            className="settings__check"
          />
        </label>
      </div>

      <div className="settings__buttons">
        <button className="settings__button btn" onClick={onCancelClick}>
          ОТМЕНА
        </button>
        <button className="settings__button btn" onClick={onDefaultClick}>
          ПО УМОЛЧАНИЮ
        </button>
        <button
          className="settings__button btn btn-primary"
          onClick={onSaveSettings}
        >
          ОК
        </button>
      </div>
    </div>
  );
};

export default Settings;
