import {Schema} from "mongoose";
import { ISchema } from "./ISchema";

export interface IProduct{
  name: String;
  photo?: String;
  price: Number;
  amountInStock: Number;
}

export class ProductSchema implements ISchema<IProduct>{
  private _schema: Schema<IProduct>;
  private _identifier: string;

  constructor(){
    this._identifier = 'Product';
    this._schema = new Schema<IProduct>({
      name:{
        type: String,
        required: [true, 'Nome do produto deve ser informado'],
        trim: true,
        maxlength: [50, 'Nome do produto deve conter no máximo 50 caracteres'],
        uppercase: true,
        unique: true,
      },
      photo:{
        type: String,
        trim: true,
        default: 'no-img',
      },
      price:{
        type: Number,
        required: [true, 'Valor do produto deve ser informado'],
        min: [1, 'Informe um preço válido'],
      },
      amountInStock:{
        type: Number,
        required: [true, 'Quantidade em estoque deve ser informada'],
        min: [0, 'Quantidade em estoque não pode ser negativa'],
      }
    }); 
  }

  get schema(): Schema<IProduct>{
    return this._schema;
  }

  get identifier(): string{
    return this._identifier;
  }
}