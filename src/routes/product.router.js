import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { uploader } from "../utils.js";

const router = Router();
const productController = new ProductController();

router.get("/", productController.getPaginatedProducts);
router.get("/:pid", productController.getProductById);
router.post("/", uploader.array("thumbnails", 5), productController.addProduct);
router.put("/:pid", productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);

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

