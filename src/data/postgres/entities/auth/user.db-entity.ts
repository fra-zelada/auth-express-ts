import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

enum UserRole {
    User = "user",
    SuperUser = "super-user",
    Admin = "admin",
}

@Entity()
export class UserDbEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({ length: 100, unique: true })
    username!: string;

    @Column({ length: 100, unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column("simple-array", { default: UserRole.User })
    roles!: UserRole[];
}
