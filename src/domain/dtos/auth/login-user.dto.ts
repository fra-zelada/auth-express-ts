export class LoginUserDto {
    constructor(public email: string, public password: string) {}
    static login(registerData: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    }): [string?, LoginUserDto?] {
        const { email, password } = registerData as LoginUserDto;
        if (!email) return ["No email provided"];
        if (!password) return ["No password provided"];

        return [undefined, new LoginUserDto(email, password)];
    }
}
