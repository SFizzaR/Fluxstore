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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
const order_entity_1 = require("../../order/entities/order.entity");
const product_entity_1 = require("../../products/entities/product.entity");
const typeorm_1 = require("typeorm");
let OrderItem = class OrderItem {
    Id;
    OrderId;
    Order;
    ProductId;
    Product;
    Quantity;
    CreatedAt;
    UpdatedAt;
};
exports.OrderItem = OrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "OrderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Orders, orders => orders.Id),
    (0, typeorm_1.JoinColumn)({ name: 'OrderId' }),
    __metadata("design:type", order_entity_1.Orders)
], OrderItem.prototype, "Order", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "ProductId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.Id),
    (0, typeorm_1.JoinColumn)({ name: 'ProductId' }),
    __metadata("design:type", product_entity_1.Product)
], OrderItem.prototype, "Product", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "Quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderItem.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderItem.prototype, "UpdatedAt", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, typeorm_1.Entity)()
], OrderItem);
//# sourceMappingURL=order-item.entity.js.map