import { ProductDTO } from "../dto/ProductDTO"

export interface IProductRepository{
  findProductByName(productName: string): Promise<ProductDTO>;
  findProductById(productId: string): Promise<ProductDTO>;
  findAllProducts(): Promise<ProductDTO[]>;
  createProduct(productDTO: ProductDTO): Promise<ProductDTO>;
  deleteProduct(productId: string): Promise<void>;
  updateProduct(productId: string, productDto: ProductDTO): Promise<ProductDTO>;
}