import { Type } from 'class-transformer';
import { LetterValueDto } from 'src/letters/dto/letter-value.dto';
import { RecipientDto } from 'src/letters/dto/recipient.dto';
import { TemplateDto } from 'src/templates/dto/template.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class LetterDto {
  id: number;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => UserDto)
  user: UserDto;

  @Type(() => TemplateDto)
  template: TemplateDto;

  @Type(() => LetterValueDto)
  letterValues: LetterValueDto[];

  @Type(() => RecipientDto)
  recipients: RecipientDto[];
}
