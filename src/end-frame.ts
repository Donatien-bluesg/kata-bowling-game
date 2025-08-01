import { Frame } from "./frame";
import { InvalidPinsInFrameError } from "./errors/invalid-pins-in-frame.error";

export class EndFrame extends Frame {
  isComplete(): boolean {
    return (
      (!this.allPinsAreDown() && this.nbOfRolls() === 2) ||
      this.nbOfRolls() === 3
    );
  }

  protected validate(pins: number) {
    if (this.nbOfRolls() === 1) super.validate(pins);
    else if (pins > this.maxPins)
      throw new InvalidPinsInFrameError(this.maxPins);
  }

  score(): number {
    let score = super.score();

    if (this.nbOfRolls() > 2) {
      // Bonus on the last roll
      score += this.rolls[2];
    }

    return score;
  }
}
