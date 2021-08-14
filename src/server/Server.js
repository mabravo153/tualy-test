"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClientsRoutes_1 = __importDefault(require("../routes/ClientsRoutes"));
const ServicesRoutes_1 = __importDefault(require("../routes/ServicesRoutes"));
class Server {
    constructor() {
        this.Routes = {
            clients: "/api/v1/clients",
            services: "/api/v1/services",
        };
        this.port = process.env.PORT || "9000";
        this.app = express_1.default();
        this.routes();
    }
    run() {
        this.app.listen(this.port, () => {
            console.log(`Server app port ${this.port}`);
        });
    }
    routes() {
        this.app.use(this.Routes.clients, new ClientsRoutes_1.default().clientsroutes());
        this.app.use(this.Routes.services, new ServicesRoutes_1.default().servicesroutes());
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map