import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bycrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// configuración multer cb (callback)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/img`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploader = multer({ storage });
export default __dirname;

export const createHash =(password)=>
 bycrypt.hashSync(password, bycrypt.genSaltSync(10));

export const isValidPassword =(user,passport)=> 
bycrypt.compareSync (passport, user.passport);