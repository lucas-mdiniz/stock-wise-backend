import { ProductDTO } from "../dto/ProductDTO";
import { IProductRepository } from "./IProductRepository";
import { ProductSchema } from "../schema/ProductSchema";
import { Model, model } from 'mongoose';

export class ProductRepository implements IProductRepository{
  private Product: Model<ProductDTO>;

  constructor(){
    const productSchema: ProductSchema = new ProductSchema();
    this.Product = model<ProductDTO>(productSchema.identifier, productSchema.schema);
  }

  public async findProductByName(productName: string): Promise<ProductDTO> {
    return ProductDTO.plainToProductDTO((await this.Product.find({'nome': productName}))[0]);   
  }

  public async findProductById(productId: string): Promise<ProductDTO> {
    return ProductDTO.plainToProductDTO(await this.Product.findById(productId));  
  }

  public async createProduct(productDTO: ProductDTO): Promise<ProductDTO> {
    return ProductDTO.plainToProductDTO(await this.Product.create(productDTO));
  }

  public async findAllProducts(): Promise<ProductDTO[]> {    
    return ProductDTO.plainArrayToProductDtoArray(await this.Product.find());
  }

  public async deleteProduct(productId: string): Promise<void> {
    await this.Product.findByIdAndDelete(productId);    
  }

  public async updateProduct(productId: string, productDto: ProductDTO): Promise<ProductDTO> {
    return ProductDTO.plainToProductDTO(await this.Product.findByIdAndUpdate(productId, productDto, {new: true}));
  }
}