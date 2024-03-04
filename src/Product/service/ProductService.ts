import { ProductDTO } from "../dto/ProductDTO";
import { IProductService } from "./IProductService";
import { IProductRepository } from "../repository/IProductRepository";
import { NotFoundError } from "../../errors/NotFoundError";
import { ValidationError } from "../../errors/ValidationError";

export class ProductService implements IProductService{
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository){
    this.productRepository = productRepository;
  }

  private async validateNomeProduto(productName: string, productId: string): Promise<string>{
    if(!productName || productName.trim() === ''){
      return 'O nome do produto deve ser informado';
    }

    if(productName.length > 40){
      return 'O nome do produto deve conter até 40 caracteres';
    }

    const product = await this.productRepository.findProductByName(productName);
    if(product.id && product.id !== productId){
      return `Já existe um produto de nome ${productName}`;  
    }

    return '';
  }

  private validatePrecoProduto(precoProduto: number): string{
    if(!precoProduto){
      return 'O preço do produto deve ser informado';
    }

    if(precoProduto <= 0){
      return 'Favor informar um valor de produto válido';
    }

    return '';
  }

  private validateQuantidadeEmEstoqueProduto(quantidadeEmEstoque: number): string{
    if(!quantidadeEmEstoque){
      return 'A quantidade em estoque deve ser informada';
    }

    if(quantidadeEmEstoque < 0){
      return 'O estoque do produto não pode ser negativo';
    }

    return '';
  }

  public async validate(productDTO: ProductDTO): Promise<void> {
    let errors: string[] = [];
    errors.push(await this.validateNomeProduto(productDTO.nome, productDTO.id));
    errors.push(await this.validatePrecoProduto(productDTO.preco));
    errors.push(await this.validateQuantidadeEmEstoqueProduto(productDTO.quantidadeEmEstoque));
    errors = errors.filter(error => error.trim() !== '');
    if(errors.length > 0){
     throw new ValidationError(errors);
    }    
  }

  public async createProduct(productDTO: ProductDTO): Promise<ProductDTO> {
    await this.validate(productDTO);
    return await this.productRepository.createProduct(productDTO);     
  }

  public async getProducts(): Promise<ProductDTO[]> {
    return await this.productRepository.findAllProducts();
  }

  public async getProductById(productId: string): Promise<ProductDTO> {
    const productDto: ProductDTO = await this.productRepository.findProductById(productId);

    if(!productDto.id){
      throw new NotFoundError(`Produto de id ${productId} não encontrado`);
    }

    return await this.productRepository.findProductById(productId);
  }

  public async deleteProduct(productId: string): Promise<void> {
    await this.getProductById(productId);
    await this.productRepository.deleteProduct(productId);
    return;
  }

  public async updateProduct(productId: string, productDto: ProductDTO): Promise<ProductDTO> {
    const dbProduct = await this.getProductById(productId);
    Object.assign(dbProduct, productDto);
    dbProduct.id = productId;
    await this.validate(dbProduct);
    return await this.productRepository.updateProduct(productId, dbProduct);
  }
}