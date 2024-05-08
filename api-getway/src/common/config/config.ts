import * as dotenv from "dotenv";
import { IConfig } from "./interfaces/config.interface";
dotenv.config();

export const config: IConfig = {
    serverPort: Number(process.env.PORT),
    parkPort: Number(process.env.PARK_PORT),
    userPort: Number(process.env.USER_PORT),
}