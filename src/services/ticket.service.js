import { ticketRepository } from '../repositories/ticket.respository.js';
import { cartRepository } from './../repositories/cart.repository.js';
import { v4 as uuid4 } from 'uuid';
import { userRepository } from '../repositories/user.repository.js';
import { productRepository } from '../repositories/products.repository.js';

class TicketService {
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
                return {error: `No se encontró el carrito.`}
            }

            if(!user)
            {
                return {error: `No se encontró el usuario.`}
            }

            let totalAmmount = 0;
            const code =  uuid4();
            const purchase_datetime = Date.now();
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
                return {
                    error: `El carrito está vacío.`
                }
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
                return {error: `No se pudo crear el ticket`};
            }
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const ticketService = new TicketService();