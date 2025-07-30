import { GameInterface } from "./game.interface";
import { EmptyPinsError } from "./errors/empty-pins.error";

export class Game implements GameInterface {
  roll(pins: number) {
    if (!pins) throw new EmptyPinsError();
  }

  score(): number {
    return null;
  }
}
