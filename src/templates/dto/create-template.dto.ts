import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { TemplateVariableSource } from 'src/templates/entities/template-variable.entity';

export class CreateTemplateVariableDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(TemplateVariableSource)
  source: TemplateVariableSource;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.source === TemplateVariableSource.DATABASE)
  databaseField?: string;
}

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => CreateTemplateVariableDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty()
  templateVariables: CreateTemplateVariableDto[];
}
