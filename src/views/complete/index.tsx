import { Component, createSignal } from "solid-js";
import { Button } from "../../components/button";
import { Spacer } from "../../components/spacer";
import { Text } from "../../components/text";
import { ViewContainer } from "../../components/view-container";

export const CompleteView: Component<{ onNext: () => void }> = ({ onNext }) => {
  const [isActive, setIsActive] = createSignal(true);
  const handleFinishEarlyClick = () => {
    setIsActive(false);
    setTimeout(onNext, 2000);
  };

  return (
    <ViewContainer isActive={isActive}>
      <Spacer />
      <Text>Thanks, see you again soon!</Text>
      <Spacer />
      <Button label="Back to start" onClick={handleFinishEarlyClick} />
    </ViewContainer>
  );
};
