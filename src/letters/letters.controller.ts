import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LettersService } from './letters.service';
import { CreateLetterDto } from './dto/create-letter.dto';
import { UpdateLetterDto } from './dto/update-letter.dto';
import { LetterResponseMapperInterceptor } from 'src/letters/interceptors/letter-response-mapper.interceptor';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateLetterPermissionGuard } from 'src/letters/guards/create-letter-permission.guard';

@Controller('letters')
@UseInterceptors(LetterResponseMapperInterceptor)
export class LettersController {
  constructor(private readonly lettersService: LettersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreateLetterPermissionGuard)
  create(@Body() createLetterDto: CreateLetterDto) {
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLetterDto: UpdateLetterDto) {
    return this.lettersService.update(+id, updateLetterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lettersService.remove(+id);
  }
}
