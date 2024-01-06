import express from 'express';
import 'dotenv/config';
import { Routes } from './routes/Routes';

export class Server{
  private app: express.Application;
  private routes: Routes;

  constructor(){
    this.app = express();
    this.routes = new Routes(this.app);
    this.configure();
  }

  private configure(): void{
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(express.json());
    this.routes.registerAll();
  }

  public start(): void{
    this.app.listen(this.app.get('port'), () => {console.log(`Server is running on port ${this.app.get('port')}`)});
  }
}