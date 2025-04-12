import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LotesModule } from './lotes/lotes.module';
import { BoletosModule } from './boletos/boletos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'green_park',
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
