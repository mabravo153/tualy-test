import { Router } from "express";
import ProductsControllers from "../controllers/ProductsControllers";

class ProductsRoutes {
  private routes: Router = Router();

  productsroutes(): Router {
    this.routes.get("/", ProductsControllers.index);
    this.routes.get("/last", ProductsControllers.show);

    this.routes.post("/", ProductsControllers.store);

    this.routes.post("/email", ProductsControllers.email);

    return this.routes;
  }
}

export default ProductsRoutes;
