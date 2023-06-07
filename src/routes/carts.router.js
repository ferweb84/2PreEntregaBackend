import { Router } from "express";
import { authorize } from "../../middlewares/authorization.js";
import { addProductToCart, createCart, deleteAllProductsFromCart, deleteProductFromCart, findAll, findOne, purchase, putManyProductsInCart, updateQuantityOfProduct } from "../controllers/cart.controller.js";
import { authentication } from "../../middlewares/authentication.js";
const router = Router();

router.get('/', findAll);
router.get('/:cartId', findOne);
router.post('/', createCart);
router.post('/:cartId/products/:productId', authentication(), authorize(['user']), addProductToCart);
router.delete('/:cartId/products/:productId', authentication(), authorize(['user']), deleteProductFromCart);
router.delete('/:cartId', authentication(), authorize(['user']), deleteAllProductsFromCart);
router.put('/:cartId', authentication(), authorize(['user']), putManyProductsInCart);
router.put('/:cartId/products/:productId', authentication(), authorize(['user']), updateQuantityOfProduct);
router.get('/:cartId/purchase', authentication(), authorize(['user']), purchase);
export default router;