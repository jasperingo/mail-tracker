import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { LettersPermissionFactory } from 'src/letters/letters-permission.factory';
import { Action } from 'src/utils/action.enum';

@Injectable()
export class ReadLetterPermissionGuard implements CanActivate {
  constructor(private letterPermissionFactory: LettersPermissionFactory) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const ability = this.letterPermissionFactory.create(req.user);

    const isRecipient = req.data.letter.recipients.find(
      (r) => r.role.user.id === req.user.id,
    );

    if (
      ability.can(Action.Read, req.data.letter) ||
      isRecipient !== undefined
    ) {
      return true;
    }

    throw new ForbiddenException();
  }
}
