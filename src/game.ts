import { GameInterface } from "./game.interface";

export class Game implements GameInterface {

  private gameScore: number = 0;
  
  roll(pins: number): void {
    if (!pins) {
      throw new Error('Pin number should not be null')
    }

    if (pins < 0) {
      throw new Error('Pin number should be positive')
    }

    if (pins > 10) {
      throw new Error('Pin number should be <= 10')
    }

    this.gameScore = this.gameScore + pins;

  };
  
  score(): number {
    return this.gameScore;
  };
}