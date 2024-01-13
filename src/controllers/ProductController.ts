import { Request, Response } from "express";
import mongoose from "mongoose";
import { Model } from "../model/Model";
import { IProduct } from "../schemas/ProductSchema";

export class ProductController{
  private productModel: Model<IProduct>;

  constructor(productModel: Model<IProduct>){
    this.productModel = productModel;
  }

  public async find(req: Request, res: Response): Promise<void>{
    res.status(200).json(await this.productModel.getModel().find());
  }

  public async save(req: Request, res: Response): Promise<void>{
    try { 
      const product = this.productModel.getModel().create(req.body);    
      res.status(201).json(product);
    } catch (error) {
      res.status(400).send((`Error: ${error instanceof Error ? error.message : String(error)}`));
    }    
  }
}