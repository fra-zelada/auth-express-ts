import express, { Router } from "express";
export class Server {
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(port: number, routes: Router) {
        this.port = port;
        this.routes = routes;
    }

    start = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(this.routes);
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    };
}
