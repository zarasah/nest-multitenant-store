import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as process from "process";
import {ConfigModule} from "@nestjs/config";
import { DatabaseModule } from './modules/database/database.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { ProductModule } from './modules/product/product.module';
import config from "./configs/config";
import {TenantMiddleware} from "./common/middleware/tenant.middleware";
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import {ExcludePasswordInterceptor} from "./common/interceptors/exclude.password.interceptor";
import {APP_INTERCEPTOR} from "@nestjs/core";

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
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
      AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ExcludePasswordInterceptor,
    },
  ],
})
// export class AppModule {}

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(TenantMiddleware)
        // .forRoutes('*');
        .forRoutes(
            { path: 'tenant/auth/login', method: RequestMethod.POST },
            { path: 'tenant/auth/register', method: RequestMethod.POST },
        );
  }
}
