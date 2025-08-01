import { GameInterface } from "./game.interface";
import { EmptyPinsError } from "./errors/empty-pins.error";
import { InvalidPinsError } from "./errors/invalid-pins.error";
import { Frame } from "./frame";
import { GameOverError } from "./errors/game-over.error";

export class Game implements GameInterface {
  private frames: Frame[] = [new Frame()];

  roll(pins: number) {
    if (pins === null || pins === undefined) throw new EmptyPinsError();
    if (pins < 0) throw new InvalidPinsError();

    if (this.currentFrame().isComplete()) {
      if (this.frames.length < 10)
        this.frames.push(this.currentFrame().prepareNextFrame());
      else throw new GameOverError();
    }

    this.currentFrame().add(pins);
  }

  score(): number {
    return this.frames.reduce((sum, frame) => sum + frame.score(), 0);
  }

  private currentFrame(): Frame {
    return this.frames[this.frames.length - 1];
  }
}
