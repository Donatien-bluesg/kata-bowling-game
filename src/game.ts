import { GameInterface } from "./game.interface";
import { EmptyPinsError } from "./errors/empty-pins.error";
import { InvalidPinsError } from "./errors/invalid-pins.error";

export class Game implements GameInterface {
  roll(pins: number) {
    if (pins === null || pins === undefined) throw new EmptyPinsError();
    if (pins < 0) throw new InvalidPinsError();
  }

  score(): number {
    return null;
  }
}
