import NoSleep from "nosleep.js";
import { makeLogger } from "./log";

let instance: NoSleep | null = null;

const logger = makeLogger("KeepAwake");

export const KeepAwake = {
  enable() {
    logger.log("enable");
    instance = new NoSleep();
    instance.enable();
  },

  destroy() {
    logger.log("destroy");
    if (!instance) return;
    instance.disable();
  },
};
