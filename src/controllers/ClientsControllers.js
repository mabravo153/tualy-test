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
const ClientsModel_1 = __importDefault(require("../models/ClientsModel"));
const Mail_1 = __importDefault(require("../helpers/Mail"));
class ClientsControllers {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield typeorm_1.getRepository(ClientsModel_1.default).find();
                if (users.length) {
                    return res.status(200).json({
                        code: 200,
                        msg: users,
                    });
                }
                else {
                    return res.status(404).json({
                        code: 404,
                        msg: "users not found",
                    });
                }
            }
            catch (error) {
                console.log(error);
                let mail = new Mail_1.default();
                mail.setEmailQueue(JSON.stringify(error)).then(() => {
                    mail.processSendEmail();
                });
                return res.status(500).json({
                    code: 200,
                    msg: error,
                });
            }
        });
    }
    static show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            try {
                const user = yield typeorm_1.getRepository(ClientsModel_1.default).findOne(id);
                if (user) {
                    return res.status(200).json({
                        code: 200,
                        msg: user,
                    });
                }
                else {
                    return res.status(404).json({
                        code: 404,
                        msg: "user not found",
                    });
                }
            }
            catch (error) {
                console.log(error);
                let mail = new Mail_1.default();
                mail.setEmailQueue(JSON.stringify(error)).then(() => {
                    mail.processSendEmail();
                });
                return res.status(500).json({
                    code: 500,
                    msg: error,
                });
            }
        });
    }
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = new ClientsModel_1.default();
            let { id, first_name, last_name, email, address, phone } = req.body;
            try {
                client.id = id;
                client.first_name = first_name;
                client.last_name = last_name;
                client.email = email;
                client.address = address;
                client.phone = phone;
                client.isActive = true;
                const errors = yield class_validator_1.validate(client);
                if (errors.length) {
                    return res.status(400).json({
                        code: 400,
                        msg: errors,
                    });
                }
                else {
                    yield typeorm_1.getRepository(ClientsModel_1.default).save(client);
                    return res.status(200).json({
                        code: 200,
                        msg: "Client Created",
                    });
                }
            }
            catch (error) {
                console.log(error);
                let mail = new Mail_1.default();
                mail.setEmailQueue(JSON.stringify(error)).then(() => {
                    mail.processSendEmail();
                });
                return res.status(500).json({
                    code: 500,
                    msg: error,
                });
            }
        });
    }
    static edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { first_name, last_name, email, address, phone } = req.body;
            let { id } = req.params;
            const user = yield typeorm_1.getRepository(ClientsModel_1.default).findOne(id);
            if (!user) {
                return res.status(404).json({
                    code: 404,
                    msg: "Client not found",
                });
            }
            else {
                let client = new ClientsModel_1.default();
                try {
                    client.id = Number(id);
                    client.first_name = first_name;
                    client.last_name = last_name;
                    client.email = email;
                    client.address = address;
                    client.phone = phone;
                    client.isActive = true;
                    const errors = yield class_validator_1.validate(client);
                    if (errors.length) {
                        return res.status(400).json({
                            code: 400,
                            msg: errors,
                        });
                    }
                    else {
                        yield typeorm_1.getRepository(ClientsModel_1.default).save(client);
                        return res.status(200).json({
                            code: 200,
                            msg: "Client updated",
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                    let mail = new Mail_1.default();
                    mail.setEmailQueue(JSON.stringify(error)).then(() => {
                        mail.processSendEmail();
                    });
                    return res.status(500).json({
                        code: 500,
                        msg: error,
                    });
                }
            }
        });
    }
    static destoy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            try {
                const user = yield typeorm_1.getRepository(ClientsModel_1.default).findOne(id);
                if (!user) {
                    return res.status(404).json({
                        code: 404,
                        msg: "Client not found",
                    });
                }
                else {
                    yield typeorm_1.getRepository(ClientsModel_1.default).softRemove(user);
                    return res.status(200).json({
                        code: 200,
                        msg: "Client was removed",
                    });
                }
            }
            catch (error) {
                console.log(error);
                let mail = new Mail_1.default();
                mail.setEmailQueue(JSON.stringify(error)).then(() => {
                    mail.processSendEmail();
                });
                return res.status(500).json({
                    code: 500,
                    msg: error,
                });
            }
        });
    }
}
exports.default = ClientsControllers;
//# sourceMappingURL=ClientsControllers.js.map