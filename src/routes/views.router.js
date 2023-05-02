import ProductManager from '../dao/dbManagers/productdbManager.js';
import CartdbManager from '../dao/dbManagers/cartdbManager.js';
import { Router } from "express";
import { checkLogged,checkLogin } from '../../middlewares/auth.js';

const router = Router();
const productmanager = new ProductManager();
const cartdbManager = new CartdbManager();
router.get("/products",checkLogin, async (req, res) => {
  const { limit = 2, page = 1, category, usable, sort } = req.query;
  const {
    docs: products,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
  } = await productmanager.getProducts(page, limit, category, usable, sort);
  res.render("products", {
    user:req.session.user,
    products,
    page,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,

  });
})

router.get("/product/:pid", checkLogin,async (req, res) => {
  const { pid } = req.params;
  const product = await productmanager.getProductsbyId(pid);
  res.render("product", {
    product,

  });
});
router.get("/cart/:cid", checkLogin,async (req, res) => {
  const { cid } = req.params;
  const cart = await cartdbManager.getCartsbyId(cid);
  res.render("cart", {
    cart,

  });
});


router.get("/", checkLogged ,(req, res) => {
  res.render("login");
});

router.get("/register", checkLogged, (req, res) => {
  res.render("register");
});

router.get("/products",checkLogin, (req, res) => {
  res.render("products", { user: req.session.user });
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



//user 

// router.get("/", async (req, res) => {
//   const users = await userManager.getUsers();
//   return res.send({ status: "Success", payload: users });
// });

// router.post("/", async (req, res) => {
//   const user = req.body;
//   const createdUser = await userManager.createUser(user);
//   if (!createdUser) {
//     return res
//       .status(400)
//       .send({ status: "error", error: "email already exists" });
//   }
//   return res.send({ status: "success", payload: createdUser });
// });

export default router;