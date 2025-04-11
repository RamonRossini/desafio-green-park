import { IsBoolean, IsOptional } from "class-validator";
import { IsNumber } from "class-validator";
import { IsNotEmpty } from "class-validator";
import { IsString } from "class-validator";

export class CreateBoletoDto {

    @IsString()
    @IsNotEmpty()
    nome_sacado: string;

    @IsNumber()
    @IsNotEmpty()
    id_lote: number;

    @IsNumber()
    @IsNotEmpty()
    valor: number;

    @IsString()
    @IsNotEmpty()
    linha_digitavel: string;

    @IsBoolean()
    @IsOptional()
    ativo?: boolean;

}
