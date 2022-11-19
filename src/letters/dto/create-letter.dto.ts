import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { IsRoleId } from 'src/roles/pipes/is-role-id.pipe';
import { IsTemplateId } from 'src/templates/pipes/is-template-id.pipe';
import { IsTemplateVariableId } from 'src/templates/pipes/is-template-variable-id.pipe';

export class CreateRecipientDto {
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  level: number;

  @IsRoleId()
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}

export class CreateLetterValueDto {
  @IsNotEmpty()
  value: string;

  @IsTemplateVariableId()
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  templateVariableId: number;
}

export class CreateLetterDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsTemplateId()
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  templateId: number;

  @Type(() => CreateLetterValueDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty()
  letterValues: CreateLetterValueDto[];

  @Type(() => CreateRecipientDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty()
  recipients: CreateRecipientDto[];
}
