import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { isValidPassword, createHash} from "../utils.js";
import passport from "passport";


const router=Router()

router.post("/register", passport.authenticate("register", {failureRedirect: "/failRegister"}),
 async (req,res)=>{ 
  return res.send({status:"success", message: "user Registered"});
});
  //  AL CREAR EL AUTH PASSPORT.JS BORRO TODO ESTO YA QUE LA LOGICA ME LA LLEVO PARA ALLA
    // try {
    //     const{first_name ,last_name,email,age,password}=req.body
    //    const userexist=await userModel.findOne({email})
    //    if (userexist){
    //     return res.status(400).send({status:"error",error:"user exists"})
    //    }
    //    const user={
    //     first_name,
    //     last_name,
    //     email,
    //     age,
    //     password: createHash(password),

    // }
    // await userModel.create(user);
    // return res.send({ status: "success", message: "user registered" });
    // } catch (error) {
    //     console.log(error)
    // }

   

router.get ("/failRegister", (req,res)=>{
  return res.send({status: "status", error: "Authentication error"});
});



router.post("/login",
passport.authenticate("login", {failureRedirect: "/failLogin"}), async (req, res) => {
  req.session.user = {
    first_name: req.user.first_name, 
    last_name: req.user.last_name,
    age: req.user.age, 
    email: req.user.email,
  };
  return res.send ({status: "success", payload: req.user});
}
);

router.get ("/failLogin", (req,res)=> {
  res.send({status: "error", error: "authentication error"});
});



    // try {
    //   const { email, password } = req.body;
      //sacamos el password ya que va a ir hasheado a la base de datos, asi que pedimos solo el mail
      // const user = await userModel.findOne({ email }).lean();// BSON - JSON
  
      // if (!user) {
      //   return res
      //     .status(400)
      //     .send({ status: "error", error: "User does not exist" });
      // }

      // if (!isValidPassword(user, password)){
      //   return res.status(401).send({status:"error", error: "Unathorized"});
      // }

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
      // const userSession = {
      //   name: `${user.first_name} ${user.last_name}`,
      //   email: user.email,
      //   age: user.age,
      //   role: user.role
      // };

  //     delete user.password;
  //     const userSession = user;
    
  //     return res.send({
  //       status: "sucess",
  //       message: "Logged In",
  //       payload: userSession,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  router.get("/logout", (req, res) => {
    req.session.destroy((error) => {
      if (!error) return res.send("Logout successful!");
  
      return res.send({ status: "error", message: "Logout error", body: error });
    });
  });
export default router;