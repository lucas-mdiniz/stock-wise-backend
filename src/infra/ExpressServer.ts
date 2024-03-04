import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { Routes } from '../routes/Routes';
import * as http from 'http';
import { ErrorHandler } from '../errors/ErrorHandler';
import { IServer } from './interfaces/IServer';

export class ExpressServer implements IServer{
  private httpServer?: http.Server;
  private app: express.Application;
  private routes: Routes;
  private errorHandler: ErrorHandler;

  constructor() {
    this.app = express();
    this.errorHandler = new ErrorHandler(this.app);
    this.routes = new Routes(this.app);
    this.configure();
  }

  private configure(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(express.json());    
    this.routes.registerAll();
    this.errorHandler.registerAll();    
  }

  public start(port: number): void {
    this.app.set('port', port);
    this.httpServer = this.app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }

  public stop(): void {
    this.httpServer?.close(() => {
      console.log('Servidor finalizado')
    });
  }
}
