import passport from "passport";
import GitHubStrategy from "passport-github2";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import config from "../config.js";
import local from "passport-local";
import { cartModel } from "../dao/models/cart.model.js";
const { clientID, clientSecret, callbackUrl } = config;
const LocalStrategy = local.Strategy;

// Services
import { userService } from "../services/user.service.js";
import { cartService } from "../services/cart.service.js";

const initializePassport = () => {
    passport.use(
        "github",
        new GitHubStrategy({
            clientID,
            clientSecret,
            callbackUrl
        }, async(accessToken, refreshToken, profile, done) => {
            try {
                const result = await userService.authenticateWithGithub(profile);
                done(null, result);
            } catch (error) {
                return done(error);
            }
        })
    );
    passport.use(
        "register", new LocalStrategy(
            { passReqToCallback: true, usernameField: "email" }, 
            async (req, username, password, done) => {
                try {
                    const { first_name, last_name, role, age } = req.body;
                    const cart = await cartService.createCart({products: []});
                    const user = {
                        first_name,
                        last_name,
                        email: username,
                        age: age,
                        password: createHash(password),
                        role: role ?? "user",
                        cart: cart._id,
                    };
                    
                    const result = await userService.register(user);
                    return done(null, result._id);
                } catch (error) {
                    return done(error);
                }
            })
    );
    passport.use(
        "login",
        new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
            try {
                const user = await userService.login(username, password);
                return done(null, user._id);
            } catch (error) {
                return done(error);
            }
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser( async (id, done) => {
        const user = await userService.findById(id);
        done(null, user);
    });
}

export default initializePassport;