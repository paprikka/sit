import { Component, createSignal } from "solid-js";
import { AudioService } from "../../audio";
import { Button } from "../../components/button";
import { DurationPicker } from "../../components/duration-picker";
import { Text } from "../../components/text";
import { store } from "../../data/store";
import { KeepAwake } from "../../utils/keep-awake";
import styles from "./index.module.css";
import { Logo } from "./logo";

import { ViewContainer } from "../../components/view-container";

const Spacer = () => <div class={styles.spacer} />;

export const SetupView: Component<{ onNext: () => void }> = ({ onNext }) => {
  const [isActive, setIsActive] = createSignal(true);
  const handleNextClick = () => {
    alert(
      `
Important: please don't lock your phone (we need this for the app to work).

We'll play a sound to let you know that the timer has expired and every minute after that, so you don't loose track of time. 

Don't feel like you have to rush to get up. Enjoy.
`.trim()
    );

    setIsActive(false);
    KeepAwake.enable();
    // AudioService.arm().then(() => {
    //   AudioService.play();
    // });
    setTimeout(() => {
      AudioService.play();
    }, 200);
    setTimeout(() => {
      onNext();
    }, 1200);
  };

  const handleSelect = (durationMinutes: number) => {
    const durationSeconds = durationMinutes * 60;
    store.setDurationSeconds(() => durationSeconds);
  };

  return (
    <ViewContainer isActive={isActive}>
      <Spacer />
      <Logo />
      <Text align="center">
        I want to sit here for{" "}
        <DurationPicker
          value={store.durationMinutes()}
          onChange={handleSelect}
        />
        {store.durationMinutes() > 1 ? " minutes" : " minute"}.
        <br />
        <Text dimmed size="s" inline>
          (<em>sit</em>, and do nothing)
        </Text>
      </Text>

      <Spacer />
      <Button label="Start" onClick={handleNextClick} />
    </ViewContainer>
  );
};
