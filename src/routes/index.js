import { Router } from "express";

import businessRouter from "./business.router.js"
import ordersRouter from "./orders.router.js"
import usersRouter from "./users.router.js"

//para compilar todos los routers
export function routerApi(app){
    const router = Router();

    app.use ("/api/v1",router);

    router.use ("/business",businessRouter);
    router.use ("/orders",ordersRouter);
    router.use ("/users",usersRouter);
}