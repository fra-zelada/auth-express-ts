import { Request, Response, NextFunction } from "express";
import { Jwt } from "../../../utils";
import { AuthJwtPayload } from "../../../domain/interfaces/auth";

type verifyTokenFnc = <T>(token: string) => Promise<T>;
export class AuthMiddleware {
    constructor(private verifyToken: verifyTokenFnc = Jwt.verify) {}

    validateToken = (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(" ")[1];
            if (token == null) return res.sendStatus(401);
            return this.verifyToken<AuthJwtPayload>(token)
                .then((payload) => {
                    req.body.tokenPayload = payload;
                    next();
                })
                .catch(() => res.sendStatus(401));
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ message: "Uncaught error at token validation" });
        }
    };
}
