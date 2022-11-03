import {
  Injectable,
  Inject,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UpdateUserPasswordDto } from 'src/users/dto/update-user-password.dto';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';

@Injectable()
export class UserPasswordIsValidPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly passwordHashService: PasswordHashService,
  ) {}

  async transform(value: UpdateUserPasswordDto) {
    if (
      !(await this.passwordHashService.comparePassword(
        value.oldPassword,
        this.request.user.password,
      ))
    ) {
      throw new BadRequestException([
        {
          value: value.oldPassword,
          message: 'Password is invalid',
          name: 'oldPassword',
          errors: [],
        },
      ]);
    }

    return value;
  }
}
