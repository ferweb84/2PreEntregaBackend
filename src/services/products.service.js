import { productRepository } from "../repositories/products.repository.js";

class ProductService {
    constructor(){
        this.productRepository = productRepository;
    }

    findAll = async (page, filters = {}, options = {}) => {
        try {
          return await this.productRepository.findAll(page, filters, options);
        } catch (error) {
          throw new Error(error);
        }
    };

    findOne = async (id) => {
        try {
            const result = await this.productRepository.findOne(id);
            if(!result) {
                return { error: 'Producto no encontrado.' };
            }
            return result;
        } catch (error) {
            throw new Error(error);
        }
    };

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
                return { error: 'Debes ingresar todos los campos para crear el producto.' };
            }

            const existingProduct = await this.productRepository.findByCode(product.code);
            if (existingProduct) {
                return { error: `El código ingresado ya existe.` };
            }

            return await this.productRepository.addProduct(product);

        } catch (error) {
            throw new Error(error);
        }
    };

    updateProduct = async (id, product) => {
        try {
            const productExists = await productRepository.findOne(id);
            if(!productExists) {
                return { error: 'Producto no encontrado.' };
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

            const existingProduct = await this.productRepository.findByCode(product.code);
            if (existingProduct) {
                return { error: `El código ingresado ya existe.` };
            }

            return await productRepository.updateProduct(id, product);
        } catch (error) {
            throw new Error(error);
        }
    };

    deleteProduct = async (id) => {
        try {
            const existingProduct = productRepository.findOne(id);
            if(!existingProduct) {
                return { error: 'Producto no encontrado.' };
            }

            return await productRepository.deleteProduct(id);
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const productService = new ProductService();