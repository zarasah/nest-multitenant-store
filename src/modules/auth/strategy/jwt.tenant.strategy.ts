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
            secretOrKey: 'yourSecretKey',
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        if (!payload.schemaName) {
            throw new UnauthorizedException('Tenant schema missing');
        }

        return {
            id: payload.id,
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName,
            role: payload.role,
            schemaName: payload.schemaName,
        }
    }
}
