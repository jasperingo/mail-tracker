import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/user.repository';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly passwordHashService: PasswordHashService,
  ) {}

  async verifyAuth(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    return user &&
      (await this.passwordHashService.comparePassword(password, user.password))
      ? user
      : null;
  }

  createJWT(user: User) {
    return {
      userId: user.id,
      accessToken: this.jwtService.sign({ sub: user.id }),
    };
  }
}
