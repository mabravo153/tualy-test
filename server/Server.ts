import "reflect-metadata";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import ClientsRoutes from "../routes/ClientsRoutes";
import ServicesRoutes from "../routes/ServicesRoutes";

class Server {
  private app: express.Application;
  private port: string;

  private Routes: { [key: string]: string } = {
    clients: "/api/v1/clients",
    services: "/api/v1/services",
  };

  constructor() {
    this.port = process.env.PORT || "9000";

    //inicializacion del servidor
    this.app = express();

    this.middlewares();

    this.routes();

    this.dbConnection();
  }

  run(): void {
    this.app.listen(this.port, () => {
      console.log(`Server app port ${this.port}`);
    });
  }

  routes(): void {
    this.app.use(this.Routes.clients, new ClientsRoutes().clientsroutes());
    this.app.use(this.Routes.services, new ServicesRoutes().servicesroutes());
  }

  middlewares(): void {
    this.app.use(cors());

    this.app.use(express.json());
  }

  async dbConnection(): Promise<void> {
    try {
      await createConnection();
      console.log("Base de datos conectada correctamente");
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        this.dbConnection();
      }, 5000);
    }
  }
}

export default Server;
