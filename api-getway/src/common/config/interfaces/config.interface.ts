export interface IConfig {
    serverPort: number;
    jwtSecretKey: string;
    jwtExpiresIn: string;
    parkPort: number;
    userPort: number;
    shotPort: number;
    filePort: number;
}