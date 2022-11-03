import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class UserExistGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      throw new NotFoundException();
    }

    try {
      req.data.user = await this.userRepository.findOneByOrFail({ id: userId });
      return true;
    } catch {
      throw new NotFoundException();
    }
  }
}
