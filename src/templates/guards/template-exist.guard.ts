import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { TemplatesService } from 'src/templates/templates.service';

@Injectable()
export class TemplateExistGuard implements CanActivate {
  constructor(private readonly templateService: TemplatesService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const templateId = Number(req.params.id);

    if (isNaN(templateId)) {
      throw new NotFoundException();
    }

    req.data.template = await this.templateService.findOne(templateId);

    if (req.data.template !== null) {
      return true;
    } else {
      throw new NotFoundException();
    }
  }
}
