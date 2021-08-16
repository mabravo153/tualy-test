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

    this.routes.get("/:id", (req: Request, res: Response) => {
      res.json({
        code: 200,
        msg: "correct customers",
      });
    });

    this.routes.post("/", (req: Request, res: Response) => {
      res.json({
        code: 200,
        msg: "correct customers",
      });
    });

    this.routes.put("/", (req: Request, res: Response) => {
      res.json({
        code: 200,
        msg: "correct customers",
      });
    });

    this.routes.delete("/", (req: Request, res: Response) => {
      res.json({
        code: 200,
        msg: "correct customers",
      });
    });

    return this.routes;
  }
}

export default ClientsRoutes;
