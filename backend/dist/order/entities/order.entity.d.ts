import { User } from "src/users/entities/user.entity";
export declare class Orders {
    Id: number;
    UserId: number;
    User: User;
    Total: number;
    Status: number;
    AddressId: number;
    PaymentMethod: number;
    CardId: number;
    CreatedAt: Date;
    UpdatedAt: Date;
}
