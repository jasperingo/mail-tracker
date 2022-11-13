import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/users/entities/user.entity';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';
import { UserRepository } from 'src/users/user.repository';
import { UserPermissionFactory } from 'src/users/user-permission.factory';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    PasswordHashService,
    UserPermissionFactory,
  ],
  exports: [UserRepository],
})
export class UsersModule {}
