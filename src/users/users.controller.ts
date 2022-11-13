import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from 'src/users/dto/update-user-password.dto';
import { UserResponseMapperInterceptor } from 'src/users/interceptors/user-response-mapper.interceptor';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateUserPermissionGuard } from 'src/users/guards/create-user-permission.guard';
import { UserExistGuard } from 'src/users/guards/user-exist.guard';
import { User } from 'src/users/entities/user.entity';
import { DataParam } from 'src/utils/decorators/data-param.decorator';
import { UserPasswordIsValidPipe } from 'src/users/pipes/user-password-is-valid.pipe';
import { UpdateUserPasswordPermissionGuard } from 'src/users/guards/update-user-password-permission.guard';
import { ReadUsersPermissionGuard } from 'src/users/guards/read-users-permission.guard';
import { ReadUserPermissionGuard } from 'src/users/guards/read-user-permission.guard';

@Controller('users')
@UseInterceptors(UserResponseMapperInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreateUserPermissionGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, ReadUsersPermissionGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(UserExistGuard, JwtAuthGuard, ReadUserPermissionGuard)
  findOne(@DataParam('user') user: User) {
    return user;
  }

  @Put(':id/password')
  @UseGuards(UserExistGuard, JwtAuthGuard, UpdateUserPasswordPermissionGuard)
  update(
    @DataParam('user') user: User,
    @Body(UserPasswordIsValidPipe) updateUserDto: UpdateUserPasswordDto,
  ) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Get(':id/roles')
  @UseGuards(UserExistGuard, JwtAuthGuard, ReadUserPermissionGuard)
  findRoles(@DataParam('user') user: User) {
    return this.usersService.findRoles(user);
  }
}
