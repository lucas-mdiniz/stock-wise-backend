import httpStatus from "http-status";
import { BaseError } from "./BaseError";

export class ValidationError extends BaseError{
  constructor(error: string | string[]){
    super(Array.isArray(error) ? error.join(',') : error, httpStatus.BAD_REQUEST);
  }
}