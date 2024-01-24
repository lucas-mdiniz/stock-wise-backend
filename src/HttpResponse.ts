export class HttpResponse {
  private _data!: object | null;
  private _error: string;
  private _count: number;
  private _status!: number;

  constructor() {
    this._error = '';
    this._count = 0;
  }

  get data(): object | null {
    return this._data;
  }

  set data(data: object | null) {
    this._data = data;

    if (data) {
      this._count = Array.isArray(data) ? data.length : 1;
    }
  }

  get error(): string {
    return this._error;
  }

  set error(error: string) {
    this._error = error;
  }

  get count(): number {
    return this._count;
  }

  set status(status: number) {
    this._status = status;
  }

  get status(): number {
    return this._status;
  }

  toJson() {
    return {
      data: this._data ? this._data : {},
      error: this._error,
      count: this._count,
    };
  }
}
