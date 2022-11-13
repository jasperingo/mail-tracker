import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { RoleDto } from 'src/roles/dto/role.dto';

@Injectable()
export class RolesResponseMapperInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<RoleDto | RoleDto[]> {
    return next.handle().pipe(
      map((res) =>
        plainToInstance(RoleDto, res, {
          enableCircularCheck: true,
        }),
      ),
    );
  }
}
