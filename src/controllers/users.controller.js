import { UserService } from "../services/index.js";
import { isValidPassword } from "../utils.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const {
  jwt: { jwtCookie, jwtSecret },
} = config;

const usersService = new UserService();
export async function getUser(req,res){
  const users =await usersService.getUsers();
  return res.send ({status:"success", payload: users});

}
export async function createUser (req,res){
  const {first_name , last_name, email}= req.body;
  const user= {
    first_name,
    last_name,
    email,
  };
  const createdUser=await UserService.createUser(user);
  return res.send ({status: "success",payload: createdUser})
}


export const register = async (req, res) => {
  try {
    return res.send({ status: "sucess", message: "user registered" });
  } catch (error) {
    console.log(`Failed to register user: ${error}`);
    return res
      .status(500)
      .send({ status: "error", error: "Failed to register user" });
  }
};

export const failRegister = async (req, res) => {
  return res
    .status(409)
    .send({ status: "error", message: "User already exists" });
};

export const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const user = await usersService.getUserById({ email });

    if (!user)
      return res
        .status(401)
        .send({ status: "error", error: "Invalid Credentials" });

    if (!isValidPassword(user, password))
      return res
        .status(401)
        .send({ status: "error", error: "Invalid Credentials" });

    

    const jwtUser = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      cart: user.cart,
    };

    // const token = jwt.sign(jwtUser, jwtSecret, { expiresIn: "24h" });
    const token = user.generateJwtToken (user, rememberMe, jwtUser, jwtSecret, { expiresIn: "24h" });
    if (!token) {
      return res
        .status(500)
        .send({ status: "error", error: "Failed to generate JWT token" });
    }

    return res.cookie(jwtCookie, token, { httpOnly: true }).send({
      status: "sucess",
      message: "Login sucessful",
    });
  } catch (error) {
    console.log(`Failed to login with error: ${error}`);
    return res.status(500).send({ status: "error", error: "Login failed" });
  }
};

export const gitHubLogin = async (req, res) => {
  try {
    const jwtUser = {
      name: req.user.first_name,
      email: req.user.email,
      cart: req.user.cart,
    };

    // const token = jwt.sign(jwtUser, jwtSecret, { expiresIn: "24h" });
    const {user}=req;
    const token= user.generateJwtToken(user);
    if (!token) {
      return res
        .status(500)
        .send({ status: "error", error: "Failed to generate JWT token" });
    }

    return res.cookie(jwtCookie, token, { httpOnly: true }).redirect("/home");
  } catch (error) {
    console.log(`Failed to handle GitHub callback with error: ${error}`);
    return res
      .status(500)
      .send({ status: "error", error: "Failed to handle GitHub callback" });
  }
};
export const current = (req, res) => {
  return res.status(200).send({ status: "success", payload: req.user });
};


export const logout = async (req, res) => {
  try {
    return res
      .clearCookie(jwtCookie)
      .send({ status: "sucess", message: "log out sucessful" });
  } catch (error) {
    console.log(error);
  }
};

export const restoreUserPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const user = await user.getUser({ email });

    if (!user) {
      return res
        .status(404)
        .send({ status: "error", error: "User does not exist" });
    }

    const passwordUpdate = await user.updatePassword(email, password);

    if (!passwordUpdate) {
      return res
        .status(500)
        .send({ status: "error", error: "Failed to update password" });
    }

    return res.status(204).send({
      status: "success",
      message: "Successfully updated password",
    });
  } catch (error) {
    console.log(`Failed to restore user password: ${error}`);
    return res
      .status(500)
      .send({ status: "error", error: "Failed to restore user password" });
  }
};