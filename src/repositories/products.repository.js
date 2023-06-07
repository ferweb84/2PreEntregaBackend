import { productModel } from '../dao/models/product.model.js';

class ProductRepository {
    constructor(){
        this.model = productModel;
    }

    findAll = async (page, filters = {}, options = {}) => {
        try {
          const { limit = 10 } = options;
    
          const query = {};
    
          if ('category' in filters) {
            query.category = filters.category;
          }
    
          if ('status' in filters) {
            query.status = filters.status;
          }
    
          const result = await productModel.paginate(query, {
            ...options,
            page: page,
            limit: parseInt(limit),
          });
    
          return result;
        } catch (error) {
          throw new Error(error);
        }
    };

    findOne = async (id) => {
        try {
          return await productModel.findById(id);
        } catch (error) {
          throw new Error(error);
        }
    };

    addProduct = async (product) => {
      try {
        return await productModel.create(product);
      } catch (error) {
        throw new Error(error);
      }
    };

    findByCode = async (code) => {
      try {
        return await productModel.findOne({ code });
      } catch (error) {
        throw new Error(error);
      }
    };

    updateProduct = async (id, product) => {
      try {
        return await productModel.updateOne({_id: id}, product);
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
}

export const productRepository = new ProductRepository();