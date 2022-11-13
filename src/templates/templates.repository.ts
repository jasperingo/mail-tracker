import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Template } from 'src/templates/entities/template.entity';

@Injectable()
export class TemplatesRepository extends Repository<Template> {
  constructor(dataSource: DataSource) {
    super(Template, dataSource.createEntityManager());
  }
}
