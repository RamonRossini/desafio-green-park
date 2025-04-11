import { Lote } from "src/lotes/entities/lote.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('boletos')
export class Boleto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nome_sacado: string;

    @ManyToOne(() => Lote, (lote) => lote.id)
    @JoinColumn({ name: 'id_lote' })
    id_lote: Lote;

    @Column({ type: 'decimal' })
    valor: number;

    @Column({ type: 'varchar', length: 255 })
    linha_digitavel: string;

    @Column({ type: 'boolean', default: true })
    ativo: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    criado_em: Date;

}
