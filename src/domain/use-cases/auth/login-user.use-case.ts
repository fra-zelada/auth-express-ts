import { AuthRepository } from "../../repositories/auth.repository";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { Jwt, comparePassword } from "../../../utils";
import { CustomError } from "../../errors";
import { AuthJwtPayload } from "../../interfaces/auth";

interface UserAndToken {
    user: {
        id: string;
        name: string;
        email: string;
        roles: string[];
    };
    token: string;
}

type CompareHashFnc = (password: string, hash: string) => boolean;
type SignToken = (payload: object) => Promise<string | null>;

export class LoginUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly compareHashFnc: CompareHashFnc = comparePassword,
        private readonly signToken: SignToken = Jwt.sign
    ) {}
    async execute(loginUserDto: LoginUserDto): Promise<UserAndToken> {
        const user = await this.authRepository.login(loginUserDto);
        if (!this.compareHashFnc(loginUserDto.password, user.password))
            throw CustomError.badRequest("Invalid credentials");

        const tokenPayload: AuthJwtPayload = {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles,
        };
        // eslint-disable-next-line prefer-const
        let token: string | null = "";
        try {
            token = await this.signToken(tokenPayload);
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
