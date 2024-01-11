import NoSleep from "@zakj/no-sleep";
import type { INoSleep } from "@zakj/no-sleep";
import { makeLogger } from "./log";

let instance: INoSleep | null = null;
let wakeLock: WakeLockSentinel | null = null;

const logger = makeLogger("KeepAwake");

export const KeepAwake = {
  async enable() {
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
