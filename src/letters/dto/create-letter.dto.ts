import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateRecipientDto {
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  level: number;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}

export class CreateLetterValueDto {
  @IsNotEmpty()
  value: string;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  templateVariableId: number;
}

export class CreateLetterDto {
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
