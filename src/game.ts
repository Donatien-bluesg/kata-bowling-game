import { GameInterface } from "./game.interface";

export class Game implements GameInterface {

  private gameScore: number = 0;
  private currentPins: number = 10;
  
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

    if (pins > this.currentPins) {
      throw new Error('Pins cannot be larger than No of pins left')
    }

    this.gameScore = this.gameScore + pins;
    this.currentPins = this.currentPins - pins;

  };
  
  score(): number {
    return this.gameScore;
  };
}