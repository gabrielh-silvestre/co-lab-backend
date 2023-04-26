export abstract class CustomException extends Error {
  constructor(message: string, cause?: Error) {
    super(message);
    if (cause) this.stack = `${this.stack}\nCaused by: ${cause.stack}`;
  }

  abstract toHttp(): number;
}
