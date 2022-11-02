import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserResponseMapperInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<User | User[]> {
    return next.handle().pipe(
      map((res) =>
        plainToInstance(UserDto, res, {
          enableCircularCheck: true,
        }),
      ),
    );
  }
}
