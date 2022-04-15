import React from "react";
import "./About.css";
import GoToMain from "../../../Components/GoToMain/GoToMain";
const About = () => {
  return (
    <div className="about page-wrap">
      <h2 className="about__title page__title">В проекте использовались:</h2>
      <div className="about__body">
        <p>1. react </p>
        <p>2. type script </p>
        <p>3. react-redux </p>
        <p>4. reduxjs/toolkit </p>
        <p>5. react-router-dom </p>
      </div>
      <GoToMain />
    </div>
  );
};

export default About;
