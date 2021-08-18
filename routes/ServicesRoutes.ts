import { Router, Request, Response } from "express";
import ServicesControllers from "../controllers/ServicesControllers";

class ServicesRoutes {
  private routes: Router = Router();

  servicesroutes(): Router {
    this.routes.get("/", ServicesControllers.index);

    this.routes.post("/", ServicesControllers.store);

    this.routes.put("/", new ServicesControllers().edit);

    return this.routes;
  }
}

export default ServicesRoutes;
