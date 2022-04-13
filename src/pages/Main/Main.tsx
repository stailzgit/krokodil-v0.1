import React from "react";
import Logo from "../../assets/crocodil-menu-img.png";
import "./Main.css";
import { FiSettings } from "react-icons/fi";
import { CgCardHearts } from "react-icons/cg";
import { RiErrorWarningLine } from "react-icons/ri";
import { BsBook } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { resetPlayerSlice } from "../../store/reducers/PlayerSlice";
import { resetCardSlice } from "../../store/reducers/CardSlice";
import { resetSettingsSlice } from "../../store/reducers/SettingsSlice";
import { clearStorage } from "../../utils/local-storage";
import { ROUTES } from "../../hooks/routes";

type Props = {};

const Main = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isGameProcess } = useAppSelector((state) => state.settingsSlice);
  const options = [
    { icon: <CgCardHearts className="option__icon" />, route: ROUTES.SETTINGS },
    { icon: <FiSettings className="option__icon" />, route: ROUTES.SETTINGS },
    { icon: <BsBook className="option__icon" />, route: ROUTES.SETTINGS },
    {
      icon: <RiErrorWarningLine className="option__icon" />,
      route: ROUTES.SETTINGS,
    },
  ];

  // const isShowContinueGame = !!localStorage.getItem("crocodiller-state");

  const onNewGameClick = () => {
    dispatch(resetPlayerSlice());
    dispatch(resetCardSlice());
    dispatch(resetSettingsSlice());
    navigate(ROUTES.CREATE_PLAYERS);
  };

  const onContinueGameClick = () => {
    navigate(ROUTES.STATS);
  };

  return (
    <div className="main">
      <div className="main__image">
        <img src={Logo} alt="" />
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
    </div>
  );
};

export default Main;
