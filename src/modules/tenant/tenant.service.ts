import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {TenantPublicEntity} from "./entity/tenant.public.entity";
import {DataSource, Repository} from "typeorm";
import {CreateTenantDto} from "./dto/create.tenant.dto";
import {getTenantDataSource} from "../database/tanent.conection.manager";

@Injectable()
export class TenantService {
    constructor(
        @InjectRepository(TenantPublicEntity)
        private readonly tenantRepository: Repository<TenantPublicEntity>,
        private readonly dataSource: DataSource,
    ) {}

    async createTenant( createTenantDto: CreateTenantDto): Promise<TenantPublicEntity> {
        const tenant: TenantPublicEntity = this.tenantRepository.create(createTenantDto);
        await this.tenantRepository.save(tenant);
        await this.dataSource.query(`CREATE SCHEMA IF NOT EXISTS "${createTenantDto.schemaName}"`);
        const tenantDS = await getTenantDataSource(createTenantDto.schemaName);
        await tenantDS.synchronize();

        return tenant;
    }

    async getAllTenants(): Promise<TenantPublicEntity[]> {
        return this.tenantRepository.find();
    }

    async findBySchema(schema: string): Promise<TenantPublicEntity | null> {
        return this.tenantRepository.findOne({
            where: { schemaName: schema },
        });
    }
}
