import { Orders } from "src/order/entities/order.entity";
export declare class User {
    Id: number;
    Username: string;
    Email: string;
    Password: string;
    orders: Orders[];
    CreatedAt: Date;
    UpdatedAt: Date;
}
