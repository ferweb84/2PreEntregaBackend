import { productsRepository } from "../repositories/product.repository.js";
import { cartRepository } from "../repositories/cart.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import { ticketRepository } from "../repositories/ticket.repository.js";
import { faker } from "@faker-js/faker"

const today = new Date()
const date_time = today.toLocaleString()
class TicketService {

    constructor() {
        this.ticketRepository = ticketRepository,
            this.productsRepository = productsRepository,
            this.cartRepository = cartRepository,
            this.userRepository = userRepository
    }
    createTickettoCart = async (cartId) => {

        try {

            try {
                const cart = await this.cartRepository.getCartsbyId(cartId);
                const user = await this.userRepository.findByCartId(cartId);
                if(!cart)
                {
                    return {error: `Cart not founded`}
                }
    
                if(!user)
                {
                    return {error: `User not founded`}
                }
    
                let amount = 0;
                const code = faker.string.alphanumeric(5);
                const date= new Date()
                const purchase_datetime = date.toLocaleString();
                let products = [];
                let unsuccessfulProducts = [];
    
                for (const item of cart.products) {
                    const product = await this.productsRepository.productModel.findOne(item.productId._id);
                    const quantity = item.quantity;
                    const price = item.productId.price;
              
                    if (!product) {
           
                      unsuccessfulProducts.push(item.productId);
                      continue;
                    }
              
                    if (product.stock < quantity) {
            
                      unsuccessfulProducts.push({
                        product: item.productId,
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
    
                    
                    amount += price * quantity;
                }
                const purchaser = user.email;
    
                const ticketFinal = {
                    code,
                    purchase_datetime,
                    successProducts: products,
                    unsuccessfulProducts: unsuccessfulProducts,
                    amount,
                    purchaser
                };
    
                if(ticketFinal.unsuccessfulProducts.length > 0) {
                    return {
                        error: `Products without stock`,
                        unsuccessfulProducts: unsuccessfulProducts,
                    };
                }
    
                if(ticketFinal.successProducts.length <= 0) {
                    return {
                        error: `The cart is empty`
                    }
                }
    
                const createdTicket = await this.ticketRepository.create(ticketFinal);
                if(unsuccessfulProducts.length > 0) {
                    const unsuccessfulProductIds = unsuccessfulProducts.map(
                        (item) => item.product._id.toString()
                    );
    
                    cart.products = cart.products.filter(
                        (item) => !unsuccessfulProductIds.includes(item.productId.toString())
                    );
                   
                } else {
                    cart.products = [];
 
                        await this.cartRepository.updatetheCart(cart._id, cart);
                }
    
                if(createdTicket) {
                    return ticketFinal;
                } else {
                    return {error: `The ticket cannot be create`};
                }
            } catch (error) {
                throw new Error(error);
            }
        }
        catch (error) {
            console.error(error)
        }
    }
}
export const ticketService = new TicketService()