import React, { useState, useEffect } from "react";
// import { CardDeckType, LevelsTypeString } from '../TypesCards';
import "./LevelCards.css";
import { CgCardClubs } from "react-icons/cg";
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";
import ImageEasy from "../../../assets/levels/img-easy.jpg";
import ImageLevel from "../../../assets/levels/img-normal.jpg";
import ImageHard from "../../../assets/levels/img-hard.jpg";
import ImageImpossible from "../../../assets/levels/img-impossible.jpg";
import ImageSuicide from "../../../assets/levels/img-suicide.jpg";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { toggleSelectCard } from "../../../store/reducers/CardSlice";
import { ILevel } from "../../../models/ICards";

const levelsHeaders = [
  { img: ImageEasy, title: "Неизвестно" }, // индекс не используется (минимум 1 очко за слово)
  { img: ImageEasy, title: "Легко" }, //1
  { img: ImageLevel, title: "Нормально" }, //2
  { img: ImageHard, title: "Сложно" }, //3
  { img: ImageImpossible, title: "Невозможно" }, //4
  { img: ImageSuicide, title: "Не лезь оно тебя сожрет" }, //5
];

type PropsType = {
  level: ILevel;
  themeId: string;
};

const LevelCards = (props: PropsType) => {
  const {
    level: { levelId, levelNumber, checked, words },
    themeId,
  } = props;
  const dispatch = useAppDispatch();

  const styleCard =
    "cards-page__card" + (checked ? " cards-page__card-selected" : "");

  const onToggleSelectCard = () => dispatch(toggleSelectCard(levelId));

  return (
    <div className={styleCard} onClick={onToggleSelectCard}>
      <div className="cards-page__card__img-wrap">
        <img
          src={levelsHeaders[levelNumber]?.img}
          alt="lvl-img"
          style={{ minWidth: "80px", minHeight: "80px" }}
        />
      </div>

      <h5 className="cards-page__card-title">
        {levelsHeaders[levelNumber]?.title}
      </h5>
      {/* <span className='cards-page__card-preview'>{preview}</span> */}

      <div className="cards-page__card-info">
        {checked ? (
          <ImCheckboxChecked className="cards-page__card-check" />
        ) : (
          <ImCheckboxUnchecked className="cards-page__card-check" />
        )}
        <div className="cards-page__card-count">
          {words.length > 10000 ? "9999+" : words.length}
          <CgCardClubs className="cards-page__card-count-icon" />
        </div>
      </div>
    </div>
  );
};

export default LevelCards;
