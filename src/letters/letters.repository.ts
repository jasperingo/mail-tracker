import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Letter } from 'src/letters/entities/letter.entity';

@Injectable()
export class LettersRepository extends Repository<Letter> {
  constructor(dataSource: DataSource) {
    super(Letter, dataSource.createEntityManager());
  }
}
