import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE, APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllExceptionFilter } from 'src/utils/filters/all-exception.filter';
import { validationErrorFactory } from 'src/utils/functions/validation-error-factory.function';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NextFunction, Request, Response } from 'express';
import { RolesModule } from './roles/roles.module';
import { TemplatesModule } from './templates/templates.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ expandVariables: true, isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        bigNumberStrings: false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RolesModule,
    TemplatesModule,
  ],
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        req.data = {} as any;
        next();
      })
      .forRoutes('*');
  }
}
