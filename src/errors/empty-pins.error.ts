export class EmptyPinsError extends Error {
  constructor() {
    super("No number of pins given");
  }
}
