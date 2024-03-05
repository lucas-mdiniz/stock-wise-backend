export class HttpResponse<T> {
  private _data!: T;
  private _errors: string[];
  private _count: number;
  private _status!: number;

  constructor() {
    this._errors = [];
    this._count = 0;
  }

  get data(): T {
    return this._data;
  }

  set data(data: T) {
    this._data = data;

    if (data) {
      this._count = Array.isArray(data) ? data.length : 1;
    }
  }

  get errors(): string {
    return this._errors.join(',');
  }

  set errors(errors: string){
    errors.split(',').forEach(error => {
      this._errors.push(error)
    });
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
      errors: this._errors,
      count: this._count,
    };
  }
}
