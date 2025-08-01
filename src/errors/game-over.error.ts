export class GameOverError extends Error {
  constructor() {
    super("The game is already over");
  }
}
