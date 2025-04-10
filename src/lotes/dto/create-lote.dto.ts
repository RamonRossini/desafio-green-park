import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateLoteDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nome: string;

    @IsBoolean()
    @IsNotEmpty()
    ativo: boolean;

}
