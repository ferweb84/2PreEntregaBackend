import ProductManager from "../dao/dbManagers/products.js";
import CartManager from "../dao/dbManagers/carts.js";
import MessageManager from "../dao/dbManagers/messages.js";

const productManager = new ProductManager();
const cartManager = new CartManager();
const messageManager = new MessageManager();

class ViewsRepository {
  async getPaginatedProducts(options) {
    const {
      docs: products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
    } = await productManager.getPaginatedProducts(options);

    return {
      products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
    };
  }

  async getProductById(productId) {
    return productManager.getProductById(productId);
  }

  async getCartById(cartId) {
    return cartManager.getCartById(cartId);
  }

  async getProducts() {
    return productManager.getProducts();
  }

  async getMessages() {
    return messageManager.getMessages();
  }
}

export default ViewsRepository;
