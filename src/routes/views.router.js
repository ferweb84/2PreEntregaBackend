import { Router } from "express";
import passport from "passport";
import ProductManager from "../dao/dbManagers/products.js";
import MessageManager from "../dao/dbManagers/messages.js";
import CartManager from "../dao/dbManagers/carts.js";
import ViewsController from "../controllers/views.controller.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();
const messageManager = new MessageManager();
const viewsController = new ViewsController();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  viewsController.getHome.bind(viewsController)
);

router.get("/product/:pid",viewsController
.getProduct.bind(viewsController));

router.get("/cart",viewsController.getCart.bind(viewsController) );

router.get("/realtimeproducts",viewsController.getRealTimeProducts.bind(viewsController) );

router.get("/chat",viewsController.getMessages.bind(viewsController) );

router.get("/login", viewsController.getLogin.bind(viewsController) );

router.get("/register", viewsController.getRegister.bind(viewsController) );

router.get("/current", passport.authenticate("jwt", { session: false }),
viewsController.getCurrentUser.bind(viewsController)
);

export default router;
