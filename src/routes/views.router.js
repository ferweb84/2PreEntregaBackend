import ProductManager from '../dao/dbManagers/productdbManager.js';
import CartdbManager from '../dao/dbManagers/cartdbManager.js';
import { Router } from "express";


const router = Router();
const productmanager=new ProductManager();
const cartdbManager= new CartdbManager();
router.get("/", async (req, res) => {
    const { limit = 2, page = 1, category, usable, sort } = req.query;
    const {
      docs: products,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
    } = await productmanager.getProducts(page, limit, category, usable, sort);
    res.render("products", {
      products,
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,

    });
})

router.get("/product/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productmanager.getProductsbyId(pid);
  res.render("product", {
    product,
    
  });
});
router.get("/cart/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartdbManager.getCartsbyId(cid);
  res.render("cart", {
    cart,

  });
});

//cookies

router.get("/", (req, res) => {
  res.render("home", { title: "home" });
});

router.post("/createCookie", (req, res) => {
  const data = req.body;

  return res
    .cookie("CoderCookie", data, { maxAge: 10000 })
    .send({ status: "success", message: "cookie set" });
});


export default router;