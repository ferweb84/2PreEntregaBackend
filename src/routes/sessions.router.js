
import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js"
import passport from "passport";

const router = Router()
router.post("/register", passport.authenticate("register", { failureRedirect: "/failRegister" }), async (req, res) => {
  return res.send({ status: "Success", message: "User registered" })
  // try {
  //     const{first_name ,last_name,email,age,password}=req.body
  //    const userex=await userModel.findOne({email})
  //    if (userex){
  //     return res.status(400).send({status:"error",error:"user exists"})
  //    }
  //    const user={
  //     first_name,
  //     last_name,
  //     email,
  //     age,
  //     password:createHash(password)

  // }
  // await userModel.create(user);
  // return res.send({ status: "success", message: "user registered" });
  // } catch (error) {
  //     console.log(error)
  // }
})
router.get("/failRegister", (req, res) => {
  return res.send({ status: "status", error: "Authentication error" })
})
router.post("/login",passport.authenticate("login"),async (req, res) => {
  if (!req.user)
  return res.status(401).send({ status: "error", error: "Unauthorized" });

  if(req.user.email === "adminCoder@coder.com"){
    req.user.role = "admin"
  }else{
    req.user.role = "user"
  }

  req.session.user={
    first_name:req.user.first_name,
    last_name:req.user.last_name,
    age:req.user.age,
    email:req.user.email,
    role:req.user.role
  }
  return res.send({status:"success",payload:req.user})
  // try {
  //   const { email, password } = req.body;
  //   const user = await userModel.findOne({ email }).lean();

  //   if (!user) {
  //     return res
  //       .status(400)
  //       .send({ status: "error", error: "User does not exist" });
  //   }

  //   if (!isValidPassword(user, password)) {
  //     return res.status(401).send({ status: "error", error: "Unauthorized" })
  //   }

  //   if (user.email === "adminCoder@coder.com") {
  //     user.role = "admin"
  //   } else {
  //     user.role = "user"
  //   }

  //   delete user.password
  //   req.session.user = user
  //   req.session.user = {
  //     name: `${user.first_name} ${user.last_name}`,
  //     email: user.email,
  //     age: user.age,
  //     role: user.role
  //   };


  //   res.send({
  //     status: "success",
  //     message: "Logged In",
  //     payload: req.session.user,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
});
router.get("/failLogin",(req,res)=>{
  res.send({status:"error",error:"Authentication error"})
})

router.get("/github",passport.authenticate("githublogin",{scope:["user:email"] }),(req,res)=>{

})

router.get("/githubcallback",passport.authenticate("githublogin",{failureRedirect:"/"}),(req,res)=>{
  req.session.user=req.user
  res.redirect("/products")
})
router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (!error) return res.send("Logout successful!");

    return res.send({ status: "error", message: "Logout error", body: error });
  });
});
export default router;