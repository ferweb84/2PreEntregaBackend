import { Router } from "express";
import SessionManager from "../dao/dbManagers/sessions.js";
import { isValidPassword } from "../utils.js";
import config from "../config.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import SessionController from "../controllers/sessions.controller.js";

const router = Router();

const sessionController = new SessionController();

router.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/sessions/failRegister",
  }),
  sessionController.register
);

router.get("/failRegister",sessionController.failRegister);

router.post("/login",sessionController.login);

router.get(
  "/github",passport.authenticate("github", { scope: ["user:email"] }),
  sessionController.github
);

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/login",
  }),
  sessionController.githubCallback

);

router.post("/logout", sessionController.logout);

export default router;
