import userDAO from "../dao/factory.js"


export default class UsersRepository {
  constructor(dao){
    this.dao=dao;
  }

  getUsers=async()=>{
    const users =await this.dao.getUsers();
    return users;
  };

  getUserById = async (id) => {
    
    try {
      
      const user = await userDAO.getUserById(id);
      return user;
    } catch (error) {
      console.log();
      return null;
    }
    
  };
  getUserByCartId = async (cartId) => {
    try {
      const user = await this.dao.getUserByCartId(cartId);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  createUser = async (user) => {
    try {
      const user = await userDAO.createUser(user);
      return user;
    } catch (error) {
      console.log();
      return null;
    }
  };

  registerUser = async (user) => {
    try {
      const newUser = await this.dao.registerUser(user);
      return newUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updatePassword = async (query, update) => {
    try {
      const updatedUser = await this.dao.updatePassword(query, update);
      return updatedUser;
    } catch (error) {
      console.log(error);
      return null;
    }
}
}