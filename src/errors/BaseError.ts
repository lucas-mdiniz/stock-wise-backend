export class BaseError extends Error {
  private _status: number;
  constructor(message: string, status: number) {
    super(message);
    this._status = status;
  }

  get status(): number {
    return this._status;
  }
}
