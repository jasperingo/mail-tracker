import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserPermissionFactory } from 'src/users/user-permission.factory';
import { Action } from 'src/utils/action.enum';

@Injectable()
export class ReadUserPermissionGuard implements CanActivate {
  constructor(private userPermissionFactory: UserPermissionFactory) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const ability = this.userPermissionFactory.create(req.user);

    if (ability.can(Action.Read, req.data.user)) {
      return true;
    }

    throw new ForbiddenException();
  }
}
