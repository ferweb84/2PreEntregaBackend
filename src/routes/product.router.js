import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { uploader } from "../utils.js";
// import { verifyRole } from "../middlewares/auth.js";

const router = Router();
const productController = new ProductController();

router.get("/", productController.getPaginatedProducts);
router.get("/:pid", productController.getProductById);
router.post("/",(req, res, next) => verifyRole(req, res, next, "admin"), uploader.array("thumbnails", 5), productController.addProduct);
router.put("/:pid",(req, res, next) => verifyRole(req, res, next, "admin"), productController.updateProduct);
router.delete("/:pid",(req, res, next) => verifyRole(req, res, next, "admin"), productController.deleteProduct);

export default router;




// import { Router } from "express";
// import { uploader } from "../utils.js";
// import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

// const router = Router();


// router.get("/",getProducts);

// router.get("/:pid",getProductById);

// router.post("/", uploader.array("thumbnails", 5),addProduct);

// router.put("/:pid",updateProduct);

// router.delete("/:pid",deleteProduct);

// export default router;

