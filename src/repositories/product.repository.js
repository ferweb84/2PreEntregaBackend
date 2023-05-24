import ProductManager from "../dao/dbManagers/products.js";

const productManager = new ProductManager();

class ProductRepository {
  async getPaginatedProducts(options) {
    try {
      return await productManager.getPaginatedProducts(options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(productId) {
    try {
      return await productManager.getProductById(productId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProduct(product) {
    try {
      return await productManager.addProduct(product);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(productId, changes) {
    try {
      return await productManager.updateProduct(productId, changes);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(productId) {
    try {
      return await productManager.deleteProduct(productId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ProductRepository;






// class ProductsRepository{
//     constructor(){
//         this.products = [];
//     }
//     getProducts(){
//         return this.products;
//     }

//     getProductById(productId){
//         this.products.find((product) => product.id === productId);}


//     addProduct(product){
//         this.products.push(product);
//         return product;
//     }
//      updateProduct(productId, changes) {
//     const productIndex = this.products.findIndex((product) => product.id === productId);
//     if (productIndex !== -1) {
//       this.products[productIndex] = { ...this.products[productIndex], ...changes };
//       return this.products[productIndex];
//     }
//     return null;
//   }
//     deleteProduct(productId){
//         const productIndex = this.products.findIndex((product) => product.id === productId);
//         if (productIndex !== -1) {
//           const deletedProduct = this.products[productIndex];
//           this.products.splice(productIndex, 1);
//           return deletedProduct;
//         }
//         return null;
//       }
// }

// const productsRepository = new ProductsRepository();