import { AuthDatasource } from "../datasources/auth.datasource";
import { LoginUserDto, RegisterUserDto } from "../dtos/auth";
import { UserEntity } from "../entities/auth";

export abstract class AuthRepository {
    protected readonly dataSource: AuthDatasource;

    constructor(dataSource: AuthDatasource) {
        this.dataSource = dataSource;
    }
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract getUserById(user_id: string): Promise<UserEntity>;
}
