import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import GithubStrategy from "passport-github2";
import config from "../config.js";
const {clientID, clientSecret, callbackUrl}=config;

const LocalStrategy = local.Strategy;

const initializePassport =()=>{
    
    passport.use('register', 
    new LocalStrategy({passReqToCallback: true, usernameField: 'email'},
    async (req, username, password, done )=>{
        try {
            const {first_name, last_name, email, age }= req.body;  
            let user = await userModel.findOne({ email: username});
//si ese usuario ya esta guardado en la base de datos; usamos done (callback)
            if(user){
                return done(null, false );
            }
            const newUser = {
                first_name, 
                last_name, 
                email, 
                age,
                password: createHash(password),
            };
            const result = await userModel.create(newUser);
            return done (null, result);
        } catch (error) {
            return done ("error al tratar de encontrar el usuario"+error);
            
        }
       }
      )
    );


    passport.use('login', new LocalStrategy({usernameField:"mail"}, async (username, password, done)=>{
        try {
            const user = await userModel.findOne ({email: username}).lean();

            if(!user)return done (null,false);

            if(!isValidPassword(user, password)) return done ( null, false);

            delete user.password
            return done (null, user);

        } catch (error) {
            return done (error)
;            
        }

    }));

    passport.use ("githublogin", new GithubStrategy({
        clientID, clientSecret, callbackUrl},async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
                //el profile._json.email busca el usuario en el perfil de github
                let user = await userModel.findOne({ email: profile._json.email })
    
                // if (user.email === "adminCoder@coder.com") {
                //     user.role = "admin"
                // } else {
                //     user.role = "user"
                // }
                // delete user.password
                if (!user) {
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: "",
                        age: 18,
                        email: profile._json.email,
                        password: "",
    
                    }
                    let result = await userModel.create(newUser);
                    return done(null, result);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }));

    passport.serializeUser((user,done)=>{
        done (null, user._id);
    });
    passport.deserializeUser(async(id, done)=>{
        let user =await userModel.findById(id);
        done(null,user);
    });
};

export default initializePassport;