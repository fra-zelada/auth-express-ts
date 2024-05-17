import { LoginUserDto, RegisterUserDto } from "../dtos/auth";
import { UserEntity } from "../entities/auth";

export abstract class AuthDatasource {
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract getUserById(user_id: string): Promise<UserEntity>;
}
