import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {TenantEntity} from "./entity/tenant.entity";
import {DataSource, Repository} from "typeorm";
import {CreateTenantDto} from "./dto/create.tenant.dto";
import {getTenantDataSource} from "../database/tanent.conection.manager";

@Injectable()
export class TenantService {
    constructor(
        @InjectRepository(TenantEntity)
        private readonly tenantRepository: Repository<TenantEntity>,
        private readonly dataSource: DataSource,
    ) {}

    async createTenant( createTenantDto: CreateTenantDto): Promise<TenantEntity> {
        console.log('here')
        const tenant: TenantEntity = this.tenantRepository.create(createTenantDto);
        await this.tenantRepository.save(tenant);
        console.log('after saving new tenant')
        await this.dataSource.query(`CREATE SCHEMA IF NOT EXISTS "${createTenantDto.schemaName}"`);
        console.log(`Schema "${createTenantDto.schemaName}" created`);
        const tenantDS = await getTenantDataSource(createTenantDto.schemaName);
        console.log('Tenant DataSource initialized');
        await tenantDS.synchronize();
        console.log('Loaded entities:', tenantDS.entityMetadatas.map(e => e.name));
        return tenant;
    }

    async getAllTenants(): Promise<TenantEntity[]> {
        return this.tenantRepository.find();
    }
}
