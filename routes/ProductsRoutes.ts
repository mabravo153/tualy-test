import { Router } from "express";
import ProductsControllers from "../controllers/ProductsControllers";

class ProductsRoutes {
  private routes: Router = Router();

  productsroutes(): Router {
    this.routes.get("/", ProductsControllers.index);

    this.routes.post("/", ProductsControllers.store);

    return this.routes;
  }
}

export default ProductsRoutes;
