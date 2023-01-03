import { makeLogger } from "../utils/log";

const isLocal = () => window.location.hostname === "localhost";
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
  if (!umami) return;
  umami(event);
};

export const Tracking = {
  track(event: string) {
    if (isLocal()) return mockTrack(event);
    track(event);
  },
};
