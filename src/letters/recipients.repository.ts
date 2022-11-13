import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Recipient } from 'src/letters/entities/recipient.entity';

@Injectable()
export class RecipientsRepository extends Repository<Recipient> {
  constructor(dataSource: DataSource) {
    super(Recipient, dataSource.createEntityManager());
  }
}
