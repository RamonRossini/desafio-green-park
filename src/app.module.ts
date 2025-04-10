import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LotesModule } from './lotes/lotes.module';
import { BoletosModule } from './boletos/boletos.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'senha',
      database: 'green_park',
      autoLoadEntities: true,
      synchronize: true, // DEIXAR SYNCHRONIZE FALSE EM PRODUÇÃO
    }),
    LotesModule,
    BoletosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
