import ViewsRepository from "../repositories/views.repository.js";

const viewsRepository = new ViewsRepository();

class ViewsService {
  async getPaginatedProducts(options) {
    return viewsRepository.getPaginatedProducts(options);
  }

  async getProductById(productId) {
    return viewsRepository.getProductById(productId);
  }

  async getCartById(cartId) {
    return viewsRepository.getCartById(cartId);
  }

  async getProducts() {
    return viewsRepository.getProducts();
  }

  async getMessages() {
    return viewsRepository.getMessages();
  }
}

export default ViewsService;
