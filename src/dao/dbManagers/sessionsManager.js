import { userModel } from "../models/user.model.js";
export default class SessionManager{
    constructor(){}
    getUser= async(filter)=>{
        try {
            const foundUser= await userModel.findOne(filter);
            return foundUser
        } catch (error) {
            console.log(error)            
        }
    }
    register=async (user)=>{
        try {
            const registeredUser = await userModel.create(user)
        } catch (error) {
            console.log(error)
        }
    }
}