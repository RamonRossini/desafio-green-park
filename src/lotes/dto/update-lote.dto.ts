import { PartialType } from '@nestjs/mapped-types';
import { CreateLoteDto } from './create-lote.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class UpdateLoteDto extends PartialType(CreateLoteDto) {

    @IsNumber()
    @IsNotEmpty()
    id: number;

}
