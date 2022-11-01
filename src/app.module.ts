import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE, APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from 'src/utils/filters/all-exception.filter';
import { validationErrorFactory } from 'src/utils/functions/validation-error-factory.function';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          transform: true,
          stopAtFirstError: true,
          forbidNonWhitelisted: true,
          exceptionFactory: validationErrorFactory,
        }),
    },
  ],
})
export class AppModule {}
