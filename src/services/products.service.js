import { productRepository, userRepository } from "../repositories/index.js";
import CustomError from "../../errors/CustomError.js";
import { ErrorsCause,ErrorsMessage,ErrorsName } from "../../errors/enums/product.error.enums.js";

export class ProductService {
    constructor(){
        this.productRepository = productRepository;
        this.userRepository = userRepository;
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

    addProduct = async (product, userId) => {
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
            let owner = null;

            if(userId) {
                const user = await this.userRepository.findById(userId);
                if(user.role === 'premium') {
                    owner = user._id;
                } else {
                    owner = null;
                }
            }

            product.owner = owner;

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

    updateProduct = async (id, product, userId) => {
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
            let owner = null;

            if(userId) {
                const user = await this.userRepository.findById(userId);
                if(user.role === 'premium') {
                    owner = user._id;
                } else {
                    owner = null;
                }
            }

            product.owner = owner;

            return await productRepository.updateProduct(id, product);
        } catch (error) {
            throw new Error(error);
        }
    };

    deleteProduct = async (id, userId) => {
        try {
            const existingProduct = productRepository.findOne(id);
            if(!existingProduct) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.NOT_FOUND_CAUSE
                });
            }

            if(userId) {
                const user = await this.userRepository.findById(userId);
                if(user.role === 'premium' && existingProduct.owner !== user._id) {
                    CustomError.generateCustomError({
                        name: ErrorsName.GENERAL_ERROR_NAME,
                        message: ErrorsMessage.USER_NOT_OWNER_MESSAGE,
                        cause: ErrorsCause.USER_NOT_OWNER_CAUSE,
                    });
                }
            } else {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.NOT_GET_USER_ID_MESSAGE,
                    cause: ErrorsCause.NOT_GET_USER_ID_CAUSE,
                });
            }

            return await this.productRepository.deleteProduct(id);
        } catch (error) {
            throw new Error(error);
        }
    };
}
