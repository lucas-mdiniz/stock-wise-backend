import express from 'express';
import dotenv from 'dotenv';

export class App{
  private static instance: App;
  private express;
  
  constructor(){
    this.express = express();   
    dotenv.config({path: 'config/.env'});
  }

  public static getInstance(): App{
    return this.instance ? this.instance : new App();
  }

  public start(){
    const port = process.env.PORT || 3000;
    this.express.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  }
}