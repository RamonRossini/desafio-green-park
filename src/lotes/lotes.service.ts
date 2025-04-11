import { Injectable } from '@nestjs/common';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
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

  findAll() {
    return `This action returns all lotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lote`;
  }

  async findOneByName(name: string) {
    return await this.lotesRepository.findOne({
      where: { nome: name }
    });
  }

  update(id: number, updateLoteDto: UpdateLoteDto) {
    return `This action updates a #${id} lote`;
  }

  remove(id: number) {
    return `This action removes a #${id} lote`;
  }
}
