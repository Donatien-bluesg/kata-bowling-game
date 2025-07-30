import { InvalidPinsInFrameError } from "./errors/invalid-pins-in-frame.error";

export class Frame {
  private maxPins: number = 10;
  private rolls: number[] = [];
  private nextFrame: Frame = null;

  isComplete(): boolean {
    return this.rolls.length === 2;
  }

  prepareNextFrame(): Frame {
    this.nextFrame = new Frame();
    return this.nextFrame;
  }

  add(pins: number): void {
    this.validate(pins);

    this.rolls.push(pins);
  }

  score(): number {
    let score = this.sum();
    if (this.isSpare() && this.nextFrame) score += this.nextFrame.rolls[0];

    return score;
  }

  private sum(): number {
    return this.rolls.reduce((pins, sum) => sum + pins, 0);
  }

  private validate(pins: number): void {
    if (this.score() + pins > this.maxPins)
      throw new InvalidPinsInFrameError(this.maxPins);
  }

  private isSpare(): boolean {
    return this.sum() === this.maxPins;
  }
}
