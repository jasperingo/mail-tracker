import { Injectable } from '@nestjs/common';
import { LettersRepository } from 'src/letters/letters.repository';
import { LettersService } from 'src/letters/letters.service';
import { RolesRepository } from 'src/roles/roles.repository';
import { UpdateUserPasswordDto } from 'src/users/dto/update-user-password.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/user.repository';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rolesRepository: RolesRepository,
    private readonly lettersService: LettersService,
    private readonly lettersRepository: LettersRepository,
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
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserPasswordDto) {
    const password = await this.passwordHashService.hashPassword(
      updateUserDto.password,
    );
    await this.userRepository.update(id, { password });
    return this.userRepository.findOneBy({ id });
  }

  findRoles(user: User) {
    return this.rolesRepository.findBy({ user });
  }

  async findLetters(user: User) {
    const letters = await this.lettersRepository.find({
      where: [
        { user: { id: user.id } },
        { recipients: { role: { user: { id: user.id } } } },
      ],
    });

    for (const letter of letters) {
      letter.template.content = this.lettersService.template(letter);
    }

    return letters;
  }
}
