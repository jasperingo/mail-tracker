import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesResponseMapperInterceptor } from 'src/roles/interceptors/roles-response-mapper.interceptor';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateRolePermissionGuard } from 'src/roles/guards/create-role-permission.guard';
import { ReadRolesPermissionGuard } from 'src/roles/guards/read-roles-permission.guard';
import { RoleExistGuard } from 'src/roles/guards/role-exist.guard';
import { ReadRolePermissionGuard } from 'src/roles/guards/read-role-permission.guard';
import { DataParam } from 'src/utils/decorators/data-param.decorator';
import { Role } from 'src/roles/entities/role.entity';

@Controller('roles')
@UseInterceptors(RolesResponseMapperInterceptor)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreateRolePermissionGuard)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, ReadRolesPermissionGuard)
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @UseGuards(RoleExistGuard, JwtAuthGuard, ReadRolePermissionGuard)
  findOne(@DataParam('role') role: Role) {
    return role;
  }
}
