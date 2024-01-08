import { Request, Response } from "express";

export class ProductController{
  public findAll(req: Request, res: Response): void{
    res.status(200).send('Routing Test');
  }
}