import express, {Request, Response, NextFunction} from 'express';
import { IRoutes } from '../../routes/IRoutes';
import { IProductController } from '../controllers/IProductController';
import { ProductDTO } from '../dto/ProductDTO';
import { HttpResponse } from '../../http/HttpResponse';

export class ProductRoutes implements IRoutes {
  private router: express.Router;
  private productController: IProductController;

  constructor(productController: IProductController) {
    this.router = express.Router();
    this.productController = productController;
  }

  public register(app: express.Application): void {

    this.router.get('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const httpResponse: HttpResponse<ProductDTO[]> = await this.productController.get();  
        res.status(httpResponse.status).send(httpResponse.toJson());
      } catch (error) {
        next(error);   
      }      
    }); 

    this.router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const httpResponse: HttpResponse<ProductDTO> = await this.productController.getbyId(req.params.id);  
        res.status(httpResponse.status).send(httpResponse.toJson());
      } catch (error) {
        next(error);   
      }      
    }); 
    
    this.router.post('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const httpResponse: HttpResponse<ProductDTO> = await this.productController.save(ProductDTO.plainToProductDTO(req.body));  
        res.status(httpResponse.status).send(httpResponse.toJson());
      } catch (error) {
        next(error);   
      }      
    }); 

    this.router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const httpResponse: HttpResponse<null> = await this.productController.delete(req.params.id);  
        res.status(httpResponse.status).send(httpResponse.toJson());
      } catch (error) {
        next(error);   
      }      
    }); 

    this.router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const httpResponse: HttpResponse<ProductDTO> = await this.productController.put(req.params.id, ProductDTO.plainToProductDTO(req.body));  
        res.status(httpResponse.status).send(httpResponse.toJson());
      } catch (error) {
        next(error);   
      }      
    }); 

    app.use('/product', this.router);
  }
}
