import * as dotenv from "dotenv";
import { IConfig } from "./interfaces/config.interface";
dotenv.config();

export const config: IConfig = {
    serverPort: Number(process.env.PORT),
    dbUrl: process.env.DB_URL,
    dbPort: Number(process.env.DB_PORT),
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
}