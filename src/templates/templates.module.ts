import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from 'src/templates/entities/template.entity';
import { TemplateVariable } from 'src/templates/entities/template-variable.entity';
import { TemplatesRepository } from 'src/templates/templates.repository';
import { TemplatesPermissionFactory } from 'src/templates/templates-permission.factory';
import { TemplateVariablesRepository } from 'src/templates/template-variables.repository';
import { IsTemplateVariableIdPipe } from 'src/templates/pipes/is-template-variable-id.pipe';
import { IsTemplateIdPipe } from 'src/templates/pipes/is-template-id.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([Template, TemplateVariable])],
  controllers: [TemplatesController],
  providers: [
    TemplatesService,
    IsTemplateIdPipe,
    IsTemplateVariableIdPipe,
    TemplatesRepository,
    TemplateVariablesRepository,
    TemplatesPermissionFactory,
  ],
})
export class TemplatesModule {}
