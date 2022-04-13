import React from "react";
import { CardDeckType, LevelsTypeString, LevelsType } from "../TypesCards";
import LevelCards from "../LevelCards/LevelCards";
import "./ThemeCards.css";
import { IThemeCards } from "../../../models/ICards";

const ThemeCards = ({ themeId, title, levels }: IThemeCards) => {
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
