import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/Auth/auth.service';
export declare class UsersService {
    private userRepository;
    private authservice;
    constructor(userRepository: Repository<User>, authservice: AuthService);
    validateEmail(email: string): boolean;
    create(createUserDto: CreateUserDto): Promise<{
        statuscode: number;
        message: string;
    }>;
    Login(loginUserDto: LoginUserDto): Promise<{
        statuscode: number;
        message: string;
        username: string;
        token: string;
    }>;
    getProfile(req: any): any;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
