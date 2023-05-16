import { Router } from "express";
import { isValidPassword } from "../utils.js";
import passport from "passport";
import config from "../config.js";
import jwt from "jsonwebtoken";
import SessionManager from "../dao/dbManagers/sessiondbManager.js"

const sessionManager = new SessionManager();

const router = Router()

router.post("/register",  passport.authenticate("register", {
  session: false,
  failureRedirect: "/api/sessions/failRegister",
}), async (req, res) => {
  return res.send({ status: "Success", message: "User registered" })

})
router.get("/failRegister", (req, res) => {
  console.log("Failed Register");
  return res.send({ status: "error", error: "authentication error" });
});

router.post("/login",async (req, res) => {
  const {email,password}=req.body

  const user = await sessionManager.getUser({email})
  
  if(!user){
    return res
    .status(401)
    .send({status:"error",error:"Authentication error"})
  }
  if(!isValidPassword(user,password)){
  return res
  .status(401)
  .send({status:"error",error:"Invalid credentials"})
  }
  
  const jwtUser={
    first_name:`${user.first_name}`,
    last_name:`${user.last_name}`,
    email:user.email,
    cart:user.cart,
   role:user.role
  }
  console.log(jwtUser)

  const token=jwt.sign(jwtUser,config.jwtSecret,{expiresIn: "24h"});

  return res
  .cookie("jwtCookie", token, { httpOnly: true })
  .send({status: "sucess", message: "Login sucessful",
  });
});

router.get("/failLogin",(req,res)=>{
  res.send({status:"error",error:"Authentication error"})
})
router.get("/current",(req,res)=>{
 return res.send({payload:req.session.user})
})
router.get("/github",passport.authenticate("githublogin",{scope:["user:email"] }),(req,res)=>{

})

router.get("/githubcallback",passport.authenticate("githublogin",{failureRedirect:"/"}),(req,res)=>{
  req.session.user=req.user
  res.redirect("/products")
})

router.post("/logout", (req, res) => {
  res
  .clearCookie("jwtCookie")
  .send({status:"success",message:"log out successfull"}) 
});

export default router;