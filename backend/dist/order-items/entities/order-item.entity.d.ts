import { Orders } from "src/order/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
export declare class OrderItem {
    Id: number;
    OrderId: number;
    Order: Orders;
    ProductId: number;
    Product: Product;
    Quantity: number;
    CreatedAt: Date;
    UpdatedAt: Date;
}
