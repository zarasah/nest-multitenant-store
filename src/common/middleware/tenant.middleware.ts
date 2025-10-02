import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {TenantService} from "../../modules/tenant/tenant.service";
import {getTenantDataSource} from "../../modules/database/tanent.conection.manager";

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    constructor(
        private readonly tenantService: TenantService
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const tenantSchema = req.headers['x-tenant-id'] as string;

        if (!tenantSchema) {
            throw new BadRequestException('Tenant header x-tenant-id is required');
        }

        const tenant = await this.tenantService.getAllTenants();
        const exists = tenant.find((t) => t.schemaName === tenantSchema);
        if (!exists) {
            throw new BadRequestException('Tenant not found');
        }

        req.tenantDataSource = await getTenantDataSource(tenantSchema);

        next();
    }
}
