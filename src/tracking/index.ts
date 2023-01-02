import { makeLogger } from "../utils/log";

const isLocal = () => window.location.host === "localhost";

declare global {
  const umami: (event: string) => void;
}

const mockTrack = (event: string) => {
  console.log(
    `[MockTracking] %c${event}`,
    "background: #006064; color: #00BCD4; padding: 0 .25em; border-radius: 11px"
  );
};

const track = (event: string) => {
  umami(event);
};

export const Tracking = {
  track(event: string) {
    if (isLocal()) return mockTrack(event);
    track(event);
  },
};
