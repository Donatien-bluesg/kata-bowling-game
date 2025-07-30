import { GameInterface } from "./game.interface";
import { EmptyPinsError } from "./errors/empty-pins.error";
import { InvalidPinsError } from "./errors/invalid-pins.error";
import { InvalidPinsInFrameError } from "./errors/invalid-pins-in-frame.error";

class Frame {
  private maxPins: number = 10;
  rolls: number[] = [];

  isComplete(): boolean {
    return this.rolls.length === 2;
  }

  validate(pins: number): void {
    if (this.rolls.reduce((pins, sum) => sum + pins, 0) + pins > this.maxPins)
      throw new InvalidPinsInFrameError(this.maxPins);
  }
}

export class Game implements GameInterface {
  private rolls: number[] = [];
  private frames: Frame[] = [new Frame()];

  roll(pins: number) {
    if (pins === null || pins === undefined) throw new EmptyPinsError();
    if (pins < 0) throw new InvalidPinsError();

    if (this.currentFrame().isComplete()) this.frames.push(new Frame());

    this.currentFrame().validate(pins);

    this.currentFrame().rolls.push(pins);

    this.rolls.push(pins);
  }

  score(): number {
    return this.rolls.reduce((pins, sum) => sum + pins, 0);
  }

  private currentFrame(): Frame {
    return this.frames[this.frames.length - 1];
  }
}
