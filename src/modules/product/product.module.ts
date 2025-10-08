import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductTenantEntity} from "./entity/product.tenant.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductTenantEntity])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
