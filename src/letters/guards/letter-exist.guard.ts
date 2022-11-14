import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { LettersService } from 'src/letters/letters.service';

@Injectable()
export class LetterExistGuard implements CanActivate {
  constructor(private readonly letterService: LettersService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const letterId = Number(req.params.id);

    if (isNaN(letterId)) {
      throw new NotFoundException();
    }

    req.data.letter = await this.letterService.findOne(letterId);

    if (req.data.letter !== null) {
      return true;
    } else {
      throw new NotFoundException();
    }
  }
}
