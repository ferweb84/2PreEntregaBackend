import { Router } from "express";
import { authorize } from "../../middlewares/authorization.js";
import { addProductToCart, createCart, deleteAllProductsFromCart, deleteProductFromCart, findAll, findOne, purchase, putManyProductsInCart, updateQuantityOfProduct } from "../controllers/cart.controller.js";
import { authentication } from "../../middlewares/authentication.js";
const router = Router();

router.get('/', findAll);
router.get('/:cartId', findOne);
router.post('/', createCart);
router.post('/:cartId/products/:productId', authentication(), authorize(['user', 'admin', 'premium']), addProductToCart);
router.delete('/:cartId/products/:productId', authentication(), authorize(['user', 'admin', 'premium']), deleteProductFromCart);
router.delete('/:cartId', authentication(), authorize(['user', 'admin', 'premium']), deleteAllProductsFromCart);
router.put('/:cartId', authentication(), authorize(['user', 'admin', 'premium']), putManyProductsInCart);
router.put('/:cartId/products/:productId', authentication(), authorize(['user', 'admin', 'premium']), updateQuantityOfProduct);
router.get('/:cartId/purchase', authentication(), authorize(['user', 'admin', 'premium']), purchase);
export default router;