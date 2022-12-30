import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  onMount,
} from "solid-js";
import { Button } from "../../components/button";
import { ViewContainer } from "../../components/view-container";
import styles from "./index.module.css";

import { Spacer } from "../../components/spacer";
import { Text } from "../../components/text";
import { store } from "../../data/store";
import { AudioService } from "../../audio";

export const ActiveView: Component<{
  onNext: () => void;
}> = ({ onNext }) => {
  const handleFinishClick = () => onNext();
  const { durationSeconds } = store;
  // TODO: compute from timestamps
  const [sessionStage, setSessionStage] = createSignal<"before" | "after">(
    "before"
  );

  onMount(() => {
    store.start();

    setTimeout(() => {
      setSessionStage(() => "after");
      store.stop();
      AudioService.play();
    }, durationSeconds() * 1000);
    // }, 5_000);
  });

  return (
    <ViewContainer>
      <Text dimmed size="xs" inline>
        {Math.floor((store.durationSeconds() - store.timeLeftSeconds()) / 60)}{" "}
        minutes spent here
      </Text>
      <Spacer />
      <div class={styles.dot}></div>
      <Text dimmed size="s">
        (You can set your phone aside now)
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
