import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserPublicEntity} from "../user/entity/user.public.entity";
import {Repository} from "typeorm";
import {UserTenantEntity} from "../user/entity/user.tenant.entity";
import {PublicUserCreateDto} from "./dto/public.user.create.dto";
import {TenantUserCreateDto} from "./dto/tenant.user.create.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {UserService} from "../user/user.service";
import {LoginDto} from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserPublicEntity) private readonly userPublicRepository: Repository<UserPublicEntity>,
        @InjectRepository(UserTenantEntity) private readonly userTenantRepository: Repository<UserTenantEntity>,
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {
    }

    private generateToken(user: any) {
        const payload = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        };
        const accessToken =  this.jwtService.sign(payload)
        return {
            accessToken,
        };
    }


    async registerPublicUser( publicUserCreateDto: PublicUserCreateDto) {
        const existing = await this.userService.findByEmailPublic(publicUserCreateDto.email);

        if (existing) {
            throw new HttpException('User with this email already exists...', HttpStatus.CONFLICT);
        }

        const hashedPassword = await bcrypt.hash(publicUserCreateDto.password, 10);
        const newUser = await this.userService.createPublicUser({
            ...publicUserCreateDto,
            password: hashedPassword,
        });

        const token = this.generateToken(newUser)

        return {...newUser, token}
    }

    async loginPublic(loginDto: LoginDto) {
        const user = await this.userService.findByEmailPublic(loginDto.email);

        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const valid = await bcrypt.compare(loginDto.password, user.password);

        if (!valid) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return this.generateToken(user);
    }

    async registerTenantUser( tenantUserCreateDto: TenantUserCreateDto) {

    }
}
