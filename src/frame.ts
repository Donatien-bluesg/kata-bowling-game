import { InvalidPinsInFrameError } from "./errors/invalid-pins-in-frame.error";

export class Frame {
  protected readonly maxPins: number = 10;
  protected readonly rolls: number[] = [];
  private nextFrame: Frame = null;

  isComplete(): boolean {
    return this.allPinsAreDown() || this.nbOfRolls() === 2;
  }

  prepareNextFrame(frame: Frame = new Frame()): Frame {
    this.nextFrame = frame;
    return this.nextFrame;
  }

  add(pins: number): void {
    this.validate(pins);

    this.rolls.push(pins);
  }

  score(): number {
    let score = this.sum();

    if (this.nextFrame) {
      // Bonus on the next roll
      if (this.allPinsAreDown()) score += this.nextFrame.rolls[0];

      // Bonus on the following roll
      if (this.isStrike()) {
        const nextRoll =
          this.nextFrame.rolls.length > 1 ? this.nextFrame.rolls[1] : 0;
        if (!nextRoll && this.nextFrame.isStrike() && this.nextFrame.nextFrame)
          score += this.nextFrame.nextFrame.rolls[0];
        else score += nextRoll;
      }
    }

    return score;
  }

  private sum(): number {
    return this.rolls.reduce((pins, sum) => sum + pins, 0);
  }

  protected validate(pins: number): void {
    if (this.score() + pins > this.maxPins)
      throw new InvalidPinsInFrameError(this.maxPins);
  }

  protected nbOfRolls(): number {
    return this.rolls.length;
  }

  protected allPinsAreDown(): boolean {
    return this.sum() === this.maxPins;
  }

  private isStrike(): boolean {
    return this.allPinsAreDown() && this.rolls.length === 1;
  }
}
