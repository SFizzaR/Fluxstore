import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { DataSource, Repository } from 'typeorm';
export declare class OrderItemsService {
    private orderItemsRepository;
    private datasource;
    constructor(orderItemsRepository: Repository<OrderItem>, datasource: DataSource);
    create(createOrderItemDto: CreateOrderItemDto): {
        message: string;
        statuscode: number;
    };
    findAll(OrderId: number): Promise<any>;
    findOne(id: number): string;
    update(id: number, updateOrderItemDto: UpdateOrderItemDto): string;
    remove(id: number): string;
}
