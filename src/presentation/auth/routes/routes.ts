import { Router } from "express";
import { AuthRepositoryImpl } from "../../../infrastructure/repositories/auth.repository.impl";
import { AuthDatasourceImpl } from "../../../infrastructure/datasources/auth.datasource.impl";
import { AuthController } from "../controllers";
import { AuthMiddleware } from "../middlewares";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const authMiddleware = new AuthMiddleware();
        const authDataSource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(authDataSource);
        const authController = new AuthController(authRepository);

        router.post("/login", authController.login);
        router.post("/register", authController.register);
        router.post(
            "/verifyToken",
            authMiddleware.validateToken,
            authController.refreshToken
        );

        return router;
    }
}
