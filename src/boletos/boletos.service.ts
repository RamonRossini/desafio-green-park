import { Injectable } from '@nestjs/common';
import { CreateBoletoDto } from './dto/create-boleto.dto';
import { parse } from 'csv-parse/sync';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Boleto } from './entities/boleto.entity';
import { IBoletoParsed } from './interfaces/boleto.interface';
import { LotesService } from 'src/lotes/lotes.service';
import * as pdfParse from 'pdf-parse';
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';
var PdfPrinter = require('pdfmake');
import { join } from 'path';

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

  async importFromPDF(file: Express.Multer.File) {
    try {
      const data = await pdfParse(file.buffer);
      const text = data.text;
      const lines = text.split('\n');
      const names: string[] = [];

      // Encontra nomes e seus números de página correspondentes
      lines.forEach((line: string) => {
        if (line.includes('Nome')) {
          const name = line.split(':')[1].trim();
          names.push(name);
        }
      });

      const pdfDoc = await PDFDocument.load(file.buffer);
      const outputDir = path.join(process.cwd(), 'assets', 'pdfs');

      if (!fs.existsSync(outputDir))
        fs.mkdirSync(outputDir);

      // Divide o PDF em arquivos separados
      for (let i = 0; i < names.length; i++) {
        const foundBoleto = await this.findOneByName(names[i]);

        if (foundBoleto) {
          const newPdfDoc = await PDFDocument.create();
          const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
          newPdfDoc.addPage(copiedPage);

          const pdfBytes = await newPdfDoc.save();
          const fileName = `${foundBoleto.id}.pdf`;
          const filePath = path.join(outputDir, fileName);

          fs.writeFileSync(filePath, pdfBytes);
        }
      }

      return {
        message: `PDFs inseridos com sucesso`,
      };
    } catch (error) {
      throw new Error(`Error processing PDF: ${error.message}`);
    }
  }

  async findAll(
    nome?: string,
    valor_inicial?: number,
    valor_final?: number,
    id_lote?: number,
    relatorio?: boolean
  ) {
    try {
      const query = this.boletosRepository.createQueryBuilder('boleto')
        .leftJoinAndSelect('boleto.id_lote', 'lote');

      if (nome)
        query.andWhere('boleto.nome_sacado ILIKE :nome', { nome: `%${nome}%` });

      if (valor_inicial)
        query.andWhere('boleto.valor >= :valor_inicial', { valor_inicial });

      if (valor_final)
        query.andWhere('boleto.valor <= :valor_final', { valor_final });

      if (id_lote)
        query.andWhere('boleto.id_lote = :id_lote', { id_lote });

      const boletos = await query.getMany();

      let pdfBase64: string = '';

      if (relatorio) {
        pdfBase64 = await this.getPdfBoletos(boletos);
      }

      const response: { boletos: Boleto[], pdfBase64?: string } = { boletos };

      if (pdfBase64)
        response.pdfBase64 = pdfBase64;

      fs.unlinkSync(path.join(__dirname, '../..', 'assets', 'pdfs', 'relatorio.pdf'));

      return response;
    } catch (error) {
      throw new Error(`Error finding all boletos: ${error.message}`);
    }
  }

  private async getPdfBoletos(boletos: Boleto[]) {
    await this.generateReportPDFMake(boletos);
    return fs.readFileSync(path.join(__dirname, '../..', 'assets', 'pdfs', 'relatorio.pdf'), { encoding: 'base64' });
  }

  private async generateReportPDFMake(boletos: Boleto[]) {
    return new Promise<void>(async (resolve, reject) => {
      const printer = new PdfPrinter({
        Roboto: {
          normal: join(__dirname, '../..', 'assets', 'fonts', 'Roboto-Regular.ttf'),
        }
      });

      const docDefinition = {
        pageSize: 'A4',
        pageMargins: [10, 10, 10, 10],
        content: [
          { text: 'Relatório de Boletos', style: 'header' },
          {
            table: {
              headerRows: 1,
              widths: ['auto', '*', 'auto', 'auto'],
              body: [
                [
                  { text: 'id', style: 'tableHeader' },
                  { text: 'nome_sacado', style: 'tableHeader' },
                  { text: 'valor', style: 'tableHeader' },
                  { text: 'id_lote', style: 'tableHeader' }
                ],
                ...boletos.map(boleto => [
                  boleto.id.toString(),
                  boleto.nome_sacado,
                  Number(boleto.valor).toFixed(2),
                  boleto.id_lote?.nome || 'N/A'
                ])
              ]
            }
          }
        ],
      };

      let pdfDoc = printer.createPdfKitDocument(docDefinition);
      pdfDoc.end();
      pdfDoc.pipe(
        fs.createWriteStream(path.join(__dirname, '../..', 'assets', 'pdfs', 'relatorio.pdf'))
      ).on('finish', () => {
        resolve();
      });
    })
  }

  async findOneByName(name: string): Promise<Boleto | null> {
    return await this.boletosRepository.findOne({
      where: { nome_sacado: ILike(`%${name}%`) }
    });
  }

  async removeAll(): Promise<DeleteResult> {
    return await this.boletosRepository.createQueryBuilder()
      .delete()
      .from(Boleto)
      .execute();
  }

}
