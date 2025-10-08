import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserPublicEntity} from "./entity/user.public.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserPublicEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
