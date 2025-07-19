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
exports.UserCardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_card_entity_1 = require("./entities/user-card.entity");
const typeorm_2 = require("typeorm");
let UserCardService = class UserCardService {
    userCardRepository;
    constructor(userCardRepository) {
        this.userCardRepository = userCardRepository;
    }
    async create(UserId, createUserCardDto) {
        var res = {
            message: '',
            statuscode: 200,
            Id: 0
        };
        try {
            const newUserCard = this.userCardRepository.create({ UserId, ...createUserCardDto });
            const savedCard = await this.userCardRepository.save(newUserCard);
            res.message = "New User Card created";
            res.statuscode = 201;
            res.Id = savedCard.Id;
        }
        catch (error) {
            console.log(error);
            res.message = "Internal server error";
            res.statuscode = 400;
        }
        return res;
    }
    findAll() {
        return `This action returns all userCard`;
    }
    findOne(id) {
        return `This action returns a #${id} userCard`;
    }
    update(id, updateUserCardDto) {
        return `This action updates a #${id} userCard`;
    }
    remove(id) {
        return `This action removes a #${id} userCard`;
    }
};
exports.UserCardService = UserCardService;
exports.UserCardService = UserCardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_card_entity_1.UserCard)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserCardService);
//# sourceMappingURL=user-card.service.js.map