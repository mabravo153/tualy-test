import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import Client from "../models/ClientsModel";

class ClientsControllers {
  static async index(req: Request, res: Response): Promise<Response> {
    try {
      const users = await getRepository(Client).find();

      if (users.length) {
        return res.status(200).json({
          code: 200,
          msg: users,
        });
      } else {
        return res.status(404).json({
          code: 404,
          msg: "users not found",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 200,
        msg: error,
      });
    }
  }

  static async show(req: Request, res: Response): Promise<Response> {
    let { id } = req.params;

    try {
      const user = await getRepository(Client).findOne(id);

      if (user) {
        return res.status(200).json({
          code: 200,
          msg: user,
        });
      } else {
        return res.status(404).json({
          code: 404,
          msg: "user not found",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        msg: error,
      });
    }
  }

  static async store(req: Request, res: Response): Promise<Response> {
    let client: Client = new Client();
    let { id, first_name, last_name, email, address, phone } = req.body;

    try {
      client.id = id;
      client.first_name = first_name;
      client.last_name = last_name;
      client.email = email;
      client.address = address;
      client.phone = phone;
      client.isActive = true;

      const errors = await validate(client);

      if (errors.length) {
        return res.status(400).json({
          code: 400,
          msg: errors,
        });
      } else {
        await getRepository(Client).save(client);

        return res.status(200).json({
          code: 200,
          msg: "Client Created",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        msg: error,
      });
    }
  }

  static async edit(req: Request, res: Response): Promise<Response> {
    let { first_name, last_name, email, address, phone } = req.body;
    let { id } = req.params;

    const user = await getRepository(Client).findOne(id);

    if (!user) {
      return res.status(404).json({
        code: 404,
        msg: "Client not found",
      });
    } else {
      let client: Client = new Client();

      try {
        client.id = Number(id);
        client.first_name = first_name;
        client.last_name = last_name;
        client.email = email;
        client.address = address;
        client.phone = phone;
        client.isActive = true;

        const errors = await validate(client);

        if (errors.length) {
          return res.status(400).json({
            code: 400,
            msg: errors,
          });
        } else {
          await getRepository(Client).save(client);

          return res.status(200).json({
            code: 200,
            msg: "Client updated",
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          code: 500,
          msg: error,
        });
      }
    }
  }

  static async destoy(req: Request, res: Response): Promise<Response> {
    let { id } = req.params;

    try {
      const user = await getRepository(Client).findOne(id);

      if (!user) {
        return res.status(404).json({
          code: 404,
          msg: "Client not found",
        });
      } else {
        await getRepository(Client).softRemove(user);
        return res.status(200).json({
          code: 200,
          msg: "Client was removed",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        msg: error,
      });
    }
  }
}

export default ClientsControllers;
