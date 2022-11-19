import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';
import { LetterValue } from 'src/letters/entities/letter-value.entity';
import { Letter } from 'src/letters/entities/letter.entity';
import { Recipient } from 'src/letters/entities/recipient.entity';
import { LetterValuesRepository } from 'src/letters/letter-values.repository';
import { LettersRepository } from 'src/letters/letters.repository';
import { RecipientsRepository } from 'src/letters/recipients.repository';
import { Role } from 'src/roles/entities/role.entity';
import {
  TemplateVariable,
  TemplateVariableSource,
} from 'src/templates/entities/template-variable.entity';
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
    letter.title = createLetterDto.title;

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

    return this.findOne(result.id);
  }

  async findAll() {
    const letters = await this.lettersRepository.find();
    for (const letter of letters) {
      letter.template.content = this.template(letter);
    }
    return letters;
  }

  async findOne(id: number) {
    const letter = await this.lettersRepository.findOneBy({ id });
    letter.template.content = this.template(letter);
    return letter;
  }

  async updateRecipientSignedAt(user: User, letter: Letter) {
    const recipient = letter.recipients.find((r) => r.role.user.id === user.id);
    recipient.signedAt = new Date();

    await this.recipientsRepository.save(recipient);

    return this.findOne(letter.id);
  }

  template(letter: Letter) {
    const data: any = {};

    for (const tv of letter.template.templateVariables) {
      if (tv.source === TemplateVariableSource.INPUT) {
        data[tv.name] = letter.letterValues.find(
          (lv) => lv.templateVariable.id === tv.id,
        ).value;
      } else if (tv.source === TemplateVariableSource.DATABASE) {
        data[tv.name] = letter.user[tv.databaseField];
      }
    }

    const recipients = letter.recipients
      .filter((r) => r.signedAt !== null)
      .sort((first, second) => {
        if (first.letter < second.letter) {
          return -1;
        }

        if (first.letter > second.letter) {
          return 1;
        }

        return 0;
      })
      .map(
        (r) => `<p style=" margin-top: 20px;">
          <b>Signature</b>
          <div>${r.role.user.firstName} ${r.role.user.lastName}</div> 
          <div>${r.role.title}</div> 
          <div>${r.signedAt}</div>
        </p>`,
      );

    const message = ejs.render(letter.template.content, data);

    return `<div>${message} ${recipients}</div>`;
  }
}
