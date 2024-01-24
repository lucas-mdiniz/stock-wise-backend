import express from 'express';
import { ProductRoutes } from './ProductRoutes';

export class Routes{
  private app: express.Application;
  private appURI: string;

  constructor(app:express.Application){
    this.app = app;
    this.appURI = `/api/${process.env.API_VERSION}`;
  }

  public registerAll(){
    this.app.use(`${this.appURI}/product`, new ProductRoutes().router);
  }
}