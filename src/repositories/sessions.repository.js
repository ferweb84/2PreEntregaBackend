import SessionManager from "../dao/dbManagers/sessions.js";

const sessionManager = new SessionManager();

class SessionRepository {
  async getUser(filter) {
    return sessionManager.getUser(filter);
  }
    // Crea un usuario en el sistema
    async createUser(user) {
        return sessionManager.createUser(user);
      }
    
      // Actualiza la información de un usuario
      async updateUser(userId, data) {
        return sessionManager.updateUser(userId, data);
      }
    
      // Elimina un usuario del sistema
      async deleteUser(userId) {
        return sessionManager.deleteUser(userId);
      }
    

  // Otros métodos del repositorio relacionados con las sesiones
}

export default SessionRepository;
