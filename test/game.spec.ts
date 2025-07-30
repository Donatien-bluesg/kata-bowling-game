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

  it("should add the number of pins hit to the score", () => {
    g.roll(4);
    g.roll(0);
    g.roll(6);

    expect(g.score()).toBe(10);
  });

  it("should throw an error if the number of pins rolled in a 2 balls frame is higher than 10", () => {
    g.roll(4);
    g.roll(0);
    g.roll(6);

    expect(() => g.roll(7)).toThrow("A frame cannot go over 10 pins");
  });

  it("should give an extra bonus when a spare is done", () => {
    g.roll(4);
    g.roll(0);
    g.roll(6);
    g.roll(4); // Spare
    g.roll(3);
    g.roll(7); // Spare, but no bonus yet

    expect(g.score()).toBe(27);
  });
});
