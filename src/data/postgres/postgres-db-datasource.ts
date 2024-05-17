import "reflect-metadata";
import { DataSource as AppDataSource, Repository } from "typeorm";

import { UserDbEntity } from "./entities/auth";
import { envs } from "../../utils";

export class PostgresAppDataSource {
    private static readonly appDataSource: AppDataSource = new AppDataSource({
        type: "postgres",
        host: envs.TYPEORM_POSTGRES_HOST,
        port: envs.TYPEORM_POSTGRES_PORT,
        username: envs.TYPEORM_POSTGRES_USERNAME,
        password: envs.TYPEORM_POSTGRES_PASSWORD,
        database: envs.TYPEORM_POSTGRES_DATABASE,
        entities: [UserDbEntity],
        synchronize: true,
        logging: false,
    });

    static getAppDataSource() {
        return this.appDataSource;
    }

    static getUserDbRepository(): Repository<UserDbEntity> {
        return this.appDataSource.getRepository(UserDbEntity);
    }
}
