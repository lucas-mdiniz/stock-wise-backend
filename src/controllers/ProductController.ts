import { Request, Response } from 'express';
import { Model } from '../model/Model';
import { IProduct } from '../schemas/ProductSchema';
import { HttpResponse } from '../HttpResponse';
import { NotFoundError } from '../errors/NotFoundError';
import status from 'http-status';

export class ProductController {
  private productModel: Model<IProduct>;

  constructor(productModel: Model<IProduct>) {
    this.productModel = productModel;
  }

  public async find(req: Request, res: HttpResponse): Promise<void> {
    res.data = await this.productModel.getModel().find();
    res.status = status.OK;
  }

  public async findById(req: Request, res: HttpResponse): Promise<void> {
    res.data = await this.productModel.getModel().findById(req.params.id);

    if (!res.data) {
      throw new NotFoundError(`Produto de id ${req.params.id} não encontrado`);
    }

    res.status = status.OK;
  }

  public async save(req: Request, res: HttpResponse): Promise<void> {
    res.data = await this.productModel.getModel().create(req.body);
    res.status = status.CREATED;
  }

  public async update(req: Request, res: HttpResponse): Promise<void> {
    res.data = await this.productModel.getModel().findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!res.data) {
      throw new NotFoundError(`Produto de id ${req.params.id} não encontrado`);
    }

    res.status = status.OK;
  }

  public async delete(req: Request, res: HttpResponse): Promise<void> {
    const data = await this.productModel
      .getModel()
      .findByIdAndDelete(req.params.id);

    if (!data) {
      throw new NotFoundError(`Produto de id ${req.params.id} não encontrado`);
    }

    res.status = status.NO_CONTENT;
  }
}
