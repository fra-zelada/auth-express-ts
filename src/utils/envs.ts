import "dotenv/config";

import * as env from "env-var";

const TYPEORM_POSTGRES_PORT = env
    .get("TYPEORM_POSTGRES_PORT")
    .required()
    .asPortNumber();
const TYPEORM_POSTGRES_HOST = env
    .get("TYPEORM_POSTGRES_HOST")
    .required()
    .asString();
const TYPEORM_POSTGRES_USERNAME = env
    .get("TYPEORM_POSTGRES_USERNAME")
    .required()
    .asString();
const TYPEORM_POSTGRES_PASSWORD = env
    .get("TYPEORM_POSTGRES_PASSWORD")
    .required()
    .asString();
const TYPEORM_POSTGRES_DATABASE = env
    .get("TYPEORM_POSTGRES_DATABASE")
    .required()
    .asString();
const APP_PORT = env.get("APP_PORT").required().asPortNumber();
const APP_CORS_ALLOWED_ORIGINS = env
    .get("APP_CORS_ALLOWED_ORIGINS")
    .required()
    .asString()
    .split(",");
export const envs = {
    TYPEORM_POSTGRES_HOST,
    TYPEORM_POSTGRES_PORT,
    TYPEORM_POSTGRES_USERNAME,
    TYPEORM_POSTGRES_PASSWORD,
    TYPEORM_POSTGRES_DATABASE,
    APP_PORT,
    APP_CORS_ALLOWED_ORIGINS,
};
