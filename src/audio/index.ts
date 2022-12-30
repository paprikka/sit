import { makeLogger } from "../utils/log";
import gong from "./gong.mp3";
import silence from "./silence.mp3";

const logger = makeLogger("AudioService");
let el: HTMLAudioElement | null = null;

export const AudioService = {
  init() {
    el = new Audio();
  },
  async arm() {
    logger.log("Arming...");
    AudioService.init();

    if (!el) return;
    el.src = silence;
    await el.play();
    return logger.log("Audio element armed.");
  },

  async play() {
    const trigger = () => {
      logger.log(`Play ${gong}`);
      if (!el) return;

      el.src = gong;
      el.volume = 0.2;
      return el.play();
    };
    if (!el) {
      logger.warn("Init the Audio element first. Trying to init now...");
      AudioService.init();
    }

    return trigger();
  },

  destroy() {
    logger.log("Destroy");
    if (el) el.pause();
    el = null;
  },
};
