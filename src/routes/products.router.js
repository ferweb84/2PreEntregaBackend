// import ProductManager from '../dao/fileManagers/ProductManager.js';
import { Router } from "express";
import { uploader } from './../utils.js';
import __dirname from "./../utils.js";
import { authentication } from "../../middlewares/authentication.js";
import { authorize } from "../../middlewares/authorization.js";
import { findAll, findOne, createProduct, updateProduct, deleteProduct,mockingProducts } from './../controllers/product.controller.js';

const router = Router();

router.get('/', findAll);
router.get('/:productId', findOne);
router.post('/', authentication(), authorize(['admin']), uploader.array('thumbnails'), createProduct);
router.put('/:productId', authentication(), authorize(['admin']), updateProduct);
router.delete('/:productId', authentication(), authorize(['admin']), deleteProduct);
router.post("/mockingproducts", mockingProducts);
export default router;