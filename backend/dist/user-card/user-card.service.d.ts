import { CreateUserCardDto } from './dto/create-user-card.dto';
import { UpdateUserCardDto } from './dto/update-user-card.dto';
import { UserCard } from './entities/user-card.entity';
import { Repository } from 'typeorm';
export declare class UserCardService {
    private userCardRepository;
    constructor(userCardRepository: Repository<UserCard>);
    create(UserId: number, createUserCardDto: CreateUserCardDto): Promise<{
        message: string;
        statuscode: number;
        Id: number;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserCardDto: UpdateUserCardDto): string;
    remove(id: number): string;
}
