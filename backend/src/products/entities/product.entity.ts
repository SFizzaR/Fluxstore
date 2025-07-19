import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Name: string

    @Column('decimal', {
        precision: 10, scale: 2
    })
    Price: number

    @Column()
    Company: string

    @Column()
    Description: string

    @Column()
    Image_url: string

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}
