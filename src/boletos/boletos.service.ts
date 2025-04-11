import { Injectable } from '@nestjs/common';
import { CreateBoletoDto } from './dto/create-boleto.dto';
import { UpdateBoletoDto } from './dto/update-boleto.dto';
import { parse } from 'csv-parse/sync';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Boleto } from './entities/boleto.entity';
import { IBoletoParsed } from './interfaces/boleto.interface';
import { LotesService } from 'src/lotes/lotes.service';
@Injectable()
export class BoletosService {

  constructor(
    @InjectRepository(Boleto)
    private boletosRepository: Repository<Boleto>,
    private lotesService: LotesService
  ) { }

  async importFromCSV(file: Express.Multer.File) {
    const boletosParsed: IBoletoParsed[] = parse(file.buffer, {
      delimiter: ';',
      columns: true,
      skip_empty_lines: true,
    });

    const boletosToBeInserted: CreateBoletoDto[] = [];

    for (const boletoParsed of boletosParsed) {
      let boleto: Partial<CreateBoletoDto> = {
        nome_sacado: boletoParsed.nome,
        valor: parseFloat(boletoParsed.valor),
        linha_digitavel: boletoParsed.linha_digitavel,
      }

      const foundLote = await this.lotesService.findOneByName(boletoParsed.unidade);

      if (!foundLote) {
        const createdLote = await this.lotesService.create({
          nome: boletoParsed.unidade
        });
        boleto.id_lote = createdLote.id;
      } else {
        boleto.id_lote = foundLote.id;
      }

      boletosToBeInserted.push(boleto as CreateBoletoDto);
    }

    const createdBoleto = this.boletosRepository.create(boletosToBeInserted as unknown as Boleto[]);
    return await this.boletosRepository.save(createdBoleto);
  }

  create(createBoletoDto: CreateBoletoDto) {
    return 'This action adds a new boleto';
  }

  findAll() {
    return `This action returns all boletos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boleto`;
  }

  update(id: number, updateBoletoDto: UpdateBoletoDto) {
    return `This action updates a #${id} boleto`;
  }

  remove(id: number) {
    return `This action removes a #${id} boleto`;
  }

  async removeAll(): Promise<DeleteResult> {
    return await this.boletosRepository.createQueryBuilder()
      .delete()
      .from(Boleto)
      .execute();
  }

}
