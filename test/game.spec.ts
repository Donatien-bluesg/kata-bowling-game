import { GameInterface } from "../src/game.interface";
import { Game } from "../src/game";

describe("Game", () => {
  let g: GameInterface;

  beforeEach(() => {
    g = new Game();
  });

  it("should throw an error when no number of pin is given", () => {
    expect(() => g.roll(null)).toThrow("No number of pins given");
  });
});
