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

  it("should give an double bonus when a strike is done, and the frame should end after the first roll", () => {
    g.roll(4);
    g.roll(0);
    g.roll(10); // Strike
    g.roll(10); // Strike
    g.roll(4);
    g.roll(6); // Spare
    g.roll(7);

    expect(g.score()).toBe(4 + 24 + 20 + 17 + 7);
  });

  describe("end of game", () => {
    beforeEach(() => {
      Array(9)
        .fill(1)
        .forEach(() => {
          // 9 normal frames: starting the final frame with the score 72
          g.roll(4);
          g.roll(4);
        });
    });

    it("should throw an error when rolling after the game is over", () => {
      g.roll(4);
      g.roll(4); // Complete the final frame.

      expect(() => g.roll(4)).toThrow("The game is already over");
    });

    it("should include an extra roll if a spare is made in the end frame", () => {
      g.roll(4);
      g.roll(6); // Spare in the final frame

      g.roll(3);
      expect(() => g.roll(4)).toThrow("The game is already over");
      expect(g.score()).toBe(72 + 13 + 3);
    });

    it("should include 2 extra rolls if 2 strikes are made in the end frame", () => {
      g.roll(10); // first Strike
      g.roll(10); // second Strike
      g.roll(3);

      expect(() => g.roll(4)).toThrow("The game is already over");
      expect(g.score()).toBe(72 + 23 + 13 + 3);
    });
  });
});
