import { AuthRepository } from "../../repositories/auth.repository";
import { Jwt, hashPassword as hashPasswordService } from "../../../utils";
import { CustomError } from "../../errors";
import { AuthJwtPayload } from "../../interfaces/auth";
import { RegisterUserDto } from "../../dtos/auth";

interface UserAndToken {
    user: {
        id: string;
        name: string;
        email: string;
        roles: string[];
    };
    token: string;
}

type HashPassword = (password: string) => string;
type SignToken = (payload: object) => Promise<string | null>;

export class RegisterUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly hashPassword: HashPassword = hashPasswordService,
        private readonly signToken: SignToken = Jwt.sign
    ) {}
    async execute(registerUserDto: RegisterUserDto): Promise<UserAndToken> {
        const passwordHash = this.hashPassword(registerUserDto.password);

        const user = await this.authRepository.register({
            email: registerUserDto.email,
            roles: registerUserDto.roles,
            username: registerUserDto.username,
            password: passwordHash,
        });

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
