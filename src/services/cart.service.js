import { cartRepository } from "../repositories/cart.repository.js";
import { productRepository } from "../repositories/products.repository.js";
import { ticketRepository } from "../repositories/ticket.respository.js";
import { userRepository } from "../repositories/user.repository.js";
import { v4 as uuid4 } from 'uuid';

class CartService {
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
                return { error: 'Carrito no encontrado.' };
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

    addProductToCart = async (id, productId, quantity = 1) => {
        try {
            const cart = await this.cartRepository.findOne(id);
            const parsedQuantity = Number(quantity);
            if (isNaN(parsedQuantity)) {
                return { error: `La cantidad ingresada no es válida.` };
            }

            if (!cart) {
                return { error: `No se encontró el carrito.` };
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
            return { error: `No se encontró el carrito.` };
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
                return {error: `No se encontró el carrito.`};
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
                return {error: `No se encontró el carrito.`};
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
                return { error: `No se encontró el carrito.`};
            }

            const item = cart.products.find((product) => product.product._id.toString() === productId.toString());
            if (!item) {
                return { error: `Producto con ID ${productId} no encontrado en el carrito` };
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