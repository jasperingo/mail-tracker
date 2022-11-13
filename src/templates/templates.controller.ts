import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { TemplatesResponseMapperInterceptor } from 'src/templates/interceptors/templates-response-mapper.interceptor';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateTemplatePermissionGuard } from 'src/templates/guards/create-template-permission.guard';
import { ReadTemplatesPermissionGuard } from 'src/templates/guards/read-templates-permission.guard';
import { ReadTemplatePermissionGuard } from 'src/templates/guards/read-template-permission.guard';
import { TemplateExistGuard } from 'src/templates/guards/template-exist.guard';
import { DataParam } from 'src/utils/decorators/data-param.decorator';
import { Template } from 'src/templates/entities/template.entity';

@Controller('templates')
@UseInterceptors(TemplatesResponseMapperInterceptor)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreateTemplatePermissionGuard)
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto);
  }

  @Get()
  @UseGuards(ReadTemplatesPermissionGuard)
  findAll() {
    return this.templatesService.findAll();
  }

  @Get(':id')
  @UseGuards(TemplateExistGuard, ReadTemplatePermissionGuard)
  findOne(@DataParam('template') template: Template) {
    return template;
  }
}
