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
exports.UserCardController = void 0;
const common_1 = require("@nestjs/common");
const user_card_service_1 = require("./user-card.service");
const create_user_card_dto_1 = require("./dto/create-user-card.dto");
const update_user_card_dto_1 = require("./dto/update-user-card.dto");
const passport_1 = require("@nestjs/passport");
let UserCardController = class UserCardController {
    userCardService;
    constructor(userCardService) {
        this.userCardService = userCardService;
    }
    async create(req, createUserCardDto) {
        const userId = req.user.userId;
        return await this.userCardService.create(userId, createUserCardDto);
    }
    findAll() {
        return this.userCardService.findAll();
    }
    findOne(id) {
        return this.userCardService.findOne(+id);
    }
    update(id, updateUserCardDto) {
        return this.userCardService.update(+id, updateUserCardDto);
    }
    remove(id) {
        return this.userCardService.remove(+id);
    }
};
exports.UserCardController = UserCardController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('AddNewCard'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_card_dto_1.CreateUserCardDto]),
    __metadata("design:returntype", Promise)
], UserCardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserCardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserCardController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_card_dto_1.UpdateUserCardDto]),
    __metadata("design:returntype", void 0)
], UserCardController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserCardController.prototype, "remove", null);
exports.UserCardController = UserCardController = __decorate([
    (0, common_1.Controller)('user-card'),
    __metadata("design:paramtypes", [user_card_service_1.UserCardService])
], UserCardController);
//# sourceMappingURL=user-card.controller.js.map