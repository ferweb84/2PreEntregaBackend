import { Router } from "express";

import productRouter from "./product.router.js";
import cartRouter from "./cart.router.js";
import messagesRouter from "./messages.router.js";
import usersRouter from "./users.router.js";
import viewsRouter from "./views.router.js";
import ticketsRouter from "./tickets.router.js";

const routerAPI = (app) => {
  const router = Router();
  app.use("/api/v1", router);
  app.use("/", viewsRouter);

  router.use("/products", productRouter);
  router.use("/carts", cartRouter);
  router.use("/messages", messagesRouter);
  router.use("/users", usersRouter);
  router.use("/tickets", ticketsRouter);
};

export default routerAPI;