import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LetterValue } from 'src/letters/entities/letter-value.entity';

@Injectable()
export class LetterValuesRepository extends Repository<LetterValue> {
  constructor(dataSource: DataSource) {
    super(LetterValue, dataSource.createEntityManager());
  }
}
