import { productRepository } from "../repositories/products.repository.js";
import CustomError from "../../errors/CustomError.js";
import { ErrorsCause,ErrorsMessage,ErrorsName } from "../../errors/error.enum.js";

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
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.NOT_FOUND_CAUSE
                });
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
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.MISSING_FIELDS_MESSAGE,
                    cause: ErrorsCause.MISSING_FIELDS_CAUSE
                });
            }

            const existingProduct = await this.productRepository.findByCode(product.code);
            if (existingProduct) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.CODE_ALREADY_EXIST_MESSAGE,
                    cause: ErrorsCause.CODE_ALREADY_EXIST_CAUSE,
                });
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
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.NOT_FOUND_CAUSE
                });
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
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.MISSING_FIELDS_MESSAGE,
                    cause: ErrorsCause.MISSING_FIELDS_CAUSE
                });
            }

            const existingProduct = await this.productRepository.findByCode(product.code);
            if (existingProduct) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.CODE_ALREADY_EXIST_MESSAGE,
                    cause: ErrorsCause.CODE_ALREADY_EXIST_CAUSE,
                });
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
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.NOT_FOUND_CAUSE
                });
            }
            return await productRepository.deleteProduct(id);
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const productService = new ProductService();