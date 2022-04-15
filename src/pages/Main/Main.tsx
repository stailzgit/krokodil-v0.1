import React, { useState } from "react";
import Logo from "../../assets/crocodil3-menu-img.png";
import "./Main.css";
import { FiSettings } from "react-icons/fi";
import { CgCardHearts } from "react-icons/cg";
import { RiErrorWarningLine } from "react-icons/ri";
import { BsBook } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { resetPlayerSlice } from "../../store/reducers/PlayerSlice";
import { resetCardSlice } from "../../store/reducers/CardSlice";
import { newGame } from "../../store/reducers/SettingsSlice";
import { ROUTES } from "../../hooks/routes";
import Modal from "react-modal";

type Props = {};

const Main = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isGameProcess } = useAppSelector((state) => state.settingsSlice);
  const [isOpenModal, setisOpenModal] = useState(false);

  const options = [
    {
      icon: <CgCardHearts className="option__icon" />,
      route: ROUTES.GAME_SPECIFICS,
    },
    { icon: <FiSettings className="option__icon" />, route: ROUTES.SETTINGS },
    { icon: <BsBook className="option__icon" />, route: ROUTES.RULES },
    {
      icon: <RiErrorWarningLine className="option__icon" />,
      route: ROUTES.ABOUT,
    },
  ];

  // const isShowContinueGame = !!localStorage.getItem("crocodiller-state");

  const onNewGameClick = () => {
    //Если игра начата, то просим подтвердить
    if (isGameProcess) {
      setisOpenModal(true);
      //Если нет активной игры, то начинаем новую игру
    } else {
      createNewGame();
    }
  };

  const createNewGame = () => {
    dispatch(resetPlayerSlice());
    dispatch(resetCardSlice());
    dispatch(newGame());
    navigate(ROUTES.CREATE_PLAYERS);
  };

  const onModalCencel = () => {
    setisOpenModal(false);
  };

  const onContinueGameClick = () => {
    navigate(ROUTES.STATS);
  };

  return (
    <div className="main">
      <div className="main__image">
        <img
          src={Logo}
          alt="logo-img"
          style={{ minWidth: "200px", minHeight: "100px" }}
        />
      </div>
      <button className="btn-menu btn btn-primary" onClick={onNewGameClick}>
        Новая игра
      </button>
      {isGameProcess && (
        <button
          className="btn-menu btn btn-primary"
          onClick={onContinueGameClick}
        >
          Продолжить игру
        </button>
      )}

      <div className="main__option-list">
        {options.map((option, index) => (
          <button
            className="main__option btn btn-primary"
            onClick={() => navigate(option.route)}
            key={index}
          >
            {option.icon}
          </button>
        ))}
      </div>

      {isGameProcess && (
        <Modal
          isOpen={isOpenModal}
          onRequestClose={() => setisOpenModal(false)}
          className="main__modal"
          overlayClassName="main__modal-overlay"
          ariaHideApp={false}
        >
          <h3 className="main__modal-title">Начать новую игру?</h3>
          <div className="main__modal-text">
            Игровой процесс из предыдущей игры будет полностью потерян
          </div>
          <div className="main__modal-btn-list">
            <button
              className="btn btn-primary main__modal-btn"
              onClick={createNewGame}
            >
              Да
            </button>
            <button
              className="btn btn-primary main__modal-btn"
              onClick={onModalCencel}
            >
              Отмена
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Main;
