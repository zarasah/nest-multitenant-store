import { Module } from '@nestjs/common';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TenantPublicEntity} from "./entity/tenant.public.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TenantPublicEntity])],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService]
})
export class TenantModule {}
