import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class RoleExistGuard implements CanActivate {
  constructor(private readonly roleService: RolesService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const roleId = Number(req.params.id);

    if (isNaN(roleId)) {
      throw new NotFoundException();
    }

    req.data.role = await this.roleService.findOne(roleId);

    if (req.data.role !== null) {
      return true;
    } else {
      throw new NotFoundException();
    }
  }
}
