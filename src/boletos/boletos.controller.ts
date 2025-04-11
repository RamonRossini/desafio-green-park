import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BoletosService } from './boletos.service';
import { CreateBoletoDto } from './dto/create-boleto.dto';
import { UpdateBoletoDto } from './dto/update-boleto.dto';

@Controller('boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) { }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importBoletos(@UploadedFile() file: Express.Multer.File) {
    return this.boletosService.importFromCSV(file);
  }

  @Post()
  create(@Body() createBoletoDto: CreateBoletoDto) {
    return this.boletosService.create(createBoletoDto);
  }

  @Get()
  findAll() {
    return this.boletosService.findAll();
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
