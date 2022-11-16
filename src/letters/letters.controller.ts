import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Res,
  Header,
} from '@nestjs/common';
import * as pdf from 'phantom-html-to-pdf';
import { promisify } from 'util';
import { Response } from 'express';
import { LettersService } from './letters.service';
import { CreateLetterDto } from './dto/create-letter.dto';
import { LetterResponseMapperInterceptor } from 'src/letters/interceptors/letter-response-mapper.interceptor';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateLetterPermissionGuard } from 'src/letters/guards/create-letter-permission.guard';
import { RecipientsIsValidPipe } from 'src/letters/pipes/recipients-is-valid.pipe';
import { LetterValuesIsValidPipe } from 'src/letters/pipes/letter-values-is-valid.pipe';
import { UserParam } from 'src/utils/decorators/user-param.decorator';
import { User } from 'src/users/entities/user.entity';
import { ReadLettersPermissionGuard } from 'src/letters/guards/read-letters-permission.guard';
import { LetterExistGuard } from 'src/letters/guards/letter-exist.guard';
import { ReadLetterPermissionGuard } from 'src/letters/guards/read-letter-permission.guard';
import { DataParam } from 'src/utils/decorators/data-param.decorator';
import { Letter } from 'src/letters/entities/letter.entity';
import { SignLetterPermissionGuard } from 'src/letters/guards/sign-letter-permission.guard';

@Controller('letters')
@UseInterceptors(LetterResponseMapperInterceptor)
export class LettersController {
  constructor(private readonly lettersService: LettersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreateLetterPermissionGuard)
  create(
    @UserParam() user: User,
    @Body(RecipientsIsValidPipe, LetterValuesIsValidPipe)
    createLetterDto: CreateLetterDto,
  ) {
    return this.lettersService.create(user, createLetterDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, ReadLettersPermissionGuard)
  findAll() {
    return this.lettersService.findAll();
  }

  @Get(':id')
  @UseGuards(LetterExistGuard, JwtAuthGuard, ReadLetterPermissionGuard)
  findOne(@DataParam('letter') letter: Letter) {
    return letter;
  }

  @Put(':id/sign')
  @UseGuards(LetterExistGuard, JwtAuthGuard, SignLetterPermissionGuard)
  updateRecipientSignedAt(
    @UserParam() user: User,
    @DataParam('letter') letter: Letter,
  ) {
    return this.lettersService.updateRecipientSignedAt(user, letter);
  }

  @Get(':id/download')
  @Header('Content-Type', 'application/pdf')
  @Header(
    'Content-Disposition',
    'attachment; filename="mail-tracker-letter.pdf"',
  )
  @UseGuards(LetterExistGuard, JwtAuthGuard, ReadLetterPermissionGuard)
  async downloadOne(@DataParam('letter') letter: Letter, @Res() res: Response) {
    const file = await promisify(pdf())({
      html: `<body>${letter.template.content}</body>`,
    });

    file.stream.pipe(res);
  }
}
