export abstract class DomainException extends Error {
  constructor(message: string) {
    super(`[DomainException] ${message}`);
    this.name = this.constructor.name;
  }
}
