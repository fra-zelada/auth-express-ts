import { Request, Response } from "express";
import { AuthRepository } from "../../../domain/repositories/auth.repository";
import { LoginUserDto, RegisterUserDto } from "../../../domain/dtos/auth";
import {
    LoginUserUseCase,
    RegisterUserUseCase,
    VerifyAndRefreshTokenUseCase,
} from "../../../domain/use-cases/auth";
import { CustomError } from "../../../domain/errors";

export class AuthController {
    constructor(private readonly authRepository: AuthRepository) {}

    login = (req: Request, res: Response) => {
        try {
            const [error, loginUserDto] = LoginUserDto.login(req.body);
            if (error) {
                return res.status(400).json(error);
            }
            new LoginUserUseCase(this.authRepository)
                .execute(loginUserDto!)
                .then((result) => {
                    return res.status(200).json(result);
                })
                .catch((error) => {
                    if (error instanceof CustomError) {
                        return res
                            .status(error.statusCode)
                            .json({ message: error.message });
                    } else {
                        return res.status(500).json("Internal Server Error");
                    }
                });
        } catch (error) {
            console.log(error);
            res.status(500).json("Internal Server Error");
        }
    };
    register = (req: Request, res: Response) => {
        try {
            const [error, registerUserDto] = RegisterUserDto.register(req.body);
            if (error) {
                return res.status(400).json(error);
            }
            new RegisterUserUseCase(this.authRepository)
                .execute(registerUserDto!)
                .then((result) => {
                    return res.status(200).json(result);
                })
                .catch((error) => {
                    if (error instanceof CustomError) {
                        return res
                            .status(error.statusCode)
                            .json({ message: error.message });
                    } else {
                        return res.status(500).json("Internal Server Error");
                    }
                });
        } catch (error) {
            console.log(error);
            res.status(500).json("Internal Server Error");
        }
    };
    /**
     * Refreshes a session token.
     * This route should be protected by the token validation middleware, and req.body.tokenPayload should come from that validation.
     * @param req The request object containing the session token payload.
     * @param res The response object.
     */
    refreshToken = (req: Request, res: Response) => {
        try {
            new VerifyAndRefreshTokenUseCase(this.authRepository)
                .execute(req.body.tokenPayload)
                .then((result) => {
                    return res.status(200).json(result);
                })
                .catch((error) => {
                    if (error instanceof CustomError) {
                        return res
                            .status(error.statusCode)
                            .json({ message: error.message });
                    } else {
                        return res.status(500).json("Internal Server Error");
                    }
                });
        } catch (error) {
            console.log(error);
            res.status(500).json("Internal Server Error");
        }
    };
}
