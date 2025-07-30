import { GameInterface } from "./game.interface";

export class Game implements GameInterface {
  roll(pins: number) {
    if (!pins) throw new Error("No number of pins given");
  }

  score(): number {
    return null;
  }
}
