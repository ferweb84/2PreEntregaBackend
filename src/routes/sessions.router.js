import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { isValidPassword, createHash} from "../utils.js";



const router=Router()
router.post("/register", async (req,res)=>{
    try {
        const{first_name ,last_name,email,age,role,password}=req.body
       const userexist=await userModel.findOne({email})
       if (userexist){
        return res.status(400).send({status:"error",error:"user exists"})
       }
       const user={
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),

    }
    await userModel.create(user);
    return res.send({ status: "success", message: "user registered" });
    } catch (error) {
        console.log(error)
    }
})
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email, password });
  
      if (!user) {
        return res
          .status(400)
          .send({ status: "error", error: "Incorrect credentials" });
      }
      // if(user.email === "adminCoder@coder.com"){
      //   user.role="admin"
      // }else{
      //   user.role="user"
      // }

      // req.session.user = {
      //   name: `${user.first_name} ${user.last_name}`,
      //   email: user.email,
      //   age: user.age,
      //   role: user.role
      // };
      const userSession = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role
      };
    
      res.send({
        status: "sucess",
        message: "Logged In",
        payload: userSession,
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.get("/logout", (req, res) => {
    req.session.destroy((error) => {
      if (!error) return res.send("Logout successful!");
  
      return res.send({ status: "error", message: "Logout error", body: error });
    });
  });
export default router;