import { GameState } from "./enum";
import { GameInterface } from "./game.interface";

export class Game implements GameInterface {

  private gameScore: number = 0;
  private currentPins: number = 10;
  private gameState: GameState
  private frameNumber: number = 1;
  private ballsThrownInFrame: number = 0;
    
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

    this.ballsThrownInFrame++;
    if (this.ballsThrownInFrame >= 2) {
      this.resetBallsThrown()
      this.incrementFrame()
    }
  };
  
  score(): number {
    return this.gameScore;
  };

  private resetBallsThrown() {
    this.ballsThrownInFrame = 0;
    this.currentPins = 10;
  }

  private incrementFrame() {
    this.frameNumber++;
  }
}