import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const router = Router();
const cartController = new CartController();

// Creates a cart
router.post("/",cartController.createCart);

// Adds a product to a cart
router.post("/:cid/product/:pid",cartController.addProductToCart);

// Adds multiple products to a cart
router.post("/:cid",cartController.addProductsToCart);

// Gets all carts
router.get("/",cartController.getAllCarts);

// Gets a cart by id
router.get("/:cid",cartController.getCartById);

// Deletes an specific product from a cart
router.delete("/:cid/product/:pid",cartController.deleteProductFromCart );

// Deletes all products from a cart
router.delete("/:cid",cartController.deleteAllProductsFromCart);

// Updates a product's quantity inside a cart
router.put("/:cid/product/:pid",cartController.updateProductQuantityInCart);

export default router;
