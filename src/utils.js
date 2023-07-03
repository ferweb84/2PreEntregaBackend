import multer from 'multer';
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import jwt from 'jsonwebtoken';
import config from './config.js';

const {session: {sessionSecret} }= config;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/images`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


export const uploader = multer({ storage });
export default __dirname;

export const createHash = (password) => 
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => 
  bcrypt.compareSync(password, user.password);

export const generateToken = (userId) => {
  return jwt.sign({userId}, sessionSecret);
  }
  export const generateUniqueToken = () => {
    return uuid();
  }
  
  export const calculateExpirationDate = () => {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + 1 * 60 * 60 * 1000);
    return expirationDate;
  }
  

  