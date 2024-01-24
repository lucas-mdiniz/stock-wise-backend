import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../HttpResponse';

type controllerFunction = (
  req: Request,
  httpRes: HttpResponse
) => Promise<void>;

type expressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export class ControllerWrapper {
  public static wrap(
    controllerCallback: controllerFunction
  ): expressMiddleware {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const httpResponse: HttpResponse = new HttpResponse();
      try {
        await controllerCallback(req, httpResponse);
        res.status(httpResponse.status).json(httpResponse.toJson());
      } catch (error: unknown) {
        next(error);
      }
    };
  }
}
