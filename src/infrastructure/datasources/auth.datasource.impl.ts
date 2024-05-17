import { PostgresAppDataSource } from "../../data/postgres";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto, RegisterUserDto } from "../../domain/dtos/auth";
import { UserEntity } from "../../domain/entities/auth";
import { CustomError } from "../../domain/errors";
import { UserMapper } from "../mappers";

export class AuthDatasourceImpl implements AuthDatasource {
    private readonly userDbRepository =
        PostgresAppDataSource.getUserDbRepository();
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        try {
            const user = await this.userDbRepository.findOneBy({
                email: loginUserDto.email,
            });
            if (!user) throw CustomError.badRequest("User not found");
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal("UserRepository internal server error");
        }
    }
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        try {
            const emailRegistered = await this.userDbRepository.findOneBy({
                email: registerUserDto.email,
            });
            if (emailRegistered)
                throw CustomError.badRequest("Email already exists");
            const usernameRegistered = await this.userDbRepository.findOneBy({
                username: registerUserDto.username,
            });
            if (usernameRegistered)
                throw CustomError.badRequest("User already exists");

            const userDbEntity = this.userDbRepository.create({
                ...registerUserDto,
            });
            const user = await this.userDbRepository.save(userDbEntity);
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal("UserRepository internal server error");
        }
    }
    async getUserById(user_id: string): Promise<UserEntity> {
        try {
            const user = await this.userDbRepository.findOneBy({
                id: user_id,
            });
            if (!user) throw CustomError.badRequest("User not found");
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal("UserRepository internal server error");
        }
    }
}
