// tenant-jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import {UserService} from "../../user/user.service";

@Injectable()
export class JwtTenantStrategy extends PassportStrategy(Strategy, 'jwt-tenant') {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'yourTenantSecretKey',
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        // const schemaName = req.headers['x-tenant-id'] as string;
        // if (!schemaName) {
        //     throw new UnauthorizedException('Tenant header is missing');
        // }
        //
        // const user = await this.userService.findById(req, payload.id, schemaName);
        // if (!user) {
        //     throw new UnauthorizedException('User not found in tenant schema');
        // }
        //
        // return {
        //     ...user,
        //     schemaName,
        // };
    }
}
