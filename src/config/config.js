import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT||8080,
  dbUrl: process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET,
  //GITHUB
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackUrl: process.env.CALLBACK_URL,
  persistence: process.env.PERSISTENCE,
  // Admin Account
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  // Email Credentials
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT),
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};

export default config;