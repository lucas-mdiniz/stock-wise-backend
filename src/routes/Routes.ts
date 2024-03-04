import express from 'express';
import { ProductRoutes } from '../Product/routes/ProductRoutes';
import { ProductController } from '../Product/controllers/ProductController';
import { ProductService } from '../Product/service/ProductService';
import { ProductRepository } from '../Product/repository/ProductRepository';

export class Routes{
  private app: express.Application;

  constructor(app:express.Application){
    this.app = app;
  }

  public registerAll(){
    new ProductRoutes(new ProductController(new ProductService(new ProductRepository))).register(this.app);
  }
}