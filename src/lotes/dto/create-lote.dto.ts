import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateLoteDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nome: string;

    @IsBoolean()
    @IsOptional()
    ativo?: boolean;

}
