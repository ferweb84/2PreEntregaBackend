import ProductRepository from "../repositories/product.repository.js";

const productRepository = new ProductRepository();

class ProductService {
  async getPaginatedProducts(options) {
    try {
      return await productRepository.getPaginatedProducts(options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(productId) {
    try {
      return await productRepository.getProductById(productId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProduct(product) {
    try {
      return await productRepository.addProduct(product);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(productId, changes) {
    try {
      return await productRepository.updateProduct(productId, changes);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(productId) {
    try {
      return await productRepository.deleteProduct(productId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ProductService;





// import {productsRepository} from "../repositories/product.repository.js";

// class ProductsService{
//     constructor(){}

//     getProducts () {
//         const products = productsRepository.getProducts();
//         return products;
//     }    

//     getProductById (productId) {
//         const product =productsRepository.find(productId);
//         return product;
//     }

//     addProduct (product){
//         const addProduct=productsRepository.addProduct(product);
//         return addProduct;
//     }
//     updateProduct (productId, product){
//         const updateProduct=productsRepository.updateProduct(productId,product)
//         return updateProduct;   
//     }
//     deleteProduct (productId){
//         const deleteProduct=productsRepository.deleteProduct(productId)
//         return deleteProduct;
//     }
// }

// export const ProductsService = new ProductsService();

