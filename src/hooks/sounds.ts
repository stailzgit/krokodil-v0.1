import { Howl } from "howler";
import TiktakSound from "../assets/sound/start_guessing.mp3";
import EndGuessingSound from "../assets/sound/end_guessing.mp3";
import SuccessSound from "../assets/sound/success.mp3";
import FailureSound from "../assets/sound/failure.mp3";
import StartGameSound from "../assets/sound/start_game.mp3";

export const krocodilSound = {
  tiktak: () =>
    new Howl({
      src: [TiktakSound, "play_tiktak"],
    }).play(),
  timeIsOver: () =>
    new Howl({
      src: [EndGuessingSound, "play_guessing"],
      volume: 0.5,
    }).play(),
  success: () =>
    new Howl({
      src: [SuccessSound, "play_success"],
    }).play(),
  failure: () =>
    new Howl({
      src: [FailureSound, "play_failure"],
    }).play(),
  startGame: () =>
    new Howl({
      src: [StartGameSound, "play_start_game"],
    }).play(),
};
