import { ticketModel } from "../models/ticket.model.js";
class TicketRepository{
    constructor() {
        this.ticketModel=ticketModel;
    }
    create = async (ticket) => {
        try {
            return await this.ticketModel.create(ticket);
        } catch (error) {
            throw new Error(error);
        }
    };
}
export const ticketRepository = new TicketRepository()