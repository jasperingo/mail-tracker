import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CreateLetterDto } from 'src/letters/dto/create-letter.dto';
import { TemplateVariableSource } from 'src/templates/entities/template-variable.entity';
import { TemplateVariablesRepository } from 'src/templates/template-variables.repository';
import { TemplatesRepository } from 'src/templates/templates.repository';

@Injectable()
export class LetterValuesIsValidPipe implements PipeTransform {
  constructor(
    private readonly templatesRepository: TemplatesRepository,
    private readonly templateVariablesRepository: TemplateVariablesRepository,
  ) {}

  async transform(value: CreateLetterDto) {
    for (const v of value.letterValues) {
      const tempVar = await this.templateVariablesRepository.findOneBy({
        id: v.templateVariableId,
      });

      if (tempVar === null || tempVar.source !== TemplateVariableSource.INPUT) {
        throw new BadRequestException([
          {
            value: value.letterValues,
            message: 'letterValues contains an invalid templateVariableId',
            name: 'letterValues',
            errors: [],
          },
        ]);
      }
    }

    const template = await this.templatesRepository.findOneBy({
      id: value.templateId,
    });

    for (const tv of template.templateVariables) {
      if (
        tv.source === TemplateVariableSource.INPUT &&
        value.letterValues.find((lv) => lv.templateVariableId === tv.id) ===
          undefined
      ) {
        throw new BadRequestException([
          {
            value: value.letterValues,
            message:
              'letterValues did not provide values for all templateVariables',
            name: 'letterValues',
            errors: [],
          },
        ]);
      }
    }

    return value;
  }
}
