import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { Template } from 'src/templates/entities/template.entity';
import { TemplatesPermissionFactory } from 'src/templates/templates-permission.factory';
import { Action } from 'src/utils/action.enum';

@Injectable()
export class ReadTemplatesPermissionGuard implements CanActivate {
  constructor(private templatesPermissionFactory: TemplatesPermissionFactory) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const ability = this.templatesPermissionFactory.create(req.user);

    if (ability.can(Action.ReadMany, Template)) {
      return true;
    }

    throw new ForbiddenException();
  }
}
