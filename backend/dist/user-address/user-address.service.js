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
exports.UserAddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_address_entity_1 = require("./entities/user-address.entity");
const typeorm_2 = require("typeorm");
let UserAddressService = class UserAddressService {
    userAddressRepository;
    datasource;
    constructor(userAddressRepository, datasource) {
        this.userAddressRepository = userAddressRepository;
        this.datasource = datasource;
    }
    async create(userId, createUserAddressDto) {
        var res = {
            message: '',
            statuscode: 200,
            Id: 0
        };
        try {
            const newUserAddress = this.userAddressRepository.create({ UserId: userId, ...createUserAddressDto });
            const savedAddress = await this.userAddressRepository.save(newUserAddress);
            res.message = 'User Address created';
            res.Id = savedAddress.Id;
            res.statuscode = 201;
        }
        catch (error) {
            res.statuscode = 400;
            res.message = "Internal Server Error";
        }
        return res;
    }
    findAllAddress(UserId) {
        if (!UserId) {
            throw new common_1.BadGatewayException("User Id is required");
        }
        else {
            let query = `select * from user_address where UserId = ${UserId}`;
            return this.datasource.query(query);
        }
    }
    findOne(id) {
        return `This action returns a #${id} userAddress`;
    }
    update(id, updateUserAddressDto) {
        return `This action updates a #${id} userAddress`;
    }
    remove(id) {
        return `This action removes a #${id} userAddress`;
    }
};
exports.UserAddressService = UserAddressService;
exports.UserAddressService = UserAddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_address_entity_1.UserAddress)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], UserAddressService);
//# sourceMappingURL=user-address.service.js.map