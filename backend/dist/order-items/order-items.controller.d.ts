import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
export declare class OrderItemsController {
    private readonly orderItemsService;
    constructor(orderItemsService: OrderItemsService);
    create(createOrderItemDto: CreateOrderItemDto): {
        message: string;
        statuscode: number;
    };
    findAll(orderId: number): Promise<OrderItem[]>;
    findOne(id: number): string;
    update(id: string, updateOrderItemDto: UpdateOrderItemDto): string;
    remove(id: string): string;
}
