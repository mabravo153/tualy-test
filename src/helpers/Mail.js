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
const nodemailer_1 = __importDefault(require("nodemailer"));
const bee_queue_1 = __importDefault(require("bee-queue"));
class Mailer {
    constructor() {
        this.REDIS_URL = process.env.REDIS_URL || "redis";
        this.REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
        this.USER_MAIL = process.env.USER_MAIL || "mabravo153@gmail.com";
        this.PASSWORD_MAIL = process.env.PASSWORD_MAIL || undefined;
        this.transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: this.USER_MAIL,
                pass: this.PASSWORD_MAIL,
            },
        });
        this.options = {
            removeOnSuccess: true,
            redis: {
                host: this.REDIS_URL,
                port: this.REDIS_PORT,
            },
        };
        this.emailQueue = new bee_queue_1.default("email", this.options);
    }
    getTransporter() {
        return this.transporter;
    }
    setEmailQueue(error) {
        return this.emailQueue.createJob(error).save();
    }
    processSendEmail() {
        this.emailQueue.process((error) => __awaiter(this, void 0, void 0, function* () {
            let { data } = error;
            console.log(data);
            this.transporter
                .sendMail({
                from: '"Server error" <mabravo153@gmail.com>',
                to: "miguelbravo153@gmail.com",
                subject: "Internal Server Error",
                text: data,
            })
                .then(() => {
                console.log("se envio el correo");
            });
        }));
    }
}
exports.default = Mailer;
//# sourceMappingURL=Mail.js.map