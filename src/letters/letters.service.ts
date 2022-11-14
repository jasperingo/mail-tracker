import { Injectable } from '@nestjs/common';
import { LetterValuesRepository } from 'src/letters/letter-values.repository';
import { LettersRepository } from 'src/letters/letters.repository';
import { RecipientsRepository } from 'src/letters/recipients.repository';
import { CreateLetterDto } from './dto/create-letter.dto';

@Injectable()
export class LettersService {
  constructor(
    private readonly lettersRepository: LettersRepository,
    private readonly letterValuesRepository: LetterValuesRepository,
    private readonly recipientsRepository: RecipientsRepository,
  ) {}

  create(createLetterDto: CreateLetterDto) {

    

    return 'This action adds a new letter';
  }

  findAll() {
    return this.lettersRepository.find();
  }

  findOne(id: number) {
    return this.lettersRepository.findOneBy({ id });
  }
}
