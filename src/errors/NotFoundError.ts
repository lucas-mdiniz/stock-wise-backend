import { BaseError } from './BaseError';
import status from 'http-status';

export class NotFoundError extends BaseError {
  constructor(message: string | undefined) {
    super(message ? message : status[status.NOT_FOUND], status.NOT_FOUND);
  }
}
