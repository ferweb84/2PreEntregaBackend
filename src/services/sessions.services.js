import SessionRepository from "../repositories/sessions.repository.js";
import { isValidPassword } from "../utils.js";

const sessionRepository = new SessionRepository();

class SessionService {
  async getUser(filter) {
    return sessionRepository.getUser(filter);
  }

  isValidPassword(user, password) {
    return isValidPassword(user, password);
  }

  // Crea un usuario en el sistema
  async createUser(user) {
    return sessionRepository.createUser(user);
  }

  // Actualiza la información de un usuario
  async updateUser(userId, data) {
    return sessionRepository.updateUser(userId, data);
  }

  // Elimina un usuario del sistema
  async deleteUser(userId) {
    return sessionRepository.deleteUser(userId);
  }

  // Otros métodos relacionados con las sesiones


}

export default SessionService;
