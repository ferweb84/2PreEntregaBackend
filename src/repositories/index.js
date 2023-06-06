import {userDAO, cartDAO, userDAO, messageDAO, ticketDAO} from "../dao/factory.js";
import ProductRepository from "./product.repository.js";
import CartRepository from "./cart.repository.js";
import UserRepository from "./users.repository.js";
import TicketsRepository from "./tickets.respository.js";
import MessagesRepository from "./messages.repository.js";

export const productRepository = new ProductRepository(productDAO);
export const cartRepository = new CartRepository(cartDAO);
export const userRepository = new UserRepository(userDAO);
export const ticketsRepository= new TicketsRepository(ticketDAO);
export const MessagesRepository = new MessagesRepository(messageDAO)