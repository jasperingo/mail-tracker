import { IsNotEmpty, IsString, MinLength, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.title !== undefined)
  title: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @MinLength(11)
  @IsString()
  @ValidateIf((o) => o.matriculationNumber !== undefined)
  matriculationNumber: string;
}
