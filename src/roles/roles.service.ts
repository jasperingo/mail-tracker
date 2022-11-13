import { Injectable } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';
import { RolesRepository } from 'src/roles/roles.repository';
import { User } from 'src/users/entities/user.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RolesRepository) {}

  async create(createRoleDto: CreateRoleDto) {
    const existingRole = await this.roleRepository.findLastByTitle(
      createRoleDto.title,
    );

    if (existingRole !== null) {
      existingRole.endedAt = new Date();
      await this.roleRepository.save(existingRole);
    }

    const role = new Role();
    role.title = createRoleDto.title;

    role.user = new User();
    role.user.id = createRoleDto.userId;

    const result = await this.roleRepository.save(role);

    return this.roleRepository.findOneBy({ id: result.id });
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOneBy({ id });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role: ${updateRoleDto.title}`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
