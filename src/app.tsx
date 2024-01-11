import { Component, createSignal, onCleanup } from "solid-js";

import styles from "./app.module.css";
import { SetupView } from "./views/setup";
import { ActiveView } from "./views/active";
import { CompleteView } from "./views/complete";
import { AudioService } from "./audio";
import { KeepAwake } from "./utils/keep-awake";
import { Tracking } from "./tracking";

type Step = "setup" | "active" | "complete";

const App: Component = () => {
  const [step, setStep] = createSignal<Step>("setup");
  const handleStepChange = (step: Step) => setStep(step);

  onCleanup(() => {
    AudioService.destroy();
    KeepAwake.destroy();
    if ("standalone" in window.navigator && window.navigator.standalone) {
      Tracking.track("ios:standalone");
    }
  });

  return (
    <div class={styles.container}>
      {step() === "setup" ? (
        <SetupView onNext={() => handleStepChange("active")} />
      ) : null}
      {step() === "active" ? (
        <ActiveView onNext={() => handleStepChange("complete")} />
      ) : null}
      {step() === "complete" ? (
        <CompleteView onNext={() => handleStepChange("setup")} />
      ) : null}
    </div>
  );
};

export default App;
