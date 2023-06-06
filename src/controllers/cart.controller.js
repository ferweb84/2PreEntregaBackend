import CartService from "../services/cart.service.js";

const cartService= new CartService();

class CartController{

    async createTicket (req, res) {
      try {
        const { cid } = req.params;
    
        if (!cid) {
          return res.status(400).send({
            status: "error",
            error: "Incomplete values",
          });
        }
    
        const newTicket = await ticketsService.createTicket(cid);
    
        if (!newTicket) {
          return res.status(404).send({
            status: "error",
            error: "Failed to create ticket",
          });
        }
    
        res.status(201).send({ status: "success", payload: newTicket });
      } catch (error) {
        console.log(`Failed to create ticket with mongoose ${error}`);
        return res
          .status(500)
          .send({ status: "error", error: "Failed to create ticket" });
      }
    };

    async createCart(req, res){
      try{
        const cart = req.body;
        if (!cart) {
          return res
            .status(400)
            .send({ status: "Error", error: "Cart could not be added" });
        }
      
        const newCart = await cartService.addCart(cart);
        return res.send({
          status: "OK",
          message: "Cart added successfully",
          payload: newCart,
        });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
    async addProductToCart (req, res) {
      try{
        const cartId = req.params.cid;
        const productId = req.params.pid;
      
        const { quantity } = req.body;
      
        const newProduct = await cartService.addProductToCart(cartId, productId, quantity);
      
        if (!newProduct) {
          return res
            .status(404)
            .send({ status: "Error", error: "Product could not be found" });
        }
        return res.send({
          status: "OK",
          message: "Product successfully added to the cart",
          payload: newProduct,
        });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
    async addProductsToCart (req, res) {
      try{
        const cartId = req.params.cid;
        const products = req.body;
      
        const updatedCart = await cartService.addProductsToCart(cartId, products);
        if (!updatedCart)
          return res.status(400).send({ status: "error", error: "error" });
      
        return res.send({ status: "sucess", message: "cart updated" });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
    async getAllCarts (req, res)  {
      try{ 
        const carts = await cartService.getCarts();
        return res.send({ status: "success", payload: carts });
      }catch (error) {
          return res.status(500).json({ error: error.message });
        }
    }      
    async getCartById (req, res) {
      try{
        const cartId = req.params.cid;
        const cart = await cartService.getCartById(cartId);
      
        if (!cart) {
          return res.status(404).send({
            status: "Error",
            error: "cart was not found",
          });
        }
        return res.send({ status: "OK", message: "Cart found", payload: cart });
      }catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }

    async deleteProductFromCart (req, res)  {
      try{
        const cartId = req.params.cid;
        const productId = req.params.pid;
      
        const updatedCart = await cartService.deleteProductFromCart(cartId, productId);
      
        if (!updatedCart)
          return res
            .send(404)
            .send({ status: "error", error: "product was not found" });
      
        return res.send({ status: "sucess", message: "product deleted from cart" });
      } catch(error) {
        return res.status(500).json({ error: error.message });
      }
    }

    async deleteAllProductsFromCart (req, res)  {
      try{
        const cartId = req.params.cid;
      
        const updatedCart = await cartService.deleteAllProductsFromCart(cartId);
      
        if (!updatedCart)
          return res.status(404).send({ status: "error", error: "cart not found" });
      
        return res.send({
          status: "sucess",
          message: "deleted all products from cart",
        });
      }catch (error){
        return res.status(500).json ({error: error.message});
      }
    }

    async updateProductQuantityInCart (req, res)  {
    try{
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body;
      
        const updatedCart = await cartService.updateProductQuantityInCart(
          cartId,
          productId,
          quantity
        );
      
        if (!updatedCart)
          return res.status(400).send({ status: "error", error: "error" });
      
        return res.send({ status: "sucess", message: "cart updated" });
    }catch(error){
      return res.status(500).json({error:error.message});
    }
  }
}

export default CartController;