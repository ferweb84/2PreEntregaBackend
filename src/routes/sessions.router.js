import { Router } from "express";
import { registerUser ,loginUser,failRegister,githubCallback,Logout,failLogin,getcurrentUser} from "../controllers/sessions.controller.js";
import passport from "passport";

const router = Router()
router.post("/register", passport.authenticate("register", { failureRedirect: "/api/sessions/failRegister" }), registerUser)


router.get("/failRegister",failRegister)

// router.post("/login",passport.authenticate("login",{failureRedirect:"/api/sessions/failLogin"}),loginUser);

router.post("/login",loginUser);


router.get("/failLogin",failLogin)


router.get("/current",passport.authenticate("jwt",{session:false}),getcurrentUser)

router.get("/github",passport.authenticate("githublogin",{scope:["user:email"] }),(req,res)=>{

})

router.get("/githubcallback",passport.authenticate("githublogin",{failureRedirect:"/"}),githubCallback)

router.get("/logout",Logout);
export default router;