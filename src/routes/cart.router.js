import { Router } from "express";
// import { verifyRole } from "../middlewares/auth.js";
import CartController from "../controllers/cart.controller.js";

const router = Router();
const cartController = new CartController();

// Creates a cart
router.post("/",(req,res,next)=> verifyRole (req,res,next,"admin"),cartController.createCart);

// Adds a product to a cart
router.post("/:cid/product/:pid",(req,res,next)=> verifyRole (req,res,next,"user"),cartController.addProductToCart);
////////
router.post("/:cid/purchase",(req,res,next)=> verifyRole (req,res,next,"user"),cartController.createTicket);

// Adds multiple products to a cart
router.post("/:cid",cartController.addProductsToCart);

// Gets all carts
router.get("/",cartController.getAllCarts);

// Gets a cart by id
router.get("/:cid",cartController.getCartById);

////////
// router.put("/:cid/updateCart",cartController.updateCart);

// Updates a product's quantity inside a cart
router.put("/:cid/product/:pid",cartController.updateProductQuantityInCart);


// Deletes all products from a cart
router.delete("/:cid",(req, res, next) => verifyRole(req, res, next, "admin"),cartController.deleteAllProductsFromCart);

// Deletes an specific product from a cart
router.delete("/:cid/product/:pid",cartController.deleteProductFromCart );

export default router;
