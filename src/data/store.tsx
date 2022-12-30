import { createMemo, createRoot, createSignal, onCleanup } from "solid-js";
import { makeLogger } from "../utils/log";

const logger = makeLogger("Store");

const getNowSeconds = () => Math.floor(Date.now() / 1000);

const createStore = () => {
  const [durationSeconds, setDurationSeconds] = createSignal<number>(1 * 60);
  const durationMinutes = createMemo(() => Math.floor(durationSeconds() / 60));

  const [startedAtSeconds, setStartedAtSeconds] = createSignal(0);
  const [timeLeftSeconds, setTimeLeftSeconds] = createSignal(0);

  const [timeLeftOffsetSeconds, setTimeLeftOffsetSeconds] =
    createSignal<number>(0);

  const tick = () => {
    const newTimeLeftSeconds =
      Math.floor(durationSeconds() + startedAtSeconds() - getNowSeconds()) -
      timeLeftOffsetSeconds();
    logger.log({ newTimeLeftSeconds });
    setTimeLeftSeconds(() => newTimeLeftSeconds);
  };

  const start = () => {
    setStartedAtSeconds(() => getNowSeconds());
    setTimeLeftSeconds(() => durationSeconds());
  };

  const stop = () => {
    logger.log("stop");
  };

  const durations = Array(100)
    .fill(null)
    .map((_, ind) => ind + 1);

  const api = {
    durations,
    durationSeconds,
    durationMinutes,
    setDurationSeconds,
    startedAtSeconds,
    timeLeftSeconds,
    setTimeLeftSeconds,
    setTimeLeftOffsetSeconds,
    start,
    stop,
    tick,
  };

  (window as unknown as any).api = api;
  return api;
};

export const store = createRoot(createStore);
