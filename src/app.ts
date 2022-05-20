import express, { Express, response } from "express";
import "express-async-errors";
import "dotenv/config";
import helmet from 'helmet';
import { serverRouter } from "./router";
class AppController {
  express: Express;

  constructor() {
    this.express = express();
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
    this.disableHeaders();
    this.routes();
    this.express.use(helmet());
  }
  disableHeaders() {
    this.express.use((req, res, next) => {
      const send = res.send;
      res.send = data => {
        res.removeHeader("X-Powered-By");
        return send.call(res, data);
      };
      res.set({
        ETag: "None",
      });
      next();
    });
  }
  routes() {
    this.express.use(serverRouter);
  }

}

export default new AppController();