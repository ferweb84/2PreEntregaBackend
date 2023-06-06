import usersRepository from "../repositories.index.js";
import { Jwt } from "jsonwebtoken";
import config from "../config/config.js";
import { createHash, isValidPassword } from "../utils.js";
import UserDTO from "../dao/dtos/user.dto.js";

const {JWT_SECRET}=config;

export default class UsersService {

  async getUser(email) {
    try {
      const user = await usersRepository.getUser({ email });
      if (!user) throw new Error(`User with email ${email} does not exist`);
      return user;
    } catch (error) {
      console.log(`Failed to get user with error: ${error}`);
      throw error;
    }
  }

  async getUserByCartId(cartId) {
    try {
      const user = await usersRepository.getUserByCartId(cartId);
      if (!user) throw new Error(`User with cart ID ${cartId} does not exist`);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  passwordValidate(user, password) {
    return isValidPassword(user, password);
  }

  generateJwtToken(user, rememberMe) {
    try {
      const userDTO = new UserDTO(user);
      const jwtUser = JSON.parse(JSON.stringify(userDTO));

      const expireTime = rememberMe ? "7d" : "3h";

      const token = jwt.sign(jwtUser, JWT_SECRET, {
        expiresIn: expireTime,
      });
      if (!token) throw new Error("Auth token signing failed");

      return token;
    } catch (error) {
      console.log(`Failed to generate token: ${error}`);
      throw error;
    }
  }

  async updatePassword(email, password) {
    try {
      const hashedPassword = createHash(password);
      if (!hashedPassword) throw new Error("Password hashing failed");

      const passwordUpdate = await usersRepository.updatePassword(
        { email },
        { password: hashedPassword }
      );
      if (!passwordUpdate)
        throw new Error(`Password update failed for user with email ${email}`);

      return passwordUpdate;
    } catch (error) {
      console.log(`Failed to update password: ${error}`);
      throw error;
    }
  }


  getUsers=async()=> {
    const users = await usersRepository.getUsers();
    return users;
  };
}


  getUserById = async (id) => {
    try {
      const user = await usersRepository.getUserById(id);
      return user;
    } catch (error) {
      console.log();
      return null;
    }
  };

  createUser = async (user) => {
    try {
      const user = await usersRepository.createUser(user);
      return user;
    } catch (error) {
      console.log();
      return null;
    }
  };
