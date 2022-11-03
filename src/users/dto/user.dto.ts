import { Type, Exclude } from 'class-transformer';

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

  @Type(() => Date)
  createdAt: Date;
}
