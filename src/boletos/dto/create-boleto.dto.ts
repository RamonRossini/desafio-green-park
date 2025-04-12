import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";
import { IsNumber } from "class-validator";
import { IsNotEmpty } from "class-validator";
import { IsString } from "class-validator";
import { Lote } from "src/lotes/entities/lote.entity";

export class CreateBoletoDto {

    @ApiProperty({ description: 'Nome do pagante' })
    @IsString()
    @IsNotEmpty()
    nome_sacado: string;

    @ApiProperty({ description: 'ID do lote', type: () => Lote })
    @IsNumber()
    @IsNotEmpty()
    id_lote: number;

    @ApiProperty({ description: 'Valor do boleto' })
    @IsNumber()
    @IsNotEmpty()
    valor: number;

    @ApiProperty({ description: 'Linha digitável' })
    @IsString()
    @IsNotEmpty()
    linha_digitavel: string;

    @ApiProperty({ description: 'Status do boleto' })
    @IsBoolean()
    @IsOptional()
    ativo?: boolean;

}
