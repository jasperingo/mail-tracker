import { Injectable } from '@nestjs/common';
import { TemplatesRepository } from 'src/templates/templates.repository';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly templatesRepository: TemplatesRepository) {}

  create(createTemplateDto: CreateTemplateDto) {
    return 'This action adds a new template';
  }

  findAll() {
    return `This action returns all templates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} template`;
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return `This action updates a #${id} template ${updateTemplateDto.content}`;
  }

  remove(id: number) {
    return `This action removes a #${id} template`;
  }
}
