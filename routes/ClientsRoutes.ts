import { Router } from "express";
import ClientsControllers from "../controllers/ClientsControllers";

class ClientsRoutes {
  private routes: Router = Router();

  clientsroutes(): Router {
    this.routes.get("/", ClientsControllers.index);

    this.routes.get("/:id", ClientsControllers.show);

    this.routes.post("/", ClientsControllers.store);

    this.routes.put("/:id", ClientsControllers.edit);

    this.routes.delete("/:id", ClientsControllers.destoy);

    return this.routes;
  }
}

export default ClientsRoutes;
