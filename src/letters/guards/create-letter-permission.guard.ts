import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { Letter } from 'src/letters/entities/letter.entity';
import { LettersPermissionFactory } from 'src/letters/letters-permission.factory';
import { Action } from 'src/utils/action.enum';

@Injectable()
export class CreateLetterPermissionGuard implements CanActivate {
  constructor(private letterPermissionFactory: LettersPermissionFactory) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const ability = this.letterPermissionFactory.create(req.user);

    if (ability.can(Action.Create, Letter)) {
      return true;
    }

    throw new ForbiddenException();
  }
}
