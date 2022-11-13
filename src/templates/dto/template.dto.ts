import { Type } from 'class-transformer';
import { TemplateVariableDto } from 'src/templates/dto/template-variable.dto';

export class TemplateDto {
  id: number;

  title: string;

  content: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => TemplateVariableDto)
  templateVariables: TemplateVariableDto[];
}
