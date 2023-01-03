import { Component, createSignal } from "solid-js";
import { AudioService } from "../../audio";
import { Button } from "../../components/button";
import { DurationPicker } from "../../components/duration-picker";
import { Text } from "../../components/text";
import { store } from "../../data/store";
import { KeepAwake } from "../../utils/keep-awake";
import styles from "./index.module.css";
import { Logo } from "./logo";

import { Modal } from "../../components/modal";
import { ViewContainer } from "../../components/view-container";
import { Tracking } from "../../tracking";
import { isMobile } from "../../utils/is-mobile";

const Spacer = () => <div class={styles.spacer} />;

const optionallyRequestFullscreen = () => {
  if (isMobile) return;

  const handler = () => {
    if (document.documentElement.requestFullscreen) {
      return document.documentElement.requestFullscreen();
    }

    if ((document.documentElement as unknown as any).webkitRequestFullscreen) {
      return new Promise((resolve, reject) => {
        try {
          resolve(
            (
              document.documentElement as unknown as any
            ).webkitRequestFullscreen()
          );
        } catch (err) {
          reject(err);
        }
      });
    }

    return Promise.resolve();
  };

  return handler().catch(() => Tracking.track("Error: fullsceen request"));
};

export const SetupView: Component<{ onNext: () => void }> = ({ onNext }) => {
  const [isActive, setIsActive] = createSignal(true);
  const [isModalVisible, setIsModalVisible] = createSignal(false);

  const handleNextClick = () => {
    Tracking.track("Click: First CTA");
    setIsModalVisible(true);
    KeepAwake.enable();
  };

  const handleModalClose = () => {
    setIsActive(false);
    Tracking.track("Click: Confirm Modal");
    // AudioService.arm().then(() => {
    //   AudioService.play();
    // });

    optionallyRequestFullscreen();

    setTimeout(() => {
      AudioService.play();
    }, 200);
    setTimeout(() => {
      onNext();
    }, 1200);
  };

  const handleSelect = (durationMinutes: number) => {
    Tracking.track(`Select Duration: ${durationMinutes} minutes`);
    const durationSeconds = durationMinutes * 60;
    store.setDurationSeconds(() => durationSeconds);
  };

  return (
    <ViewContainer isActive={isActive}>
      <Spacer />
      <Logo />
      <Text align="center">
        I want to sit here for&nbsp;
        <DurationPicker
          value={store.durationMinutes()}
          onChange={handleSelect}
        />
        &nbsp;
        {store.durationMinutes() > 1 ? "minutes" : "minute"}.
        <br />
        <Text dimmed size="s" inline>
          (<em>sit</em>, and do <em>nothing</em>)
        </Text>
      </Text>

      <Spacer />
      <Button label="Start" onClick={handleNextClick} />
      {isModalVisible() ? <Modal onClose={handleModalClose} /> : null}

      <footer class={styles.footer}>
        <Text align="center" size="xs">
          <a href="https://sonnet.io" target="_blank">
            Made by 🐐 and <span>Rafał Pastuszak</span>
          </a>
        </Text>
      </footer>
    </ViewContainer>
  );
};
