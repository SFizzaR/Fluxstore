import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
export declare class OrderService {
    private orderRepository;
    private dataSource;
    constructor(orderRepository: Repository<Orders>, dataSource: DataSource);
    create(userId: number, createOrderDto: CreateOrderDto): Promise<{
        message: string;
        statuscode: number;
        Id: number;
    }>;
    findallOrders(UserId: number): Promise<any[]>;
    findOne(id: number): string;
    update(id: number, updateOrderDto: UpdateOrderDto): string;
    remove(id: number): string;
}
