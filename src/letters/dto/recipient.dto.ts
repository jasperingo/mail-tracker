import { Type } from 'class-transformer';
import { RoleDto } from 'src/roles/dto/role.dto';

export class RecipientDto {
  id: number;

  level: number;

  @Type(() => Date)
  signedAt: Date;

  @Type(() => RoleDto)
  role: RoleDto;
}
