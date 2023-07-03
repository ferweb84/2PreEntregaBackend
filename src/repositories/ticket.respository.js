import { ticket } from "../dao/dbManagers/index.js"

export class TicketRepository {
    constructor() {
        this.manager = ticket;
    }

    create = async (ticket) => {
        try {
            return await this.manager.create(ticket);
        } catch (error) {
            throw new Error(error);
        }
    };
}
