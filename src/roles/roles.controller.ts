import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesResponseMapperInterceptor } from 'src/roles/interceptors/roles-response-mapper.interceptor';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateRolePermissionGuard } from 'src/roles/guards/create-role-permission.guard';
import { ReadRolesPermissionGuard } from 'src/roles/guards/read-roles-permission.guard';

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
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }
}
