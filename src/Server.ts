import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { Routes } from './routes/Routes';
import * as http from 'http';
import { DbConnection } from './DbConnection';
import { ErrorHandler } from './errors/ErrorHandler';

export class Server {
  private httpServer?: http.Server;
  private app: express.Application;
  private routes: Routes;
  private errorHandler: ErrorHandler;
  private dbConnection: DbConnection;

  constructor() {
    this.app = express();
    this.errorHandler = new ErrorHandler(this.app);
    this.routes = new Routes(this.app);
    this.dbConnection = new DbConnection(this);    
    this.configure();
  }

  private configure(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(express.json());    
    this.routes.registerAll();
    this.errorHandler.registerAll();    
  }

  public start(): void {
    this.httpServer = this.app.listen(this.app.get('port'), () => {
      console.log(`Server is running on port ${this.app.get('port')}`);
    });
    this.dbConnection.connect();
  }

  public stop(code: number): void {
    this.httpServer?.close(() => {
      process.exit(code);
    });
  }
}
