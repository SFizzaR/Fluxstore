import { Orders } from "src/order/entities/order.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    Username: string

    @Column({ unique: true })
    Email: string

    @Column()
    Password: string

    @OneToMany(() => Orders, (order) => order.User)
    orders: Orders[]

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}