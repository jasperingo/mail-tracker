import { Type } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

export class RoleDto {
  id: number;

  title: string;

  @Type(() => Date)
  endedAt: Date;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => UserDto)
  user: UserDto;
}
