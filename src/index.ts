import { PostgresAppDataSource, PostgresDatabase } from "./data/postgres";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { envs } from "./utils/envs";

async function bootstrap() {
    await PostgresDatabase.connect(PostgresAppDataSource.getAppDataSource());
    new Server(envs.APP_PORT, AppRoutes.routes).start();
}

(() => {
    bootstrap();
})();
