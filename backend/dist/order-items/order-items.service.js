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
exports.OrderItemsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_item_entity_1 = require("./entities/order-item.entity");
const typeorm_2 = require("typeorm");
let OrderItemsService = class OrderItemsService {
    orderItemsRepository;
    datasource;
    constructor(orderItemsRepository, datasource) {
        this.orderItemsRepository = orderItemsRepository;
        this.datasource = datasource;
    }
    create(createOrderItemDto) {
        var res = {
            message: '',
            statuscode: 200
        };
        if (createOrderItemDto.Quantity === 0) {
            res.message = 'Quantity cannot be 0';
        }
        else {
            try {
                const newOrderItem = this.orderItemsRepository.create(createOrderItemDto);
                this.orderItemsRepository.save(newOrderItem);
                res.message = 'Order Item created';
                res.statuscode = 201;
            }
            catch (err) {
                res.message = err.toString();
                res.statuscode = 400;
            }
        }
        return res;
    }
    findAll(OrderId) {
        if (!OrderId) {
            throw new common_1.BadGatewayException("Order Id is required");
        }
        else {
            const params = [];
            const query = `select * from order_item where OrderId = ?`;
            params.push(OrderId);
            return this.datasource.query(query, params);
        }
    }
    findOne(id) {
        return `This action returns a #${id} orderItem`;
    }
    update(id, updateOrderItemDto) {
        return `This action updates a #${id} orderItem`;
    }
    remove(id) {
        return `This action removes a #${id} orderItem`;
    }
};
exports.OrderItemsService = OrderItemsService;
exports.OrderItemsService = OrderItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], OrderItemsService);
//# sourceMappingURL=order-items.service.js.map