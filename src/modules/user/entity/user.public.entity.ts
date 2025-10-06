import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {UserTypeEnum} from "../../../common/enums/user.type.enum";

@Entity({ name: 'user', schema: 'public' })
export class UserPublicEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: "varchar", nullable: false, default: UserTypeEnum.Admin })
    role: UserTypeEnum;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}