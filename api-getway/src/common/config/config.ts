import * as dotenv from "dotenv";
import { IConfig } from "./interfaces/config.interface";
dotenv.config();

export const config: IConfig = {
    serverPort: Number(process.env.PORT),
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    parkPort: Number(process.env.PARK_PORT),
    userPort: Number(process.env.USER_PORT),
    shotPort: Number(process.env.SHOT_PORT),
    filePort: Number(process.env.FILE_PORT),
}