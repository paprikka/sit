import { children, Component, JSX } from "solid-js";
import styles from "./index.module.css";

export const Text: Component<{
  size?: "m" | "s" | "xs";
  dimmed?: boolean;
  inline?: boolean;
  children: JSX.Element;
}> = ({ dimmed, inline, children, size = "m" }) => {
  return (
    <p
      classList={{
        [styles.container]: true,
        [styles.dimmed]: dimmed,
        [styles.inline]: inline,
        [styles["size-" + size]]: true,
      }}
    >
      {children}
    </p>
  );
};
