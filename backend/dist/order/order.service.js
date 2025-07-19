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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./entities/order.entity");
const typeorm_2 = require("typeorm");
let OrderService = class OrderService {
    orderRepository;
    dataSource;
    constructor(orderRepository, dataSource) {
        this.orderRepository = orderRepository;
        this.dataSource = dataSource;
    }
    async create(userId, createOrderDto) {
        var res = {
            message: '',
            statuscode: 200,
            Id: 0
        };
        if (!createOrderDto.Total) {
            res.message = 'Total cannot be null';
        }
        else {
            try {
                const Status = 1;
                const newOrder = this.orderRepository.create({ UserId: userId, ...createOrderDto, Status });
                const savedOrder = await this.orderRepository.save(newOrder);
                res.Id = savedOrder.Id;
                res.message = 'Order created';
                res.statuscode = 201;
            }
            catch (err) {
                res.statuscode = 400;
                res.message = "Internal Server Error";
            }
        }
        return res;
    }
    async findallOrders(UserId) {
        if (!UserId) {
            throw new common_1.BadRequestException('UserId is required.');
        }
        let query = `call FetchAllOrders (${UserId});`;
        return this.dataSource.query(query);
    }
    findOne(id) {
        return `This action returns a #${id} order`;
    }
    update(id, updateOrderDto) {
        return `This action updates a #${id} order`;
    }
    remove(id) {
        return `This action removes a #${id} order`;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Orders)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], OrderService);
//# sourceMappingURL=order.service.js.map