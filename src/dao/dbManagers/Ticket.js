import { ticketModel } from "./../models/ticket.model.js";

export class Ticket {
    constructor(){
        this.model = ticketModel;
    }

    create = async (ticket) => {
        try {
            return await this.model.create(ticket);
        } catch (error) {
            throw new Error(error);
        }
    };
}