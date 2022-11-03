import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategyService } from './services/local-strategy/local-strategy.service';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';
import { ConfigService } from '@nestjs/config';
import { JwtStrategyService } from './services/jwt-strategy/jwt-strategy.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategyService,
    PasswordHashService,
    JwtStrategyService,
  ],
})
export class AuthModule {}
