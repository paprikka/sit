import { Component, For } from "solid-js";
import styles from "./index.module.css";

import { store } from "../../data/store";

export const DurationPicker: Component<{
  onChange: (val: number) => void;
  value: number;
}> = ({ onChange, value }) => (
  <span class={styles.selectContainer}>
    <select
      class={styles.select}
      onChange={(e) => onChange(parseInt(e.currentTarget.value, 10))}
      value={value}
    >
      <For each={store.durations}>
        {(duration) => <option value={duration}>{duration}</option>}
      </For>
    </select>
    <span class={styles.selectOverlay}>
      <span class={styles.selectValue}>{store.durationMinutes()}</span>
    </span>
  </span>
);
