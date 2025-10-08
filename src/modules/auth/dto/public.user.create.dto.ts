import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {UserTypeEnum} from "../../../common/enums/user.type.enum";

export class PublicUserCreateDto {
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

    @IsEnum(UserTypeEnum)
    @IsNotEmpty()
    role: UserTypeEnum;
}