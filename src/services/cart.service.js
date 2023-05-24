import CartRepository from "../repositories/cart.repository.js"

const cartRepository = new CartRepository();

class CartService {

    async addCart (cart){
        try {
          return await cartRepository.addCart(cart);
        } catch (error) {
          throw new Error(error.message);
        }
      }

      async addProductToCart (cartId, productId, quantity){
        try {
          return await cartRepository.addProductToCart(cartId, productId, quantity);
        } catch (error) {
          throw new Error(error.message);
        }
      }

      async addProductsToCart (cartId, products){
        try {
          return await cartRepository.addProductsToCart(cartId, products);
        } catch (error) {
          throw new Error(error.message);
        }
      }

      async getCarts (){
        try {
          return await cartRepository.getCarts();
        } catch (error) {
          throw new Error(error.message);
        }
        
      }

      async getCartById (cartId){
        try {
          return await cartRepository.getCartById(cartId);
        } catch (error) {
          throw new Error(error.message);
        }
      }

      async deleteProductFromCart (cartId, productId){
        try {
          return await cartRepository.deleteProductFromCart(cartId, productId);
        } catch (error) {
          throw new Error(error.message);
        }
      }

      async deleteAllProductsFromCart (cartId){
        try {
          return await cartRepository.deleteAllProductsFromCart(cartId);
        } catch (error) {
          throw new Error(error.message);
        }
      }

      async updateProductQuantityinCart (cartId,productId,quantity){
      try { await cartRepository.updateProductQuantityInCart(cartId,
        productId,
        quantity); 
      } catch(error){
    throw new Error (error.message);
}
}
}
export default CartService;