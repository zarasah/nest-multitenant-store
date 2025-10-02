import 'express';
import { DataSource } from 'typeorm';

declare module 'express' {
    export interface Request {
        tenantDataSource?: DataSource;
    }
}
