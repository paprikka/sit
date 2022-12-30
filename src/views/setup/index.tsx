import { Component, createSignal } from "solid-js";
import { AudioService } from "../../audio";
import { Button } from "../../components/button";
import { DurationPicker } from "../../components/duration-picker";
import { Text } from "../../components/text";
import { store } from "../../data/store";
import { KeepAwake } from "../../utils/keep-awake";
import styles from "./index.module.css";
import { Logo } from "./logo";

import NoSleep from "nosleep.js";
import { ViewContainer } from "../../components/view-container";

const Spacer = () => <div class={styles.spacer} />;

export const SetupView: Component<{ onNext: () => void }> = ({ onNext }) => {
  const [isActive, setIsActive] = createSignal(true);
  const handleNextClick = () => {
    setIsActive(false);
    setTimeout(() => {
      AudioService.arm().then(() => {
        AudioService.play();
        KeepAwake.enable();
      });
      onNext();
    }, 2000);
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
          (and do nothing)
        </Text>
      </Text>

      <Spacer />
      <Button label="Start" onClick={handleNextClick} />
    </ViewContainer>
  );
};
