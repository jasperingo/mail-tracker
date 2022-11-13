import { Type } from 'class-transformer';
import { TemplateVariableDto } from 'src/templates/dto/template-variable.dto';

export class LetterValueDto {
  id: number;

  value: string;

  @Type(() => TemplateVariableDto)
  templateVariable: TemplateVariableDto;
}
