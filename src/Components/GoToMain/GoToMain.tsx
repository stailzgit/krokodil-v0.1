import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../hooks/routes";
import "./GoToMain.css";
type Props = {};

const GoToMain = (props: Props) => {
  const navigate = useNavigate();
  const onBackClick = () => {
    navigate(ROUTES.MAIN);
  };
  return (
    <div className="go_to_main" onClick={onBackClick}>
      <BsFillArrowLeftCircleFill className="go_to_main-icon" />
      Меню
    </div>
  );
};

export default GoToMain;
