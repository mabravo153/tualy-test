"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ClientsRoutes {
    constructor() {
        this.routes = express_1.Router();
    }
    clientsroutes() {
        this.routes.get("/", (req, res) => {
            res.json({
                code: 200,
                msg: "correct customers",
            });
        });
        this.routes.get("/:id", (req, res) => {
            res.json({
                code: 200,
                msg: "correct customers",
            });
        });
        this.routes.post("/", (req, res) => {
            res.json({
                code: 200,
                msg: "correct customers",
            });
        });
        this.routes.put("/", (req, res) => {
            res.json({
                code: 200,
                msg: "correct customers",
            });
        });
        this.routes.delete("/", (req, res) => {
            res.json({
                code: 200,
                msg: "correct customers",
            });
        });
        return this.routes;
    }
}
exports.default = ClientsRoutes;
//# sourceMappingURL=ClientsRoutes.js.map