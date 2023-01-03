import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { Button } from "../../components/button";
import { ViewContainer } from "../../components/view-container";
import styles from "./index.module.css";

import { AudioService } from "../../audio";
import { Spacer } from "../../components/spacer";
import { Text } from "../../components/text";
import { store } from "../../data/store";
import { Tracking } from "../../tracking";
import { makeLogger } from "../../utils/log";
import { isMobile } from "../../utils/is-mobile";

const logger = makeLogger("ActiveSessionView");

const TimeSpent = () => {
  const label = createMemo(() => {
    const timeLeftMinutes = Math.floor(
      (store.durationSeconds() - store.timeLeftSeconds()) / 60
    );

    if (timeLeftMinutes < 1) return `You've been here for < 1 minute.`;
    if (timeLeftMinutes === 1) return `You've been here for a minute.`;
    return `You've been here for ${timeLeftMinutes} minutes.`;
  });

  return (
    <Text dimmed size="xs" inline>
      {label()}
    </Text>
  );
};

export const ActiveView: Component<{
  onNext: () => void;
}> = ({ onNext }) => {
  const [isActive, setIsActive] = createSignal(true);

  const handleFinishClick = () => {
    if (sessionStage() === "after") {
      Tracking.track("Session Completed");
    } else {
      Tracking.track("Session Interrupted");
    }
    setIsActive(false);
    setTimeout(onNext, 1200);
  };
  const { durationSeconds } = store;
  // TODO: compute from timestamps
  const [sessionStage, setSessionStage] = createSignal<"before" | "after">(
    "before"
  );

  const timer = setInterval(() => {
    store.tick();
  }, 1000);

  const timeLeftMinutes = createMemo(() =>
    Math.floor(store.timeElapsedSeconds() / 60)
  );

  createEffect(() => {
    if (timeLeftMinutes() < 1) return;
    Tracking.track(`Time Elapsed: ${timeLeftMinutes()}`);
  });

  const hasReachedFirst30s = createMemo(() => store.timeElapsedSeconds() >= 30);
  createEffect(() => {
    if (!hasReachedFirst30s()) return;
    Tracking.track(`First 30s`);
  });

  createEffect(() => {
    if (store.timeElapsedSeconds() === 0) return;

    if (store.timeLeftSeconds() === 0 && store.timeElapsedSeconds() > 0) {
      setSessionStage(() => "after");
      store.stop(); // TODO: really?
      AudioService.play();
      return;
    }

    if (sessionStage() === "after" && store.timeLeftSeconds() % 60 === 0) {
      AudioService.play();
    }
  });

  onCleanup(() => {
    logger.log("cleanup");
    clearInterval(timer);
  });

  onMount(() => {
    store.start();
    logger.log(`total time ${durationSeconds()} sec.`);
  });

  return (
    <ViewContainer isActive={isActive}>
      <TimeSpent />
      <Spacer />
      {/* <div class={styles.dot}></div> */}
      <Text size="s" dimmed>
        {isMobile
          ? `(You can set your phone aside for now.)`
          : `(You can stop looking at the screen for now.)`}
      </Text>

      <Spacer />
      <div
        classList={{
          [styles.bottomNav]: true,
        }}
      >
        {sessionStage() === "before" ? (
          <Button
            label="Finish early"
            level="secondary"
            onClick={handleFinishClick}
          />
        ) : null}
        {sessionStage() === "after" ? (
          <Button
            label="Finish"
            level="secondary"
            onClick={handleFinishClick}
          />
        ) : null}
      </div>
    </ViewContainer>
  );
};
