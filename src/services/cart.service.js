import CustomError from "../../errors/CustomError.js";
import { ErrorsCause, ErrorsMessage, ErrorsName } from "../../errors/error.enum.js";
import { cartRepository, productRepository, ticketRepository, userRepository } from "../repositories/index.js";

export class CartService {
    constructor(){
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
    }

    findAll = async () => {
        try {
            return this.cartRepository.findAll();
        } catch (error) {
            throw new Error(error);
        }
    };

    findOne = async (id) => {
        try {
            const result = await this.cartRepository.findOne(id);
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

    createCart = async (cart) => {
        try {
            return this.cartRepository.createCart(cart);
        } catch (error) {
            throw new Error(error);      
        }
    };

    addProductToCart = async (id, productId, quantity = 1, userId) => {
        try {
            const cart = await this.cartRepository.findOne(id);
            const parsedQuantity = Number(quantity);
            if (isNaN(parsedQuantity)) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.QUANTITY_NOT_VALID_MESSAGE,
                    cause: ErrorsCause.NOT_FOUND_CAUSE
                });
            }
            if (!cart) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.NOT_FOUND_CAUSE
                });
            }

            const user = await this.userRepository.findById(userId);

            if(!user) { 
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.USER_NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.USER_NOT_FOUND_CAUSE
                });
            }

            if(user.cart.toString() !== cart._id.toString()) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.USER_NOT_OWNER_OF_CART_MESSAGE,
                    cause: ErrorsCause.USER_NOT_OWNER_OF_CART_CAUSE
                });
            }
            
            const existingProductIndex = cart.products.findIndex(
                (product) => product.product && product.product._id.toString() === productId
            );  

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += parsedQuantity;
            } else {
                cart.products.push({ product: productId, quantity: parsedQuantity });
            }

            await this.cartRepository.saveCart(cart);
            return cart;

        } catch (error) {
            throw new Error(error);
        }
    };

    deleteProductFromCart = async (id, productId) => {
        try {
          const cart = await this.cartRepository.findOne(id);
          if (!cart) {
            CustomError.generateCustomError({
                name: ErrorsName.GENERAL_ERROR_NAME,
                message: ErrorsMessage.NOT_FOUND_MESSAGE,
                cause: ErrorsCause.NOT_FOUND_CAUSE
            });
          }
      
          cart.products = cart.products.filter(
            (item) => item.product._id.toString() !== productId
          );

          return await this.cartRepository.saveCart(cart);
        } catch (error) {
            console.log(error);
          throw new Error(error);
        }
    };

    deleteAllProductsFromCart = async (id) => {
        try {
            const cart = await this.cartRepository.findOne(id);
            if(!cart) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.NOT_FOUND_CAUSE
                });
            }
            cart.products = [];
            return await this.cartRepository.saveCart(cart);
        } catch (error) {
            throw new Error(error);
        }
    };

    putManyProductsInCart = async (id, products) => {
        try {
            const cart = await this.cartRepository.findOne(id);
            if(!cart) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.NOT_FOUND_CAUSE
                });
            }
            cart.products = products;
            return await this.cartRepository.saveCart(cart);
            
        } catch (error) {
            throw new Error(error);
        }
    };

    updateQuantityOfProduct = async (id, productId, quantity) => {
        try {
            const cart = await this.cartRepository.findOne(id);
            if(!cart) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.NOT_FOUND_CAUSE
                });
            }

            const item = cart.products.find((product) => product.product._id.toString() === productId.toString());
            if (!item) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.PRODUCT_NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.PRODUCT_NOT_FOUND_CAUSE
                });
            }
            
            item.quantity = quantity;
            if(item.quantity <= 0) {
                return item.quantity = 0;
            }
            return await this.cartRepository.saveCart(cart);

        } catch (error) {
            throw new Error(error);
        }
    };
};

export const cartService = new CartService();