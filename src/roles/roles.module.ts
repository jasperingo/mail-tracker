import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { RolesPermissionFactory } from 'src/roles/roles-permission.factory';
import { RolesRepository } from 'src/roles/roles.repository';

@Module({
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService, RolesRepository, RolesPermissionFactory],
  exports: [RolesRepository],
})
export class RolesModule {}
