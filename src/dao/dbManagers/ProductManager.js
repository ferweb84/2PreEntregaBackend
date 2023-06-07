import { productModel } from '../models/product.model.js';
import fs from "fs";

export default class ProductManager {
    constructor(){}

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
          return { error: error.message };
        }
      };        

    findOne = async (id) => {
        try {
            const product = await productModel.findOne({_id: id});
            if(!product) {
                return {error: `No se encontró el producto.`};
            }
            return product;
        } catch (error) {
            return {error: error.message};
        }
    }

    addProduct = async (product) => {
        try {
            if (
                !product.title ||
                !product.description ||
                product.price === undefined ||
                product.status === undefined ||
                !product.code ||
                product.stock === undefined ||
                !product.category
              ) {
                return { error: "Debes ingresar todos los campos para crear el producto." };
              }
            const products = await productModel.find();
            if(products.some(p => p.code === product.code)) {
                return {error: `El código ingresado ya existe.`};
            }
            await productModel.create(product);
        } catch(error) {
            return {error: error.message};
        }
    }

    updateProduct = async (id, product) => {
        try {
            const productExists = await productModel.findOne({_id: id});
            if(!productExists) {
                return {error: `No se encontró el producto.`}; 
            }

            if (
                !product.title ||
                !product.description ||
                product.price === undefined ||
                product.status === undefined ||
                !product.code ||
                product.stock === undefined ||
                !product.category
              ) {
                return { error: "Debes ingresar todos los campos para actualizar el producto." };
              }

            const products = await productModel.find();
            if(products.some(p => p.code === product.code)) {
                return {error: `El código ingresado ya existe.`};
            }
            return await productModel.updateOne({_id: id}, product);
        } catch (error) {
            return {error: error.message};
        }
    }

    deleteProduct = async (id) => {
        try {
            return await productModel.deleteOne({_id: id});
        } catch (error) {
            return {error: error.message};
        }
    }
    
}