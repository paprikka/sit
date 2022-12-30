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

import { Spacer } from "../../components/spacer";
import { Text } from "../../components/text";
import { store } from "../../data/store";
import { AudioService } from "../../audio";
import { makeLogger } from "../../utils/log";
const logger = makeLogger("ActiveSessionView");

export const ActiveView: Component<{
  onNext: () => void;
}> = ({ onNext }) => {
  const [isActive, setIsActive] = createSignal(true);

  const handleFinishClick = () => {
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
      <Text dimmed size="xs" inline>
        {Math.floor((store.durationSeconds() - store.timeLeftSeconds()) / 60)}{" "}
        minutes spent here
      </Text>
      <Spacer />
      <div class={styles.dot}></div>
      <Text dimmed size="s">
        (You can set your phone aside for now)
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
