import { Schema } from "mongoose"
export interface ISchema<Type>{
  schema: Schema<Type>;
  identifier: string;
}