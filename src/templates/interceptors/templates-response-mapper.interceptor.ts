import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { TemplateDto } from 'src/templates/dto/template.dto';

@Injectable()
export class TemplatesResponseMapperInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<TemplateDto | TemplateDto[]> {
    return next.handle().pipe(
      map((res) =>
        plainToInstance(TemplateDto, res, {
          enableCircularCheck: true,
        }),
      ),
    );
  }
}
