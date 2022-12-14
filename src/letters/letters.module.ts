import { Module } from '@nestjs/common';
import { LettersService } from './letters.service';
import { LettersController } from './letters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Letter } from 'src/letters/entities/letter.entity';
import { LetterValue } from 'src/letters/entities/letter-value.entity';
import { Recipient } from 'src/letters/entities/recipient.entity';
import { LettersPermissionFactory } from 'src/letters/letters-permission.factory';
import { LettersRepository } from 'src/letters/letters.repository';
import { LetterValuesRepository } from 'src/letters/letter-values.repository';
import { RecipientsRepository } from 'src/letters/recipients.repository';
import { TemplatesModule } from 'src/templates/templates.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Letter, LetterValue, Recipient]),
    TemplatesModule,
  ],
  controllers: [LettersController],
  providers: [
    LettersService,
    LettersRepository,
    LetterValuesRepository,
    RecipientsRepository,
    LettersPermissionFactory,
  ],
  exports: [LettersRepository, LettersService],
})
export class LettersModule {}
