import { IsBoolean } from "class-validator";
import { IsNumber } from "class-validator";
import { IsNotEmpty } from "class-validator";
import { IsString } from "class-validator";
import { Lote } from "src/lotes/entities/lote.entity";

export class CreateBoletoDto {

    @IsString()
    @IsNotEmpty()
    nome_sacado: string;

    @IsNumber()
    @IsNotEmpty()
    id_lote: Lote;

    @IsNumber()
    @IsNotEmpty()
    valor: number;

    @IsString()
    @IsNotEmpty()
    linha_digitavel: string;

    @IsBoolean()
    @IsNotEmpty()
    ativo: boolean;

}
