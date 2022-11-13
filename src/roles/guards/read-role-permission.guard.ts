import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { RolesPermissionFactory } from 'src/roles/roles-permission.factory';
import { Action } from 'src/utils/action.enum';

@Injectable()
export class ReadRolePermissionGuard implements CanActivate {
  constructor(private rolePermissionFactory: RolesPermissionFactory) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const ability = this.rolePermissionFactory.create(req.user);

    if (ability.can(Action.Read, req.data.role)) {
      return true;
    }

    throw new ForbiddenException();
  }
}
