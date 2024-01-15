import { Request, Response } from "express";
import { Model } from "../model/Model";
import { IProduct } from "../schemas/ProductSchema";
import { HttpResponse } from "../HttpResponse";

export class ProductController{
  private productModel: Model<IProduct>;

  constructor(productModel: Model<IProduct>){
    this.productModel = productModel;
  }

  public async find(req: Request, res: Response): Promise<void>{
    const httpResponse: HttpResponse = new HttpResponse();

    try {
      httpResponse.data = await this.productModel.getModel().find();  
      res.status(200);
    } catch (error) {
      httpResponse.error = (`Error: ${error instanceof Error ? error.message : String(error)}`);
      res.status(400);      
    }    
    res.json(httpResponse.toJson());    
  }

  public async findById(req: Request, res: Response): Promise<void>{
    const httpResponse: HttpResponse = new HttpResponse();

    try {
      httpResponse.data = await this.productModel.getModel().findById(req.params.id);  
      res.status(200);
    } catch (error) {
      httpResponse.error = (`Error: ${error instanceof Error ? error.message : String(error)}`);
      res.status(400);      
    }    
    res.json(httpResponse.toJson());
  }

  public async save(req: Request, res: Response): Promise<void>{
    const httpResponse: HttpResponse = new HttpResponse();

    try { 
      httpResponse.data = await this.productModel.getModel().create(req.body);    
      res.status(201);
    } catch (error) {
      httpResponse.error = (`Error: ${error instanceof Error ? error.message : String(error)}`);
      res.status(400);
    }    
    res.json(httpResponse.toJson());
  }

  public async update(req: Request, res: Response): Promise<void>{
    const httpResponse: HttpResponse = new HttpResponse();

    try { 
      httpResponse.data = await this.productModel.getModel().findByIdAndUpdate(req.params.id, req.body, {new: true});    
      res.status(200);
    } catch (error) {
      httpResponse.error = (`Error: ${error instanceof Error ? error.message : String(error)}`);
      res.status(400);
    }    
    res.json(httpResponse.toJson());
  }

  public async delete(req: Request, res: Response): Promise<void>{
    const httpResponse: HttpResponse = new HttpResponse();

    try { 
      await this.productModel.getModel().findByIdAndDelete(req.params.id);    
      res.status(200);
    } catch (error) {
      httpResponse.error = (`Error: ${error instanceof Error ? error.message : String(error)}`);
      res.status(400);
    }    
    res.json(httpResponse.toJson());
  }
}