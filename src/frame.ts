import { InvalidPinsInFrameError } from "./errors/invalid-pins-in-frame.error";

export class Frame {
  private maxPins: number = 10;
  private rolls: number[] = [];

  isComplete(): boolean {
    return this.rolls.length === 2;
  }

  validate(pins: number): void {
    if (this.rolls.reduce((pins, sum) => sum + pins, 0) + pins > this.maxPins)
      throw new InvalidPinsInFrameError(this.maxPins);
  }

  add(pins: number): void {
    this.rolls.push(pins);
  }
}
