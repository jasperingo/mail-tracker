import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class UserResponseMapperInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UserDto | UserDto[]> {
    return next.handle().pipe(
      map((res) =>
        plainToInstance(UserDto, res, {
          enableCircularCheck: true,
        }),
      ),
    );
  }
}
