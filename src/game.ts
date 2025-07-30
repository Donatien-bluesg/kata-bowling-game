import { GameInterface } from "./game.interface";
import { EmptyPinsError } from "./errors/empty-pins.error";
import { InvalidPinsError } from "./errors/invalid-pins.error";
import { Frame } from "./frame";

export class Game implements GameInterface {
  private rolls: number[] = [];
  private frames: Frame[] = [new Frame()];

  roll(pins: number) {
    if (pins === null || pins === undefined) throw new EmptyPinsError();
    if (pins < 0) throw new InvalidPinsError();

    if (this.currentFrame().isComplete()) this.frames.push(new Frame());

    this.currentFrame().add(pins);

    this.rolls.push(pins);
  }

  score(): number {
    return this.rolls.reduce((pins, sum) => sum + pins, 0);
  }

  private currentFrame(): Frame {
    return this.frames[this.frames.length - 1];
  }
}
