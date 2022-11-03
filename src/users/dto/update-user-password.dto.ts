import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @MinLength(6)
  @IsNotEmpty()
  oldPassword: string;
}
