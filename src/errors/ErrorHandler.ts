import status from 'http-status';
import express, { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../http/HttpResponse';
import { BaseError } from './BaseError';
import { MongoServerError } from 'mongodb';

export class ErrorHandler {
  private app: express.Application;
  constructor(app: express.Application) {
    this.app = app;
  }

  public registerAll() {
    this.app.use(this.handleBaseError);
    this.app.use(this.handleMongoServerError);
    this.app.use(this.handleError);    
    this.app.use(this.handleUnknowError);
  }

  private handleBaseError(
    error: BaseError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    
    if (!(error instanceof BaseError)) {
      next(error);
      return;
    }

    const httpRes: HttpResponse<null> = new HttpResponse();
    httpRes.status = error.status;
    httpRes.errors = error.message;
    res.status(httpRes.status).json(httpRes.toJson());
  }

  private handleMongoServerError(
    error: MongoServerError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    
    if (!(error instanceof MongoServerError)) {
      next(error);
      return;
    }

    const httpRes: HttpResponse<null> = new HttpResponse();
    httpRes.status = status.BAD_REQUEST;

    switch (error.codeName) {
      case 'DuplicateKey':
        httpRes.errors = `Chave única duplicada: ${JSON.stringify(error.keyValue)}`;        
        break;
    
      default:
        httpRes.errors = error.message;
        break;
    }
    
    res.status(httpRes.status).json(httpRes.toJson());
  }

  private handleError(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!(error instanceof Error)) {
      next(error);
      return;
    }

    const httpRes: HttpResponse<null> = new HttpResponse();
    httpRes.status = status.BAD_REQUEST;
    httpRes.errors = error.message;
    res.status(httpRes.status).json(httpRes.toJson());
  }

  private handleUnknowError(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    
    const httpRes: HttpResponse<null> = new HttpResponse();
    httpRes.status = status.INTERNAL_SERVER_ERROR;
    httpRes.errors = (String(error));
    res.status(httpRes.status).json(httpRes.toJson());
  }
}
