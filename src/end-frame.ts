import { Frame } from "./frame";
import { InvalidPinsInFrameError } from "./errors/invalid-pins-in-frame.error";
import { Game } from "./game";

export class EndFrame extends Frame {
  isComplete(): boolean {
    return (
      (this.rolls[0] !== 10 &&
        !this.allPinsAreDown() &&
        this.nbOfRolls() === 2) ||
      this.nbOfRolls() === 3
    );
  }

  protected validate(pins: number) {
    if (this.nbOfRolls() === 1 && this.rolls[0] !== 10) super.validate(pins);
    else if (pins > this.maxPins)
      throw new InvalidPinsInFrameError(this.maxPins);
  }

  score(): number {
    const endGame = new Game();

    for (const r of this.rolls) {
      endGame.roll(r);
    }

    return endGame.score();
  }
}
