import { UserCardService } from './user-card.service';
import { CreateUserCardDto } from './dto/create-user-card.dto';
import { UpdateUserCardDto } from './dto/update-user-card.dto';
export declare class UserCardController {
    private readonly userCardService;
    constructor(userCardService: UserCardService);
    create(req: any, createUserCardDto: CreateUserCardDto): Promise<{
        message: string;
        statuscode: number;
        Id: number;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserCardDto: UpdateUserCardDto): string;
    remove(id: string): string;
}
