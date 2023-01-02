import { Component } from "solid-js";
import { Button } from "../../components/button";
import { Spacer } from "../../components/spacer";
import { Text } from "../../components/text";
import styles from "./index.module.css";
export const Modal: Component<{ onClose: () => void }> = ({ onClose }) => (
  <div class={styles.modal}>
    <div class={styles.modalContent}>
      <Text size="s">
        <strong>
          Important: please don't lock your phone (we need this for the page to
          work).
        </strong>
        <br />
        <br />
        Don't rush to get up.
        <br />
        <br />
        We'll play a sound to let you know that the timer has expired and every
        minute after that, so you don't loose track of time.
        <br />
        <br />
        Enjoy.
        <br />
      </Text>
      <Spacer />
      <Button label="OK" onClick={onClose} />
    </div>
  </div>
);
