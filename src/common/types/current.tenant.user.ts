import {UserTenantEntity} from "../../modules/user/entity/user.tenant.entity";

export type CurrentTenantUser = UserTenantEntity & { schemaName: string };
