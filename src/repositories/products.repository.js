import { product } from "../dao/dbManagers/index.js";

export class ProductRepository {
    constructor(){
        this.manager = product;
    }

    findAll = async (page, filters = {}, options = {}) => {
        try {
          return await this.manager.getAll(page, filters, options);
        } catch (error) {
          throw new Error(error);
        }
    };

    findOne = async (id) => {
        try {
          return await this.manager.findOne(id);
        } catch (error) {
          throw new Error(error);
        }
    };

    addProduct = async (product) => {
      try {
        return await this.manager.addProduct(product);
      } catch (error) {
        throw new Error(error);
      }
    };

    findByCode = async (code) => {
      try {
        return await this.manager.findByCode(code);
      } catch (error) {
        throw new Error(error);
      }
    };

    updateProduct = async (id, product) => {
      try {
        return await this.manager.updateProduct(id, product);
      } catch (error) {
        throw new Error(error);
      }
    };

    saveProduct = async (product) => {
      try {
          return await this.manager.saveProduct(product);
      } catch (error) {
          throw new Error(error);
      }
    }

    deleteProduct = async (productId) => {
      try {
        return await this.manager.deleteProduct(productId);
      } catch (error) {
        throw new Error(error);
      }
    }
}