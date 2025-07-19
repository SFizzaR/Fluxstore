import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UserAddress } from './entities/user-address.entity';
import { DataSource, Repository } from 'typeorm';
export declare class UserAddressService {
    private userAddressRepository;
    private datasource;
    constructor(userAddressRepository: Repository<UserAddress>, datasource: DataSource);
    create(userId: number, createUserAddressDto: CreateUserAddressDto): Promise<{
        message: string;
        statuscode: number;
        Id: number;
    }>;
    findAllAddress(UserId: number): Promise<any>;
    findOne(id: number): string;
    update(id: number, updateUserAddressDto: UpdateUserAddressDto): string;
    remove(id: number): string;
}
