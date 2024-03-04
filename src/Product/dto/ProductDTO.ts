import { Expose, plainToClass  } from "class-transformer";

export class ProductDTO{
  @Expose()
  id!: string;

  @Expose()
  nome!: string;

  @Expose()
  preco!: number;

  @Expose()
  imagem?: string;

  @Expose()
  quantidadeEmEstoque!: number;

  public static plainToProductDTO(plainObject: object | null): ProductDTO{
    let newDto: ProductDTO;

    newDto = plainObject ? plainToClass(ProductDTO, plainObject, { excludeExtraneousValues: true }) : new ProductDTO(); 
    Object.seal(newDto); 
    return newDto;
  }

  public static plainArrayToProductDtoArray(plainObjectArray: object[]): ProductDTO[]{
    const arrayDto: ProductDTO[] = [];
    plainObjectArray.forEach(obj => {
      const dto = ProductDTO.plainToProductDTO(obj);
      if(dto){
        arrayDto.push(dto);
        Object.seal(dto); 
      }
    });

    Object.seal(arrayDto); 
    return arrayDto;
  }
}