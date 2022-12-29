import { Component, JSX } from "solid-js";
import styles from "./index.module.css";

export const ViewContainer: Component<{ children: JSX.Element }> = ({
  children,
}) => <div class={styles.container}>{children}</div>;
