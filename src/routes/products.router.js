// import ProductManager from '../dao/fileManagers/ProductManager.js';
import { Router } from "express";
import { uploader } from '../dirname.js';
import { getProducts,getProductsbyId,addProducts,updateProducts,deleteProducts} from "../controllers/products.controller.js";
import { authorize } from "../../middlewares/auth.js";
import passport from "passport";
const router = Router();


router.get("/", getProducts);
router.get("/:pid",passport.authenticate("jwt",{session:false}), getProductsbyId);
// router.post("/",createProductpremium,uploader.array("thumbnails"),addProducts);
router.post("/",passport.authenticate("jwt",{session:false}),authorize(['admin', 'premium']),uploader.array("thumbnails"),addProducts)
// router.put("/:pid",createProductpremium,uploader.array("thumbnails"),updateProducts);
// router.delete("/:pid",createProductpremium, deleteProducts);
router.put("/:pid",passport.authenticate("jwt",{session:false}),uploader.array("thumbnails"),updateProducts);
router.delete("/:pid",passport.authenticate("jwt",{session:false}),authorize(['admin','premium']),deleteProducts);
export default router;