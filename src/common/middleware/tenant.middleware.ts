import {Injectable, NestMiddleware, BadRequestException, HttpException, HttpStatus} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {TenantService} from "../../modules/tenant/tenant.service";
import {getTenantDataSource} from "../../modules/database/tanent.conection.manager";

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    constructor(
        private readonly tenantService: TenantService
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        if (!req.originalUrl.startsWith('/api/tenant/')) {
            return next();
        }

        const tenantSchema = req.headers['x-tenant-id'] as string;

        if (!tenantSchema) {
            throw new BadRequestException('Tenant header "x-tenant-id" is required');
        }

        try {
            const tenant = await this.tenantService.findBySchema(tenantSchema);
            if (!tenant) {
                throw new HttpException(`Tenant with schema "${tenantSchema}" not found`, HttpStatus.BAD_REQUEST);
            }

            req.tenantDataSource = await getTenantDataSource(tenantSchema);

            console.log(`[TenantMiddleware] Tenant resolved: ${tenantSchema}`);

            return next();
        } catch (err) {
            console.error(`[TenantMiddleware] Error:`, err);
            throw err;
        }
    }
}
