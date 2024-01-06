import { RoutesInterface } from './RoutesInterface';
import express from 'express';
import { ProductController } from '../controllers/ProductController';

export class ProductRoutes implements RoutesInterface{
  public router: express.Router;
  private controller: ProductController; 

  constructor(){
    this.router = express.Router();
    this.controller = new ProductController();
    this.register();
  }

  public register(): void {
    this.router.get('/', this.controller.findAll);
  }
}