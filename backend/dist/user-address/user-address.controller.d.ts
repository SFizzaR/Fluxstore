import { UserAddressService } from './user-address.service';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UserAddress } from './entities/user-address.entity';
export declare class UserAddressController {
    private readonly userAddressService;
    constructor(userAddressService: UserAddressService);
    create(req: any, createUserAddressDto: CreateUserAddressDto): Promise<{
        message: string;
        statuscode: number;
        Id: number;
    }>;
    findAll(req: any): Promise<UserAddress>;
    findOne(id: string): string;
    update(id: string, updateUserAddressDto: UpdateUserAddressDto): string;
    remove(id: string): string;
}
