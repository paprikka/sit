import { Component } from "solid-js";
import { AudioService } from "../../audio";
import { Button } from "../../components/button";
import { DurationPicker } from "../../components/duration-picker";
import { Text } from "../../components/text";
import { store } from "../../data/store";
import { KeepAwake } from "../../utils/keep-awake";
import styles from "./index.module.css";
import { Logo } from "./logo";

import NoSleep from "nosleep.js";

const Spacer = () => <div class={styles.spacer} />;

export const SetupView: Component<{ onNext: () => void }> = ({ onNext }) => {
  const handleNextClick = () => {
    AudioService.arm().then(() => {
      AudioService.play();
      KeepAwake.enable();
    });
    onNext();
  };

  const handleSelect = (durationMinutes: number) => {
    const durationSeconds = durationMinutes * 60;
    store.setDurationSeconds(() => durationSeconds);
  };

  return (
    <div class={styles.container}>
      <Spacer />
      <Logo />
      <Text>
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
    </div>
  );
};
