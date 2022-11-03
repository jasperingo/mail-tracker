import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
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
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id/password')
  @UseGuards(JwtAuthGuard, UserExistGuard)
  update(
    @DataParam('user') user: User,
    @Body(UserPasswordIsValidPipe) updateUserDto: UpdateUserPasswordDto,
  ) {
    return this.usersService.update(user.id, updateUserDto);
  }
}
