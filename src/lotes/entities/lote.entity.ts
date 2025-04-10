import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('lotes')
export class Lote {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nome: string;

    @Column({ type: 'boolean' })
    ativo: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    criado_em: Date;

}
