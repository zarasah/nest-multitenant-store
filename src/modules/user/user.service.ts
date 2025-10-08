import { Injectable } from '@nestjs/common';
import {UserTenantEntity} from "./entity/user.tenant.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UserPublicEntity} from "./entity/user.public.entity";
import {Repository} from "typeorm";
import { Request } from "express";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserPublicEntity) private readonly userPublicRepository: Repository<UserPublicEntity>
    ) {
    }

    async findByEmailPublic(email: string) {
        return this.userPublicRepository.findOne({ where: { email } });
    }

    async findByEmailTenant(req: Request, email: string, schemaName: string) {
        const repo = req.tenantDataSource.getRepository(UserTenantEntity);
        return repo.findOne({ where: { email } });
    }

    async createPublicUser(data: Partial<UserPublicEntity>) {
        const user = this.userPublicRepository.create(data);
        return this.userPublicRepository.save(user);
    }

    async createTenantUser(req: Request, data: Partial<UserTenantEntity>, schemaName: string) {
        const repo = req.tenantDataSource.getRepository(UserTenantEntity);
        const user = repo.create(data);
        return repo.save(user);
    }

    async findById(req, userId: number, schemaName?: string) {
        if (schemaName) {
            const repo = req.tenantDataSource.getRepository(UserTenantEntity);
            return repo.findOne({ where: { id: userId } });
        } else {
            return this.userPublicRepository.findOne({ where: { id: userId } });
        }
    }

}
