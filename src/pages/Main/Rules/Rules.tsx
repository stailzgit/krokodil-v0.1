import React from "react";
import "./Rules.css";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import GoToMain from "../../../Components/GoToMain/GoToMain";
type Props = {};

const Rules = (props: Props) => {
  return (
    <div className="rules page-wrap">
      <h2 className="rules__title page__title">Правила игры крокодил:</h2>
      <div className="rules__body">
        <p>
          Игроки по очереди выбирают слово и пытаются изобразить его. Другие
          участники игры должны отгадать слово
        </p>
        <br />
        <p>При этом разрешается:</p>
        <ul className="rules__list">
          <li>1) использовать жесты и мимику, пляски, прыжки и ужимки;</li>
          <li>2) принимать любые позы;</li>
          <li>3) показывать слово целиком или по частям;</li>
          <li>4) кивать или мотать головой: «да» и «нет».</li>
        </ul>
        <br />
        <p>Запрещается:</p>
        <ul className="rules__list">
          <li>1) писать и рисовать;</li>
          <li>2) произносить слоги и буквы (даже без звука, одинми губами);</li>
          <li>3) показывать буквы или передавать буквы языком глухонемых.</li>
        </ul>
        <br />
        <p>
          Тем временем остальные игроки (или его команда) старается понять
          задуманное и высказывает предположения. Игра идёт до тех пор, пока не
          угадают загаданное или не «выбросит белый флаг».
        </p>
      </div>
      <GoToMain />
    </div>
  );
};

export default Rules;
