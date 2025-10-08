import {Body, Controller, Post, Req} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {TenantUserCreateDto} from "./dto/tenant.user.create.dto";
import { Request } from 'express';
import {LoginDto} from "./dto/login.dto";

@Controller('tenant/auth')
export class AuthTenantController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('register')
    async register(
        @Req() req: Request,
        @Body() tenantUserCreateDto: TenantUserCreateDto
    ) {
        return this.authService.registerTenantUser(req, tenantUserCreateDto)
    }

    @Post('login')
    async login(
        @Req() req: Request,
        @Body() loginDto: LoginDto
    ) {
        return this.authService.loginTenant(req, loginDto)
    }
}
