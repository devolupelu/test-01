import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT_SERVER!,
  conn: process.env.CONN_STR!,
  key: process.env.JKEY!,
  SESSION_SECRET: process.env.SESSION_SECRET as string,
  // flutterwave credentials
  FLUTTERWAVE_SECRET_KEY: process.env.FLUTTERWAVE_SECRET_KEY,
  // Email credentials
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  HOST: process.env.HOST,
  PORT_FOR_MAIL: process.env.PORT_FOR_MAIL,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  SECRET_KEY_JWT: process.env.SECRET_KEY,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  // Amazon credentials
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  region: process.env.S3_REGION as string,
  Bucket: process.env.S3_BUCKET as string,
  // Node Environment
  NODE_ENV: process.env.NODE_ENV,
};

export default config;