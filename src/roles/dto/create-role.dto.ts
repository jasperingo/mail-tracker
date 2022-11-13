import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
