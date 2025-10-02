import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as process from "process";
import {ConfigModule} from "@nestjs/config";
import { DatabaseModule } from './modules/database/database.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { ProductModule } from './modules/product/product.module';
import config from "./configs/config";
import {TenantMiddleware} from "./common/middleware/tenant.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      expandVariables: true,
      load: [config],
    }),
    DatabaseModule,
    TenantModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {}

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(TenantMiddleware)
        .forRoutes('*');
  }
}
