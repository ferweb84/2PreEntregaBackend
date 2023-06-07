import { Router } from 'express';
import { authentication } from '../../middlewares/authentication.js';
import { getProducts, home, login, profile, purchase, register, viewCart, viewProduct } from '../controllers/views.controller.js';
import { authorize } from '../../middlewares/authorization.js';

const router = Router();

router.get("/", home)
router.get("/products", getProducts);
router.get("/product/:productId", viewProduct);
router.get("/cart/:cartId", authentication(true), viewCart);
router.get("/cart/:cartId/purchase", authentication(true), purchase);
router.get("/register", register);
router.get("/login", login);
router.get("/profile", authentication(true), authorize(['user']), profile);

export default router;