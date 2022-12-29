import { Component, createEffect, createSignal, onMount } from "solid-js";
import { Button } from "../../components/button";
import { ViewContainer } from "../../components/view-container";
import styles from "./index.module.css";

import { Spacer } from "../../components/spacer";
import { Text } from "../../components/text";

export const ActiveView: Component<{
  onNext: () => void;
  durationSeconds: number;
}> = ({ onNext, durationSeconds }) => {
  const handleFinishClick = () => onNext();

  const [sessionStage, setSessionStage] = createSignal<"before" | "after">(
    "before"
  );

  onMount(() => {
    setTimeout(() => {
      setSessionStage(() => "after");
    }, durationSeconds);
  });

  return (
    <ViewContainer>
      <Text dimmed size="xs" inline>
        Elapsed time {durationSeconds}
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
