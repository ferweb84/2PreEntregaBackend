import jwt from "jsonwebtoken";
import config from "../config.js";
import SessionService from "../services/sessions.services.js";
import { isValidPassword } from "../utils.js";

const sessionService = new SessionService();

class SessionController {

  async register(req, res) {
    try {
      return res.send({ status: "success", message: "User registered" });
    } catch (error) {
      return res.status(400).send({ status: "error", error: error.message });
    }
  }

  failRegister(req, res) {
    console.log("Failed Register");
    return res.send({ status: "error", error: "Authentication error" });
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await sessionService.getUser({ email });

      if (!user) {
        return res.status(401).send({ status: "error", error: "Invalid credentials" });
      }

      if (!sessionService.isValidPassword(user, password)) {
        return res.status(401).send({ status: "error", error: "Invalid credentials" });
      }

      const jwtUser = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        cart: user.cart,
      };

      const token = jwt.sign(jwtUser, config.jwtSecret, { expiresIn: "24h" });

      return res.cookie("jwtCookie", token, { httpOnly: true }).send({
        status: "success",
        message: "Login successful",
      });
    } catch (error) {
      return res.status(500).send({ status: "error", error: "Internal server error" });
    }
  }

  github(req, res) { 
    const { code } = req.query;
  }

  async githubCallback (req, res) {
    const jwtUser = {
      name: req.user.first_name,
      email: req.user.email,
      cart: req.user.cart,
    };

    const token = jwt.sign(jwtUser, config.jwtSecret, { expiresIn: "24h" });

    res.cookie("jwtCookie", token, { httpOnly: true }).redirect("/");
  }
  

  logout(req, res) {
    return res.clearCookie("jwtCookie").send({ status: "success", message: "Logout successful" });
  }
}

export default SessionController;
