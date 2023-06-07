import { ticketModel } from '../dao/models/ticket.model.js';

class TicketRepository {
    constructor() {
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

export const ticketRepository = new TicketRepository();