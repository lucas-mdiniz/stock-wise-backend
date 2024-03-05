import { IProductController } from './IProductController';
import { IProductService } from '../service/IProductService';
import { HttpResponse } from '../../http/HttpResponse';
import { ProductDTO } from "../dto/ProductDTO";
import httpStatus from 'http-status';

export class ProductController implements IProductController {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  public async save(dto: ProductDTO): Promise<HttpResponse<ProductDTO>> {    
      const res = new HttpResponse<ProductDTO>();
      res.data = await this.productService.createProduct(dto);
      res.status = httpStatus.CREATED;
      return res;          
  }

  public async get(): Promise<HttpResponse<ProductDTO[]>> {
    const res = new HttpResponse<ProductDTO[]>();
    res.data = await this.productService.getProducts();  
    res.status = httpStatus.OK;
    return res;
  }

  public async getbyId(productId: string): Promise<HttpResponse<ProductDTO>> {
    const res = new HttpResponse<ProductDTO>();
    res.data = await this.productService.getProductById(productId);  
    res.status = httpStatus.OK;
    return res;  
  }

  public async delete(productId: string): Promise<HttpResponse<null>> {
    const res = new HttpResponse<null>();
    await this.productService.deleteProduct(productId);  
    res.status = httpStatus.OK;
    return res;    
  }

  public async put(productId: string, ProductDTO: ProductDTO): Promise<HttpResponse<ProductDTO>> {
    const res = new HttpResponse<ProductDTO>;
    res.data = await this.productService.updateProduct(productId, ProductDTO);
    res.status = httpStatus.OK;
    return res;    
  }
}
