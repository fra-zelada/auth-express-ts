import { UserRole } from "./user-role.interface";

export interface AuthJwtPayload {
    id: string;
    email: string;
    username: string;
    roles: UserRole[];
}
