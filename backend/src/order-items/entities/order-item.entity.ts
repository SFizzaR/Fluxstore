import { Orders } from "src/order/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    OrderId: number

    @ManyToOne(() => Orders, orders => orders.Id)
    @JoinColumn({ name: 'OrderId' })
    Order: Orders

    @Column()
    ProductId: number

    @ManyToOne(() => Product, product => product.Id)
    @JoinColumn({ name: 'ProductId' })
    Product: Product

    @Column()
    Quantity: number

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

}
