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

  it("should throw an error when no number of pin is negative", () => {
    expect(() => g.roll(-1)).toThrow("Invalid number of pins given");
  });

  it("should not throw an error when zero pins is given", () => {
    expect(() => g.roll(0)).not.toThrow();
  });

  it("should start the game with a score of zero", () => {
    expect(g.score()).toBe(0);
  });
});
