import nodemailer from "nodemailer";
import beeQueue from "bee-queue";

class Mailer {
  private REDIS_URL: string = process.env.REDIS_URL || "redis";
  private REDIS_PORT: number = Number(process.env.REDIS_PORT) || 6379;

  private USER_MAIL = process.env.USER_MAIL || "mabravo153@gmail.com";
  private PASSWORD_MAIL = process.env.PASSWORD_MAIL || undefined;

  private transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: this.USER_MAIL,
      pass: this.PASSWORD_MAIL,
    },
  });

  private options = {
    removeOnSuccess: true,
    redis: {
      host: this.REDIS_URL,
      port: this.REDIS_PORT,
    },
  };

  private emailQueue = new beeQueue("email", this.options);

  getTransporter() {
    return this.transporter;
  }

  setEmailQueue(error: string) {
    return this.emailQueue.createJob(error).save();
  }

  processSendEmail() {
    this.emailQueue.process(async (error) => {
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
    });
  }
}

export default Mailer;
