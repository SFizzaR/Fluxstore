import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserAddress {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    UserId: number

    @Column()
    FirstName: string

    @Column()
    LastName: string

    @Column()
    Address: string

    @Column({ nullable: true })
    Address2: string

    @Column()
    Country: string

    @Column()
    City: string

    @Column()
    State: string

    @Column({ nullable: true })
    Zip: string

    @Column()
    PhoneNumber: string


    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}
