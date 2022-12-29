import { Component } from "solid-js";

import styles from "./index.module.css";

export const Button: Component<{
  onClick: () => void;
  label: string;
  disabled?: boolean;
  level?: "primary" | "secondary";
}> = ({ onClick, label, disabled = false, level = "primary" }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      classList={{
        [styles.container]: true,
        [styles["level-" + level]]: true,
      }}
    >
      {label}
    </button>
  );
};
