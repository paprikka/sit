import { Component, Accessor, JSX } from "solid-js";
import styles from "./index.module.css";

export const ViewContainer: Component<{
  children: JSX.Element;
  isActive: Accessor<boolean>;
}> = ({ children, isActive }) => (
  <div
    classList={{
      [styles.container]: true,
      [isActive() ? styles.isEntering : styles.isExiting]: true,
    }}
  >
    {children}
  </div>
);
