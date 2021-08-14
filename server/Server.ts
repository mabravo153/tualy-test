import express from "express";
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

    this.app = express();

    this.routes();
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
}

export default Server;
