import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto, RegisterUserDto } from "../../domain/dtos/auth";
import { UserEntity } from "../../domain/entities/auth";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthRepositoryImpl extends AuthRepository {
    constructor(dataSourceImpl: AuthDatasource) {
        super(dataSourceImpl);
    }
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.dataSource.login(loginUserDto);
    }
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.dataSource.register(registerUserDto);
    }

    getUserById(user_id: string): Promise<UserEntity> {
        return this.dataSource.getUserById(user_id);
    }
}
