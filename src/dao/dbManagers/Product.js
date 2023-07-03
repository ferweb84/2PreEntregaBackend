import { productModel } from '../models/product.model.js';
import fs from "fs";

export  class Product {
    constructor(){
      this.model = productModel;
    }

    getAll = async (page, filters = {}, options = {}) => {
        try {
          const { limit = 10 } = options;
      
          const query = {};
      
          if ('category' in filters) {
            query.category = filters.category;
          }
      
          if ('status' in filters) {
            query.status = filters.status;
          }
      
          const result = await this.model.paginate(query, {
            ...options,
            page: page,
            limit: parseInt(limit),
          });
      
          return result;
        } catch (error) {
          return { error: error.message };
        }
      };        

    findOne = async (id) => {
        try {
            return await this.model.findById(id);
            
        } catch (error) {
            return {error: error.message};
        }
    }

    addProduct = async (product) => {
      try {
        return await this.model.create(product);
      } catch (error) {
        throw new Error(error);
      }
    };

    findByCode = async (code) => {
      try {
        return await this.model.findOne({ code });
      } catch (error) {
        throw new Error(error);
      }
    };

    updateProduct = async (id, product) => {
      try {
        return await this.model.updateOne({_id: id}, product);
      } catch (error) {
        throw new Error(error);
      }
    };

    saveProduct = async (product) => {
      try {
          return await product.save();
      } catch (error) {
          throw new Error(error);
      }
    }


    deleteProduct = async (productId) => {
      try {
        return await this.model.findByIdAndDelete(productId);
      } catch (error) {
        throw new Error();
      }
    }
    
}