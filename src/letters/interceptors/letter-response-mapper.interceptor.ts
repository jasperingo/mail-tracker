import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { LetterDto } from 'src/letters/dto/letter.dto';

@Injectable()
export class LetterResponseMapperInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<LetterDto | LetterDto[]> {
    return next.handle().pipe(
      map((res) =>
        plainToInstance(LetterDto, res, {
          enableCircularCheck: true,
        }),
      ),
    );
  }
}
