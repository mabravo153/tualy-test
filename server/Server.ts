import "reflect-metadata";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import redis from "../helpers/ClientRedis";
import mailer from "../helpers/Mail";
import ClientsRoutes from "../routes/ClientsRoutes";
import ServicesRoutes from "../routes/ServicesRoutes";
import ProductsRoutes from "../routes/ProductsRoutes";

class Server {
  private app: express.Application;
  private port: string;

  private Routes: { [key: string]: string } = {
    clients: "/api/v1/clients",
    services: "/api/v1/services",
    products: "/api/v1/products",
  };

  constructor() {
    this.port = process.env.PORT || "9000";

    //inicializacion del servidor
    this.app = express();

    this.middlewares();

    this.routes();

    this.dbConnection();

    this.redis();

    this.mailer();
  }

  run(): void {
    this.app.listen(this.port, () => {
      console.log(`Server app port ${this.port}`);
    });
  }

  routes(): void {
    this.app.use(this.Routes.clients, new ClientsRoutes().clientsroutes());
    this.app.use(this.Routes.services, new ServicesRoutes().servicesroutes());
    this.app.use(this.Routes.products, new ProductsRoutes().productsroutes());
  }

  middlewares(): void {
    this.app.use(cors());

    this.app.use(express.json());
  }

  redis() {
    let client = new redis().getclient();

    client.on("error", (error) => {
      console.log(error);
    });
  }

  mailer() {
    let transporter = new mailer().getTransporter();

    transporter
      .verify()
      .then(() => {
        console.log("connect email");
      })
      .catch((error) => {
        console.log(error);
      });
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
