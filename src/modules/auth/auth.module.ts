import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserPublicEntity} from "../user/entity/user.public.entity";
import {UserTenantEntity} from "../user/entity/user.tenant.entity";
import {AuthTenantController} from "./auth.tenant.controller";
import {UserService} from "../user/user.service";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {JwtTenantStrategy} from "./strategy/jwt.tenant.strategy";

@Module({
  imports: [
      ConfigModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('jwt.secret'),
          signOptions: { expiresIn: configService.get<string>('jwt.expiresIn') || '1d' },
        }),
        inject: [ConfigService],
      }),
      TypeOrmModule.forFeature([UserPublicEntity, UserTenantEntity])
  ],
  controllers: [AuthController, AuthTenantController],
  providers: [JwtStrategy, JwtTenantStrategy, AuthService, UserService],
  exports: [JwtModule]
})
export class AuthModule {}
