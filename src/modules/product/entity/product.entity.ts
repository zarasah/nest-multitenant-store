import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ nullable: true })
    description?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
