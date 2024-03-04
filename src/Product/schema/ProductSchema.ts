import {Schema} from "mongoose";
import { ISchema } from "../../schemas/ISchema";
import { ProductDTO } from "../dto/ProductDTO";

export class ProductSchema implements ISchema<ProductDTO>{
  private _schema: Schema<ProductDTO>;
  private _identifier: string;

  constructor(){
    this._identifier = 'Product';
    this._schema = new Schema<ProductDTO>({
      nome:{
        type: String,
        required: [true, 'Nome do produto deve ser informado'],
        trim: true,
        maxlength: [50, 'Nome do produto deve conter no máximo 50 caracteres'],
        uppercase: true,
        unique: true,
      },
      imagem:{
        type: String,
        trim: true,
        default: 'no-img',
      },
      preco:{
        type: Number,
        required: [true, 'Valor do produto deve ser informado'],
        min: [1, 'Informe um preço válido'],
      },
      quantidadeEmEstoque:{
        type: Number,
        required: [true, 'Quantidade em estoque deve ser informada'],
        min: [0, 'Quantidade em estoque não pode ser negativa'],
      }
    }); 
  }

  get schema(): Schema<ProductDTO>{
    return this._schema;
  }

  get identifier(): string{
    return this._identifier;
  }
}