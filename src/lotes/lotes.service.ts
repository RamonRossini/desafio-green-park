import { Injectable } from '@nestjs/common';
import { CreateLoteDto } from './dto/create-lote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from './entities/lote.entity';

@Injectable()
export class LotesService {

  constructor(
    @InjectRepository(Lote)
    private lotesRepository: Repository<Lote>,
  ) { }

  async create(createLoteDto: CreateLoteDto) {
    const createdLote = this.lotesRepository.create(createLoteDto);
    return await this.lotesRepository.save(createdLote);
  }

  async findOneByName(name: string) {
    return await this.lotesRepository.findOne({
      where: { nome: name }
    });
  }

}
