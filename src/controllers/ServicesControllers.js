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
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const ServicesModel_1 = __importDefault(require("../models/ServicesModel"));
const ClientRedis_1 = __importDefault(require("../helpers/ClientRedis"));
class ServicesControllers {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = yield typeorm_1.getRepository(ServicesModel_1.default).find({
                    order: {
                        id: "DESC",
                    },
                    take: 1,
                });
                if (service.length) {
                    return res.status(200).json({
                        code: 200,
                        msg: service,
                    });
                }
                else {
                    return res.status(404).json({
                        code: 404,
                        msg: "Last Services not found",
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    code: 200,
                    msg: error,
                });
            }
        });
    }
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let service = new ServicesModel_1.default();
            let { user_id, date_of_service, products } = req.body;
            try {
                service.user_id = user_id;
                service.arrayProducts = products;
                service.date_of_service = date_of_service;
                const errors = yield class_validator_1.validate(service);
                if (errors.length) {
                    return res.status(400).json({
                        code: 400,
                        msg: errors,
                    });
                }
                else {
                    let newService = yield typeorm_1.getRepository(ServicesModel_1.default).save(service);
                    return res.status(200).json({
                        code: 200,
                        msg: newService,
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    code: 500,
                    msg: "Internal Server Error",
                });
            }
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { service_id, status } = req.body;
            try {
                let service = yield typeorm_1.getRepository(ServicesModel_1.default).find({
                    where: {
                        code: service_id,
                    },
                });
                if (service.length) {
                    if (status == "finished") {
                        let clientRedis = new ClientRedis_1.default();
                        clientRedis
                            .setItemPayment(JSON.stringify(service))
                            .then(() => {
                            clientRedis.processPayment();
                        })
                            .catch(() => console.log(`ocurrio un error al ingresar el mensaje en la cola de pagos ${service}`));
                    }
                    return res.status(200).json({
                        code: 200,
                        msg: "ok",
                    });
                }
                else {
                    return res.status(404).json({
                        code: 404,
                        msg: "Service Not Found",
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    code: 500,
                    msg: error,
                });
            }
        });
    }
}
exports.default = ServicesControllers;
//# sourceMappingURL=ServicesControllers.js.map