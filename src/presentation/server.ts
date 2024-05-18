import express, { Router } from "express";
import cors from "cors";
import { envs } from "../utils";
export class Server {
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(port: number, routes: Router) {
        this.port = port;
        this.routes = routes;
    }

    start = () => {
        console.log("allowed origins");
        console.log(envs.APP_CORS_ALLOWED_ORIGINS);
        this.app.use(cors({ origin: [] }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(this.routes);
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    };
}
