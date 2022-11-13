import { Type, Exclude } from 'class-transformer';
import { Role } from 'src/roles/entities/role.entity';

export class UserDto {
  id: number;

  title: string;

  firstName: string;

  lastName: string;

  email: string;

  @Exclude()
  password: string;

  matriculationNumber: string;

  isAdmin: boolean;

  @Type(() => Role)
  roles: Role[];

  @Type(() => Date)
  createdAt: Date;
}
