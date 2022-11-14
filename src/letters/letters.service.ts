import { Injectable } from '@nestjs/common';
import { LetterValue } from 'src/letters/entities/letter-value.entity';
import { Letter } from 'src/letters/entities/letter.entity';
import { Recipient } from 'src/letters/entities/recipient.entity';
import { LetterValuesRepository } from 'src/letters/letter-values.repository';
import { LettersRepository } from 'src/letters/letters.repository';
import { RecipientsRepository } from 'src/letters/recipients.repository';
import { Role } from 'src/roles/entities/role.entity';
import { TemplateVariable } from 'src/templates/entities/template-variable.entity';
import { Template } from 'src/templates/entities/template.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateLetterDto } from './dto/create-letter.dto';

@Injectable()
export class LettersService {
  constructor(
    private readonly lettersRepository: LettersRepository,
    private readonly letterValuesRepository: LetterValuesRepository,
    private readonly recipientsRepository: RecipientsRepository,
  ) {}

  async create(user: User, createLetterDto: CreateLetterDto) {
    const template = new Template();
    template.id = createLetterDto.templateId;

    const letter = new Letter();
    letter.user = user;
    letter.template = template;

    const result = await this.lettersRepository.save(letter);

    const createLetterValues = this.letterValuesRepository.save(
      createLetterDto.letterValues.map((lv) => {
        const tv = new TemplateVariable();
        tv.id = lv.templateVariableId;
        const letterValue = new LetterValue();
        letterValue.letter = result;
        letterValue.value = lv.value;
        letterValue.templateVariable = tv;
        return letterValue;
      }),
    );

    const createRecipients = this.recipientsRepository.save(
      createLetterDto.recipients.map((r) => {
        const role = new Role();
        role.id = r.roleId;
        const recipient = new Recipient();
        recipient.letter = result;
        recipient.level = r.level;
        recipient.role = role;
        return recipient;
      }),
    );

    await Promise.all([createLetterValues, createRecipients]);

    return this.lettersRepository.findOneBy({ id: result.id });
  }

  findAll() {
    return this.lettersRepository.find();
  }

  findOne(id: number) {
    return this.lettersRepository.findOneBy({ id });
  }
}
