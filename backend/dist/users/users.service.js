"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const auth_service_1 = require("../Auth/auth.service");
const passport_1 = require("@nestjs/passport");
let UsersService = class UsersService {
    userRepository;
    authservice;
    constructor(userRepository, authservice) {
        this.userRepository = userRepository;
        this.authservice = authservice;
    }
    validateEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
    async create(createUserDto) {
        var response = {
            statuscode: 200,
            message: '',
        };
        try {
            if (createUserDto?.Email && createUserDto.Email != '' && this.validateEmail(createUserDto.Email)) {
                const userExisted = await this.userRepository.findOne({ where: { Email: createUserDto.Email } });
                if (userExisted) {
                    response.message = 'User With this EmailAddress already Existed';
                }
                else {
                    const hashedPassword = await bcrypt.hash(createUserDto.Password, 10);
                    createUserDto.Password = hashedPassword;
                    const newUser = this.userRepository.create(createUserDto);
                    this.userRepository.save(newUser);
                    response.message = "User Created SuccessFully";
                    response.statuscode = 201;
                }
            }
            else {
                response.message = 'Please Provide Valid Emailaddress';
            }
            return response;
        }
        catch (ex) {
            response.statuscode = 400;
            response.message = ex.toString();
            return response;
        }
    }
    async Login(loginUserDto) {
        var response = {
            statuscode: 200,
            message: '',
            username: '',
            token: ''
        };
        try {
            if (loginUserDto?.Email && loginUserDto.Email != '' && this.validateEmail(loginUserDto.Email)) {
                const userExists = await this.userRepository.findOne({ where: { Email: loginUserDto.Email } });
                if (!userExists) {
                    response.message = "Invalid user";
                }
                else {
                    const isPasswordValid = await bcrypt.compare(loginUserDto.Password, userExists.Password);
                    if (isPasswordValid) {
                        console.log(userExists);
                        const tokenObject = await this.authservice.login(userExists);
                        response.token = tokenObject.access_token;
                        response.message = "Successfully logged in";
                        response.statuscode = 201;
                        response.username = userExists.Username;
                    }
                    else {
                        response.message = 'Invalid Password';
                    }
                }
            }
            else {
                response.message = 'Invalid Email';
            }
            return response;
        }
        catch (ex) {
            response.statuscode = 500;
            response.message = ex.toString();
            return response;
        }
    }
    getProfile(req) {
        return req;
    }
    findAll() {
        return `This action returns all users`;
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersService.prototype, "getProfile", null);
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map