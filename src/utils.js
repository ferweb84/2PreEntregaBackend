import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import bcrypt from "bcrypt";
import {faker} from "@faker-js/faker/locale/es";

//faker
export const generateUser = () => {

  let randomNumber= faker.number.int(20);

  let products= [];
  for(let i=0; i < randomNumber; i++ ){
    products.push(generateProduct());
  }
  return {
    id: faker.database.mongodbObjectId(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    job: faker.person.jobTitle(),
    sex: faker.internet.avatar(),
    imagen: faker.image.url(),
    birthDate: faker.date.birthdate(),
    premium: faker.datatype.boolean(),
    products,
  }
};
export const generateProduct=()=> {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    imagen: faker.image.url(),
    code: faker.string.alphanumeric(8),
    stock: faker.number.int({min:0, max:100}),
  }
}


// __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/images`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const uploader = multer({ storage });
export default __dirname;
