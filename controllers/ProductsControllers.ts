import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import Product from "../models/ProductsModel";
import mailer from "../helpers/Mail";

class ProductsControllers {
  static async index(req: Request, res: Response): Promise<Response> {
    try {
      const Products = await getRepository(Product).find();

      if (Products.length) {
        return res.status(200).json({
          code: 200,
          msg: Products,
        });
      } else {
        return res.status(404).json({
          code: 404,
          msg: "Products not found",
        });
      }
    } catch (error) {
      console.log(error);
      let mail = new mailer();
      mail.setEmailQueue(JSON.stringify(error)).then(() => {
        mail.processSendEmail();
      });

      return res.status(500).json({
        code: 200,
        msg: error,
      });
    }
  }

  static async store(req: Request, res: Response): Promise<Response> {
    let product: Product = new Product();
    let { name, price, description } = req.body;

    try {
      product.code = uuidv4();
      product.name = name;
      product.description = description;
      product.price = parseFloat(price);
      product.isActive = true;

      const errors = await validate(product);

      if (errors.length) {
        return res.status(400).json({
          code: 400,
          msg: errors,
        });
      } else {
        await getRepository(Product).save(product);

        return res.status(200).json({
          code: 200,
          msg: "product Created",
        });
      }
    } catch (error) {
      console.log(error);
      let mail = new mailer();
      mail.setEmailQueue(JSON.stringify(error)).then(() => {
        mail.processSendEmail();
      });
      return res.status(500).json({
        code: 500,
        msg: error,
      });
    }
  }

  static async show(req: Request, res: Response): Promise<Response> {
    try {
      const Products = await getRepository(Product).find({
        order: {
          id: "DESC",
        },
        take: 1,
      });

      if (Products.length) {
        return res.status(200).json({
          code: 200,
          msg: Products,
        });
      } else {
        return res.status(404).json({
          code: 404,
          msg: "Products not found",
        });
      }
    } catch (error) {
      console.log(error);
      let mail = new mailer();
      mail.setEmailQueue(JSON.stringify(error)).then(() => {
        mail.processSendEmail();
      });
      return res.status(500).json({
        code: 200,
        msg: error,
      });
    }
  }

  static async email(req: Request, res: Response): Promise<Response> {
    let mail = new mailer();

    mail
      .setEmailQueue(JSON.stringify(req.body))
      .then(() => {
        mail.processSendEmail();
      })
      .catch(() => {
        console.log("error al almacenar el email");
      });

    return res.status(200).json({
      code: 200,
      msg: " email ",
    });
  }
}

export default ProductsControllers;
