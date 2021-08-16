import { Router, Request, Response } from "express";

class ServicesRoutes {
  private routes: Router = Router();

  servicesroutes(): Router {
    this.routes.get("/", (req: Request, res: Response) => {
      res.json({
        code: 200,
        msg: "correct services update",
      });
    });

    this.routes.post("/", (req: Request, res: Response) => {
      res.json({
        code: 200,
        msg: "correct services update",
      });
    });

    this.routes.put("/", (req: Request, res: Response) => {
      res.json({
        code: 200,
        msg: "correct services update",
      });
    });

    


    return this.routes;
  }
}

export default ServicesRoutes;
