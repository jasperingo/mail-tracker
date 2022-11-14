import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.lettersService.findOne(+id);
  }
}
