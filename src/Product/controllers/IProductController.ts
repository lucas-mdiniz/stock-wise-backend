import { ProductDTO } from "../dto/ProductDTO";
import { HttpResponse } from "../../http/HttpResponse"

export interface IProductController{
  get(): Promise<HttpResponse<ProductDTO[]>>;
  getbyId(productId: string): Promise<HttpResponse<ProductDTO>>;
  save(dto: ProductDTO): Promise<HttpResponse<ProductDTO>>;
  delete(productId: string): Promise<HttpResponse<null>>;
  put(productId: string, ProductDTO: ProductDTO): Promise<HttpResponse<ProductDTO>>;
}