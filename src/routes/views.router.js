import ProductManager from '../dao/dbManagers/productdbManager.js';
import CartdbManager from '../dao/dbManagers/cartdbManager.js';
import { Router } from "express";

//llamamos a Router y lo vamos a colocar en una variable router con minuscula 
const router = Router();
const productmanager=new ProductManager();
const cartdbManager= new CartdbManager();
router.get("/", async (req, res) => {
    const { limit = 5, page = 1, category, usable, sort } = req.query;
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

// creamos una ruta que nos permita renderizar la vista que se llama cart
router.get("/cart/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartdbManager.getCartsbyId(cid);
  res.render("cart", {
    cart,

  });
});
//En la plantilla que contiene a chat (html) hay una variable que se llama Title y le doy un valor de Chat, ya creada amos a importarla a App


//nunca olvidar de exportar 
export default router;