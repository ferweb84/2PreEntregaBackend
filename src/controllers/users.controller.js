import { usersService} from "../services/index.js"

export async function getUsers(req,res){
    try {
        const users= await usersService.getUsers()
        return res.send ({ status: "success", payload:users});       
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function getUsersById(req,res){
    try {
        const id =req.params.uid;
        const user= await usersService.getUserById(id);
        if (!user)
        return res
        .status(404)
        .send({ status: "error", error: "user does not exist" });

        return res.send ({ status: "success", payload:user});       
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function createUser(req,res){
    try {
        const {name, email,role}=req.body;
        const user= {
            name,
            email,
            role,
        };
        const result = await usersService.createUser (user);
        return res.send ({ status: "success", result});       
    } catch (error) {
        console.log(error);
        return null;
    }
}