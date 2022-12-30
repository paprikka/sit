import { createMemo, createRoot, createSignal } from "solid-js";

const createStore = () => {
  const [durationSeconds, setDurationSeconds] = createSignal<number>(23 * 60);
  const durationMinutes = createMemo(() => Math.floor(durationSeconds() / 60));

  const [startedAtSeconds, setStartedAtSeconds] = createSignal(0);

  const [timeLeftSeconds, setTimeLeftSeconds] = createSignal(0);

  const start = () => {
    setStartedAtSeconds(() => Date.now() / 1000);
    setInterval(() => {
      setTimeLeftSeconds(
        () => durationSeconds() + startedAtSeconds() - Date.now() / 1000
      );
    }, 1000);
  };

  const stop = () => {
    console.log("stop");
  };

  const durations = Array(100)
    .fill(null)
    .map((_, ind) => ind + 1);

  return {
    durations,
    durationSeconds,
    durationMinutes,
    setDurationSeconds,
    start,
    stop,
    startedAtSeconds,
    timeLeftSeconds,
  };
};

export const store = createRoot(createStore);
