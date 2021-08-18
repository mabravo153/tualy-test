"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectProductValidate = void 0;
const class_validator_1 = require("class-validator");
let ObjectProductValidate = class ObjectProductValidate {
    validate(objects, args) {
        return (objects[0].hasOwnProperty("id") &&
            objects[0].hasOwnProperty("qty") &&
            typeof objects !== undefined &&
            objects.length > 0); // for async validations you must return a Promise<boolean> here
    }
    defaultMessage(args) {
        // here you can provide default error message if validation failed
        return "Validate Products";
    }
};
ObjectProductValidate = __decorate([
    class_validator_1.ValidatorConstraint({ name: "customText", async: false })
], ObjectProductValidate);
exports.ObjectProductValidate = ObjectProductValidate;
//# sourceMappingURL=CustomValidator.js.map