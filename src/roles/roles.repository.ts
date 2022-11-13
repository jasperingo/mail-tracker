import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class RolesRepository extends Repository<Role> {
  constructor(dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }
}
