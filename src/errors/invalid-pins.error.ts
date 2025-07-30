export class InvalidPinsError extends Error {
  constructor() {
    super("Invalid number of pins given");
  }
}
