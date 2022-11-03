import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { UserParam } from 'src/utils/decorators/user-param.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  create(@UserParam() user: User) {
    return this.authService.createJWT(user);
  }
}
