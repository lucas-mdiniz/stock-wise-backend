import { IRoutes } from './IRoutes';
import express from 'express';
import { ProductController } from '../controllers/ProductController';
import { ProductSchema, IProduct } from '../schemas/ProductSchema';
import { Model } from '../model/Model';
import { ControllerWrapper } from '../controllers/ControllerWrapper';

export class ProductRoutes implements IRoutes {
  public router: express.Router;
  private controller: ProductController;

  constructor() {
    this.router = express.Router();
    this.controller = new ProductController(
      new Model<IProduct>(new ProductSchema())
    );
    this.register();
  }

  public register(): void {
    this.router.get(
      '/',
      ControllerWrapper.wrap(this.controller.find.bind(this.controller))
    );
    this.router.get(
      '/:id',
      ControllerWrapper.wrap(this.controller.findById.bind(this.controller))
    );
    this.router.post(
      '/',
      ControllerWrapper.wrap(this.controller.save.bind(this.controller))
    );
    this.router.put(
      '/:id',
      ControllerWrapper.wrap(this.controller.update.bind(this.controller))
    );
    this.router.delete(
      '/:id',
      ControllerWrapper.wrap(this.controller.delete.bind(this.controller))
    );
  }
}
