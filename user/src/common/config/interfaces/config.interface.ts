export interface IConfig {
    serverPort: number;
    jwtSecretKey: string;
    jwtExpiresIn: string;
    dbUrl: string;
    dbPort: number;
    dbName: string;
    dbHost: string;
    dbUser: string;
    dbPassword: string;
}