import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {UserRoleEnum} from "../../../common/enums/user.role.enum";

export class TenantUserCreateDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRoleEnum)
    @IsNotEmpty()
    role: UserRoleEnum;
}