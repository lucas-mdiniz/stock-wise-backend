import mongoose from "mongoose"
import { ISchema } from "../schemas/ISchema";

export class Model<Type>{
  private genericModel: mongoose.Model<Type>;

  constructor(modelSchema: ISchema<Type>){
    this.genericModel = mongoose.model<Type>(modelSchema.identifier, modelSchema.schema);
  }

  getModel(): mongoose.Model<Type>{
    return this.genericModel;
  }  
}