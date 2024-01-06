import express from 'express';
import 'dotenv/config';

export class Server{
  private app: express.Application;

  constructor(){
    this.app = express();
    this.configure();
  }

  private configure(): void{
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(express.json());
  }

  public start(): void{
    this.app.listen(this.app.get('port'), () => {console.log(`Server is running on port ${this.app.get('port')}`)});
  }
}