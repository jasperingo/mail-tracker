import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { IsUserId } from 'src/users/pipes/is-user-id.pipe';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUserId()
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
