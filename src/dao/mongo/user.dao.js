import userModel from "../models/users.model.js";

class User {
  constructor() {}

  get =async ()=>{
    const users = await userModel.find();
    return users;
  }
  create = async (user)=>{
    const createdUser=await userModel.create(user);
    return createdUser;
  };

  getUserById = async (filter) => {
    try {
      const foundUser = await userModel.findOne(filter);
      return foundUser;
    } catch (error) {
      console.log(error);
    }
  };

  createUser = async (user) => {
    try {
      const result = await userModel.create(user);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

export const userMongo = new User();