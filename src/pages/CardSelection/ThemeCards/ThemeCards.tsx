import React from "react";
import { CardDeckType, LevelsTypeString, LevelsType } from "../TypesCards";
import LevelCards from "../LevelCards/LevelCards";
import "./ThemeCards.css";
import { IThemeCards } from "../../../models/ICards";

const ThemeCards = ({ themeId, title, levels }: IThemeCards) => {
  // type levelsType = Array<Array<IWord>>

  // //от 1 до 5 очков за слово, но индексы с 0 - так что 6 элементов ()
  // const initialLevels:levelsType = [ [], [], [], [], [], [] ]
  // //Разделение слов на массивы по очкам
  // words.forEach((word) => {initialLevels[word.score].push(word)})
  // //Исключение незаполненных уровней
  // const levels = initialLevels.filter((level) => level.length > 0)

  return (
    <div className="cards-page__section">
      <h3 className="cards-page__section-title">{title}</h3>
      <div className="cards-page__card-list">
        {levels.map((level) => (
          <LevelCards level={level} themeId={themeId} key={level.levelId} />
        ))}
      </div>
    </div>
  );
};

export default ThemeCards;
