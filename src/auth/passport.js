import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import GithubStrategy from "passport-github2";
import userModel from "../dao/models/users.js";
import cartsModel from "../dao/models/carts.js";
import { createHash, isValidPassword } from "../utils.js";
import config from "../config.js";


const { clientID, clientSecret, callbackUrl,jwtSecret } = config
const LocalStrategy = local.Strategy
const JWTStrategy=jwt.Strategy
const ExtractJwt=jwt.ExtractJwt


const cookieExtractor=(req)=>{
    let token=null;
    if(req && req.cookies){
        token=req.cookies["jwtCookie"];
    }
    return token
}
console.log(jwtSecret)
const jwtOptions={
    secretOrKey:jwtSecret,
    jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
}
const initializePassport =()=>{

    passport.use('register', 
    new LocalStrategy({passReqToCallback: true, usernameField: 'email'},
    async (req, username, password, done )=>{
        try {
            const {first_name, last_name, email, age, role }= req.body; 

            let user = await userModel.findOne({ email: username});

            if(user){
              console.log ("user already exists");
                return done(null, false );
            }

            const cart = await cartsModel.create({});
            const newUser = {
                first_name, 
                last_name, 
                email, 
                age,
                password: createHash(password),
                role: role ?? "user",
                cart: cart._id,
            };

            const result = await userModel.create(newUser);

            return done (null, result);
        } catch (error) {
            return done ("error al tratar de encontrar el usuario"+error);           
        }
       }
      )
    );

    passport.use("jwt",new JWTStrategy(jwtOptions, async (jwt_payload, done)=>{
  
      try {
        return done (null, jwt_payload);
      } catch (error) {
        return done (error)
        
      }
    }));

    passport.use(
      'login', new LocalStrategy(
        {usernameField:"mail"}, 
        async (username, password, done)=>{
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

    passport.use ("githublogin", new GithubStrategy(
        {
          clientID, 
          clientSecret, 
          callbackUrl
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
                let user = await userModel.findOne({ email: profile._json.email });
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