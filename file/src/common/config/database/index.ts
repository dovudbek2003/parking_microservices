import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "../config";

export const typeormConfig: DataSourceOptions = {
    type: 'postgres',
    url: config.dbUrl,
    entities: [__dirname + '/../../../modules/**/entities/*.entity.{js,ts}'],
    migrations: [__dirname + '/../../../database/migrations/*{.ts,.js}'], /** migrationdi o'zi yaratadi */
    synchronize: false
}

export default new DataSource(typeormConfig)