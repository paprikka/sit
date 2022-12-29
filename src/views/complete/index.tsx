import { Component } from "solid-js";
import { Button } from "../../components/button";
import { Spacer } from "../../components/spacer";
import { Text } from "../../components/text";
import { ViewContainer } from "../../components/view-container";

export const CompleteView: Component<{ onNext: () => void }> = ({ onNext }) => {
  const handleFinishEarlyClick = () => {
    onNext();
  };

  return (
    <ViewContainer>
      <Spacer />
      <Text>Thanks, see you again soon!</Text>
      <Spacer />
      <Button label="Back to start" onClick={handleFinishEarlyClick} />
    </ViewContainer>
  );
};
