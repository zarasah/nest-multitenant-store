import { DataSource } from 'typeorm';
import { join } from 'path';
import { DatabaseModule } from './database.module';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {ProductTenantEntity} from "../product/entity/product.tenant.entity";

const tenantConnections: Record<string, DataSource> = {};

export const getTenantDataSource = async (schemaName: string): Promise<DataSource> => {
    if (tenantConnections[schemaName]) return tenantConnections[schemaName];

    // Correct glob for both .ts (dev) and .js (prod)
    const tenantEntities = [__dirname + '/../../modules/**/entity/*.tenant.entity{.ts,.js}'];

    const masterOptions = DatabaseModule.dataSource.options as PostgresConnectionOptions;

    const tenantDS = new DataSource({
        type: 'postgres',
        host: masterOptions.host,
        port: masterOptions.port,
        username: masterOptions.username,
        password: masterOptions.password,
        database: masterOptions.database,
        schema: schemaName,
        // entities: [ProductTenantEntity],
        entities: tenantEntities,
        synchronize: process.env.NODE_ENV === 'development',
        // logging: process.env.NODE_ENV !== 'production',
    });

    if (!tenantDS.isInitialized) {
        await tenantDS.initialize();
    }

    tenantConnections[schemaName] = tenantDS;
    return tenantDS;
};
