import { cartRepository, productRepository, ticketRepository, userRepository } from "../repositories/index.js";
import { v4 as uuid4 } from 'uuid';
import CustomError from '../../errors/CustomError.js';
import { ErrorsCause,ErrorsName,ErrorsMessage } from '../../errors/enums/ticket.error.enum.js';

export class TicketService {
    constructor(){
        this.ticketRepository = ticketRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }

    createTicket = async (cartId) => {
        try {
            const cart = await this.cartRepository.findOne(cartId);
            const user = await this.userRepository.findByCartId(cartId);
            if(!cart)
            {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.CART_NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.CART_NOT_FOUND_CAUSE
                });
            }

            if(!user)
            {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.USER_NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.USER_NOT_FOUND_CAUSE
                });
            }

            let totalAmmount = 0;
            const code =  uuid4();
            const purchase_datetime = Date.now();
            const created_at = Date.now();
            let products = [];
            let unsuccessfulProducts = [];

            for (const item of cart.products) {
                const product = await this.productRepository.findOne(item.product._id);
                const quantity = item.quantity;
                const price = item.product.price;
          
                if (!product) {
                  // Si el producto no existe, agregarlo a los productos no exitosos
                  unsuccessfulProducts.push(item.product);
                  continue;
                }
          
                if (product.stock < quantity) {
                  // Si no hay suficiente stock, agregarlo a los productos no exitosos
                  unsuccessfulProducts.push({
                    product: item.product,
                    quantity: quantity
                  });
                  continue;
                }
          
                // Restar la cantidad del stock del producto
                product.stock -= quantity;
                await product.save();
          
                // Agregar el producto a la lista de productos exitosos
                products.push({
                  product: product,
                  quantity: quantity,
                });

                
                totalAmmount += price * quantity;
            }
            const purchaser = user.email;

            const ticket = {
                code,
                created_at,
                purchase_datetime,
                successProducts: products,
                unsuccessfulProducts: unsuccessfulProducts,
                totalAmmount,
                purchaser
            };

            if(ticket.unsuccessfulProducts.length > 0) {
                return {
                    error: `Productos sin stock suficiente para realizar la compra.`,
                    unsuccessfulProducts: unsuccessfulProducts,
                };
            }

            if(ticket.successProducts.length <= 0) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.EMPTY_CART_MESSAGE,
                    cause: ErrorsCause.USER_NOT_FOUND_CAUSE
                });
            }

            const createdTicket = await this.ticketRepository.create(ticket);
            if(unsuccessfulProducts.length > 0) {
                const unsuccessfulProductIds = unsuccessfulProducts.map(
                    (item) => item.product._id.toString()
                );

                cart.products = cart.products.filter(
                    (item) => !unsuccessfulProductIds.includes(item.product.toString())
                );
                await this.userRepository.saveUser(user);
            } else {
                cart.products = [];
                await this.cartRepository.saveCart(cart);
            }

            if(createdTicket) {
                return ticket;
            } else {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.CANNOT_CREATE_TICKET_MESSAGE,
                    cause: ErrorsCause.CANNOT_CREATE_TICKET_CAUSE
                });
            }
        } catch (error) {
            throw new Error(error);
        }
    };
}

