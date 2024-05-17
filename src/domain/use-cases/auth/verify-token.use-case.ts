import { Jwt } from "../../../utils";
import { CustomError } from "../../errors";
import { AuthJwtPayload } from "../../interfaces/auth";
import { AuthRepository } from "../../repositories/auth.repository";

type SignToken = (payload: object) => Promise<string | null>;
type ValidateToken = <T>(token: string) => Promise<T>;
interface UserAndToken {
    user: {
        id: string;
        name: string;
        email: string;
        roles: string[];
    };
    token: string;
}
export class VerifyAndRefreshTokenUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = Jwt.sign,
        private readonly validateToken: ValidateToken = Jwt.verify
    ) {}

    /**
     * This function retrieves user data based on the validated payload; it does not perform token validation.
     * Make sure the session token has been previously validated by the middleware before calling this function.
     * If token validation needs to be implemented within this function, the token should be added as an argument to the function.
     * Additionally, the injected validateToken function can be used for token validation if required.
     * @param payload The session token payload containing user information.
     */
    async execute(payload: AuthJwtPayload): Promise<UserAndToken> {
        // get the user id from the payload
        const { id } = payload;

        const user = await this.authRepository.getUserById(id);
        if (!user) {
            throw CustomError.unauthorized("Invalid Token");
        }
        const newPayload: AuthJwtPayload = {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles,
        };

        let token: string | null = "";
        try {
            token = await this.signToken(newPayload);
            if (!token) throw new Error("Invalid token generation");
        } catch (error) {
            throw CustomError.internal("Token internal error");
        }

        return {
            user: {
                id: user.id,
                name: user.username,
                email: user.email,
                roles: user.roles,
            },
            token,
        };
    }
}
