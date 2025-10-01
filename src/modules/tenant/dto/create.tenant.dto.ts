import {IsNotEmpty, IsString} from "class-validator";

export class CreateTenantDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    schemaName: string;
}