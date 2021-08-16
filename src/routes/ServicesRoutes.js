"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ServicesRoutes {
    constructor() {
        this.routes = express_1.Router();
    }
    servicesroutes() {
        this.routes.get("/", (req, res) => {
            res.json({
                code: 200,
                msg: "correct services update",
            });
        });
        this.routes.post("/", (req, res) => {
            res.json({
                code: 200,
                msg: "correct services update",
            });
        });
        this.routes.put("/", (req, res) => {
            res.json({
                code: 200,
                msg: "correct services update",
            });
        });
        return this.routes;
    }
}
exports.default = ServicesRoutes;
//# sourceMappingURL=ServicesRoutes.js.map