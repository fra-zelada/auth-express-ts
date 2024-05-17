import { UserRole } from "../../interfaces/auth";

export class RegisterUserDto {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public roles: UserRole[]
    ) {}
    static register(registerData: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    }): [string?, RegisterUserDto?] {
        const { email, password, roles, username } =
            registerData as RegisterUserDto;
        if (!email) return ["No email provided"];
        if (!password) return ["No password provided"];
        if (!roles) return ["No roles provided"];
        if (!username) return ["No username provided"];

        return [
            undefined,
            new RegisterUserDto(username, email, password, roles),
        ];
    }
}
