import { userRepository } from "../repositories/user.repository.js";
import { cartService } from "./cart.service.js";
import { isValidPassword, createHash } from "../utils.js";

class UserService {
    constructor(){
        this.userRepository = userRepository;
    }

    login = async (email, password) => {
        try {
            const user = await this.userRepository.findByEmail(email);
            if(!user) {
                return { error: 'No se encontró el usuario.' };
            }
            const validPassword = isValidPassword(user, password);
            if(!validPassword) {
                return { error: 'Credenciales incorrectas.' };
            } else {
                delete user.password;
                return user;
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    register = async (user) => {
        try {
            const userExists = await this.userRepository.findByEmail(user.email);
            if(userExists) {
                return { error: 'El usuario ya se encuentra registrado.' };
            }
            
            return this.userRepository.createUser(user);

        } catch (error) {
            throw new Error(error);
        }
    };

    authenticateWithGithub = async (profile) => {
        try {
            let user = await this.userRepository.findByEmail(profile._json.email);
            const cart = await cartService.createCart({products: []});

            if(!user) {
                let splitName = profile._json.name.split(" ");
                let newUser = {
                    first_name: splitName[0],
                    last_name: splitName.slice(1).join(" "),
                    age: 18,
                    email: profile._json.email,
                    password: "",
                    role: "user",
                    cart: cart._id
                };

                return await this.userRepository.createUser(newUser);
            }

            return user;
        } catch (error) {
            throw new Error(error);
        }
    };

    findById = async (id) => {
        try {
            return await this.userRepository.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const userService = new UserService();