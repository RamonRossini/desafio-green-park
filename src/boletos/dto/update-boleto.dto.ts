import { PartialType } from '@nestjs/mapped-types';
import { CreateBoletoDto } from './create-boleto.dto';
import { IsNotEmpty } from 'class-validator';
import { IsNumber } from 'class-validator';

export class UpdateBoletoDto extends PartialType(CreateBoletoDto) {

    @IsNumber()
    @IsNotEmpty()
    id: number;

}
