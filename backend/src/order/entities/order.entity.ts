import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column() // this will store the foreign key
    UserId: number;


    @ManyToOne(() => User, user => user.Id)
    @JoinColumn({ name: 'UserId' })
    User: User

    @Column('decimal', {
        precision: 10, scale: 2
    })
    Total: number

    @Column()
    Status: number

    @Column()
    AddressId: number

    @Column()
    PaymentMethod: number
    // 1 for COD 2 for Card

    @Column()
    CardId: number

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

}
