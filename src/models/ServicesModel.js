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
let Service = class Service {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Service.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], Service.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], Service.prototype, "date_of_service", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
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
Service = __decorate([
    typeorm_1.Entity()
], Service);
exports.default = Service;
//# sourceMappingURL=ServicesModel.js.map