export class InvalidPinsInFrameError extends Error {
  constructor(maxPins: number) {
    super(`A frame cannot go over ${maxPins} pins`);
  }
}
