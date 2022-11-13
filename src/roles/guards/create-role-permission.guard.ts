import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { Role } from 'src/roles/entities/role.entity';
import { RolesPermissionFactory } from 'src/roles/roles-permission.factory';
import { Action } from 'src/utils/action.enum';

@Injectable()
export class CreateRolePermissionGuard implements CanActivate {
  constructor(private rolePermissionFactory: RolesPermissionFactory) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const ability = this.rolePermissionFactory.create(req.user);

    if (ability.can(Action.Create, Role)) {
      return true;
    }

    throw new ForbiddenException();
  }
}
