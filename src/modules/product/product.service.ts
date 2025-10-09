import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductTenantEntity } from "./entity/product.tenant.entity";
import { Repository } from "typeorm";
import {getTenantDataSource} from "../database/tanent.conection.manager";
import {CurrentTenantUser} from "../../common/types/current.tenant.user";

@Injectable()
export class ProductService {
    private async getRepo(schemaName: string): Promise<Repository<ProductTenantEntity>> {
        const dataSource = await getTenantDataSource(schemaName);
        return dataSource.getRepository(ProductTenantEntity);
    }


    async createProduct(user: CurrentTenantUser, data: Partial<ProductTenantEntity>) {
        const repo = await this.getRepo(user.schemaName);
        const product = repo.create(data);

        return repo.save(product);
    }

    async getAllProducts(schemaName: string) {
        const repo = await this.getRepo(schemaName);

        return repo.find();
    }

    async updateProduct(user: CurrentTenantUser, id: number, data: Partial<ProductTenantEntity>) {
        const repo = await this.getRepo(user.schemaName);
        const product = await repo.findOneBy({ id });

        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        repo.merge(product, data);

        return repo.save(product);
    }

    async deleteProduct(user: CurrentTenantUser, id: number) {
        const repo = await this.getRepo(user.schemaName);
        const product = await repo.findOneBy({ id });

        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        return repo.remove(product);
    }
}
