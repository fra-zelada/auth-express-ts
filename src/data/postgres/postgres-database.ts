import { DataSource } from "typeorm";
import "reflect-metadata";

export class PostgresDatabase {
    static async connect(datasource: DataSource): Promise<boolean> {
        return new Promise((resolve, reject) => {
            datasource
                .initialize()
                .then(() => {
                    console.log(`[PostgresDatabase] connected`);
                    resolve(true);
                })
                .catch((err) => {
                    console.log(
                        `[PostgresDatabase] Unable to connect : ${err}`
                    );
                    reject(err);
                });
        });
    }
}
