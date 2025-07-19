import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserCard {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    UserId: number

    @Column()
    CardNumberLast4: string

    @Column()
    HolderName: string

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}
