import { Router } from 'express';
import { authentication } from '../../middlewares/authentication.js';
import { getProducts, home, login, profile, purchase, register, viewCart, viewProduct, restorePassword } from '../controllers/views.controller.js';
import { authorize } from '../../middlewares/authorization.js';
import passport from 'passport';

const router = Router();

router.get("/", passport.authenticate("current", {session: false, failureRedirect: '/login'}),home)
router.get("/products", passport.authenticate("current", {session: false, failureRedirect: '/login'}), getProducts);
router.get("/product/:productId",  passport.authenticate("current", {session: false, failureRedirect: '/login'}), viewProduct);
router.get("/cart/:cartId", passport.authenticate("current", {session: false, failureRedirect: '/login'}), authentication(true), viewCart);
router.get("/cart/:cartId/purchase",passport.authenticate("current", {session: false, failureRedirect: '/login'}), authentication(true), purchase);
router.get("/register", register);
router.get("/login", login);
router.get("/profile", authentication(true), authorize(['user']), profile);
router.get("/restore-password", restorePassword);

export default router;