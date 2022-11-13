import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TemplateVariable } from 'src/templates/entities/template-variable.entity';

@Injectable()
export class TemplateVariablesRepository extends Repository<TemplateVariable> {
  constructor(dataSource: DataSource) {
    super(TemplateVariable, dataSource.createEntityManager());
  }
}
