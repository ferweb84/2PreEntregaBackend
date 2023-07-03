import { userModel } from "./../models/user.model.js";

export class User {
    constructor(){
        this.model = userModel;
    }

    findByEmail = async (email) => {
        try {
            return await this.model.findOne({email: email});
        } catch (error) {
            throw new Error(error);
        }
    };

    createUser = async(user) => {
        try {
            return await this.model.create(user);
        } catch (error) {
            throw new Error(error);
        }
    };

    findById = async(id) => {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    };

    findByCartId = async(cartId) => {
        try {
            return await this.model.findOne({cart: cartId});
        } catch (error) {
            throw new Error(error);
        }
    }

    saveUser = async (user) => {
        try {
            return await this.model.findOneAndUpdate({_id: user._id}, { $set: user });
        } catch (error) {
            throw new Error(error);
        }
    }

    changeRole = async (userId, role) => {
        try {
            return await this.model.findOneAndUpdate({ _id: userId }, { role }, { new:true });
        } catch (error) {
            throw new Error(error);
        }
    }
}