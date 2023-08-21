import loggerRouter from "./loggertest.router.js"
import productsRouter from './products.router.js';
import mailRouter from './mail.router.js'
import cartrouter from './cart.router.js'
import viewrouter from './views.router.js'
import mockRouter from "./mocking.router.js";
import sessionsRouter from "./sessions.router.js"
import usersRouter from "./users.router.js"
import messagesRouter from "./chat.router.js"
import smsRouter from "./sms.router.js"
import { authToken } from "../utilsjwt.js";
import __dirname from "../dirname.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import paymentRouter from "./payment.router.js"

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "superhipermegamercado API",
      description: "Documentacion que soporta al eccomerce",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
const specs = swaggerJSDoc(swaggerOptions);
const routesFunction = (app) => {
  

  app.get("/mockingproducts", mockRouter)
  app.use("/recovery", mailRouter)
  app.get("/sms", smsRouter)
  app.use("/chat",messagesRouter);
  app.use("/api/sessions", sessionsRouter);
  //app.get("/loggerTest",loggerRouter)
  app.use("/api/products", productsRouter);
  app.get("/loggerTest", loggerRouter);
  app.use("/api/carts", cartrouter);
  app.use("/api/users", usersRouter)
  app.use("/", viewrouter);
   app.use("/apidocs",swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
  app.use("/get",authToken,(req,res)=>{
    res.send({status:"success",payload: req.user})
  })

};

export default routesFunction;
