import React, { useEffect } from "react";
import "./ChoiceWord.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getFiveWords, setCurrentWord } from "../../store/reducers/CardSlice";
import { useSelector } from "react-redux";
import { IWord } from "../../models/ICards";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../hooks/routes";

type Props = {};

const ChoiceWord = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { fiveWords } = useAppSelector((state) => state.cardsReducer);

  const onWordClick = (word: IWord) => {
    dispatch(setCurrentWord(word));
    navigate(ROUTES.GUESSING);
  };

  useEffect(() => {
    dispatch(getFiveWords());
  }, []);

  return (
    <div className="words-wrap">
      <h2 className="words__title">Выберите слово</h2>

      <div className="words__list">
        {fiveWords.map((word, index) => (
          <div
            className="words__list-item"
            key={index}
            onClick={() => onWordClick(word)}
          >
            {word.word} +{word.score}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoiceWord;
