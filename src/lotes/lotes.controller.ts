import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LotesService } from './lotes.service';
import { CreateLoteDto } from './dto/create-lote.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('lotes')
@ApiTags('Lotes')
export class LotesController {
  constructor(private readonly lotesService: LotesService) { }

  @Post()
  create(@Body() createLoteDto: CreateLoteDto) {
    return this.lotesService.create(createLoteDto);
  }

  @Get('name/:name')
  findOneByName(@Param('name') name: string) {
    return this.lotesService.findOneByName(name);
  }

}
