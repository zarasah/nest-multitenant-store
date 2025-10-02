import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductTenantEntity } from "./entity/product.tenant.entity";
import { Repository } from "typeorm";
import { Request } from "express"

@Injectable()
export class ProductService {
    private getRepo(req: Request): Repository<ProductTenantEntity> {
        return req.tenantDataSource.getRepository(ProductTenantEntity);
    }

    async createProduct(req: Request, data: Partial<ProductTenantEntity>) {
        const repo = this.getRepo(req);
        const product = repo.create(data);

        return repo.save(product);
    }

    async getAllProducts(req: Request) {
        const repo = this.getRepo(req);

        return repo.find();
    }

    async updateProduct(req: Request, id: number, data: Partial<ProductTenantEntity>) {
        const repo = this.getRepo(req);
        const product = await repo.findOneBy({ id });
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        repo.merge(product, data);

        return repo.save(product);
    }

    async deleteProduct(req: Request, id: number) {
        const repo = this.getRepo(req);
        const product = await repo.findOneBy({ id });
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        return repo.remove(product);
    }
}
