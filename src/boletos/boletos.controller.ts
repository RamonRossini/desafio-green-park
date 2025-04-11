import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BoletosService } from './boletos.service';
import { CreateBoletoDto } from './dto/create-boleto.dto';
import { UpdateBoletoDto } from './dto/update-boleto.dto';

@Controller('boletos')
export class BoletosController {

  constructor(private readonly boletosService: BoletosService) { }

  @Post('import/csv')
  @UseInterceptors(FileInterceptor('file'))
  async importBoletosFromCSV(@UploadedFile() file: Express.Multer.File) {
    return this.boletosService.importFromCSV(file);
  }

  @Post('import/pdf')
  @UseInterceptors(FileInterceptor('file'))
  async importBoletosFromPDF(@UploadedFile() file: Express.Multer.File) {
    return this.boletosService.importFromPDF(file);
  }

  @Post()
  create(@Body() createBoletoDto: CreateBoletoDto) {
    return this.boletosService.create(createBoletoDto);
  }

  @Get()
  findAll(
    @Query('nome') nome: string,
    @Query('valor_inicial') valor_inicial: number,
    @Query('valor_final') valor_final: number,
    @Query('id_lote') id_lote: number,
    @Query('relatorio') relatorio: number
  ) {
    const hasRelatorio = !!relatorio && relatorio == 1;
    return this.boletosService.findAll(nome, valor_inicial, valor_final, id_lote, hasRelatorio);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boletosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoletoDto: UpdateBoletoDto) {
    return this.boletosService.update(+id, updateBoletoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boletosService.remove(+id);
  }

  @Delete()
  removeAll() {
    return this.boletosService.removeAll();
  }

}
