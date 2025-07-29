import { GameInterface } from "../src/game.interface";
import { Game } from "../src/game";

describe("Game", () => {
  let game: GameInterface

    it("should throw an error if number of pins is empty", () => {
        game = new Game()

        expect(() => 
          (game.roll(null))).toThrow('Pin number should not be null'
        );
    });

    it("should throw an error if number of pins is negative", () => {
        game = new Game()

        expect(() => 
          (game.roll(-1))).toThrow('Pin number should be positive'
        );
    });

    it("should throw an error if number of pins is larger than 10", () => {
        game = new Game()

        expect(() => 
          (game.roll(11))).toThrow('Pin number should be <= 10'
        );
    });

    it("should intialise with score = 0 ", () => {
        game = new Game()

        expect((game.score())).toBe(0)
    });


    it("should update score with one roll amount ", () => {
        game = new Game()
        game.roll(5)

        expect((game.score())).toBe(5)
    });


    it("should throw an error if combined rolls > 10 in frame", () => {
        game = new Game()
        game.roll(5)
        
        expect(() => 
          (game.roll(6))).toThrow('Pins cannot be larger than No of pins left'
        );
    });

    it("should have game state of spare", () => {
        game = new Game()
        game.roll(5)
        game.roll(5)
        
        expect(
          game.getState().toBe(GameState.SPARE)
        );
    });
});
