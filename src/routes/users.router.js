import { Router } from "express";
import passport from "passport";
import { failRegister,gitHubLogin,login,logout,register, createUser, getUser} from "../controllers/users.controller.js";

const router = Router();

router.get("/",getUser);
router.post("/",createUser);

router.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/v1/users/failRegister",
  }),
  register
);

router.get("/failRegister", failRegister);

router.post("/login", login);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
  
);

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/",
  }),
  gitHubLogin
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  current
);

router.post("/logout", logout);

router.put("/restore", restoreUserPassword);

export default router;