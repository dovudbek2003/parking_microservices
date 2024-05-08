import * as dotenv from "dotenv";
import { IConfig } from "./interfaces/config.interface";
dotenv.config();

export const config: IConfig = {
    serverPort: Number(process.env.PORT),
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    dbUrl: process.env.DB_URL,
    dbPort: Number(process.env.DB_PORT),
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
}