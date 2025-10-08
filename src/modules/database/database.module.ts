import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const db = configService.get('database');
                return {
                    type: db.type,
                    host: db.host,
                    port: db.port,
                    username: db.username,
                    password: db.password,
                    database: db.name,
                    // entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
                    entities: [__dirname + '/../../modules/**/entity/*.public.entity{.ts,.js}'],
                    synchronize: process.env.NODE_ENV === 'development',
                    migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
                    // logging: process.env.NODE_ENV !== 'production',
                };
            },
            inject: [ConfigService],
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {
    static dataSource: DataSource;
    constructor(private dataSource: DataSource) {
        DatabaseModule.dataSource = dataSource;
    }
}


// import {Global, Module} from '@nestjs/common';
// import {TypeOrmModule} from "@nestjs/typeorm";
// import {ConfigModule, ConfigService} from "@nestjs/config";
//
// @Global()
// @Module({
//     imports: [
//         TypeOrmModule.forRootAsync({
//             imports: [ConfigModule],
//             useFactory: (configService: ConfigService) => {
//                 const db = configService.get('database');
//                 return {
//                     type: db.type,
//                     host: db.host,
//                     port: db.port,
//                     username: db.username,
//                     password: db.password,
//                     database: db.name,
//                     entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
//                     synchronize: process.env.NODE_ENV === 'development',
//                     migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
//                     logging: process.env.NODE_ENV !== 'production',
//                 };
//             },
//             inject: [ConfigService],
//         }),
//     ],
//     exports: [TypeOrmModule],
// })
// export class DatabaseModule {}
