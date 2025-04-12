import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateLoteDto {

    @ApiProperty({ description: 'ID do lote no sistema do condomínio' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nome: string;

    @ApiProperty({ description: 'Status do lote' })
    @IsBoolean()
    @IsOptional()
    ativo?: boolean;

}
