import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as process from 'process';
import configuration from '../configs/config';

const env = process.env.NODE_ENV || 'development';

dotenv.config({ path: `.${env}.env` });

const config = configuration();

export default new DataSource({
    type: config.database.type as 'postgres',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    // entities: [__dirname + '/../modules/**/entity/*.entity{.ts,.js}'],
    entities: [__dirname + '/../../modules/**/entity/*.public.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: false,
});
