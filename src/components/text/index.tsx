import { children, Component, JSX } from "solid-js";
import styles from "./index.module.css";

export const Text: Component<{
  size?: "m" | "s" | "xs";
  dimmed?: boolean;
  inline?: boolean;
  children: JSX.Element;
  align?: "start" | "center";
}> = ({ dimmed, inline, children, size = "m", align = "start" }) => {
  return (
    <p
      classList={{
        [styles.container]: true,
        [styles.dimmed]: dimmed,
        [styles.inline]: inline,
        [styles["align-" + align]]: true,
        [styles["size-" + size]]: true,
      }}
    >
      {children}
    </p>
  );
};
