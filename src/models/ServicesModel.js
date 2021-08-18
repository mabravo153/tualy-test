"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const ProductsModel_1 = __importDefault(require("./ProductsModel"));
const ClientsModel_1 = __importDefault(require("./ClientsModel"));
const CustomValidator_1 = require("../helpers/CustomValidator");
let Service = class Service {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Service.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.Generated("uuid"),
    __metadata("design:type", String)
], Service.prototype, "code", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Service.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDateString(),
    __metadata("design:type", Date)
], Service.prototype, "date_of_service", void 0);
__decorate([
    typeorm_1.Column("simple-json"),
    class_validator_1.Validate(CustomValidator_1.ObjectProductValidate, {
        message: "Validate Products",
    }),
    __metadata("design:type", Array)
], Service.prototype, "arrayProducts", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", default: 0 }),
    __metadata("design:type", Number)
], Service.prototype, "service_value", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: ["waiting", "started", "finished"],
        default: "waiting",
    }),
    __metadata("design:type", String)
], Service.prototype, "status", void 0);
__decorate([
    typeorm_1.ManyToMany(() => ProductsModel_1.default),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Service.prototype, "products", void 0);
__decorate([
    typeorm_1.ManyToOne(() => ClientsModel_1.default, (client) => client.services),
    __metadata("design:type", ClientsModel_1.default)
], Service.prototype, "client", void 0);
Service = __decorate([
    typeorm_1.Entity()
], Service);
exports.default = Service;
//# sourceMappingURL=ServicesModel.js.map