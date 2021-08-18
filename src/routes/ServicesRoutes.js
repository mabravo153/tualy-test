"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ServicesControllers_1 = __importDefault(require("../controllers/ServicesControllers"));
class ServicesRoutes {
    constructor() {
        this.routes = express_1.Router();
    }
    servicesroutes() {
        this.routes.get("/", ServicesControllers_1.default.index);
        this.routes.post("/", ServicesControllers_1.default.store);
        this.routes.put("/", new ServicesControllers_1.default().edit);
        return this.routes;
    }
}
exports.default = ServicesRoutes;
//# sourceMappingURL=ServicesRoutes.js.map