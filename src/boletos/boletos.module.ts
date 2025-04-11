import { Module } from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { BoletosController } from './boletos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boleto } from './entities/boleto.entity';
import { LotesModule } from 'src/lotes/lotes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Boleto]), LotesModule],
  controllers: [BoletosController],
  providers: [BoletosService],
})
export class BoletosModule { }
