import { Injectable } from '@nestjs/common';
import { TemplateVariable } from 'src/templates/entities/template-variable.entity';
import { Template } from 'src/templates/entities/template.entity';
import { TemplateVariablesRepository } from 'src/templates/template-variables.repository';
import { TemplatesRepository } from 'src/templates/templates.repository';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(
    private readonly templatesRepository: TemplatesRepository,
    private readonly templateVariablesRepository: TemplateVariablesRepository,
  ) {}

  async create(createTemplateDto: CreateTemplateDto) {
    const template = new Template();
    template.title = createTemplateDto.title;
    template.content = createTemplateDto.content;

    const result = await this.templatesRepository.save(template);

    await this.templateVariablesRepository.save(
      createTemplateDto.templateVariables.map((item) => {
        const variable = new TemplateVariable();
        variable.name = item.name;
        variable.source = item.source;
        variable.template = result;
        variable.databaseField = item.databaseField;
        return variable;
      }),
    );

    return this.findOne(result.id);
  }

  findAll() {
    return this.templatesRepository.find();
  }

  findOne(id: number) {
    return this.templatesRepository.findOneBy({ id });
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return `This action updates a #${id} template ${updateTemplateDto.content}`;
  }

  remove(id: number) {
    return `This action removes a #${id} template`;
  }
}
