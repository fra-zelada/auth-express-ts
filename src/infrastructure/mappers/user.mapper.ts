import { UserEntity } from "../../domain/entities/auth/user.entity";
import { CustomError } from "../../domain/errors";
export class UserMapper {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static userEntityFromObject(object: { [key: string]: any }): UserEntity {
        const { id, username, email, password, roles } = object;

        if (!id || !username || !email || !password || !roles) {
            throw CustomError.badRequest("Invalid user object");
        }

        return new UserEntity(id, username, email, password, roles);
    }
}
