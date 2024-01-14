import { RoutesInterface } from './RoutesInterface';
import express from 'express';
import { ProductController } from '../controllers/ProductController';
import { ProductSchema, IProduct } from '../schemas/ProductSchema';
import { Model } from '../model/Model';

export class ProductRoutes implements RoutesInterface{
  public router: express.Router;
  private controller: ProductController; 

  constructor(){
    this.router = express.Router();
    this.controller = new ProductController(new Model<IProduct>(new ProductSchema()));
    this.register();
  }

  public register(): void {
    this.router.get('/', this.controller.find.bind(this.controller));
    this.router.post('/', this.controller.save.bind(this.controller));
  }
}