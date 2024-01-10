import NoSleep from "nosleep.js";
import { makeLogger } from "./log";

let instance: NoSleep | null = null;
let wakeLock: WakeLockSentinel | null = null;

const logger = makeLogger("KeepAwake");

export const KeepAwake = {
  async enable() {
    logger.log("enable");

    if ("wakeLock" in navigator) {
      navigator.wakeLock
        .request("screen")
        .then((_) => (wakeLock = _))
        .catch(logger.error);
    } else {
      instance = new NoSleep();
      instance.enable();
    }
  },

  destroy() {
    logger.log("destroy");
    if (wakeLock) {
      wakeLock.release();
      wakeLock = null;
      return;
    }
    if (!instance) return;
    instance.disable();
  },
};
