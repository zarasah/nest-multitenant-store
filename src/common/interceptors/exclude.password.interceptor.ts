import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => this.excludePassword(data))
        );
    }

    private excludePassword(data: any) {
        if (Array.isArray(data)) {
            return data.map(item => this.removePassword(item));
        }
        return this.removePassword(data);
    }

    private removePassword(obj: any) {
        if (obj && typeof obj === 'object' && 'password' in obj) {
            const { password, ...rest } = obj;
            return rest;
        }
        return obj;
    }
}
