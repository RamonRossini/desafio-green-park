import { Controller, Get, Post, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BoletosService } from './boletos.service';
import { ApiTags, ApiQuery, ApiResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('boletos')
@ApiTags('Boletos')
export class BoletosController {

  constructor(private readonly boletosService: BoletosService) { }

  @Post('import/csv')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { name: { type: 'string', description: 'Deixar escrito "file"' }, file: { type: 'string', format: 'binary' } } } })
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({ status: 200, description: 'Retorna um sucesso caso os boletos sejam importados com sucesso' })
  @ApiResponse({ status: 400, description: 'Retorna um erro caso não seja possível importar os boletos' })
  async importBoletosFromCSV(@UploadedFile() file: Express.Multer.File) {
    return this.boletosService.importFromCSV(file);
  }

  @Post('import/pdf')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { name: { type: 'string', description: 'Deixar escrito "file"' }, file: { type: 'string', format: 'binary' } } } })
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({ status: 200, description: 'Retorna um sucesso caso os boletos sejam importados com sucesso' })
  @ApiResponse({ status: 400, description: 'Retorna um erro caso não seja possível importar os boletos' })
  async importBoletosFromPDF(@UploadedFile() file: Express.Multer.File) {
    return this.boletosService.importFromPDF(file);
  }

  @Get()
  @ApiQuery({ name: 'nome', type: String, required: false })
  @ApiQuery({ name: 'valor_inicial', type: Number, required: false })
  @ApiQuery({ name: 'valor_final', type: Number, required: false })
  @ApiQuery({ name: 'id_lote', type: Number, required: false })
  @ApiQuery({ name: 'relatorio', type: Number, required: false, description: 'Deixar escrito "1" para gerar o relatório' })
  @ApiResponse({ status: 200, description: 'Retorna todos os boletos com os filtros aplicados' })
  @ApiResponse({ status: 400, description: 'Retorna um erro caso os filtros não sejam válidos' })
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

  @Delete()
  @ApiResponse({ status: 200, description: 'Retorna um sucesso caso todos os boletos sejam deletados' })
  @ApiResponse({ status: 400, description: 'Retorna um erro caso não seja possível deletar os boletos' })
  removeAll() {
    return this.boletosService.removeAll();
  }

}
