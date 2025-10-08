import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {TenantUserCreateDto} from "./dto/tenant.user.create.dto";
import {PublicUserCreateDto} from "./dto/public.user.create.dto";

@Controller('tenant/auth')
export class AuthTenantController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('register')
    async register(
        @Body() tenantUserCreateDto: TenantUserCreateDto
    ) {
        return this.authService.registerTenantUser(tenantUserCreateDto)
    }
}
