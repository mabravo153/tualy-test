"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClientsControllers_1 = __importDefault(require("../controllers/ClientsControllers"));
class ClientsRoutes {
    constructor() {
        this.routes = express_1.Router();
    }
    clientsroutes() {
        this.routes.get("/", ClientsControllers_1.default.index);
        this.routes.get("/:id", ClientsControllers_1.default.show);
        this.routes.post("/", ClientsControllers_1.default.store);
        this.routes.put("/:id", ClientsControllers_1.default.edit);
        this.routes.delete("/:id", ClientsControllers_1.default.destoy);
        return this.routes;
    }
}
exports.default = ClientsRoutes;
//# sourceMappingURL=ClientsRoutes.js.map