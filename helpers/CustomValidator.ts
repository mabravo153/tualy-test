import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

interface IProducts {
  id: number;
  qty: number;
}

@ValidatorConstraint({ name: "customText", async: false })
export class ObjectProductValidate implements ValidatorConstraintInterface {
  validate(objects: IProducts[], args: ValidationArguments) {
    return (
      objects[0].hasOwnProperty("id") &&
      objects[0].hasOwnProperty("qty") &&
      typeof objects !== undefined &&
      objects.length > 0
    ); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return "Validate Products";
  }
}
