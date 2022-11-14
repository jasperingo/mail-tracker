import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CreateLetterDto } from 'src/letters/dto/create-letter.dto';

@Injectable()
export class RecipientsIsValidPipe implements PipeTransform {
  transform(value: CreateLetterDto) {
    for (let i = 0; i < value.recipients.length; i++) {
      if (value.recipients.find((r) => r.level === i) === undefined) {
        throw new BadRequestException([
          {
            value: value.recipients,
            message: 'Recipients levels are not sequential',
            name: 'recipients',
            errors: [],
          },
        ]);
      }
    }

    return value;
  }
}
