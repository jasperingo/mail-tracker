import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/user.repository';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHashService: PasswordHashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.title = createUserDto.title;
    user.matriculationNumber = createUserDto.matriculationNumber;

    user.email = `${user.firstName}.${user.lastName}@futo.edu.ng`.toLowerCase();

    let i = 1;

    while (true) {
      if (await this.userRepository.existsByEmail(user.email)) {
        user.email =
          `${user.firstName}.${user.lastName}.${i}@futo.edu.ng`.toLowerCase();
        i++;
      } else {
        break;
      }
    }

    user.password = await this.passwordHashService.hashPassword(user.password);

    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user ${updateUserDto.firstName}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
