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
const uuid_1 = require("uuid");
const ProductsModel_1 = __importDefault(require("../models/ProductsModel"));
class ProductsControllers {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Products = yield typeorm_1.getRepository(ProductsModel_1.default).find();
                if (Products.length) {
                    return res.status(200).json({
                        code: 200,
                        msg: Products,
                    });
                }
                else {
                    return res.status(404).json({
                        code: 404,
                        msg: "Products not found",
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
            let product = new ProductsModel_1.default();
            let { name, price, description } = req.body;
            try {
                product.code = uuid_1.v4();
                product.name = name;
                product.description = description;
                product.price = parseFloat(price);
                product.isActive = true;
                const errors = yield class_validator_1.validate(product);
                if (errors.length) {
                    return res.status(400).json({
                        code: 400,
                        msg: errors,
                    });
                }
                else {
                    yield typeorm_1.getRepository(ProductsModel_1.default).save(product);
                    return res.status(200).json({
                        code: 200,
                        msg: "product Created",
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
exports.default = ProductsControllers;
//# sourceMappingURL=ProductsControllers.js.map