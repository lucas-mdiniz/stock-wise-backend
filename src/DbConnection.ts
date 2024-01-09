import mongoose from 'mongoose';
import {Server} from './Server';

export class DbConnection{
  private server: Server;

  constructor(server: Server){
    this.server = server;
  }

  public async connect(){
    try {
      await mongoose.connect(process.env.MONGO_URI || '');
      console.log('Database Connected');      
    } 
    catch (error: unknown) {
      console.log(`Error: ${error instanceof Error ? error.message : String(error)}`);
      const fatalExceptionCode = 1;
      this.server.stop(fatalExceptionCode);
    }    
  }
}