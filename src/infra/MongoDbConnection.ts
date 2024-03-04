import mongoose from 'mongoose';
import { IDbConnection } from './interfaces/IDbConnection';

export class MongoDbConnection implements IDbConnection{

  constructor(){}

  public async connect(uri: string): Promise<void>{
    try {
      await mongoose.connect(uri);
      console.log('Conectado ao banco de dados');      
    } 
    catch (error) {
      if(error instanceof Error){
        console.log(`Erro ao conectar ao banco de dados: ${error.message}`);  
        throw error;        
      }

      console.log(`Erro ao conectar ao banco de dados: ${String(error)}`);
      throw new Error(String(error));
    }    
  }
}