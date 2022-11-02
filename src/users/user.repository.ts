import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async existsByEmail(email: string) {
    try {
      await this.findOneByOrFail({ email });
      return true;
    } catch {
      return false;
    }
  }
}
