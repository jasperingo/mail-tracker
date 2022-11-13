import { TemplateVariableSource } from 'src/templates/entities/template-variable.entity';

export class TemplateVariableDto {
  id: number;

  name: string;

  source: TemplateVariableSource;

  databaseField: string;
}
