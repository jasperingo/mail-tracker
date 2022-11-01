import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/users/entities/user.entity';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';
import { UserRepository } from 'src/users/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, PasswordHashService],
})
export class UsersModule {}
