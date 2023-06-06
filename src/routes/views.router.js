import { Router } from "express";
import passport from "passport";
import ProductManager from "../dao/dbManagers/products.js";
import MessageManager from "../dao/dbManagers/messages.js";
import CartManager from "../dao/dbManagers/carts.js";
import ViewsController from "../controllers/views.controller.js";
// import { checkLogged, isProtected, verifyRole } from "../middlewares/auth.js";


const router = Router();
const viewsController = new ViewsController();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  viewsController.getHome.bind(viewsController)
);

router.get(
  "/profile", 
  passport.authenticate("jwt", { session: false }),
  viewsController.getHome.bind(viewsController)
);
router.get(
  "/restore",viewsController.getHome.bind(viewsController)
);
router.get(
  "/home",viewsController.getHome.bind(viewsController)
);

router.get("/product/:pid",passport.authenticate("jwt", { session: false }),viewsController
.getProduct.bind(viewsController));


router.get("/cart",viewsController.getCart.bind(viewsController) );

router.get("/cart/cid",passport.authenticate("jwt", { session: false }),viewsController.getCart.bind(viewsController) );

router.get("/tickets", 
(req,res,next)=>verifyRole(req,res,next,"user"),
passport.authenticate("jwt", { session: false }),
)
router.get("/realtimeproducts",passport.authenticate("jwt", { session: false }),viewsController.getRealTimeProducts.bind(viewsController) );

router.get("/chat",passport.authenticate("jwt", { session: false }),viewsController.getMessages.bind(viewsController) );

router.get("/login", viewsController.getLogin.bind(viewsController) );

router.get("/register",  viewsController.getRegister.bind(viewsController) );

router.get("/current", passport.authenticate("jwt", { session: false }),
viewsController.getCurrentUser.bind(viewsController)
);

export default router;
