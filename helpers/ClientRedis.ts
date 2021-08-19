import redis, { RedisClient } from "redis";
import beeQueue from "bee-queue";
import { getRepository } from "typeorm";
import Product from "../models/ProductsModel";
import Service from "../models/ServicesModel";

class ClientRedis {
  private REDIS_URL: string = process.env.REDIS_URL || "redis";
  private REDIS_PORT: number = Number(process.env.REDIS_PORT) || 6379;
  private client: RedisClient = redis.createClient({
    host: this.REDIS_URL,
    port: this.REDIS_PORT,
  });

  private options = {
    removeOnSuccess: true,
    redis: {
      host: this.REDIS_URL,
      port: this.REDIS_PORT,
    },
  };

  getclient() {
    return this.client;
  }

  private paymentQueue = new beeQueue("payment", this.options);

  setItemPayment(job: string) {
    return this.paymentQueue.createJob(job).save();
  }

  processPayment() {
    this.paymentQueue.process(async (job) => {
      let { data } = job;
      let totalPayment = 0;

      let dataConverted = JSON.parse(data);

      for (let product of dataConverted[0].arrayProducts) {
        let productFinded = await getRepository(Product).findOne(product.id);
        if (productFinded) {
          totalPayment += productFinded.price * product.qty;
        } else {
          console.log("producto no existe");
        }
      }
      let services = await getRepository(Service).find({
        where: {
          code: dataConverted[0].code,
        },
      });
      if (services.length) {
        services[0].service_value = totalPayment;
        services[0].status = "finished";
        await getRepository(Service).save(services);
      }
    });
  }
}

export default ClientRedis;
