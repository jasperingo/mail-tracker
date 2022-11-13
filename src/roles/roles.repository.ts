import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class RolesRepository extends Repository<Role> {
  constructor(dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async existsByTitle(title: string) {
    try {
      await this.findOneByOrFail({ title });
      return true;
    } catch {
      return false;
    }
  }

  findByTitle(title: string) {
    return this.findOneBy({ title });
  }

  findLastByTitle(title: string) {
    return this.findOne({ where: { title }, order: { createdAt: 'DESC' } });
  }
}
