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
const redis_1 = __importDefault(require("redis"));
const bee_queue_1 = __importDefault(require("bee-queue"));
const typeorm_1 = require("typeorm");
const ProductsModel_1 = __importDefault(require("../models/ProductsModel"));
const ServicesModel_1 = __importDefault(require("../models/ServicesModel"));
class ClientRedis {
    constructor() {
        this.REDIS_URL = process.env.REDIS_URL || "redis";
        this.REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
        this.client = redis_1.default.createClient({
            host: this.REDIS_URL,
            port: this.REDIS_PORT,
        });
        this.options = {
            removeOnSuccess: true,
            redis: {
                host: this.REDIS_URL,
                port: this.REDIS_PORT,
            },
        };
        this.paymentQueue = new bee_queue_1.default("payment", this.options);
        this.emailQueue = new bee_queue_1.default("email", this.options);
    }
    getclient() {
        return this.client;
    }
    setItemPayment(job) {
        return this.paymentQueue.createJob(job).save();
    }
    processPayment() {
        this.paymentQueue.process((job) => __awaiter(this, void 0, void 0, function* () {
            let { data } = job;
            let totalPayment = 0;
            let dataConverted = JSON.parse(data);
            for (let product of dataConverted[0].arrayProducts) {
                let productFinded = yield typeorm_1.getRepository(ProductsModel_1.default).findOne(product.id);
                if (productFinded) {
                    totalPayment += productFinded.price * product.qty;
                }
                else {
                    console.log("producto no existe");
                }
            }
            let services = yield typeorm_1.getRepository(ServicesModel_1.default).find({
                where: {
                    code: dataConverted[0].code,
                },
            });
            if (services.length) {
                services[0].service_value = totalPayment;
                services[0].status = "finished";
                yield typeorm_1.getRepository(ServicesModel_1.default).save(services);
            }
        }));
    }
}
exports.default = ClientRedis;
//# sourceMappingURL=ClientRedis.js.map