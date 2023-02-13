import { Component, createSignal } from "solid-js";
import { Button } from "../../components/button";
import { Spacer } from "../../components/spacer";
import { Text } from "../../components/text";
import { ViewContainer } from "../../components/view-container";
import { Tracking } from "../../tracking";
import styles from "./index.module.css";

export const CompleteView: Component<{ onNext: () => void }> = ({ onNext }) => {
  const [isActive, setIsActive] = createSignal(true);
  const handleFinishEarlyClick = () => {
    Tracking.track("Click: Back to Start");
    setIsActive(false);
    setTimeout(onNext, 1200);
  };

  return (
    <ViewContainer isActive={isActive}>
      <Spacer />
      <Text inline>Thanks! Come again any time.</Text>
      <div class={styles.linkList}>
        <Text inline size="s">
          <a target="_blank" href="https://sonnet.io/posts/sit">
            About
          </a>
        </Text>
        <Text inline size="s">
          <a target="_blank" href="https://sonnet.io/posts/hi">
            Say Hi
          </a>
        </Text>
      </div>

      <Spacer />
      <Button label="Back to start" onClick={handleFinishEarlyClick} />
    </ViewContainer>
  );
};
