import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

export class RoleDto {
  id: number;

  title: string;

  @Type(() => Date)
  endedAt: Date;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => User)
  user: User;
}
