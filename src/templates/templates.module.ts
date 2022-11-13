import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from 'src/templates/entities/template.entity';
import { TemplateVariable } from 'src/templates/entities/template-variable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Template, TemplateVariable])],
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
