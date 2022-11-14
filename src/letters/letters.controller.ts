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
    return this.lettersService.create(createLetterDto);
  }

  @Get()
  findAll() {
    return this.lettersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lettersService.findOne(+id);
  }
}
