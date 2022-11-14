import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { Letter } from 'src/letters/entities/letter.entity';
import { UserPermissionFactory } from 'src/users/user-permission.factory';
import { Action } from 'src/utils/action.enum';

@Injectable()
export class ReadUserLettersPermissionGuard implements CanActivate {
  constructor(private userPermissionFactory: UserPermissionFactory) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const ability = this.userPermissionFactory.create(req.user);

    const letter = new Letter();
    letter.user = req.data.user;

    if (ability.can(Action.ReadMany, letter)) {
      return true;
    }

    throw new ForbiddenException();
  }
}
