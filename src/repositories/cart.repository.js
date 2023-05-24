import CartManager from "../dao/dbManagers/carts.js";

const cartManager = new CartManager();

class CartRepository {
  async addCart(cart) {
    try {
      return await cartManager.addCart(cart);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      return await cartManager.addProduct(cartId, productId, quantity);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProductsToCart(cartId, products) {
    try {
      return await cartManager.addProducts(cartId, products);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCarts() {
    try {
      return await cartManager.getCarts();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getCartById(cartId) {
    try {
      return await cartManager.getCartById(cartId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProductFromCart(cartId,productId) {
    try {
      return await cartManager.deleteProduct(cartId,productId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
      return await cartManager.deleteAllProducts(cartId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updateProductQuantityInCart(cartId,productId,quantity) {
    try {
      return await cartManager.updateProductQuantity(cartId,productId,quantity);
    } catch (error) {
      throw new Error(error.message);
    }
  } 
}

export default CartRepository;