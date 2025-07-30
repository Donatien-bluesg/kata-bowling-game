import { GameInterface } from "./game.interface";
import { EmptyPinsError } from "./errors/empty-pins.error";
import { InvalidPinsError } from "./errors/invalid-pins.error";

export class Game implements GameInterface {
  private rolls: number[] = [];

  roll(pins: number) {
    if (pins === null || pins === undefined) throw new EmptyPinsError();
    if (pins < 0) throw new InvalidPinsError();

    this.rolls.push(pins);
  }

  score(): number {
    return this.rolls.reduce((pins, sum) => (sum += pins), 0);
  }
}
