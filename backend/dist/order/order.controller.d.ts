import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(req: any, createOrderDto: CreateOrderDto): Promise<{
        message: string;
        statuscode: number;
        Id: number;
    }>;
    findAll(req: any): Promise<any>;
    update(id: string, updateOrderDto: UpdateOrderDto): string;
    remove(id: string): string;
}
