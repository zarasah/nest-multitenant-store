import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {TenantService} from "./tenant.service";
import {CreateTenantDto} from "./dto/create.tenant.dto";
import {RoleGuard} from "../../common/guards/role.guard";
import {Roles} from "../../common/decorators/role.decorator";
import {UserTypeEnum} from "../../common/enums/user.type.enum";
import {JwtAuthGuard} from "../../common/guards/jwt.auth.guard";

@Controller('tenants')
export class TenantController {
    constructor(private readonly tenantService: TenantService) {}

    @Post()
    @Roles(UserTypeEnum.Admin)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async createTenant(
        @Body() createTenantDto: CreateTenantDto,
    ) {
        return this.tenantService.createTenant(createTenantDto);
    }

    @Get()
    async getTenants() {
        return this.tenantService.getAllTenants();
    }
}
