"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsControllers_1 = __importDefault(require("../controllers/ProductsControllers"));
class ProductsRoutes {
    constructor() {
        this.routes = express_1.Router();
    }
    productsroutes() {
        this.routes.get("/", ProductsControllers_1.default.index);
        this.routes.get("/last", ProductsControllers_1.default.show);
        this.routes.post("/", ProductsControllers_1.default.store);
        this.routes.post("/email", ProductsControllers_1.default.email);
        return this.routes;
    }
}
exports.default = ProductsRoutes;
//# sourceMappingURL=ProductsRoutes.js.map