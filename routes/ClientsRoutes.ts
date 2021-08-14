import { Request, Response, Router } from "express";

class ClientsRoutes {
  private routes: Router = Router();

  clientsroutes(): Router {
    this.routes.get("/", (req: Request, res: Response) => {
      res.json({
        code: 200,
        msg: "correct customers",
      });
    });

    return this.routes;
  }
}

export default ClientsRoutes;
