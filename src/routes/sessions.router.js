import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { isValidPassword, createHash} from "../utils.js";
import passport from "passport";


const router=Router()

router.post("/register", passport.authenticate("register", {failureRedirect: "/failRegister"}),
 async (req,res)=>{ 
  return res.send({status:"success", message: "user Registered"});
});
 
   
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


  router.get("/github",passport.authenticate("githublogin",{scope:["user:email"] }),(req,res)=>{

  })
  
  router.get("/githubcallback",passport.authenticate("githublogin",{failureRedirect:"/login"}),(req,res)=>{
    req.session.user=req.user
    res.redirect("/products")
  })
  router.get("/logout", (req, res) => {
    req.session.destroy((error) => {
      if (!error) return res.send("Logout successful!");
  
      return res.send({ status: "error", message: "Logout error", body: error });
    });
  });

  router.get("/logout", (req, res) => {
    req.session.destroy((error) => {
      if (!error) return res.send("Logout successful!");
  
      return res.send({ status: "error", message: "Logout error", body: error });
    });
  });
export default router;