import React, {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { FaUsers } from "react-icons/fa";
import "./CreatePlayersPage.css";
import { FaUserPlus } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  createPlayer,
  deletePlayer,
  changeStylePlayers,
  TypeStylePlayers,
} from "../../store/reducers/PlayerSlice";
import { IPlayer } from "../../models/IPlayer";
import { ROUTES } from "../../hooks/routes";

const CreatePlayers = () => {
  const dispatch = useAppDispatch();
  const { players, stylePlayers } = useAppSelector(
    (state) => state.playersReducer
  );
  const { isGameProcess } = useAppSelector((state) => state.settingsSlice);
  const navigate = useNavigate();

  // const [stylePlayers, setStylePlayers] = useState<TypeStylePlayers>('Players')
  const [errorNamePlayer, setErrorNamePlayer] = useState("");
  const [errorCountPlayer, setErrorCountPlayer] = useState("");
  const [inputPlayer, setInputPlayer] = useState("");

  const getStyleGame = (type: string) => {
    return stylePlayers === type
      ? "create-players__icon-active"
      : "create-players__icon";
  };

  const onChangeStylePlayers = (newStylePlayers: TypeStylePlayers) => {
    dispatch(changeStylePlayers(newStylePlayers));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPlayer(e.currentTarget.value);
  };

  const onAddPlayerClick = () => {
    if (inputPlayer === "") {
      setErrorNamePlayer("Поле не может быть пустым");
    } else if (players.some((player: IPlayer) => player.name === inputPlayer)) {
      setErrorNamePlayer("Уже есть");
    } else {
      dispatch(createPlayer(inputPlayer));
      changeStylePlayers(stylePlayers);
      setInputPlayer("");
      setErrorNamePlayer("");
    }
  };

  const onDeletePlayerClick = (playerId: string) => {
    dispatch(deletePlayer(playerId));
  };

  const checkCountPlayer = () => {
    if (stylePlayers === "Teams" && players.length < 2) {
      setErrorCountPlayer("Минимум 2 команды");
    } else if (stylePlayers === "Players" && players.length < 3) {
      setErrorCountPlayer("Минимум 3 игрока");
    } else {
      setErrorCountPlayer("");
    }
  };

  const nextStep = () => {
    if (errorCountPlayer) return;
    navigate(ROUTES.CARD_SELECTION);
  };

  const prevStep = () => {
    navigate(ROUTES.MAIN);
  };

  useEffect(() => {
    checkCountPlayer();
  }, [stylePlayers, onDeletePlayerClick, onAddPlayerClick]);

  return (
    <div className="create-players">
      <h2 className="create-players__title">
        Создание {stylePlayers === "Players" ? "игроков" : "команд"}
      </h2>

      <div className="create-players__choice">
        <BsFillPersonFill
          className={getStyleGame("Players")}
          onClick={() => onChangeStylePlayers("Players")}
        />
        <FaUsers
          className={getStyleGame("Teams")}
          onClick={() => onChangeStylePlayers("Teams")}
        />
      </div>

      <div className="create-players__list">
        {!players.length && (
          <h2>Нет {stylePlayers === "Players" ? "игроков" : "команд"}</h2>
        )}
        {players.map((player: IPlayer) => (
          <div className="create-players__list-item" key={player.id}>
            <div className="create-players__player">{player.name}</div>
            <TiDelete
              className="create-players__delete"
              onClick={() => onDeletePlayerClick(player.id)}
            />
          </div>
        ))}
      </div>

      <div className="create-players__add-wrap">
        <input
          maxLength={35}
          value={inputPlayer}
          placeholder={
            stylePlayers === "Players" ? "Имя игрока" : "Название команды"
          }
          autoComplete="off"
          className="create-players__add-input"
          onChange={onInputChange}
          onKeyPress={(e) => e.charCode === 13 && onAddPlayerClick()}
        />
        {errorNamePlayer && (
          <h3 className="create-players__add-error">{errorNamePlayer}</h3>
        )}
        <FaUserPlus
          onClick={onAddPlayerClick}
          className="create-players__add-icon"
        />
      </div>

      <div className="create-players__navigate-wrap">
        <BsFillArrowLeftCircleFill
          className="create-players__navigate-arrow"
          onClick={prevStep}
        />

        <div className="create-players__count-error">{errorCountPlayer}</div>

        <BsArrowRightCircleFill
          className={
            errorCountPlayer
              ? "create-players__navigate-arrow-disabled"
              : "create-players__navigate-arrow"
          }
          onClick={() => nextStep()}
        />
      </div>
    </div>
  );
};

export default CreatePlayers;
