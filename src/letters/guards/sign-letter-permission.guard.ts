import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class SignLetterPermissionGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const recipient = req.data.letter.recipients.find(
      (r) => r.role.user.id === req.user.id,
    );

    if (
      recipient !== undefined &&
      (recipient.level === 0 ||
        req.data.letter.recipients[recipient.level - 1].signedAt !== null)
    ) {
      return true;
    }

    throw new ForbiddenException();
  }
}
