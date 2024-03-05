import { ProductDTO } from "../dto/ProductDTO";

export interface IProductService{
  validate(productDTO: ProductDTO): Promise<void>;
  createProduct(productDTO: ProductDTO): Promise<ProductDTO>;
  getProducts(): Promise<ProductDTO[]>;
  getProductById(productId: string): Promise<ProductDTO>;
  deleteProduct(productId: string): Promise<void>;
  updateProduct(productId: string, productDto: ProductDTO): Promise<ProductDTO>;
}