import { Component, createSignal, JSX } from "solid-js";
import { For } from "solid-js";
import { Logo } from "./logo";
import styles from "./index.module.css";
import { Button } from "../../components/button";
import { Text } from "../../components/text";

const Spacer = () => <div class={styles.spacer} />;

export const SetupView: Component<{ onNext: () => void }> = ({ onNext }) => {
  const handleNextClick = () => {
    onNext();
  };

  const [selectedDuration, setSelectedDuration] = createSignal(22);
  const handleSelect: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e) => {
    const durationSeconds = parseInt(e.currentTarget.value, 10) * 60;
  };

  const [durations] = createSignal(
    Array(100)
      .fill(null)
      .map((_, ind) => ind + 1)
  );
  return (
    <div class={styles.container}>
      <Spacer />
      <Logo />
      <Text>I want to sit here for </Text>
      <select
        class={styles.select}
        onChange={handleSelect}
        value={selectedDuration()}
      >
        <For each={durations()}>
          {(duration) => <option value={duration}>{duration} minutes</option>}
        </For>
      </select>
      <Text>
        minutes
        <br />
        <Text dimmed inline size="s">
          (and do nothing)
        </Text>
      </Text>

      <Spacer />
      <Button label="Start" onClick={handleNextClick} />
    </div>
  );
};
