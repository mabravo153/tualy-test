"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const ClientsRoutes_1 = __importDefault(require("../routes/ClientsRoutes"));
const ServicesRoutes_1 = __importDefault(require("../routes/ServicesRoutes"));
class Server {
    constructor() {
        this.Routes = {
            clients: "/api/v1/clients",
            services: "/api/v1/services",
        };
        this.port = process.env.PORT || "9000";
        //inicializacion del servidor
        this.app = express_1.default();
        this.middlewares();
        this.routes();
        this.dbConnection();
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
    middlewares() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield typeorm_1.createConnection();
                console.log("Base de datos conectada correctamente");
            }
            catch (error) {
                console.log(error);
                setTimeout(() => {
                    this.dbConnection();
                }, 5000);
            }
        });
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map