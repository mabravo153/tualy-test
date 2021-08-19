import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Service from "../models/ServicesModel";
import redis from "../helpers/ClientRedis";
import Mail from "../helpers/Mail";

class ServicesControllers {
  static async index(req: Request, res: Response): Promise<Response> {
    try {
      const service = await getRepository(Service).find({
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
      } else {
        return res.status(404).json({
          code: 404,
          msg: "Last Services not found",
        });
      }
    } catch (error) {
      console.log(error);
      let mail = new Mail();
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
    let service: Service = new Service();

    let { user_id, date_of_service, products } = req.body;

    try {
      service.user_id = user_id;
      service.arrayProducts = products;
      service.date_of_service = date_of_service;

      const errors = await validate(service);

      if (errors.length) {
        return res.status(400).json({
          code: 400,
          msg: errors,
        });
      } else {
        let newService = await getRepository(Service).save(service);

        return res.status(200).json({
          code: 200,
          msg: newService,
        });
      }
    } catch (error) {
      console.log(error);
      let mail = new Mail();
      mail.setEmailQueue(JSON.stringify(error)).then(() => {
        mail.processSendEmail();
      });
      return res.status(500).json({
        code: 500,
        msg: "Internal Server Error",
      });
    }
  }

  async edit(req: Request, res: Response): Promise<Response> {
    let { service_id, status } = req.body;

    try {
      let service = await getRepository(Service).find({
        where: {
          code: service_id,
        },
      });

      if (service.length) {
        if (status == "finished") {
          let clientRedis = new redis();
          clientRedis
            .setItemPayment(JSON.stringify(service))
            .then(() => {
              clientRedis.processPayment();
            })
            .catch(() =>
              console.log(
                `ocurrio un error al ingresar el mensaje en la cola de pagos ${service}`
              )
            );
        }
        return res.status(200).json({
          code: 200,
          msg: "ok",
        });
      } else {
        return res.status(404).json({
          code: 404,
          msg: "Service Not Found",
        });
      }
    } catch (error) {
      console.log(error);

      let mail: Mail = new Mail();
      mail.setEmailQueue(JSON.stringify(error)).then(() => {
        mail.processSendEmail();
      });
      return res.status(500).json({
        code: 500,
        msg: "Internal Server Error",
      });
    }
  }
}

export default ServicesControllers;
